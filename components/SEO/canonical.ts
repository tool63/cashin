import { SEO_CONFIG } from './seoConfig';

export interface CanonicalOptions {
  includeQuery?: boolean;
  trailingSlash?: boolean;
  removeParams?: string[];
  lowercase?: boolean;
  secure?: boolean;
  customDomain?: string;
}

export function buildCanonical(
  route: string,
  options: CanonicalOptions = {}
): string {
  const {
    includeQuery = false,
    trailingSlash = true,
    removeParams = ['utm_', 'ref', 'source', 'fbclid', 'gclid', 'msclkid'],
    lowercase = true,
    secure = true,
    customDomain,
  } = options;

  // Parse URL
  let path = route;
  let query = '';
  let hash = '';

  // Split URL components
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

  // Clean path
  let cleanPath = path || '/';

  // Lowercase URL for consistency
  if (lowercase) {
    cleanPath = cleanPath.toLowerCase();
  }

  // Remove duplicate slashes
  cleanPath = cleanPath.replace(/\/+/g, '/');

  // Add trailing slash
  if (trailingSlash && !cleanPath.endsWith('/') && !cleanPath.includes('.')) {
    cleanPath += '/';
  }

  // Remove trailing slash for homepage
  if (cleanPath === '/') {
    cleanPath = '';
  }

  // Handle query parameters
  if (includeQuery && query) {
    const params = new URLSearchParams(query);
    
    // Remove tracking parameters
    if (removeParams.length > 0) {
      for (const [key] of params) {
        if (removeParams.some(param => key.startsWith(param))) {
          params.delete(key);
        }
      }
    }
    
    // Sort parameters for consistency
    const sortedParams = new URLSearchParams();
    [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, value]) => sortedParams.append(key, value));
    
    const queryString = sortedParams.toString();
    if (queryString) {
      query = `?${queryString}`;
    } else {
      query = '';
    }
  } else {
    query = '';
  }

  // Build base URL
  const baseUrl = customDomain || SEO_CONFIG.siteUrl;
  const protocol = secure ? 'https://' : 'http://';
  const domain = baseUrl.replace(/^https?:\/\//, '');
  
  // Ensure no double slashes
  let fullUrl = `${protocol}${domain}${cleanPath}`;
  if (cleanPath === '' && !fullUrl.endsWith('/')) {
    fullUrl += '/';
  }
  
  return fullUrl + query + hash;
}

export function isCanonicalValid(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getCanonicalFromHeaders(headers: Headers): string | null {
  const link = headers.get('Link');
  if (!link) return null;
  
  const canonicalMatch = link.match(/<([^>]+)>;\s*rel="canonical"/);
  return canonicalMatch ? canonicalMatch[1] : null;
}
