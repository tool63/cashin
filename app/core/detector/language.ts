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
// 🌐 Parse Accept-Language header
// ===============================
function parseAcceptLanguage(header: string): SupportedLanguage {
  try {
    const langs = header.split(",").map((item) => {
      const [lang, q] = item.split(";q=");
      return { lang: lang.trim(), q: q ? parseFloat(q) : 1 };
    });

    langs.sort((a, b) => b.q - a.q);

    for (const l of langs) {
      return normalizeLanguage(l.lang);
    }
  } catch {}

  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌍 GET LANGUAGE (FIXED LOGIC)
// ===============================
export function getLanguage(
  req: NextRequest,
  country: string
): SupportedLanguage {
  const normalizedCountry = country?.toLowerCase();

  // 1️⃣ COUNTRY → LANGUAGE (HIGHEST PRIORITY)
  const countryLanguage =
    COUNTRY_LANGUAGE_MAP[normalizedCountry];

  if (countryLanguage) {
    return countryLanguage;
  }

  // 2️⃣ Cookie (user preference override)
  const cookie = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (cookie) {
    return normalizeLanguage(cookie);
  }

  // 3️⃣ Accept-Language header (browser fallback)
  const header = req.headers.get("accept-language");
  if (header) {
    return parseAcceptLanguage(header);
  }

  // 4️⃣ Default fallback
  return DEFAULT_LANGUAGE;
}
