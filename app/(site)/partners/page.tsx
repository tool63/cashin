import { buildSEO, SEOOutput } from "@/components/seo/SeoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import PartnerPageClient from "./PartnerPageClient";

export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/partners",
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
      title: "Partner Program - Join Our Global Network | Cashog",
      description:
        "Become a Cashog partner and earn revenue share. Join thousands of partners worldwide.",
    };
  }
}

export default async function PartnerPage() {
  const seo = await buildSEO({
    route: "/partners",
    locale: SEO_CONFIG.defaultLocale,
  });

  return (
    <>
      <SeoRenderer seo={seo} />
      <PartnerPageClient />
    </>
  );
}
