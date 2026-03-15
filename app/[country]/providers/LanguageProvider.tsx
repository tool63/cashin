"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface LanguageContextType {
  country: string;
  language: string;
  setCountry: (country: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  country: "",
  language: "EN",
  setCountry: () => {},
});

interface Props {
  children: ReactNode;
  country?: string;
}

const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  in: "EN",
  fr: "FR",
  de: "DE",
};

export default function LanguageProvider({ children, country: initialCountry }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const slug = initialCountry || pathname?.split("/")[1] || "us";

  const [country, setCountryState] = useState(slug);
  const [language, setLanguage] = useState(COUNTRY_LANGUAGE_MAP[slug] || "EN");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme-ready", "true");
  }, []);

  const setCountry = (newCountry: string) => {
    if (!COUNTRY_LANGUAGE_MAP[newCountry]) return;
    setCountryState(newCountry);
    setLanguage(COUNTRY_LANGUAGE_MAP[newCountry]);
    router.push(`/${newCountry}`);
  };

  return (
    <LanguageContext.Provider value={{ country, language, setCountry }}>
      {children}
    </LanguageContext.Provider>
  );
}
