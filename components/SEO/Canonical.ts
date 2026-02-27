interface CanonicalOptions {
  baseUrl: string;               // https://cashog.com
  pathname: string;              // /blog
  query?: Record<string, any>;   // router.query
  allowedParams?: string[];      // params allowed in canonical (e.g. page)
  trailingSlash?: boolean;
}

export function generateCanonical({
  baseUrl,
  pathname,
  query = {},
  allowedParams = ["page"],
  trailingSlash = false,
}: CanonicalOptions): string {
  
  const url = new URL(pathname, baseUrl);

  // Keep only allowed query params (like pagination)
  Object.keys(query).forEach((key) => {
    if (allowedParams.includes(key) && query[key]) {
      url.searchParams.set(key, String(query[key]));
    }
  });

  let finalUrl = url.toString();

  // Handle trailing slash preference
  if (!trailingSlash) {
    finalUrl = finalUrl.replace(/\/$/, "");
  }

  return finalUrl;
}
