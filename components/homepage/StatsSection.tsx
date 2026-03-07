// components/homepage/StatsSection.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Target, CheckCircle, Building2, DollarSign } from "lucide-react";
import OpeningStyle from "@/components/animations/openingstyle";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { Card, CardIcon, CardTitle, CardDescription, CardGrid } from "@/components/animations/container";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

export default function StatsSection() {
  const stats: Stat[] = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      value: "2.5M+",
      label: "Total Users",
      description: "Registered users worldwide"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      value: "1,200+",
      label: "Total Offers",
      description: "Active earning opportunities"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      value: "15M+",
      label: "Offers Completed",
      description: "Total tasks and offers finished"
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      value: "350+",
      label: "Total Advertisers",
      description: "Trusted brand partners"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      value: "$8.5M+",
      label: "Total Amount Paid",
      description: "Earnings paid to users"
    }
  ];

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <SectionTitle icon="🏆" text="Our Achievements" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Real metrics that showcase our growth and commitment to providing the best earning platform
          </p>
        </div>

        {/* Stats Grid */}
        <CardGrid cols={{ default: 1, sm: 2, md: 3, lg: 5 }}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                {/* Icon */}
                <div className="mb-4">
                  <CardIcon>{stat.icon}</CardIcon>
                </div>
                
                {/* Value */}
                <div className="text-3xl md:text-4xl font-extrabold mb-1 text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                
                {/* Label */}
                <CardTitle>{stat.label}</CardTitle>
                
                {/* Description */}
                <CardDescription>{stat.description}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </CardGrid>

        {/* Achievement Highlights - Simplified to match other sections */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span> 4.8/5 Trustpilot Rating
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 99.9% Uptime
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 5+ Years in Business
          </div>
        </div>

        {/* Trust Indicators - Matching other sections exactly */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Verified Achievements
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Real-time Updates
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Third-party Verified
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
