// components/SEO/pageTypes.ts

export type PageType =
  | "homepage"
  | "article"
  | "product"
  | "landing"
  | "generic"

export interface PageTypeInfo {
  type: PageType
  priority: number
}

export function detectPageType(path: string): PageTypeInfo {

  if (path === "/") {
    return { type: "homepage", priority: 1 }
  }

  if (path.startsWith("/blog")) {
    return { type: "article", priority: 0.8 }
  }

  if (path.startsWith("/product")) {
    return { type: "product", priority: 0.7 }
  }

  return { type: "generic", priority: 0.6 }
}
