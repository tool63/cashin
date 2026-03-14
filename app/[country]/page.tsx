import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { buildSEO } from "@/components/SEO/seoEngine";

interface PageProps {
  params: {
    country: string;
  };
}

export default async function Page({ params }: PageProps) {
  const country = params?.country ?? SEO_CONFIG.defaultLocale;

  // Optional SEO metadata
  const seo = await buildSEO({
    route: "/",
    locale: country,
    title: "Cashog Home",
    description: "Welcome to Cashog - Earn from surveys, apps, games and more.",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to Cashog!</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Current country: <strong>{country.toUpperCase()}</strong>
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Explore surveys, app installs, games, and watch videos to earn rewards.
      </p>
    </div>
  );
}
