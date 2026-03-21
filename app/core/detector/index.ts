import type { NextRequest } from "next/server";
import type { SupportedLanguage } from "../types";

import { resolveCountry } from "./country";
import { getLanguage } from "./language";
import { isSupportedCountry } from "../utils/validation";
import { isValidCountryCode } from "../utils/validation";

export function extractCountryFromPath(path: string): string | null {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();
  return first && isValidCountryCode(first) ? first : null;
}

export function getPathWithoutCountry(path: string): string {
  const segments = path.split("/").filter(Boolean);

  if (segments.length && isValidCountryCode(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return path;
}

export function buildUrl(path: string, country: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (clean === "/") return `/${country}`;

  return `/${country}${clean}`;
}

export function getGeoInfo(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const urlCountry = extractCountryFromPath(pathname);
  const country = resolveCountry(req, urlCountry);
  const language = getLanguage(req);

  return {
    country,
    language,
    cleanPath: getPathWithoutCountry(pathname),
    shouldUsePrefix: isSupportedCountry(country),
  };
}
