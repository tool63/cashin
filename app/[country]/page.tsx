import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { buildSEO } from "@/components/SEO/seoEngine";

interface PageProps {
  params: {
    country: string; // NOTE: changed from lang → country
  };
}

export default async function CountryPage({ params }: PageProps) {
  const country = params?.country ?? SEO_CONFIG.defaultLocale;

  // Optional: build SEO metadata (server-safe)
  const seo = await buildSEO({
    route: "/",
    locale: country,
    title: "Hello World",
    description: "This is a simple Hello World page for testing.",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Hello World!</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Current country: <strong>{country}</strong>
      </p>
    </div>
  );
}
