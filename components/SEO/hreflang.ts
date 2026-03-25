import { SUPPORTED_LANGUAGES } from "@/app/core/constants";

const BASE = "https://cashog.com";

export function generateHreflang(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;

  return [
    ...SUPPORTED_LANGUAGES.map((lang) => ({
      rel: "alternate",
      hrefLang: lang,
      href: `${BASE}/${lang}${clean}`,
    })),
    {
      rel: "alternate",
      hrefLang: "x-default",
      href: `${BASE}${clean}`,
    },
  ];
}
