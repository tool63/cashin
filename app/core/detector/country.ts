import type { NextRequest } from "next/server";
import { DEFAULT_COUNTRY, COOKIE_KEYS } from "../constants";
import { isSupportedCountry } from "../utils/validation";

export function detectCountry(req: NextRequest): string {
  const headers = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country",
  ];

  for (const h of headers) {
    const val = req.headers.get(h);
    if (val && isSupportedCountry(val)) {
      return val.toLowerCase();
    }
  }

  return DEFAULT_COUNTRY;
}

export function resolveCountry(
  req: NextRequest,
  urlCountry: string | null
): string {
  const query = req.nextUrl.searchParams.get("country");

  // ✅ Highest priority: forced override
  const forced = req.cookies.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forced && isSupportedCountry(forced)) return forced;

  // ✅ Query param override
  if (query && isSupportedCountry(query)) return query;

  // ✅ URL (/us/...)
  if (urlCountry && isSupportedCountry(urlCountry)) return urlCountry;

  // ✅ Cookie
  const cookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  if (cookie && isSupportedCountry(cookie)) return cookie;

  // ✅ Header detection
  return detectCountry(req);
}
