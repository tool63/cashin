interface SeoMetrics {
  page: string;                  // Full page path, e.g., "/us/how-it-works"
  country?: string;              // Optional ISO country code
  language?: string;             // Optional language code, e.g., "en"
  generationTime: number;        // Page generation/render time in ms
  pageType?: string;             // Optional page type for analytics (homepage, article, product, etc.)
}

/**
 * Log SEO-related metrics for development or production monitoring
 */
export function logSeoMetrics({
  page,
  country,
  language,
  generationTime,
  pageType,
}: SeoMetrics) {
  const metrics = {
    page,
    country: country ?? "unknown",
    language: language ?? "unknown",
    pageType: pageType ?? "generic",
    generationTime: `${generationTime}ms`,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[SEO Metrics]", metrics);
  }

  // Optional: send metrics to a monitoring service in production
  // Example: send to LogRocket, Sentry, or custom API
  // if (process.env.NODE_ENV === "production") {
  //   fetch("/api/seo-metrics", {
  //     method: "POST",
  //     body: JSON.stringify(metrics),
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }
}
