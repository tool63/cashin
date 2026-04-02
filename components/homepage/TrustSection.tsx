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

export default function TrustSection({
  data,
  countryName,
}: {
  data: any;
  countryName?: string;
}) {
  const features =
    data?.features?.map((f: any) => ({
      title: f.title?.replace(/\{country\}/g, countryName || ""),
      description: f.description?.replace(/\{country\}/g, countryName || ""),
      icon: f.icon,
    })) || [];

  const trustIndicators =
    data?.trust_indicators?.map((t: string) =>
      t.replace(/\{country\}/g, countryName || "")
    ) || [];

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Section Heading */}
          <div className="mb-6">
            <SectionTitle
              icon={data?.icon || "🔒"}
              text={
                data?.title?.replace(
                  /\{country\}/g,
                  countryName || ""
                ) || "Why You Can Trust Us"
              }
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {data?.description?.replace(
              /\{country\}/g,
              countryName || ""
            )}
          </p>

          {/* Feature Cards */}
          <CardGrid cols={{ default: 1, sm: 2, lg: 4 }}>
            {features.map((feature: any, i: number) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Card>
                  <CardIcon>{feature.icon}</CardIcon>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </CardGrid>

          {/* Trust Indicators */}
          {trustIndicators.length > 0 && (
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              {trustIndicators.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </OpeningStyle>
  );
}
