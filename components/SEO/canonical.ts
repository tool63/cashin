import { SEO_CONFIG } from './seoConfig';

/**
 * Options for building canonical URLs
 */
export interface CanonicalOptions {
  includeQuery?: boolean;
  trailingSlash?: boolean;
  removeParams?: string[];
  lowercase?: boolean;
  secure?: boolean;
  customDomain?: string;
  preserveCase?: boolean;
  normalizeSlashes?: boolean;
}

/**
 * Parsed URL structure
 */
interface ParsedCanonical {
  path: string;
  query: string;
  hash: string;
  protocol: string;
  domain: string;
}

/**
 * Builds a canonical URL with SEO best practices
 */
export function buildCanonical(route: string, options: CanonicalOptions = {}): string {
  const {
    includeQuery = false,
    trailingSlash = true,
    removeParams = ['utm_', 'ref', 'source', 'fbclid', 'gclid', 'msclkid', 'mc_', '_ga', '_gl'],
    lowercase = true,
    secure = true,
    customDomain,
    preserveCase = false,
    normalizeSlashes = true,
  } = options;

  if (!route) {
    return buildBaseUrl(customDomain || SEO_CONFIG.siteUrl, secure);
  }

  const parsed = parseUrl(route, customDomain, secure);
  let { path, query, hash, protocol, domain } = parsed;

  let cleanPath = normalizePath(path, {
    lowercase: lowercase && !preserveCase,
    normalizeSlashes,
    trailingSlash,
  });

  if (cleanPath === '/' || cleanPath === '') {
    cleanPath = '';
  }

  const processedQuery = processQueryParams(query, { includeQuery, removeParams });
  const fullUrl = buildFinalUrl(protocol, domain, cleanPath, processedQuery, hash);

  return isCanonicalValid(fullUrl)
    ? fullUrl
    : buildBaseUrl(customDomain || domain, secure);
}

/**
 * Parses URL or route into components
 */
function parseUrl(route: string, customDomain?: string, secure = true): ParsedCanonical {
  const defaultProtocol = secure ? 'https://' : 'http://';
  const defaultDomain = (customDomain || SEO_CONFIG.siteUrl).replace(/^https?:\/\//, '');

  if (route.startsWith('http://') || route.startsWith('https://')) {
    try {
      const url = new URL(route);
      return {
        path: url.pathname,
        query: url.search,
        hash: url.hash,
        protocol: url.protocol,
        domain: url.host,
      };
    } catch {
      // fallback to path parsing
    }
  }

  let path = route;
  let query = '';
  let hash = '';

  const hashIndex = path.indexOf('#');
  if (hashIndex !== -1) {
    hash = path.substring(hashIndex);
    path = path.substring(0, hashIndex);
  }

  const queryIndex = path.indexOf('?');
  if (queryIndex !== -1) {
    query = path.substring(queryIndex);
    path = path.substring(0, queryIndex);
  }

  return {
    path: path || '/',
    query,
    hash,
    protocol: defaultProtocol,
    domain: defaultDomain,
  };
}

/**
 * Normalizes path (case, slashes, trailing slash)
 */
function normalizePath(
  path: string,
  options: { lowercase: boolean; normalizeSlashes: boolean; trailingSlash: boolean }
): string {
  let cleanPath = path;

  if (options.lowercase) {
    cleanPath = cleanPath.toLowerCase();
  }

  if (options.normalizeSlashes) {
    cleanPath = cleanPath.replace(/\/+/g, '/');
  }

  try {
    cleanPath = decodeURIComponent(cleanPath);
  } catch {
    // ignore decoding errors
  }

  if (
    options.trailingSlash &&
    !cleanPath.endsWith('/') &&
    !cleanPath.match(/\.[a-z0-9]+$/i)
  ) {
    cleanPath += '/';
  }

  return cleanPath;
}

/**
 * Processes query parameters (removes tracking params)
 */
function processQueryParams(
  query: string,
  options: { includeQuery: boolean; removeParams: string[] }
): string {
  if (!options.includeQuery || !query) return '';

  const params = new URLSearchParams(query);

  for (const key of Array.from(params.keys())) {
    if (options.removeParams.some(param => key.startsWith(param))) {
      params.delete(key);
    }
  }

  if (params.size === 0) return '';

  const sorted = new URLSearchParams();
  Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([k, v]) => sorted.append(k, v));

  const qs = sorted.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Builds final URL from components
 */
function buildFinalUrl(
  protocol: string,
  domain: string,
  path: string,
  query: string,
  hash: string
): string {
  const cleanProtocol = protocol.endsWith('://') ? protocol : `${protocol}://`;
  let url = `${cleanProtocol}${domain}${path}`;

  if (path === '' && !url.endsWith('/')) {
    url += '/';
  }

  return url + query + hash;
}

/**
 * Builds base URL
 */
function buildBaseUrl(domain: string, secure: boolean): string {
  const cleanDomain = domain.replace(/^https?:\/\//, '');
  const protocol = secure ? 'https://' : 'http://';
  return `${protocol}${cleanDomain}/`;
}

/**
 * Validates URL format
 */
export function isCanonicalValid(url: string): boolean {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
}

/**
 * Extract canonical from HTTP headers
 */
export function getCanonicalFromHeaders(headers: Headers): string | null {
  const link = headers.get('Link');
  if (!link) return null;

  const match = link.match(/<([^>]+)>;\s*rel="canonical"/);
  return match ? match[1] : null;
}

/**
 * Extract canonical from HTML
 */
export function getCanonicalFromHtml(html: string): string | null {
  const match = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/i);
  return match ? match[1] : null;
}

/**
 * Compare two URLs for canonical equality
 */
export function areCanonicalEqual(url1: string, url2: string): boolean {
  try {
    return buildCanonical(url1) === buildCanonical(url2);
  } catch {
    return false;
  }
}
