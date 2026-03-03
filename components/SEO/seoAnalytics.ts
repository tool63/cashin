export interface SEOAnalytics {
  pageType: string;
  generationTime: number;
  metadataSize: number;
  schemaCount: number;
  cacheHit: boolean;
  error?: boolean;
  timestamp: number;
  userAgent?: string;
  path?: string;
}

export interface SEOAnalyticsConfig {
  endpoint: string;
  batchSize?: number;
  flushInterval?: number;
}

const ANALYTICS_CONFIG: SEOAnalyticsConfig = {
  endpoint: '/api/analytics/seo',
  batchSize: 25,
  flushInterval: 5000,
};

export function trackSEOGeneration(metrics: Partial<SEOAnalytics>): SEOAnalytics {
  const fullMetrics: SEOAnalytics = {
    pageType: metrics.pageType || 'unknown',
    generationTime: metrics.generationTime || 0,
    metadataSize: metrics.metadataSize || 0,
    schemaCount: metrics.schemaCount || 0,
    cacheHit: metrics.cacheHit || false,
    error: metrics.error || false,
    timestamp: Date.now(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  };

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 SEO Metrics:', fullMetrics);
  }

  // Production analytics queue
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    queueSEOMetrics(fullMetrics);
  }

  return fullMetrics;
}

// ============================================================
// Metrics Queue (Batch Processing)
// ============================================================
const metricsQueue: SEOAnalytics[] = [];
let flushTimeout: NodeJS.Timeout | null = null;
let isFlushing = false;

function queueSEOMetrics(metrics: SEOAnalytics) {
  metricsQueue.push(metrics);

  if (metricsQueue.length >= (ANALYTICS_CONFIG.batchSize || 25)) {
    flushMetricsQueue();
    return;
  }

  if (!flushTimeout) {
    flushTimeout = setTimeout(flushMetricsQueue, ANALYTICS_CONFIG.flushInterval);
  }
}

async function flushMetricsQueue() {
  if (isFlushing || metricsQueue.length === 0) return;

  isFlushing = true;
  const metrics = [...metricsQueue];
  metricsQueue.length = 0;
  flushTimeout = null;

  try {
    await sendMetrics(metrics);
  } catch (error) {
    console.error('❌ SEO Analytics send failed:', error);
    // Requeue on failure (with limit)
    metricsQueue.push(...metrics.slice(0, 100));
  } finally {
    isFlushing = false;
  }
}

// ============================================================
// Analytics Transmission
// ============================================================
async function sendMetrics(metrics: SEOAnalytics[]): Promise<void> {
  if (typeof navigator === 'undefined') return;

  const payload = JSON.stringify(metrics);

  // Use Beacon API for best reliability
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon(ANALYTICS_CONFIG.endpoint, blob);
    return;
  }

  // Fallback to fetch
  try {
    await fetch(ANALYTICS_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  } catch (error) {
    console.error('❌ SEO analytics fetch failed:', error);
  }
}

// ============================================================
// Cleanup (Memory Safety)
// ============================================================
export function clearSEOAnalyticsQueue() {
  metricsQueue.length = 0;

  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
}
