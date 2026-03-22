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
// 🌐 Parse Accept-Language header (FIXED)
// ===============================
function parseAcceptLanguage(header: string): SupportedLanguage {
  try {
    const langs = header
      .split(",")
      .map((item) => {
        const [lang, q] = item.split(";q=");
        return {
          lang: lang.trim(),
          q: q ? parseFloat(q) : 1,
        };
      })
      .sort((a, b) => b.q - a.q);

    // ✅ Return first supported language
    for (const l of langs) {
      const normalized = normalizeLanguage(l.lang);
      if (
        (SUPPORTED_LANGUAGES as readonly string[]).includes(
          normalized
        )
      ) {
        return normalized;
      }
    }
  } catch {
    // fail silently
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
  // 1️⃣ USER PREFERENCE (HIGHEST PRIORITY)
  // ===============================
  const cookie = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (cookie) {
    return normalizeLanguage(cookie);
  }

  // ===============================
  // 2️⃣ COUNTRY → LANGUAGE
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
