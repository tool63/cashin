import { SEO_CONFIG } from './seoConfig';

/**
 * Options for building hreflang mappings
 */
export interface HreflangOptions {
  includeDefault?: boolean;
  includeXDefault?: boolean;
  locales?: string[];
  baseUrl?: string;
  removeTrailingSlash?: boolean;
  addLanguagePrefix?: boolean;
  countrySpecific?: boolean;
  fallbackLocale?: string;
}

/**
 * Validation result structure
 */
export interface HreflangValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Parsed hreflang entry
 */
export interface HreflangEntry {
  locale: string;
  url: string;
  isDefault: boolean;
  isXDefault: boolean;
  country?: string;
  language: string;
}

/**
 * Builds hreflang mapping for SEO internationalization
 */
export function buildHreflang(
  route: string,
  options: HreflangOptions = {}
): Record<string, string> {
  const {
    includeDefault = true,
    includeXDefault = true,
    locales = SEO_CONFIG.supportedLocales,
    baseUrl = SEO_CONFIG.siteUrl,
    removeTrailingSlash = true,
    addLanguagePrefix = true,
    countrySpecific = false,
    fallbackLocale = SEO_CONFIG.defaultLocale,
  } = options;

  if (!route) {
    console.warn('[SEO Hreflang] Empty route');
    return {};
  }

  const hreflang: Record<string, string> = {};
  let cleanRoute = route.split('?')[0].split('#')[0];

  if (removeTrailingSlash && cleanRoute.endsWith('/') && cleanRoute !== '/') {
    cleanRoute = cleanRoute.slice(0, -1);
  }

  const uniqueLocales = [...new Set(locales)];

  for (const locale of uniqueLocales) {
    try {
      hreflang[locale] = buildLocaleUrl(locale, cleanRoute, {
        baseUrl,
        addLanguagePrefix,
        includeDefault,
        defaultLocale: SEO_CONFIG.defaultLocale,
        countrySpecific,
      });
    } catch (err) {
      console.error(`[SEO Hreflang] Locale error: ${locale}`, err);
    }
  }

  if (includeXDefault) {
    try {
      hreflang['x-default'] = buildXDefaultUrl(cleanRoute, {
        baseUrl,
        addLanguagePrefix,
        defaultLocale: SEO_CONFIG.defaultLocale,
        fallbackLocale,
      });
    } catch (err) {
      console.error('[SEO Hreflang] x-default error', err);
    }
  }

  const validation = validateHreflang(hreflang);
  if (!validation.valid) {
    console.warn('[SEO Hreflang] validation warnings', validation.warnings);
  }

  return hreflang;
}

/**
 * Builds URL for locale (path or subdomain strategy)
 */
function buildLocaleUrl(
  locale: string,
  cleanRoute: string,
  options: {
    baseUrl: string;
    addLanguagePrefix: boolean;
    includeDefault: boolean;
    defaultLocale: string;
    countrySpecific: boolean;
  }
): string {
  const { baseUrl, addLanguagePrefix, includeDefault, defaultLocale, countrySpecific } = options;

  let url: string;

  if (addLanguagePrefix) {
    const shouldPrefix = locale !== defaultLocale || includeDefault;
    const path = shouldPrefix ? `/${locale}${cleanRoute === '/' ? '' : cleanRoute}` : cleanRoute;
    url = `${baseUrl}${path}`;
  } else {
    const domain = baseUrl.replace(/^https?:\/\//, '');

    if (locale === defaultLocale && !includeDefault) {
      url = `${baseUrl}${cleanRoute}`;
    } else {
      const subdomain = countrySpecific && locale.includes('-')
        ? locale.replace('-', '.') // en-us → en.us
        : locale;

      url = `https://${subdomain}.${domain}${cleanRoute}`;
    }
  }

  return normalizeUrl(url);
}

/**
 * Builds x-default URL
 */
function buildXDefaultUrl(
  cleanRoute: string,
  options: {
    baseUrl: string;
    addLanguagePrefix: boolean;
    defaultLocale: string;
    fallbackLocale: string;
  }
): string {
  const { baseUrl, addLanguagePrefix } = options;

  const url = addLanguagePrefix
    ? `${baseUrl}${cleanRoute === '/' ? '' : cleanRoute}`
    : `${baseUrl}${cleanRoute}`;

  return normalizeUrl(url);
}

/**
 * Normalizes URL (removes double slashes)
 */
function normalizeUrl(url: string): string {
  return url.replace(/([^:]\/)\/+/g, '$1');
}

/**
 * Validates hreflang structure
 */
export function validateHreflang(
  hreflang: Record<string, string>
): HreflangValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!hreflang || typeof hreflang !== 'object') {
    errors.push('Hreflang invalid structure');
    return { valid: false, errors, warnings };
  }

  if (Object.keys(hreflang).length === 0) {
    warnings.push('Hreflang empty map');
    return { valid: true, errors, warnings };
  }

  const urls = Object.values(hreflang);
  const uniqueUrls = new Set(urls);

  if (urls.length !== uniqueUrls.size) {
    errors.push('Duplicate hreflang URLs');
  }

  if (!hreflang['x-default']) {
    warnings.push('Missing x-default (recommended)');
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Generates <link rel="alternate"> tags
 */
export function generateHreflangLinks(
  route: string,
  options?: HreflangOptions
): Array<{ rel: string; href: string; hreflang: string }> {
  return Object.entries(buildHreflang(route, options)).map(([lang, href]) => ({
    rel: 'alternate',
    href,
    hreflang: lang,
  }));
}

/**
 * Parses hreflang entries into structured format
 */
export function parseHreflangEntries(
  hreflang: Record<string, string>
): HreflangEntry[] {
  return Object.entries(hreflang).map(([locale, url]) => {
    const isXDefault = locale === 'x-default';
    const language = isXDefault ? 'x-default' : locale.split('-')[0];
    const country = !isXDefault && locale.includes('-') ? locale.split('-')[1] : undefined;

    return {
      locale,
      url,
      isDefault: locale === SEO_CONFIG.defaultLocale,
      isXDefault,
      language,
      country,
    };
  });
}

/**
 * Checks required languages exist
 */
export function hasRequiredLanguages(
  hreflang: Record<string, string>,
  requiredLocales: string[] = SEO_CONFIG.supportedLocales
): boolean {
  const present = new Set(Object.keys(hreflang).filter(l => l !== 'x-default'));
  return requiredLocales.every(locale => present.has(locale));
}

/**
 * Helpers
 */
export function getLanguageFromLocale(locale: string): string {
  return locale.split('-')[0];
}

export function getCountryFromLocale(locale: string): string | undefined {
  return locale.includes('-') ? locale.split('-')[1] : undefined;
}
