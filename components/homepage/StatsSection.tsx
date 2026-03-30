"use client";

import { motion } from "framer-motion";
import {
  Users,
  Target,
  CheckCircle,
  Building2,
  DollarSign,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react";

import OpeningStyle from "@/components/animations/openingstyle";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
} from "@/components/animations/container";

/* ================= TYPES ================= */

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
    text: string;
  };
}

/* ================= DATA ================= */

const stats: Stat[] = [
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    value: "2.5M+",
    label: "Total Users",
    description: "Registered users worldwide",
    trend: { value: "+12%", direction: "up", text: "+150k this month" },
  },
  {
    icon: <Activity className="w-8 h-8 text-indigo-500" />,
    value: "850K+",
    label: "Daily Active Users",
    description: "Users online daily",
    trend: { value: "+18%", direction: "up", text: "Peak: 1.2M yesterday" },
  },
  {
    icon: <Target className="w-8 h-8 text-purple-500" />,
    value: "1,200+",
    label: "Total Offers",
    description: "Active earning opportunities",
    trend: { value: "+8%", direction: "up", text: "+50 new offers" },
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    value: "15M+",
    label: "Offers Completed",
    description: "Total tasks and offers finished",
    trend: { value: "+15%", direction: "up", text: "+2M this quarter" },
  },
  {
    icon: <Building2 className="w-8 h-8 text-orange-500" />,
    value: "350+",
    label: "Total Advertisers",
    description: "Trusted brand partners",
    trend: { value: "+5%", direction: "up", text: "Including Fortune 500" },
  },
  {
    icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
    value: "$8.5M+",
    label: "Total Paid",
    description: "Earnings paid to users",
    trend: { value: "+22%", direction: "up", text: "+$1.2M this year" },
  },
];

/* ================= COMPONENT ================= */

export default function StatsSection() {
  const renderTrend = (trend?: Stat["trend"]) => {
    if (!trend) return null;

    const colors = {
      up: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10",
      down: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10",
      neutral:
        "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-500/10",
    };

    const icons = {
      up: <ArrowUp size={12} />,
      down: <ArrowDown size={12} />,
      neutral: <TrendingUp size={12} />,
    };

    return (
      <div className="mt-3 flex flex-col items-center gap-1">
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[trend.direction]}`}
        >
          {icons[trend.direction]}
          <span>{trend.value}</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {trend.text}
        </span>
      </div>
    );
  };

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* Heading */}
        <div className="text-center mb-12">
          <SectionTitle icon="🏆" text="Our Achievements" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Real metrics that showcase our growth and commitment to providing the best earning platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="text-center h-full flex flex-col">
                <CardIcon>{stat.icon}</CardIcon>

                <div className="text-3xl md:text-4xl font-extrabold mt-3 text-gray-900 dark:text-white">
                  {stat.value}
                </div>

                <CardTitle>{stat.label}</CardTitle>
                <CardDescription>{stat.description}</CardDescription>

                {renderTrend(stat.trend)}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <span>★ 4.8/5 Trustpilot Rating</span>
          <span>✓ 24/7 Support</span>
          <span>✓ 99.9% Uptime</span>
          <span>✓ 5+ Years in Business</span>
          <span>✓ 100% Secure</span>
        </div>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <span>✓ Verified Achievements</span>
          <span>✓ Real-time Updates</span>
          <span>✓ Third-party Verified</span>
          <span>✓ Updated Daily</span>
        </div>

      </section>
    </OpeningStyle>
  );
}
