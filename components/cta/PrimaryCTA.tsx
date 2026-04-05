// components/cta/PrimaryCTA.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";

interface PrimaryCTAProps {
  href: string;
  translationKey?: string;
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

  const safeKey = useMemo(() => {
    if (translationKey && CTA_KEYS.includes(translationKey)) {
      return translationKey;
    }
    return CTA_KEYS[Math.floor(Math.random() * CTA_KEYS.length)];
  }, [translationKey, CTA_KEYS]);

  const text = getTranslation("primarycta", safeKey, fallback);

  const getProcessedHref = useCallback(() => {
    if (external) return href;
    
    if (href.startsWith(`/${country}`)) return href;
    if (href.startsWith("http") || href.startsWith("//")) return href;
    
    if (href.startsWith("/")) {
      const noPrefixPaths = ["/api/", "/auth/", "/_next/", "/favicon.ico"];
      if (noPrefixPaths.some(path => href.startsWith(path))) {
        return href;
      }
      return `/${country}${href}`;
    }
    
    if (href.startsWith("#")) return href;
    return `/${country}/${href}`;
  }, [href, country, external]);

  const processedHref = getProcessedHref();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    
    if (processedHref.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(processedHref);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const ButtonContent = () => (
    <motion.span
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      className="
        inline-flex items-center justify-center
        bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
        text-black 
        px-10 sm:px-16 md:px-20 
        py-3 sm:py-5 md:py-7
        rounded-3xl
        font-bold text-lg sm:text-xl md:text-xl
        shadow-3xl
        hover:shadow-4xl
        transition-all duration-300
        cursor-pointer
        relative z-10
      "
    >
      {text}
    </motion.span>
  );

  // Custom animated border without using CircleBorder
  const WrappedButton = () => (
    <div className="relative inline-block rounded-3xl p-[2px] overflow-hidden">
      {/* Animated Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, #facc15, #22c55e, #10b981, #facc15)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 6,
        }}
      />
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl blur-md opacity-40 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500" />
      {/* Button with 1mm space */}
      <div className="relative z-10" style={{ margin: '0.264mm' }}>
        <ButtonContent />
      </div>
    </div>
  );

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
        <WrappedButton />
      </a>
    );
  }

  return (
    <Link
      href={processedHref}
      className={observer ? "cta-observer inline-block" : "inline-block"}
      aria-label={text}
      onClick={handleClick}
    >
      <WrappedButton />
    </Link>
  );
}
