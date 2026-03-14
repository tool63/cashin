"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface LanguageContextType {
  country: string;
  setCountry: (country: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  country: "",
  setCountry: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const COUNTRIES = ["us", "uk", "ca", "au", "in", "fr", "de"];

export default function LanguageProvider({ children }: ProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const slug = pathname?.split("/")[1] || "";

  const [country, setCountryState] = useState(slug);

  useEffect(() => {
    if (COUNTRIES.includes(slug)) {
      setCountryState(slug);
    } else {
      setCountryState(""); // unknown country → root
    }

    // allow Tailwind theme to render content
    document.documentElement.setAttribute("data-theme-ready", "true");
  }, [slug]);

  const setCountry = (newCountry: string) => {
    if (!COUNTRIES.includes(newCountry)) return;

    setCountryState(newCountry);

    if (newCountry === "") {
      router.push("/");
    } else {
      router.push(`/${newCountry}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ country, setCountry }}>
      {children}
    </LanguageContext.Provider>
  );
}
