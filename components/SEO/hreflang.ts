// components/SEO/hreflang.ts
import React from "react";
import { 
  SITE_URL, 
  COUNTRY_LANGUAGE_MAP, 
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  getLanguageForCountry,
  getSwissLanguage
} from "@/app/core/i18n/config";

// ===============================
// 🔧 Configuration
// ===============================

// Only include major countries for optimized hreflang (Google recommends ~20-30 per page)
const MAJOR_COUNTRIES = {
  en: ["us", "gb", "ca", "au", "in"], // Major English markets
  fr: ["fr", "be", "ch", "ca"],       // Major French markets
  de: ["de", "at", "ch"],             // Major German markets
} as const;

// ===============================
// 🔨 Helper Functions
// ===============================

function normalizePath(path: string): string {
  if (!path || path === "/" || path === "") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function buildUrl(country: string, path: string = ""): string {
  const normalizedPath = normalizePath(path);
  return `${SITE_URL}/${country.toLowerCase()}${normalizedPath}`;
}

// ===============================
// 🏠 Main Hreflang Functions
// ===============================

/**
 * Get language for a country with Swiss canton support
 */
function getLanguageForHreflang(country: string, canton?: string) {
  if (country.toLowerCase() === "ch") {
    return getSwissLanguage(canton);
  }
  return getLanguageForCountry(country);
}

/**
 * Generate optimized hreflang links (recommended for production)
 */
export function generateHreflangLinks(
  path: string = "",
  currentCountry: string = "us",
  canton?: string
): Array<{ hrefLang: string; href: string; isCurrent?: boolean }> {
  const links: Array<{ hrefLang: string; href: string; isCurrent?: boolean }> = [];

  // 1️⃣ Add major language-country combinations only
  for (const [lang, countries] of Object.entries(MAJOR_COUNTRIES)) {
    for (const country of countries) {
      const hrefLang = `${getLanguageForHreflang(country, canton)}-${country}`;
      const href = buildUrl(country, path);
      links.push({
        hrefLang,
        href,
        isCurrent: country === currentCountry,
      });
    }
  }

  // 2️⃣ Add language-only fallbacks
  links.push(
    { hrefLang: "en", href: buildUrl("us", path) },
    { hrefLang: "fr", href: buildUrl("fr", path) },
    { hrefLang: "de", href: buildUrl("de", path) }
  );

  // 3️⃣ Add x-default
  links.push({
    hrefLang: "x-default",
    href: buildUrl("us", path),
  });

  return links;
}

/**
 * Generate hreflang metadata for Next.js Metadata API
 */
export function generateHreflangMetadata(
  path: string = "",
  currentCountry: string = "us",
  canton?: string
): Record<string, string> {
  const metadata: Record<string, string> = {};
  
  generateHreflangLinks(path, currentCountry, canton).forEach(({ hrefLang, href }) => {
    metadata[hrefLang] = href;
  });
  
  return metadata;
}

/**
 * Generate hreflang tags as JSX elements
 */
export function generateHreflangTags(
  path: string = "",
  currentCountry: string = "us",
  canton?: string
): JSX.Element[] {
  return generateHreflangLinks(path, currentCountry, canton).map(({ hrefLang, href, isCurrent }) => (
    <link 
      key={hrefLang} 
      rel="alternate" 
      hrefLang={hrefLang} 
      href={href} 
      data-current={isCurrent ? "true" : undefined}
    />
  ));
}

// ===============================
// 🎯 Specialized Functions
// ===============================

/**
 * Generate complete hreflang (all countries - for sitemaps)
 */
export function generateCompleteHreflang(path: string = ""): Record<string, string> {
  const complete: Record<string, string> = {};

  // All language-country combinations
  Object.entries(COUNTRY_LANGUAGE_MAP).forEach(([country, lang]) => {
    complete[`${lang}-${country}`] = buildUrl(country, path);
  });

  // Language fallbacks
  SUPPORTED_LANGUAGES.forEach(lang => {
    const defaultCountry = Object.entries(COUNTRY_LANGUAGE_MAP)
      .find(([_, l]) => l === lang)?.[0] || "us";
    complete[lang] = buildUrl(defaultCountry, path);
  });

  // x-default
  complete["x-default"] = buildUrl("us", path);

  return complete;
}

/**
 * Generate minimal hreflang (one per language + x-default)
 */
export function generateMinimalHreflang(path: string = ""): Record<string, string> {
  return {
    "en": buildUrl("us", path),
    "fr": buildUrl("fr", path),
    "de": buildUrl("de", path),
    "x-default": buildUrl("us", path),
  };
}

/**
 * Generate hreflang for a specific country
 */
export function generateCountryHreflang(
  path: string = "",
  country: string,
  canton?: string
): Record<string, string> {
  const lang = getLanguageForHreflang(country, canton);
  return {
    [`${lang}-${country}`]: buildUrl(country, path),
    [lang]: buildUrl(country, path),
    "x-default": buildUrl("us", path),
  };
}

// ===============================
// 📱 React Component
// ===============================

interface HreflangProps {
  path?: string;
  country?: string;
  variant?: "optimized" | "minimal" | "complete";
  canton?: string;
}

export function Hreflang({ 
  path = "", 
  country = "us",
  variant = "optimized",
  canton
}: HreflangProps) {
  let hreflangMetadata: Record<string, string>;

  switch (variant) {
    case "minimal":
      hreflangMetadata = generateMinimalHreflang(path);
      break;
    case "complete":
      hreflangMetadata = generateCompleteHreflang(path);
      break;
    case "optimized":
    default:
      hreflangMetadata = generateHreflangMetadata(path, country, canton);
  }

  return (
    <>
      {Object.entries(hreflangMetadata).map(([hrefLang, href]) => (
        <link 
          key={hrefLang} 
          rel="alternate" 
          hrefLang={hrefLang} 
          href={href} 
        />
      ))}
    </>
  );
}

// ===============================
// 🧪 Utility Functions
// ===============================

export function isValidHreflang(hreflang: string): boolean {
  if (hreflang === "x-default") return true;
  const [lang, country] = hreflang.split("-");
  if (!lang || !country) return false;
  return SUPPORTED_LANGUAGES.includes(lang as any);
}

export function getLanguageFromHreflang(hreflang: string): string | null {
  if (hreflang === "x-default") return null;
  return hreflang.split("-")[0] || null;
}

export function getCountryFromHreflang(hreflang: string): string | null {
  if (hreflang === "x-default") return null;
  const parts = hreflang.split("-");
  return parts.length === 2 ? parts[1] : null;
}

export function getCurrentHreflang(country: string, canton?: string): string {
  const lang = getLanguageForHreflang(country, canton);
  return `${lang}-${country}`;
}

export function getHreflangStats(): Record<string, number> {
  return {
    optimized: Object.values(MAJOR_COUNTRIES).flat().length + 4,
    minimal: 4,
    complete: Object.keys(COUNTRY_LANGUAGE_MAP).length + SUPPORTED_LANGUAGES.length + 1,
  };
}
