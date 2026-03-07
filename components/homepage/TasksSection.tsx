// components/homepage/TasksSection.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { earningOptions } from "@/components/homepage/earningOptions";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import OpeningStyle from "@/components/animations/openingstyle";
import Container, { Card, CardIcon, CardTitle, CardDescription, CardCTA, CardGrid } from "@/components/animations/container";

const earningDescriptions: Record<string, string> = {
  Surveys: "Share your opinions and get rewarded instantly",
  "App Installs": "Install apps and earn money easily",
  "Playing Games": "Have fun while earning rewards",
  "Watching Videos": "Watch short videos and get paid",
  "Mining Rewards": "Earn crypto while mining rewards",
  "Completing Offers": "Finish tasks and get instant payouts",
  Offerwall: "Complete multiple offers for bonuses",
  Surveywall: "Explore surveys with higher payouts",
  "Watching Ads": "Earn by watching ads online",
  "Micro Tasks": "Quick small tasks for extra cash",
  "Free Trials": "Try free trials and earn rewards",
  "Testing Products": "Test products and get paid",
  "Reading Emails": "Read emails and earn money",
  "Visiting Websites": "Visit websites and earn instantly",
  "Review Tasks": "Complete review tasks for rewards",
  "Spinning Wheel": "Spin the wheel and win prizes",
  Loyalty: "Earn loyalty rewards over time",
  Vouchers: "Get vouchers as payout options",
};

export default function TasksSection() {
  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="mb-12">
          <SectionTitle icon="🎯" text="High Paying Tasks" />
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
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>
                    {earningDescriptions[title] ||
                      `Earn rewards with ${title.toLowerCase()}`}
                  </CardDescription>
                  <CardCTA>
                    Start earning <ArrowRight size={16} />
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
