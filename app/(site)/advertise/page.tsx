import dynamic from "next/dynamic";
import { buildSEO, SEOOutput } from "@/components/seo/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

/* ================= SEO METADATA (SERVER SIDE) ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/advertise",
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
      title: "Advertise - Reach Millions of Users | Cashog",
      description:
        "Scale your brand with premium advertising and reach millions of engaged users across web and mobile.",
    };
  }
}

/* ================= CLIENT COMPONENT (INTERACTIVE UI) ================= */
const AdvertisePageClient = dynamic(
  () => import("./AdvertisePageClient"),
  { ssr: false }
);

/* ================= PAGE ================= */
export default async function AdvertisePage() {
  const seo = await buildSEO({
    route: "/advertise",
    locale: SEO_CONFIG.defaultLocale,
  });

  return (
    <>
      <SeoRenderer seo={seo} />
      <AdvertisePageClient />
    </>
  );
}
