import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { buildSEO } from "@/components/SEO/seoEngine";

interface PageProps {
  params: {
    country: string;
  };
}

export default async function CountryPage({ params }: PageProps) {
  const country = params?.country ?? "us";

  const seo = await buildSEO({
    route: "/",
    locale: country,
    title: `Welcome - ${country.toUpperCase()}`,
    description: `This is the home page for ${country.toUpperCase()}`,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome!
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Current region: <strong>{country.toUpperCase()}</strong>
      </p>
    </div>
  );
}
