// components/SEO/canonical.ts
import React from "react";
import { SITE_URL } from "@/app/core/i18n/config";

// ===============================
:// 🔧 Types & Configuration
// ===============================

export interface CanonicalOptions {
  /** Whether to include trailing slash (default: false) */
  trailingSlash?: boolean;
  /** Whether to include query parameters (default: false) */
  includeQueryParams?: boolean;
  /** Whether to lowercase country code (default: true) */
  lowercase?: boolean;
  /** Remove index.php, .html extensions etc. */
  cleanUrls?: boolean;
}

export interface CanonicalProps {
  /** Page path (e.g., "/offers", "/blog/post-1") */
  path?: string;
  /** Country code (e.g., "us", "gb", "fr") */
  country?: string;
  /** URL search parameters */
  searchParams?: URLSearchParams | Record<string, string>;
  /** Canonical options */
  options?: CanonicalOptions;
  /** For paginated pages (page number) */
  page?: number;
}

const DEFAULT_OPTIONS: Required<CanonicalOptions> = {
  trailingSlash: false,
  includeQueryParams: false,
  lowercase: true,
  cleanUrls: true,
};

// ===============================
:// 🔨 Helper Functions
// ===============================

/**
 * Validate country code format (2 letters)
 */
export function isValidCountryCode(country: string): boolean {
  return /^[a-z]{2}$/i.test(country);
}

/**
 * Clean URL by removing common CMS artifacts
 */
export function cleanUrlPath(path: string): string {
  return path
    .replace(/\/index\.(html?|php|asp)$/, '') // Remove index files
    .replace(/\.(html?|php|asp)$/, '')        // Remove extensions
    .replace(/\/+$/, '')                       // Remove trailing slashes
    || '/';                                     // Return '/' if empty
}

/**
 * Normalize path with options
 */
export function normalizePath(path: string, options: Required<CanonicalOptions>): string {
  if (!path || path === "/" || path === "") return "";
  
  let normalized = path.startsWith("/") ? path : `/${path}`;
  
  // Clean URLs if enabled
  if (options.cleanUrls) {
    normalized = cleanUrlPath(normalized);
  }
  
  // Handle trailing slash
  if (options.trailingSlash) {
    if (!normalized.endsWith("/") && normalized !== "/") {
      normalized += "/";
    }
  } else {
    if (normalized.endsWith("/") && normalized !== "/") {
      normalized = normalized.slice(0, -1);
    }
  }
  
  return normalized;
}

/**
 * Convert search params to string
 */
export function searchParamsToString(
  params?: URLSearchParams | Record<string, string>
): string {
  if (!params) return "";
  
  if (params instanceof URLSearchParams) {
    return params.toString();
  }
  
  return new URLSearchParams(params).toString();
}

/**
 * Build complete canonical URL
 */
export function buildCanonicalUrl(
  country: string,
  path: string = "",
  searchParams?: URLSearchParams | Record<string, string>,
  options: Partial<CanonicalOptions> = {}
): string {
  // Merge options with defaults
  const mergedOptions: Required<CanonicalOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  
  // Validate and format country
  const validCountry = isValidCountryCode(country) ? country : "us";
  const countrySlug = mergedOptions.lowercase 
    ? validCountry.toLowerCase() 
    : validCountry;
  
  // Normalize path
  const normalizedPath = normalizePath(path, mergedOptions);
  
  // Build base URL
  let url = `${SITE_URL}/${countrySlug}${normalizedPath}`;
  
  // Add query params if specified (rare for canonical)
  if (mergedOptions.includeQueryParams && searchParams) {
    const paramsString = searchParamsToString(searchParams);
    if (paramsString) {
      url += `?${paramsString}`;
    }
  }
  
  return url;
}

// ===============================
:// 📄 Main Canonical Functions
// ===============================

/**
 * Generate canonical URL string
 * @example generateCanonicalUrl("/offers", "us")
 * @example generateCanonicalUrl("/blog/post", "gb", { utm: "campaign" }, { cleanUrls: true })
 */
export function generateCanonicalUrl(
  path: string = "",
  country: string = "us",
  searchParams?: URLSearchParams | Record<string, string>,
  options?: CanonicalOptions
): string {
  return buildCanonicalUrl(country, path, searchParams, options);
}

/**
 * Generate canonical for paginated pages
 * @example generateCanonicalForPage("/blog", 2, "us") // /blog/page/2
 * @example generateCanonicalForPage("/blog", 1, "us") // /blog (page 1 has no /page/1)
 */
export function generateCanonicalForPage(
  basePath: string,
  page: number,
  country: string = "us",
  options?: CanonicalOptions
): string {
  // Page 1 should not have /page/1 in URL
  if (page <= 1) {
    return generateCanonicalUrl(basePath, country, undefined, options);
  }
  
  // Handle trailing slash consistency
  const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  return generateCanonicalUrl(`${cleanBase}/page/${page}`, country, undefined, options);
}

/**
 * Generate canonical for homepage
 */
export function generateHomepageCanonical(
  country: string = "us",
  options?: CanonicalOptions
): string {
  return generateCanonicalUrl("/", country, undefined, options);
}

/**
 * Generate canonical with language alternative (for multilingual pages)
 */
export function generateLanguageAlternateCanonical(
  path: string,
  country: string,
  language: string,
  options?: CanonicalOptions
): string {
  const url = generateCanonicalUrl(path, country, undefined, options);
  // Add language parameter if needed for language-specific canonical
  return `${url}?lang=${language}`;
}

// ===============================
:// 📱 React Component
// ===============================

/**
 * React component for adding canonical link to Head
 * @example <Canonical path="/offers" country="us" />
 * @example <Canonical path="/blog" country="gb" page={2} />
 */
export function Canonical({ 
  path = "", 
  country = "us",
  searchParams,
  options,
  page
}: CanonicalProps) {
  // Handle pagination
  let finalPath = path;
  if (page !== undefined) {
    finalPath = page <= 1 ? path : `${path}/page/${page}`;
  }
  
  const href = buildCanonicalUrl(country, finalPath, searchParams, options);

  return <link rel="canonical" href={href} />;
}

/**
 * React component for canonical with automatic path detection
 * @example <AutoCanonical country="us" />
 */
export function AutoCanonical({ 
  country = "us",
  options 
}: { country?: string; options?: CanonicalOptions }) {
  // This should be used with a router to get current path
  // This is a placeholder - implement with your router
  return <Canonical path={typeof window !== 'undefined' ? window.location.pathname : ''} country={country} options={options} />;
}

// ===============================
:// 🎯 Metadata Generation
// ===============================

/**
 * Generate canonical URL metadata for Next.js Metadata API
 * @example generateCanonicalMetadata("/offers", "us")
 */
export function generateCanonicalMetadata(
  path: string = "",
  country: string = "us",
  searchParams?: URLSearchParams | Record<string, string>,
  options?: CanonicalOptions
): { canonical: string } {
  return { 
    canonical: buildCanonicalUrl(country, path, searchParams, options)
  };
}

/**
 * Generate complete alternates object for Next.js Metadata API
 * Includes canonical and hreflang
 */
export function generateAlternatesMetadata(
  path: string = "",
  country: string = "us",
  languages?: Record<string, string>,
  options?: CanonicalOptions
): { 
  canonical: string;
  languages?: Record<string, string>;
} {
  const metadata: { 
    canonical: string;
    languages?: Record<string, string>;
  } = {
    canonical: buildCanonicalUrl(country, path, undefined, options),
  };
  
  if (languages) {
    metadata.languages = languages;
  }
  
  return metadata;
}

// ===============================
:// 🧪 Utility Functions
// ===============================

/**
 * Check if a URL is canonical (basic check)
 */
export function isCanonical(url: string, path: string, country: string): boolean {
  const canonicalUrl = generateCanonicalUrl(path, country);
  return url === canonicalUrl || url === `${canonicalUrl}/`;
}

/**
 * Extract country from canonical URL
 * @example extractCountryFromCanonical("https://cashog.com/us/offers") // "us"
 */
export function extractCountryFromCanonical(url: string): string | null {
  const match = url.match(/https?:\/\/[^\/]+\/([a-z]{2})(\/|$)/);
  return match ? match[1] : null;
}

/**
 * Extract path from canonical URL
 * @example extractPathFromCanonical("https://cashog.com/us/offers/deals") // "/offers/deals"
 */
export function extractPathFromCanonical(url: string): string {
  const match = url.match(/https?:\/\/[^\/]+\/[a-z]{2}(\/.*)?$/);
  const path = match && match[1] ? match[1] : "/";
  return path || "/";
}

/**
 * Get all possible canonical URLs for a path across all countries
 * Useful for debugging and sitemaps
 */
export function getAllCountryCanonicals(
  path: string = "",
  countries: string[] = ["us", "gb", "ca", "au", "fr", "de"]
): Record<string, string> {
  const canonicals: Record<string, string> = {};
  
  for (const country of countries) {
    canonicals[country] = generateCanonicalUrl(path, country);
  }
  
  return canonicals;
}

/**
 * Validate if a canonical URL matches SEO best practices
 */
export function validateCanonical(url: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check if URL has protocol
  if (!url.startsWith('https://')) {
    issues.push('Canonical URL should use HTTPS');
  }
  
  // Check for uppercase in path
  if (/[A-Z]/.test(url)) {
    issues.push('Canonical URL should be lowercase');
  }
  
  // Check for multiple slashes
  if (url.includes('//') && !url.startsWith('https://')) {
    issues.push('Canonical URL has multiple consecutive slashes');
  }
  
  // Check for query parameters (usually not recommended)
  if (url.includes('?')) {
    issues.push('Canonical URL should typically not include query parameters');
  }
  
  return {
    valid: issues.length === 0,
    issues,
  };
}

// ===============================
:// 📊 Constants
// ===============================

export const CANONICAL_CONSTANTS = {
  DEFAULT_COUNTRY: "us",
  VALID_PROTOCOLS: ["https://", "http://"] as const,
  MAX_LENGTH: 2083, // Maximum URL length
} as const;
