import React from "react";
import { generateSeo } from "./seoEngine";
import type { SeoInput } from "./pageTypes";
import { SEO_CONFIG } from "./seoConfig";

// ===============================
// 🧠 PROPS
// ===============================
type SeoRendererProps = SeoInput & {
  children?: React.ReactNode;
};

// ===============================
// 🚀 SEO RENDERER (SERVER COMPONENT)
// ===============================
export default function SeoRenderer(props: SeoRendererProps) {
  const { children, ...seoInput } = props;

  // ===============================
  // 🧠 GENERATE SEO METADATA
  // ===============================
  const metadata = generateSeo(seoInput);

  // ===============================
  // 🔗 SAFE CANONICAL (FIXED)
// ===============================
  const canonicalRaw =
    metadata?.alternates?.canonical ||
    SEO_CONFIG.baseUrl + (seoInput.path || "/");

  const canonical =
    typeof canonicalRaw === "string"
      ? canonicalRaw
      : canonicalRaw instanceof URL
      ? canonicalRaw.toString()
      : canonicalRaw?.url || SEO_CONFIG.baseUrl + (seoInput.path || "/");

  // ===============================
  // 🌐 SAFE HREFLANG
  // ===============================
  const hreflangs = metadata?.alternates?.languages || {};

  // ===============================
  // 🧾 STRUCTURED DATA (BASIC)
  // ===============================
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: canonical,
    potentialAction: {
      "@type": "SearchAction",
      target: `${canonical}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* =============================== */}
      {/* 🔗 CANONICAL TAG */}
      {/* =============================== */}
      <link rel="canonical" href={canonical} />

      {/* =============================== */}
      {/* 🌐 HREFLANG TAGS */}
      {/* =============================== */}
      {Object.entries(hreflangs).map(([lang, url]) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={url as string}
        />
      ))}

      {/* =============================== */}
      {/* 🧠 STRUCTURED DATA */}
      {/* =============================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* =============================== */}
      {/* 📦 CHILD CONTENT */}
      {/* =============================== */}
      {children}
    </>
  );
}
