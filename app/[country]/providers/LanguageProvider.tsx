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

interface ProviderProps {
  children: ReactNode;
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

export default function LanguageProvider({ children }: ProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const slug = pathname?.split("/")[1] || "";

  const [country, setCountryState] = useState("");
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    if (COUNTRY_LANGUAGE_MAP[slug]) {
      setCountryState(slug);
      setLanguage(COUNTRY_LANGUAGE_MAP[slug]);
    } else {
      setCountryState("");
      setLanguage("EN");
    }

    document.documentElement.setAttribute("data-theme-ready", "true");
  }, [slug]);

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
