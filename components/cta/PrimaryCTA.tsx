// components/cta/PrimaryCTA.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useMemo, useCallback } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import CircleBorder from "@/components/animations/CircleBorder";

interface PrimaryCTAProps {
  href: string;
  translationKey?: string; // optional now
  observer?: boolean;
  fallback?: string;
  external?: boolean;
  onClick?: () => void;
}

export default function PrimaryCTA({
  href,
  translationKey,
  observer = true,
  fallback = "Get Started Now",
  external = false,
  onClick,
}: PrimaryCTAProps) {
  const params = useParams();
  const router = useRouter();
  const country = params?.country as string || "us";
  const { getTranslation } = useLanguage();

  // ✅ ALL keys from your JSON
  const CTA_KEYS = useMemo(
    () => [
      "start_earning_now",
      "get_started_now",
      "join_now",
      "sign_up",
      "learn_more",
      "create_account",
      "start_free_trial",
      "claim_offer",

      "get_cashback",
      "earn_cashback",
      "get_discount",
      "unlock_deal",
      "grab_offer",
      "save_money",
      "earn_rewards",
      "redeem_now",

      "start_now",
      "earn_now",
      "join_free",
      "try_now",
      "get_rewards",
      "withdraw_now",
      "earn_free_money",
      "start_earning_free",
      "claim_rewards",
      "unlock_rewards"
    ],
    []
  );

  // ✅ Safe key logic (same idea as FloatingCTA)
  const safeKey = useMemo(() => {
    if (translationKey && CTA_KEYS.includes(translationKey)) {
      return translationKey;
    }
    // fallback → random high-converting CTA
    return CTA_KEYS[Math.floor(Math.random() * CTA_KEYS.length)];
  }, [translationKey, CTA_KEYS]);

  // ✅ Get translation safely
  const text = getTranslation("primarycta", safeKey, fallback);

  // ✅ Process href to include country if needed
  const getProcessedHref = useCallback(() => {
    if (external) return href;
    
    // If href already starts with / and country, return as is
    if (href.startsWith(`/${country}`)) return href;
    
    // If href is absolute URL or starts with http
    if (href.startsWith("http") || href.startsWith("//")) return href;
    
    // If href is just a path without country
    if (href.startsWith("/")) {
      // Special paths that shouldn't get country prefix
      const noPrefixPaths = ["/api/", "/auth/", "/_next/", "/favicon.ico"];
      if (noPrefixPaths.some(path => href.startsWith(path))) {
        return href;
      }
      return `/${country}${href}`;
    }
    
    // Handle anchor links
    if (href.startsWith("#")) return href;
    
    // Handle relative paths
    return `/${country}/${href}`;
  }, [href, country, external]);

  const processedHref = getProcessedHref();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    
    // Handle scroll to hash
    if (processedHref.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(processedHref);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Button content
  const ButtonContent = () => (
    <motion.span
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      className="
        inline-flex items-center gap-3
        bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
        text-black px-10 sm:px-16 md:px-20 py-3 sm:py-5 md:py-7
        rounded-3xl
        font-bold text-lg sm:text-xl md:text-xl
        shadow-3xl
        hover:shadow-4xl
        transition-all duration-300
        cursor-pointer
      "
    >
      {text}
      <ArrowRight size={24} />
    </motion.span>
  );

  // For external links or special cases
  if (external || processedHref.startsWith("http") || processedHref.startsWith("//")) {
    return (
      <a
        href={processedHref}
        target="_blank"
        rel="noopener noreferrer"
        className={observer ? "cta-observer inline-block" : "inline-block"}
        aria-label={text}
        onClick={handleClick}
      >
        <CircleBorder>
          <ButtonContent />
        </CircleBorder>
      </a>
    );
  }

  // Internal Next.js Link
  return (
    <Link
      href={processedHref}
      className={observer ? "cta-observer inline-block" : "inline-block"}
      aria-label={text}
      onClick={handleClick}
    >
      <CircleBorder>
        <ButtonContent />
      </CircleBorder>
    </Link>
  );
}
