"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { earningOptions } from "@/components/homepage/earningOptions";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import OpeningStyle from "@/components/animations/openingstyle";
import {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardGrid,
} from "@/components/animations/container";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

export default function TasksSection({
  data,
  countryName,
}: {
  data: any;
  countryName?: string;
}) {
  const { country } = useCountry();

  // Translate descriptions dynamically
  const descriptions: Record<string, string> = {};

  data?.items?.forEach((item: any) => {
    if (item?.title && item?.description) {
      descriptions[item.title] = item.description;
    }
  });

  // Same link logic as footer
  const getTaskLink = (href: string) => {
    const path = href.startsWith("/") ? href.slice(1) : href;
    return `/${country}/${path}`;
  };

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="mb-12">
          <SectionTitle
            icon={data?.icon || "🎯"}
            text={
              data?.title?.replace(/\{country\}/g, countryName || "") ||
              "High Paying Tasks"
            }
          />
        </div>

        {/* Task Cards Grid */}
        <CardGrid cols={{ default: 2, md: 3, lg: 4 }}>
          {earningOptions.map((option, index) => (
            <motion.div
              key={option.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={getTaskLink(option.href)} className="block">
                <Card>
                  <CardIcon>{option.emoji}</CardIcon>

                  <CardTitle>
                    {option.title.replace(/\{country\}/g, countryName || "")}
                  </CardTitle>

                  <CardDescription>
                    {descriptions[option.title]
                      ? descriptions[option.title].replace(
                          /\{country\}/g,
                          countryName || ""
                        )
                      : `Earn rewards with ${option.title.toLowerCase()}`}
                  </CardDescription>

                  {/* CardCTA removed - no more hover text/arrow */}
                </Card>
              </Link>
            </motion.div>
          ))}
        </CardGrid>
      </section>
    </OpeningStyle>
  );
}
