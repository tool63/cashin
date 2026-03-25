export function trackSEO(url: string) {
  if (typeof window === "undefined") return;

  // Future integrations
  console.log("SEO Tracking:", url);

  // Example:
  // window.gtag?.("config", "GA_ID", { page_path: url });
}
