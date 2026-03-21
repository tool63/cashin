"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { DEFAULT_COUNTRY } from "@/app/core/constants";
import { isSupportedCountry } from "@/app/core/utils/validation";

// ===============================
// 🌍 CONTEXT TYPE
// ===============================
type CountryContextType = {
  country: string;
  setCountry: (country: string) => void;
};

const CountryContext = createContext<CountryContextType | null>(null);

// ===============================
// 🔍 RESOLVE COUNTRY
// ===============================
function resolveCountry(country?: string): string {
  if (country && isSupportedCountry(country)) {
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
  // 🔄 SET COUNTRY
  // ===============================
  const setCountry = (value: string) => {
    const valid = resolveCountry(value);

    setCountryState(valid);

    // sync cookie (middleware reads this)
    if (typeof document !== "undefined") {
      document.cookie = `USER_COUNTRY=${valid}; path=/; max-age=2592000`;
    }
  };

  // ===============================
  // 🔄 SYNC WITH SERVER
  // ===============================
  useEffect(() => {
    const resolved = resolveCountry(initialCountry);

    if (resolved !== country) {
      setCountryState(resolved);
    }
  }, [initialCountry]);

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
// 📤 EXPORT CONTEXT (OPTIONAL)
// ===============================
export { CountryContext };
