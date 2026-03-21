import type { NextRequest } from "next/server";
import { DEFAULT_COUNTRY, COOKIE_KEYS } from "../constants";
import { isValidCountryCode } from "../utils/validation";

export function detectCountry(req: NextRequest): string {
  const headers = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country",
  ];

  for (const h of headers) {
    const val = req.headers.get(h);
    if (val && isValidCountryCode(val)) {
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

  const forced = req.cookies.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forced && isValidCountryCode(forced)) return forced;

  if (query && isValidCountryCode(query)) return query;

  if (urlCountry && isValidCountryCode(urlCountry)) return urlCountry;

  const cookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  if (cookie && isValidCountryCode(cookie)) return cookie;

  return detectCountry(req);
}
