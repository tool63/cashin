import dynamic from "next/dynamic";
import { buildSEO, SEOOutput } from "@/components/seo/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

/* ================= SEO METADATA (SERVER SIDE) ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/affiliate",
      locale: SEO_CONFIG.defaultLocale,
    });

    return {
      ...seo.metadata,
      alternates: {
        canonical: seo.canonical,
        languages: seo.hreflang,
      },
      robots: seo.metadata?.robots,
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);

    return {
      title: "Affiliate Program - Earn 15% Commission | Cashog",
      description:
        "Join our affiliate program and earn commission by referring users. Surveys, apps, games, and more.",
    };
  }
}

/* ================= CLIENT COMPONENT (INTERACTIVE UI) ================= */
const AffiliatePageClient = dynamic(
  () => import("./AffiliatePageClient"),
  { ssr: false }
);

/* ================= PAGE ================= */
export default async function AffiliatePage() {
  const seo = await buildSEO({
    route: "/affiliate",
    locale: SEO_CONFIG.defaultLocale,
  });

  return (
    <>
      <SeoRenderer seo={seo} />
      <AffiliatePageClient />
    </>
  );
}
