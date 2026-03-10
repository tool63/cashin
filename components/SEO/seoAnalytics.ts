// components/SEO/seoAnalytics.ts

export interface SEOAnalytics {
  pageType: string;
  generationTime: number;
  metadataSize: number;
  schemaCount: number;
  cacheHit: boolean;
  error?: boolean;
  warnings?: number;
  suggestions?: number;
  timestamp: number;
  userAgent?: string;
  path?: string;
  referrer?: string;
  country?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
}

export interface SEOAnalyticsConfig {
  endpoint: string;
  batchSize?: number;
  flushInterval?: number;
  sampleRate?: number; // 0-1
  debug?: boolean;
}

const ANALYTICS_CONFIG: SEOAnalyticsConfig = {
  endpoint: '/api/analytics/seo',
  batchSize: 25,
  flushInterval: 5000,
  sampleRate: 0.1, // track 10% of requests
  debug: false,
};

const metricsQueue: SEOAnalytics[] = [];
let flushTimeout: NodeJS.Timeout | null = null;
let isFlushing = false;

const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';

export function trackSEOGeneration(metrics: Partial<SEOAnalytics>): SEOAnalytics {
  // Sample in production
  if (process.env.NODE_ENV === 'production' && Math.random() > (ANALYTICS_CONFIG.sampleRate || 1)) {
    return generateMetrics(metrics);
  }

  const fullMetrics = generateMetrics(metrics);

  // Development logging
  if (ANALYTICS_CONFIG.debug || process.env.NODE_ENV === 'development') {
    console.log('📊 SEO Metrics:', fullMetrics);
  }

  // Queue metrics for production
  if (process.env.NODE_ENV === 'production' && isBrowser) {
    enqueueMetrics(fullMetrics);
  }

  return fullMetrics;
}

// ----------------------------------------------------
// Generate Metrics Object
// ----------------------------------------------------
function generateMetrics(metrics: Partial<SEOAnalytics>): SEOAnalytics {
  const now = Date.now();
  return {
    pageType: metrics.pageType || 'unknown',
    generationTime: metrics.generationTime || 0,
    metadataSize: metrics.metadataSize || 0,
    schemaCount: metrics.schemaCount || 0,
    cacheHit: metrics.cacheHit || false,
    error: metrics.error || false,
    warnings: metrics.warnings || 0,
    suggestions: metrics.suggestions || 0,
    timestamp: now,
    userAgent: isBrowser ? navigator.userAgent : undefined,
    path: isBrowser ? window.location.pathname : undefined,
    referrer: isBrowser ? document.referrer : undefined,
    device: isBrowser ? detectDevice() : undefined,
    browser: isBrowser ? detectBrowser() : undefined,
    country: metrics.country,
  };
}

// ----------------------------------------------------
// Device & Browser Detection
// ----------------------------------------------------
function detectDevice(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|iemobile|blackberry|kindle|silk-accelerated|webos|opera mini/i.test(ua)) return 'mobile';
  return 'desktop';
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'chrome';
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
  if (ua.includes('Edge')) return 'edge';
  if (/MSIE|Trident\//.test(ua)) return 'ie';
  return 'other';
}

// ----------------------------------------------------
// Queue & Flush Logic
// ----------------------------------------------------
function enqueueMetrics(metrics: SEOAnalytics) {
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
  const batch = metricsQueue.splice(0, metricsQueue.length);

  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }

  try {
    await sendMetrics(batch);
  } catch (err) {
    console.error('❌ SEO Analytics send failed:', err);
    // Requeue half the batch on failure, max 100
    if (metricsQueue.length < 100) {
      metricsQueue.push(...batch.slice(0, 50));
    }
  } finally {
    isFlushing = false;
  }
}

// ----------------------------------------------------
// Send Metrics (Beacon or Fetch)
/// ----------------------------------------------------
async function sendMetrics(metrics: SEOAnalytics[]): Promise<void> {
  if (!isBrowser || metrics.length === 0) return;

  const payload = JSON.stringify(metrics);

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    if (navigator.sendBeacon(ANALYTICS_CONFIG.endpoint, blob)) return;
  }

  // Fallback
  const res = await fetch(ANALYTICS_CONFIG.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-SEO-Analytics': 'true' },
    body: payload,
    keepalive: true,
    priority: 'low',
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// ----------------------------------------------------
// Analytics Summary
// ----------------------------------------------------
export function getAnalyticsSummary(metrics: SEOAnalytics[]) {
  if (!metrics.length) return { total: 0, avgGenerationTime: 0, avgMetadataSize: 0, cacheHitRate: 0, errorRate: 0, topPages: [] };

  const total = metrics.length;
  const avgGenerationTime = Math.round(metrics.reduce((a, m) => a + m.generationTime, 0) / total);
  const avgMetadataSize = Math.round(metrics.reduce((a, m) => a + m.metadataSize, 0) / total);
  const cacheHitRate = Math.round((metrics.filter(m => m.cacheHit).length / total) * 100);
  const errorRate = Math.round((metrics.filter(m => m.error).length / total) * 100);

  const pageCounts = metrics.reduce<Record<string, number>>((acc, m) => {
    if (m.path) acc[m.path] = (acc[m.path] || 0) + 1;
    return acc;
  }, {});

  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  return { total, avgGenerationTime, avgMetadataSize, cacheHitRate, errorRate, topPages };
}

// ----------------------------------------------------
// Cleanup
// ----------------------------------------------------
export function clearSEOAnalyticsQueue() {
  metricsQueue.length = 0;
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
}

// Auto flush on page unload
if (isBrowser) {
  window.addEventListener('beforeunload', () => {
    if (metricsQueue.length > 0) flushMetricsQueue();
  });
}
