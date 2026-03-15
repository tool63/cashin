import { getTranslation, countryLangMap, defaultLanguage } from "@/app/core/i18n/config";

interface PageProps {
  params: {
    country: string;
  };
}

export default async function CountryHomePage({ params }: PageProps) {
  const countryCode = params.country.toUpperCase();

  // Detect language from country
  const language = countryLangMap[countryCode] || defaultLanguage;

  // Load translations
  const t = await getTranslation(language);

  return (
    <main className="max-w-container mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-6">
        {t.title}
      </h1>

      <p className="text-lg text-muted mb-8">
        {t.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">
            {t.surveys_title}
          </h2>
          <p className="text-muted">
            {t.surveys_desc}
          </p>
        </div>

        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">
            {t.apps_title}
          </h2>
          <p className="text-muted">
            {t.apps_desc}
          </p>
        </div>

        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">
            {t.games_title}
          </h2>
          <p className="text-muted">
            {t.games_desc}
          </p>
        </div>

      </div>

    </main>
  );
}
