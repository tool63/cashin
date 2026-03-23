"use client";

import { useLanguage } from "./providers/LanguageProvider";
import { useCountry } from "./providers/CountryProvider";
import Link from "next/link";

// Footer Component
const Footer: React.FC = () => {
  const { language, getTranslation } = useLanguage();
  const { country } = useCountry();

  // Helper function for translations
  const t = (key: string, fallback: string): string => {
    return getTranslation("footer", key, fallback);
  };

  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        {/* Footer Links */}
        <div className="mb-4">
          <Link href="/" className="text-lg font-semibold hover:text-gray-400">
            {t("home", "Home")}
          </Link>{" "}
          |{" "}
          <Link
            href="/about"
            className="text-lg font-semibold hover:text-gray-400"
          >
            {t("about", "About Us")}
          </Link>{" "}
          |{" "}
          <Link
            href="/contact"
            className="text-lg font-semibold hover:text-gray-400"
          >
            {t("contact", "Contact")}
          </Link>
        </div>

        {/* Dynamic Copyright Message */}
        <div className="text-sm">
          <p>
            &copy; {new Date().getFullYear()} {t("company_name", "Your Company Name")}.{" "}
            {t("rights_reserved", "All Rights Reserved.")}
          </p>
          {/* Dynamic Country Message */}
          <p>
            {t("serving_message", "Serving customers in")} {country}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
