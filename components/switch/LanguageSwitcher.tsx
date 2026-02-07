"use client";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  // Switch between supported languages
  const switchLanguage = () => {
    setLang(lang === "en" ? "es" : "en");
  };

  return (
    <button
      onClick={switchLanguage}
      className="
        px-4 py-2
        border rounded-lg
        bg-gray-100 dark:bg-gray-800
        text-black dark:text-white
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-colors
      "
      title="Switch Language"
    >
      {lang.toUpperCase()}
    </button>
  );
}
