import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { buildSEO } from "@/components/SEO/seoEngine";

interface PageProps {
  params: {
    country: string;
  };
}

export default async function CountryPage({ params }: PageProps) {
  const country = params?.country ?? "us";

  // SEO for each country/region
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

      {/* Example: quick links to other regions */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {["us", "ca", "uk", "de", "fr", "eu", "in"].map((c) => (
          <a
            key={c}
            href={`/${c}`}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {c.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  );
}
