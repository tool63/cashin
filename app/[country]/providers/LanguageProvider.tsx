"use client";

import { createContext, ReactNode, useState } from "react";

interface CountryContextType {
  country: string;
  setCountry: (c: string) => void;
}

export const LanguageContext = createContext<CountryContextType>({
  country: "us",
  setCountry: () => {},
});

interface Props {
  children: ReactNode;
}

export default function CountryProvider({ children }: Props) {
  const [country, setCountry] = useState("us");

  return (
    <LanguageContext.Provider value={{ country, setCountry }}>
      {children}
    </LanguageContext.Provider>
  );
}
