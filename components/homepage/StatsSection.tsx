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

interface Props {
  data: any;
}

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

/* ================= COMPONENT ================= */

export default function StatsSection({ data }: Props) {
  const stats: Stat[] = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      value: data.stats.users.value,
      label: data.stats.users.label,
      description: data.stats.users.description,
      trend: data.stats.users.trend,
    },
    {
      icon: <Activity className="w-8 h-8 text-indigo-500" />,
      value: data.stats.daily.value,
      label: data.stats.daily.label,
      description: data.stats.daily.description,
      trend: data.stats.daily.trend,
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      value: data.stats.offers.value,
      label: data.stats.offers.label,
      description: data.stats.offers.description,
      trend: data.stats.offers.trend,
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      value: data.stats.completed.value,
      label: data.stats.completed.label,
      description: data.stats.completed.description,
      trend: data.stats.completed.trend,
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      value: data.stats.advertisers.value,
      label: data.stats.advertisers.label,
      description: data.stats.advertisers.description,
      trend: data.stats.advertisers.trend,
    },
    {
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      value: data.stats.paid.value,
      label: data.stats.paid.label,
      description: data.stats.paid.description,
      trend: data.stats.paid.trend,
    },
  ];

  /* Trend Renderer */
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
          <SectionTitle icon="🏆" text={data.title} />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
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
          {data.highlights.map((item: string, i: number) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          {data.trust.map((item: string, i: number) => (
            <span key={i}>{item}</span>
          ))}
        </div>

      </section>
    </OpeningStyle>
  );
}
