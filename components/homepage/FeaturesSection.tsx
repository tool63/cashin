"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardGrid,
} from "@/components/animations/container";

interface FeaturesData {
  title?: string;
  cta?: string;

  instant_withdrawals?: {
    title?: string;
    description?: string;
  };

  secure_trusted?: {
    title?: string;
    description?: string;
  };

  multiple_payment_options?: {
    title?: string;
    description?: string;
  };
}

interface FeaturesSectionProps {
  data?: FeaturesData;

  // full featureshome.json translation object
  translations?: any;

  countryName?: string;
}

export default function FeaturesSection({
  data = {},
  translations = {},
  countryName = "",
}: FeaturesSectionProps) {
  /* ================= HELPERS ================= */

  function replaceCountry(text?: string) {
    if (!text) return "";
    return text.replace(/\{country\}/g, countryName);
  }

  function getText(
    dataValue?: string,
    translationValue?: string,
    fallback: string = ""
  ) {
    return dataValue || translationValue || fallback;
  }

  /* ================= FEATURES ================= */

  const features = [
    {
      icon: "⚡",
      title: getText(
        data.instant_withdrawals?.title,
        translations?.instant_withdrawals?.title,
        "Instant Withdrawals"
      ),
      description: getText(
        data.instant_withdrawals?.description,
        translations?.instant_withdrawals?.description,
        ""
      ),
    },
    {
      icon: "🛡️",
      title: getText(
        data.secure_trusted?.title,
        translations?.secure_trusted?.title,
        "Secure & Trusted"
      ),
      description: getText(
        data.secure_trusted?.description,
        translations?.secure_trusted?.description,
        ""
      ),
    },
    {
      icon: "💳",
      title: getText(
        data.multiple_payment_options?.title,
        translations?.multiple_payment_options?.title,
        "Multiple Payment Options"
      ),
      description: getText(
        data.multiple_payment_options?.description,
        translations?.multiple_payment_options?.description,
        ""
      ),
    },
  ];

  /* ================= RENDER ================= */

  return (
    <OpeningStyle delay={0.12}>
      {/* SECTION TITLE */}
      <div className="mb-12 text-center">
        <SectionTitle
          icon="✨"
          text={replaceCountry(
            getText(
              data.title,
              translations?.title,
              "Why Choose Us"
            )
          )}
        />
      </div>

      {/* FEATURES GRID */}
      <CardGrid cols={{ default: 1, md: 3 }}>
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.15,
            }}
          >
            <Card>
              <CardIcon>{feature.icon}</CardIcon>

              <CardTitle>
                {replaceCountry(feature.title)}
              </CardTitle>

              <CardDescription>
                {replaceCountry(feature.description)}
              </CardDescription>

              {/* CardCTA removed - no more "Start Now" text/arrow */}
            </Card>
          </motion.div>
        ))}
      </CardGrid>
    </OpeningStyle>
  );
}
