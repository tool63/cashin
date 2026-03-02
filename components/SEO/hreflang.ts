import { SEO_CONFIG } from './seoConfig';

export interface HreflangOptions {
  includeDefault?: boolean;
  includeXDefault?: boolean;
  locales?: string[];
  baseUrl?: string;
  removeTrailingSlash?: boolean;
  addLanguagePrefix?: boolean;
}

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
  } = options;

  const hreflang: Record<string, string> = {};
  
  // Clean route
  let cleanRoute = route.split('?')[0].split('#')[0];
  
  // Remove trailing slash if needed
  if (removeTrailingSlash && cleanRoute.endsWith('/') && cleanRoute !== '/') {
    cleanRoute = cleanRoute.slice(0, -1);
  }

  // Generate URLs for each locale
  locales.forEach(locale => {
    let url: string;
    
    if (addLanguagePrefix) {
      // Add language prefix to route
      const prefixedRoute = locale === SEO_CONFIG.defaultLocale && !includeDefault
        ? cleanRoute
        : `/${locale}${cleanRoute === '/' ? '' : cleanRoute}`;
      url = `${baseUrl}${prefixedRoute}`;
    } else {
      // Use subdomain or domain per language
      url = locale === SEO_CONFIG.defaultLocale && !includeDefault
        ? `${baseUrl}${cleanRoute}`
        : `https://${locale}.${baseUrl.replace('https://', '')}${cleanRoute}`;
    }
    
    // Remove double slashes
    url = url.replace(/([^:]\/)\/+/g, '$1');
    
    hreflang[locale] = url;
  });

  // Add x-default (usually English)
  if (includeXDefault) {
    const defaultUrl = addLanguagePrefix
      ? `${baseUrl}${cleanRoute === '/' ? '' : cleanRoute}`
      : `${baseUrl}${cleanRoute}`;
    hreflang['x-default'] = defaultUrl;
  }

  return hreflang;
}

export function generateHreflangLinks(
  route: string,
  options?: HreflangOptions
): Array<{ rel: string; href: string; hreflang: string }> {
  const hreflangMap = buildHreflang(route, options);
  
  return Object.entries(hreflangMap).map(([lang, href]) => ({
    rel: 'alternate',
    href,
    hreflang: lang,
  }));
}

export function validateHreflang(hreflang: Record<string, string>): boolean {
  // Check if there's a return link for each language
  const urls = Object.values(hreflang);
  const uniqueUrls = new Set(urls);
  
  // All URLs should be unique
  if (urls.length !== uniqueUrls.size) {
    console.warn('Hreflang: Duplicate URLs detected');
    return false;
  }
  
  // Check for x-default
  if (!hreflang['x-default']) {
    console.warn('Hreflang: Missing x-default');
    return false;
  }
  
  return true;
}
