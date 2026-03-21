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
    const val = req.headers.get(h)?.toLowerCase();
    if (val && isSupportedCountry(val)) {
      return val;
    }
  }

  return DEFAULT_COUNTRY;
}

export function resolveCountry(
  req: NextRequest,
  urlCountry: string | null
): string {
  const query = req.nextUrl.searchParams.get("country")?.toLowerCase();

  const forced = req.cookies.get(COOKIE_KEYS.FORCED_COUNTRY)?.value?.toLowerCase();
  if (forced && isSupportedCountry(forced)) return forced;

  if (query && isSupportedCountry(query)) return query;

  if (urlCountry && isSupportedCountry(urlCountry)) return urlCountry;

  const cookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value?.toLowerCase();
  if (cookie && isSupportedCountry(cookie)) return cookie;

  return detectCountry(req);
}
