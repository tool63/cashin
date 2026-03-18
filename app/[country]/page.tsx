import { notFound } from "next/navigation";
import { VALID_COUNTRY_CODES, getLanguageForCountry } from "@/app/core/detector";

interface HomePageProps {
  params: { country: string };
}

export default async function HomePage({ params }: HomePageProps) {
  const country = params.country.toLowerCase();

  if (!VALID_COUNTRY_CODES.has(country)) notFound();

  const language = getLanguageForCountry(country);

  // Load translations server-side
  const translations = await import(`@/app/locales/${language}/homepage.json`).then(mod => mod.default);

  return (
    <main className="max-w-container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{translations["welcome"]}</h1>
      <p className="text-lg text-muted mb-8">{translations["description"]}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">{translations["card_surveys_title"]}</h2>
          <p className="text-muted">{translations["card_surveys_desc"]}</p>
        </div>
        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">{translations["card_apps_title"]}</h2>
          <p className="text-muted">{translations["card_apps_desc"]}</p>
        </div>
        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">{translations["card_games_title"]}</h2>
          <p className="text-muted">{translations["card_games_desc"]}</p>
        </div>
      </div>
    </main>
  );
}
