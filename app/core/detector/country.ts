import type { NextRequest } from "next/server";
import { DEFAULT_COUNTRY, COOKIE_KEYS } from "../constants";
import { isValidCountryCode } from "../utils/validation";

// ===============================
// 🌐 Normalize country
// ===============================
function normalizeCountry(value: string | null): string | null {
  if (!value) return null;

  const normalized = value.toLowerCase().trim();

  // ✅ Validate (includes "global" + ISO codes)
  if (!isValidCountryCode(normalized)) return null;

  return normalized;
}

// ===============================
// 🌍 Detect from headers (AUTO GEO)
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

    if (country && country !== "xx") {
      return country; // ✅ Accept real countries only
    }
  }

  // ✅ Fallback to global (NO forced country)
  return DEFAULT_COUNTRY;
}

// ===============================
// 🌍 Resolve country (FULL LOGIC)
// ===============================
export function resolveCountry(
  req: NextRequest,
  urlCountry: string | null,
  preferGlobal: boolean = false
): string {
  const searchParams = req.nextUrl.searchParams;

  // 1️⃣ URL prefix (/us, /uk, /ca, /au) - Highest priority
  if (urlCountry) {
    return normalizeCountry(urlCountry) || DEFAULT_COUNTRY;
  }

  // 2️⃣ Query override (?country=us)
  const query = normalizeCountry(searchParams.get("country"));
  if (query) return query;

  // 3️⃣ Forced country (admin override)
  const forced = normalizeCountry(
    req.cookies.get(COOKIE_KEYS.FORCED_COUNTRY)?.value || null
  );
  if (forced) return forced;

  // 4️⃣ Check if we should prefer global
  if (preferGlobal) {
    return DEFAULT_COUNTRY;
  }

  // 5️⃣ Saved cookie - Only use if NOT preferring global
  const cookie = normalizeCountry(
    req.cookies.get(COOKIE_KEYS.COUNTRY)?.value || null
  );
  if (cookie) return cookie;

  // 6️⃣ GEO detection (best effort)
  return detectCountry(req);
}
