"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { earningOptions } from "@/components/homepage/earningOptions";
import OpeningStyle from "@/components/animations/openingstyle";
import {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardCTA,
  CardGrid,
} from "@/components/animations/container";

/* ================= TYPES ================= */

type TasksSectionProps = {
  data: {
    title?: string;
    cta?: string;
    items?: any[];
  };
  countryName?: string;
};

/* ================= COMPONENT ================= */

export default function TasksSection({
  data,
  countryName,
}: TasksSectionProps) {
  const descriptions: Record<string, string> = {};

  data?.items?.forEach((item: any) => {
    if (item?.title && item?.description) {
      descriptions[item.title] = item.description;
    }
  });

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            {data?.title || "High Paying Tasks"}
          </h2>
        </div>

        <CardGrid cols={{ default: 2, md: 3, lg: 4 }}>
          {earningOptions.map(([icon, title, href], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={href} className="block">
                <Card>
                  <CardIcon>{icon}</CardIcon>

                  <CardTitle>{title}</CardTitle>

                  <CardDescription>
                    {descriptions[title] ||
                      `Earn rewards with ${title.toLowerCase()}`}
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
