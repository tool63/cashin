import type { Metadata } from "next";
import { SEO_CONFIG } from "./seoConfig";
import { getCanonicalUrl } from "./canonical";

// ===============================
// 🧠 TYPES
// ===============================
export type MetadataProps = {
  title?: string;
  description?: string;
  path: string;
  country?: string;
  language?: string;
  noindex?: boolean;
};

// ===============================
// 🌍 GLOBAL COUNTRY LIST
// ===============================
const ALL_COUNTRIES = [
  "af","al","dz","ad","ao","ag","ar","am","au","at","az",
  "bs","bh","bd","bb","by","be","bz","bj","bt","bo","ba","bw","br","bn","bg","bf","bi",
  "cv","kh","cm","ca","cf","td","cl","cn","co","km","cg","cd","cr","ci","hr","cu","cy","cz",
  "dk","dj","dm","do",
  "ec","eg","sv","gq","er","ee","sz","et",
  "fj","fi","fr",
  "ga","gm","ge","de","gh","gr","gd","gt","gn","gw","gy",
  "ht","hn","hu",
  "is","in","id","ir","iq","ie","il","it",
  "jm","jp","jo",
  "kz","ke","ki","kp","kr","kw","kg",
  "la","lv","lb","ls","lr","ly","li","lt","lu",
  "mg","mw","my","mv","ml","mt","mh","mr","mu","mx","fm","md","mc","mn","me","ma","mz","mm",
  "na","nr","np","nl","nz","ni","ne","ng","mk","no",
  "om",
  "pk","pw","pa","pg","py","pe","ph","pl","pt",
  "qa",
  "ro","ru","rw",
  "kn","lc","vc","ws","sm","st","sa","sn","rs","sc","sl","sg","sk","si","sb","so","za","ss","es","lk","sd","sr","se","ch","sy",
  "tw","tj","tz","th","tl","tg","to","tt","tn","tr","tm","tv",
  "ug","ua","ae","gb","us","uy","uz",
  "vu","va","ve","vn",
  "ye",
  "zm","zw"
];

// ===============================
// 🧠 TITLE ENGINE
// ===============================
function generateTitle({ title, path, country }: { title?: string; path: string; country?: string; }) {
  if (title) return title;

  const type = SEO_CONFIG.getPageType(path);

  const baseTitles: Record<string, string> = {
    money: "Earn Money Online",
    earn: "Make Money Fast Online",
    shopping: "Shopping Rewards & Cashback",
    content: "Guides & Insights",
    low: "Online Rewards Platform",
  };

  let base = baseTitles[type] || "Earn Rewards Online";

  if (country) base = `${base} in ${country.toUpperCase()}`;

  return `${base} | ${SEO_CONFIG.siteName}`;
}

// ===============================
// 🧠 DESCRIPTION ENGINE
// ===============================
function generateDescription({ description, path, country }: { description?: string; path: string; country?: string; }) {
  if (description) return description;

  const type = SEO_CONFIG.getPageType(path);

  const descriptions: Record<string, string> = {
    money: "Start earning money online with surveys, offers, games, and cashback rewards.",
    earn: "Complete tasks, play games, and earn real rewards online instantly.",
    shopping: "Get cashback, discounts, and rewards while shopping online.",
    content: "Learn strategies to maximize your online earnings.",
    low: "Join and start earning rewards worldwide.",
  };

  let desc = descriptions[type] || descriptions.low;

  if (country) desc += ` Available in ${country.toUpperCase()}.`;

  return desc;
}

// ===============================
// 🔗 CANONICAL ENGINE
// ===============================
function generateCanonical(props: MetadataProps): string {
  return getCanonicalUrl({
    path: props.path,
    country: props.country,
    language: props.language,
  });
}

// ===============================
// 🌐 HREFLANG ENGINE
// ===============================
function generateHreflangLinks(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const links: Record<string, string> = {};

  // x-default
  links["x-default"] = SEO_CONFIG.buildUrl({ path: cleanPath });

  for (const country of ALL_COUNTRIES) {
    const hreflang = SEO_CONFIG.getHreflang(country);
    links[hreflang] = SEO_CONFIG.buildUrl({ path: cleanPath, country });
  }

  return links;
}

// ===============================
// 🚀 METADATA GENERATOR
// ===============================
export function generateMetadata({ title, description, path, country, language, noindex }: MetadataProps): Metadata {
  const metaTitle = generateTitle({ title, path, country });
  const metaDescription = generateDescription({ description, path, country });
  const canonical = generateCanonical({ path, country, language });
  const hreflangs = generateHreflangLinks(path);

  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical,
      languages: hreflangs,
    },

    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

// ===============================
// 🔥 ENTERPRISE ALIAS LAYER
// ===============================
export const buildMetadata = generateMetadata;
export const createMetadata = generateMetadata;
export const getMetadata = generateMetadata;
export const seoMetadata = generateMetadata;
export const resolveMetadata = generateMetadata;
export const generateSEO = generateMetadata;
export const buildSEO = generateMetadata;
export const createSEO = generateMetadata;

export default generateMetadata;
