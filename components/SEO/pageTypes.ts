// components/SEO/pageTypes.ts

export type PageType =
  | "home"
  | "earn"
  | "guides"
  | "rewards"
  | "cashback"
  | "affiliate"
  | "blog"
  | "static"
  | "unknown";

export function detectPageType(route: string): PageType {
  if (!route || route === "/") {
    return "home";
  }

  if (route.startsWith("/earn")) {
    return "earn";
  }

  if (route.startsWith("/guides")) {
    return "guides";
  }

  if (route.startsWith("/rewards")) {
    return "rewards";
  }

  if (route.startsWith("/cashback")) {
    return "cashback";
  }

  if (route.startsWith("/affiliate")) {
    return "affiliate";
  }

  if (route.startsWith("/blog")) {
    return "blog";
  }

  if (
    route.startsWith("/about") ||
    route.startsWith("/contact") ||
    route.startsWith("/terms") ||
    route.startsWith("/privacy") ||
    route.startsWith("/help") ||
    route.startsWith("/faq")
  ) {
    return "static";
  }

  return "unknown";
}
