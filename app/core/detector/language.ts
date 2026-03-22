import type { NextRequest } from "next/server";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  COOKIE_KEYS,
  COUNTRY_LANGUAGE_MAP,
} from "../constants";
import { normalizeLanguage } from "../utils/language";
import type { SupportedLanguage } from "../types";

// ===============================
// 🌐 Parse Accept-Language header (SIMPLIFIED & SAFE)
// ===============================
function parseAcceptLanguage(header: string): SupportedLanguage {
  const lang = header.split(",")[0]?.split("-")[0]?.toLowerCase();

  if ((SUPPORTED_LANGUAGES as readonly string[]).includes(lang)) {
    return lang as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌍 GET LANGUAGE (FINAL LOGIC)
// ===============================
export function getLanguage(
  req: NextRequest,
  country: string
): SupportedLanguage {
  const normalizedCountry = country?.toLowerCase() || "global";

  // ===============================
  // 1️⃣ USER PREFERENCE (STRICT PRIORITY)
  // ===============================
  const cookie = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (cookie) {
    return normalizeLanguage(cookie);
  }

  // ===============================
  // 2️⃣ COUNTRY → LANGUAGE (ONLY IF NO USER PREF)
  // ===============================
  const countryLanguage =
    COUNTRY_LANGUAGE_MAP[normalizedCountry];

  if (countryLanguage) {
    return countryLanguage;
  }

  // ===============================
  // 3️⃣ BROWSER HEADER
  // ===============================
  const header = req.headers.get("accept-language");

  if (header) {
    return parseAcceptLanguage(header);
  }

  // ===============================
  // 4️⃣ FALLBACK
  // ===============================
  return DEFAULT_LANGUAGE;
}
