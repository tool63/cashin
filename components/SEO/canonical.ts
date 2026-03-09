import { SEO_CONFIG } from './seoConfig';

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

interface ParsedCanonical {
  path: string;
  query: string;
  hash: string;
  protocol: string;
  domain: string;
}

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

  if (!route) return buildBaseUrl(customDomain || SEO_CONFIG.siteUrl, secure);

  const parsed = parseUrl(route, customDomain, secure);
  let { path, query, hash, protocol, domain } = parsed;

  let cleanPath = normalizePath(path, { lowercase: lowercase && !preserveCase, normalizeSlashes, trailingSlash });
  if (cleanPath === '/' || cleanPath === '') cleanPath = '';

  const processedQuery = processQueryParams(query, { includeQuery, removeParams });
  const fullUrl = buildFinalUrl(protocol, domain, cleanPath, processedQuery, hash);

  return isCanonicalValid(fullUrl) ? fullUrl : buildBaseUrl(customDomain || domain, secure);
}

function parseUrl(route: string, customDomain?: string, secure = true): ParsedCanonical {
  const defaultProtocol = secure ? 'https://' : 'http://';
  const defaultDomain = (customDomain || SEO_CONFIG.siteUrl).replace(/^https?:\/\//, '');

  if (route.startsWith('http://') || route.startsWith('https://')) {
    try {
      const url = new URL(route);
      return { path: url.pathname, query: url.search, hash: url.hash, protocol: url.protocol, domain: url.host };
    } catch {}
  }

  let path = route, query = '', hash = '';
  const hashIndex = path.indexOf('#');
  if (hashIndex !== -1) { hash = path.substring(hashIndex); path = path.substring(0, hashIndex); }
  const queryIndex = path.indexOf('?');
  if (queryIndex !== -1) { query = path.substring(queryIndex); path = path.substring(0, queryIndex); }

  return { path: path || '/', query, hash, protocol: defaultProtocol, domain: defaultDomain };
}

function normalizePath(path: string, options: { lowercase: boolean; normalizeSlashes: boolean; trailingSlash: boolean }): string {
  let cleanPath = path;
  if (options.lowercase) cleanPath = cleanPath.toLowerCase();
  if (options.normalizeSlashes) cleanPath = cleanPath.replace(/\/+/g, '/');
  try { cleanPath = decodeURIComponent(cleanPath); } catch {}
  if (options.trailingSlash && !cleanPath.endsWith('/') && !cleanPath.match(/\.[a-z0-9]+$/i)) cleanPath += '/';
  return cleanPath;
}

function processQueryParams(query: string, options: { includeQuery: boolean; removeParams: string[] }): string {
  if (!options.includeQuery || !query) return '';
  const params = new URLSearchParams(query);
  for (const key of Array.from(params.keys())) {
    if (options.removeParams.some(param => key.startsWith(param))) params.delete(key);
  }
  if (params.size === 0) return '';
  const sorted = new URLSearchParams();
  Array.from(params.entries()).sort(([a],[b]) => a.localeCompare(b)).forEach(([k,v]) => sorted.append(k,v));
  return sorted.toString() ? `?${sorted.toString()}` : '';
}

function buildFinalUrl(protocol: string, domain: string, path: string, query: string, hash: string): string {
  const cleanProtocol = protocol.endsWith('://') ? protocol : `${protocol}://`;
  let url = `${cleanProtocol}${domain}${path}`;
  if (path === '' && !url.endsWith('/')) url += '/';
  return url + query + hash;
}

function buildBaseUrl(domain: string, secure: boolean): string {
  const cleanDomain = domain.replace(/^https?:\/\//, '');
  return `${secure ? 'https://' : 'http://'}${cleanDomain}/`;
}

export function isCanonicalValid(url: string): boolean {
  try { return Boolean(new URL(url)); } catch { return false; }
}
