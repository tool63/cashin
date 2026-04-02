"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { earningOptions } from "@/components/homepage/earningOptions";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import OpeningStyle from "@/components/animations/openingstyle";
import {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardCTA,
  CardGrid,
} from "@/components/animations/container";

export default function TasksSection({
  data,
  countryName,
}: {
  data: any;
  countryName?: string;
}) {
  // Translate descriptions dynamically
  const descriptions: Record<string, string> = {};

  data?.items?.forEach((item: any) => {
    if (item?.title && item?.description) {
      descriptions[item.title] = item.description;
    }
  });

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
          {earningOptions.map(([icon, title, href], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={href} className="block">
                <Card>
                  <CardIcon>{icon}</CardIcon>

                  <CardTitle>
                    {title.replace(/\{country\}/g, countryName || "")}
                  </CardTitle>

                  <CardDescription>
                    {descriptions[title]
                      ? descriptions[title].replace(
                          /\{country\}/g,
                          countryName || ""
                        )
                      : `Earn rewards with ${title.toLowerCase()}`}
                  </CardDescription>

                  <CardCTA>
                    {data?.cta || "Start earning"}{" "}
                    <ArrowRight size={16} />
                  </CardCTA>
                </Card>
              </Link>
            </motion.div>
          ))}
        </CardGrid>
      </section>
    </OpeningStyle>
  );
}
