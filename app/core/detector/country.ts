import type { NextRequest } from "next/server";
import { DEFAULT_COUNTRY, COOKIE_KEYS } from "../constants";

// ===============================
// 🌐 Normalize country
// ===============================
function normalizeCountry(value: string | null): string | null {
  if (!value) return null;

  return value.toLowerCase();
}

// ===============================
// 🌍 Detect from headers (AUTO)
// ===============================
export function detectCountry(req: NextRequest): string {
  const headerKeys = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country",
  ];

  for (const key of headerKeys) {
    const value = req.headers.get(key);
    const country = normalizeCountry(value);

    if (country) {
      return country; // ✅ ACCEPT ALL COUNTRIES
    }
  }

  return DEFAULT_COUNTRY;
}

// ===============================
// 🌍 Resolve country (FULL AUTO)
// ===============================
export function resolveCountry(
  req: NextRequest,
  urlCountry: string | null
): string {
  const searchParams = req.nextUrl.searchParams;

  // 1️⃣ URL override (/us, /bd, /in etc.)
  if (urlCountry) {
    return urlCountry.toLowerCase();
  }

  // 2️⃣ Query (?country=us)
  const query = normalizeCountry(searchParams.get("country"));
  if (query) return query;

  // 3️⃣ Cookie (user preference)
  const forced = normalizeCountry(
    req.cookies.get(COOKIE_KEYS.FORCED_COUNTRY)?.value || null
  );
  if (forced) return forced;

  const cookie = normalizeCountry(
    req.cookies.get(COOKIE_KEYS.COUNTRY)?.value || null
  );
  if (cookie) return cookie;

  // 4️⃣ GEO detection (BEST)
  return detectCountry(req);
}
