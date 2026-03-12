"use client"; // only run on client-side

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
  device?: "mobile" | "tablet" | "desktop";
  browser?: string;
}

const ANALYTICS_CONFIG = {
  endpoint: "/api/analytics/seo",
  batchSize: 25,
  flushInterval: 5000,
  sampleRate: 0.1, // track 10% of requests
  debug: false,
};

const metricsQueue: SEOAnalytics[] = [];
let flushTimeout: ReturnType<typeof setTimeout> | null = null;
let isFlushing = false;

function detectDevice(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk|(android(?!.*mobi))/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|iemobile|blackberry|kindle|silk-accelerated|webos|opera mini/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "chrome";
  if (ua.includes("Firefox")) return "firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "safari";
  if (ua.includes("Edge")) return "edge";
  if (/MSIE|Trident\//.test(ua)) return "ie";
  return "other";
}

export function trackSEOGeneration(metrics: Partial<SEOAnalytics>): SEOAnalytics {
  if (Math.random() > ANALYTICS_CONFIG.sampleRate) {
    return generateMetrics(metrics);
  }
  const fullMetrics = generateMetrics(metrics);

  // Queue metrics
  metricsQueue.push(fullMetrics);

  if (metricsQueue.length >= ANALYTICS_CONFIG.batchSize) {
    flushMetricsQueue();
  } else if (!flushTimeout) {
    flushTimeout = setTimeout(flushMetricsQueue, ANALYTICS_CONFIG.flushInterval);
  }

  return fullMetrics;
}

function generateMetrics(metrics: Partial<SEOAnalytics>): SEOAnalytics {
  return {
    pageType: metrics.pageType || "unknown",
    generationTime: metrics.generationTime || 0,
    metadataSize: metrics.metadataSize || 0,
    schemaCount: metrics.schemaCount || 0,
    cacheHit: metrics.cacheHit || false,
    error: metrics.error || false,
    warnings: metrics.warnings || 0,
    suggestions: metrics.suggestions || 0,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    path: window.location.pathname,
    referrer: document.referrer,
    device: detectDevice(),
    browser: detectBrowser(),
    country: metrics.country,
  };
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
    await fetch(ANALYTICS_CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(batch),
      keepalive: true,
    });
  } catch (err) {
    console.error("❌ SEO Analytics send failed:", err);
    // Requeue half on failure
    if (metricsQueue.length < 100) {
      metricsQueue.push(...batch.slice(0, 50));
    }
  } finally {
    isFlushing = false;
  }
}
