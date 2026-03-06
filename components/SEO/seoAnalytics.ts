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
  sampleRate?: number; // 0-1, percentage of requests to track
}

const ANALYTICS_CONFIG: SEOAnalyticsConfig = {
  endpoint: '/api/analytics/seo',
  batchSize: 25,
  flushInterval: 5000,
  sampleRate: 0.1, // Track 10% of requests in production
};

// Queue for batch processing
const metricsQueue: SEOAnalytics[] = [];
let flushTimeout: NodeJS.Timeout | null = null;
let isFlushing = false;

export function trackSEOGeneration(metrics: Partial<SEOAnalytics>): SEOAnalytics {
  // Sample tracking in production
  if (process.env.NODE_ENV === 'production') {
    if (Math.random() > (ANALYTICS_CONFIG.sampleRate || 1)) {
      return {
        pageType: metrics.pageType || 'unknown',
        generationTime: metrics.generationTime || 0,
        metadataSize: metrics.metadataSize || 0,
        schemaCount: metrics.schemaCount || 0,
        cacheHit: metrics.cacheHit || false,
        error: metrics.error || false,
        warnings: metrics.warnings || 0,
        suggestions: metrics.suggestions || 0,
        timestamp: Date.now(),
      };
    }
  }

  // Detect device and browser
  const device = detectDevice();
  const browser = detectBrowser();

  const fullMetrics: SEOAnalytics = {
    pageType: metrics.pageType || 'unknown',
    generationTime: metrics.generationTime || 0,
    metadataSize: metrics.metadataSize || 0,
    schemaCount: metrics.schemaCount || 0,
    cacheHit: metrics.cacheHit || false,
    error: metrics.error || false,
    warnings: metrics.warnings || 0,
    suggestions: metrics.suggestions || 0,
    timestamp: Date.now(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    device,
    browser,
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

function detectDevice(): 'mobile' | 'tablet' | 'desktop' | undefined {
  if (typeof navigator === 'undefined') return undefined;
  
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function detectBrowser(): string | undefined {
  if (typeof navigator === 'undefined') return undefined;
  
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'chrome';
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Safari')) return 'safari';
  if (ua.includes('Edge')) return 'edge';
  if (ua.includes('MSIE') || ua.includes('Trident/')) return 'ie';
  return 'other';
}

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
  
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }

  try {
    await sendMetrics(metrics);
  } catch (error) {
    console.error('❌ SEO Analytics send failed:', error);
    // Requeue on failure with limit
    if (metricsQueue.length < 100) {
      metricsQueue.push(...metrics.slice(0, 50));
    }
  } finally {
    isFlushing = false;
  }
}

async function sendMetrics(metrics: SEOAnalytics[]): Promise<void> {
  if (typeof navigator === 'undefined') return;

  const payload = JSON.stringify(metrics);

  // Use Beacon API for best reliability (page unload)
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    const sent = navigator.sendBeacon(ANALYTICS_CONFIG.endpoint, blob);
    if (sent) return;
  }

  // Fallback to fetch with keepalive
  try {
    const response = await fetch(ANALYTICS_CONFIG.endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-SEO-Analytics': 'true',
      },
      body: payload,
      keepalive: true,
      priority: 'low',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    console.error('❌ SEO analytics fetch failed:', error);
    throw error;
  }
}

// ============================================================
// Analytics Dashboard Data
// ============================================================
export function getAnalyticsSummary(metrics: SEOAnalytics[]) {
  if (metrics.length === 0) {
    return {
      total: 0,
      avgGenerationTime: 0,
      avgMetadataSize: 0,
      cacheHitRate: 0,
      errorRate: 0,
      topPages: [],
    };
  }

  const total = metrics.length;
  const avgGenerationTime = metrics.reduce((acc, m) => acc + m.generationTime, 0) / total;
  const avgMetadataSize = metrics.reduce((acc, m) => acc + m.metadataSize, 0) / total;
  const cacheHits = metrics.filter(m => m.cacheHit).length;
  const errors = metrics.filter(m => m.error).length;
  
  // Top pages by frequency
  const pageCounts = metrics.reduce((acc, m) => {
    if (m.path) {
      acc[m.path] = (acc[m.path] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  return {
    total,
    avgGenerationTime: Math.round(avgGenerationTime),
    avgMetadataSize: Math.round(avgMetadataSize),
    cacheHitRate: Math.round((cacheHits / total) * 100),
    errorRate: Math.round((errors / total) * 100),
    topPages,
  };
}

// ============================================================
// Cleanup
// ============================================================
export function clearSEOAnalyticsQueue() {
  metricsQueue.length = 0;

  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
}

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (metricsQueue.length > 0) {
      flushMetricsQueue();
    }
  });
}
