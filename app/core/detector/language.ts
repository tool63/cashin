import type { NextRequest } from "next/server";
import { DEFAULT_LANGUAGE, COOKIE_KEYS, SUPPORTED_LANGUAGES } from "../constants";
import { normalizeLanguage } from "../utils/language";
import type { SupportedLanguage } from "../types";

function parseAcceptLanguage(header: string): SupportedLanguage {
  try {
    const langs = header.split(",").map((item) => {
      const [lang, q] = item.split(";q=");
      return { lang: lang.trim(), q: q ? parseFloat(q) : 1 };
    });

    langs.sort((a, b) => b.q - a.q);

    for (const l of langs) {
      const normalized = normalizeLanguage(l.lang);
      if (SUPPORTED_LANGUAGES.includes(normalized)) return normalized;
    }
  } catch {}

  return DEFAULT_LANGUAGE;
}

export function getLanguage(req: NextRequest): SupportedLanguage {
  const cookie = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (cookie) return normalizeLanguage(cookie);

  const header = req.headers.get("accept-language");
  if (header) return parseAcceptLanguage(header);

  return DEFAULT_LANGUAGE;
}
