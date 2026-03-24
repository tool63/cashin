"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";

interface PrimaryCTAProps {
  href: string;
  translationKey?: string; // optional now
  observer?: boolean;
  fallback?: string;
}

export default function PrimaryCTA({
  href,
  translationKey,
  observer = true,
  fallback = "Get Started Now",
}: PrimaryCTAProps) {
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

  return (
    <Link
      href={href}
      className={observer ? "cta-observer inline-block" : "inline-block"}
      aria-label={text}
    >
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
        "
      >
        {text}
        <ArrowRight size={24} />
      </motion.span>
    </Link>
  );
}
