import { SEO_CONFIG } from './seoConfig';

export interface HreflangOptions {
  includeDefault?: boolean;
  includeXDefault?: boolean;
  locales?: string[];
  baseUrl?: string;
  removeTrailingSlash?: boolean;
  addLanguagePrefix?: boolean;
  countrySpecific?: boolean;
  fallbackLocale?: string;
  allowQuery?: boolean;
  trailingSlash?: boolean;
  preferHttps?: boolean;
}

export interface HreflangValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface HreflangEntry {
  locale: string;
  url: string;
  isDefault: boolean;
  isXDefault: boolean;
  country?: string;
  language: string;
}

export function buildHreflang(route: string, options: HreflangOptions = {}): Record<string, string> {
  const { includeDefault = true, includeXDefault = true, locales = SEO_CONFIG.supportedLocales, baseUrl = SEO_CONFIG.siteUrl, removeTrailingSlash = true, addLanguagePrefix = true, countrySpecific = false, fallbackLocale = SEO_CONFIG.defaultLocale, allowQuery = false, trailingSlash = true, preferHttps = true } = options;

  if (!route) return {};
  const hreflang: Record<string, string> = {};
  let cleanRoute = route.split('#')[0];
  if (!allowQuery) cleanRoute = cleanRoute.split('?')[0];
  if (removeTrailingSlash && cleanRoute.endsWith('/') && cleanRoute !== '/') cleanRoute = cleanRoute.slice(0, -1);

  for (const locale of [...new Set(locales)]) {
    hreflang[locale] = buildLocaleUrl(locale, cleanRoute, { baseUrl, addLanguagePrefix, includeDefault, defaultLocale: SEO_CONFIG.defaultLocale, countrySpecific, trailingSlash, preferHttps });
  }

  if (includeXDefault) hreflang['x-default'] = buildXDefaultUrl(cleanRoute, { baseUrl, addLanguagePrefix, defaultLocale: SEO_CONFIG.defaultLocale, fallbackLocale, trailingSlash, preferHttps });

  return hreflang;
}

function buildLocaleUrl(locale: string, route: string, options: { baseUrl: string; addLanguagePrefix: boolean; includeDefault: boolean; defaultLocale: string; countrySpecific: boolean; trailingSlash: boolean; preferHttps: boolean; }): string {
  const { baseUrl, addLanguagePrefix, includeDefault, defaultLocale, countrySpecific, trailingSlash, preferHttps } = options;
  let url = addLanguagePrefix ? `${baseUrl}${locale !== defaultLocale || includeDefault ? `/${locale}${route === '/' ? '' : route}` : route}` : `${baseUrl}${route}`;
  return trailingSlash ? ensureTrailingSlash(url) : url;
}

function buildXDefaultUrl(route: string, options: { baseUrl: string; addLanguagePrefix: boolean; defaultLocale: string; fallbackLocale: string; trailingSlash: boolean; preferHttps: boolean }): string {
  const { baseUrl, addLanguagePrefix, trailingSlash } = options;
  const url = addLanguagePrefix ? `${baseUrl}${route === '/' ? '' : route}` : `${baseUrl}${route}`;
  return trailingSlash ? ensureTrailingSlash(url) : url;
}

function ensureTrailingSlash(url: string): string { return url.endsWith('/') ? url : `${url}/`; }
