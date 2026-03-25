export type PageType =
  | "homepage"
  | "earn"
  | "guide"
  | "blog"
  | "comparison"
  | "tool"
  | "category"
  | "legal";

export interface SeoInput {
  title?: string;
  description?: string;
  keywords?: string[];
  path: string;
  type: PageType;
  country?: string;
  noindex?: boolean;
}
