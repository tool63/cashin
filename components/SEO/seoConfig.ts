// components/SEO/seoConfig.ts
import { SupportedLanguage } from "@/app/core/detector";
import { baseUrl } from "@/app/config/baseUrl"; // adjust if needed
import { getSupportedLocales } from "@/app/core/i18n/config";

interface SEOConfigProps {
  title?: string;
  description?: string;
  country?: string;
  path?: string;
  language?: SupportedLanguage;
}

export function generateSEO({ title, description, country = "us", path = "/", language = "en" }: SEOConfigProps) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}/${country}${cleanPath}`;

  // Generate hreflang tags
  const hreflangTags = getSupportedLocales()
    .map((locale) => {
      const [lang, loc] = locale.split("-");
      return `<link rel="alternate" href="${baseUrl}/${country}${cleanPath}" hreflang="${locale}" />`;
    })
    .join("\n");

  // Return all tags as strings
  const tags = [];

  if (title) tags.push(`<title>${title}</title>`);
  if (description) tags.push(`<meta name="description" content="${description}" />`);

  // Canonical
  tags.push(`<link rel="canonical" href="${canonicalUrl}" />`);

  // Hreflang
  tags.push(hreflangTags);

  return tags.join("\n");
}
