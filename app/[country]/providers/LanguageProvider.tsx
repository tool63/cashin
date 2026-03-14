"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface LanguageContextType {
  country: string;
  setCountry: (country: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  country: "us",
  setCountry: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const COUNTRIES = ["us", "uk", "in", "ca", "de", "fr"]; // top countries

export default function LanguageProvider({ children }: ProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const slug = pathname?.split("/")[1] || "us";

  const [country, setCountryState] = useState(slug);

  useEffect(() => {
    if (!COUNTRIES.includes(slug)) {
      router.replace("/us");
    } else {
      setCountryState(slug);
    }

    // allow Tailwind theme to show content
    document.documentElement.setAttribute("data-theme-ready", "true");
  }, [slug, router]);

  const setCountry = (newCountry: string) => {
    if (newCountry !== country && COUNTRIES.includes(newCountry)) {
      setCountryState(newCountry);
      router.push(`/${newCountry}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ country, setCountry }}>
      {children}
    </LanguageContext.Provider>
  );
}
