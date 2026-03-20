"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
} from "@/app/core/detector";

// ===============================
// 🌍 CONTEXT
// ===============================
type CountryContextType = {
  country: string;
  setCountry: (country: string) => void;
};

const CountryContext = createContext<CountryContextType | null>(null);

// ===============================
// 🔍 VALIDATE COUNTRY
// ===============================
function resolveCountry(country?: string): string {
  if (country && COUNTRY_CODES.includes(country as any)) {
    return country.toLowerCase();
  }
  return DEFAULT_COUNTRY;
}

// ===============================
// 📦 PROVIDER
// ===============================
export function CountryProvider({
  children,
  initialCountry,
}: {
  children: ReactNode;
  initialCountry?: string;
}) {
  const [country, setCountryState] = useState<string>(
    resolveCountry(initialCountry)
  );

  // ===============================
  // 🔄 UPDATE COUNTRY
  // ===============================
  const setCountry = (c: string) => {
    const valid = resolveCountry(c);
    setCountryState(valid);

    // sync cookie (middleware reads this)
    if (typeof document !== "undefined") {
      document.cookie = `USER_COUNTRY=${valid}; path=/; max-age=2592000`;
    }
  };

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

// ===============================
// 🪝 HOOK
// ===============================
export function useCountry() {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("useCountry must be used within CountryProvider");
  }

  return context;
}

// ===============================
// 📤 EXPORT CONTEXT FOR BACKWARD COMPATIBILITY
// ===============================
export { CountryContext };
