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
  data?: any;
  translations?: any;
  countryName?: string;
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

export default function StatsSection({
  data = {},
  translations = {},
  countryName = "",
}: Props) {
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

  function getNested(path: string, fallback: any = "") {
    const get = (obj: any) =>
      path.split(".").reduce((o, i) => o?.[i], obj);

    return get(data) || get(translations) || fallback;
  }

  /* ================= STATS ================= */

  const stats: Stat[] = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      value: getNested("stats.users.value"),
      label: getNested("stats.users.label"),
      description: getNested("stats.users.description"),
      trend: getNested("stats.users.trend"),
    },
    {
      icon: <Activity className="w-8 h-8 text-indigo-500" />,
      value: getNested("stats.daily.value"),
      label: getNested("stats.daily.label"),
      description: getNested("stats.daily.description"),
      trend: getNested("stats.daily.trend"),
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      value: getNested("stats.offers.value"),
      label: getNested("stats.offers.label"),
      description: getNested("stats.offers.description"),
      trend: getNested("stats.offers.trend"),
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      value: getNested("stats.completed.value"),
      label: getNested("stats.completed.label"),
      description: getNested("stats.completed.description"),
      trend: getNested("stats.completed.trend"),
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      value: getNested("stats.advertisers.value"),
      label: getNested("stats.advertisers.label"),
      description: getNested("stats.advertisers.description"),
      trend: getNested("stats.advertisers.trend"),
    },
    {
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      value: getNested("stats.paid.value"),
      label: getNested("stats.paid.label"),
      description: getNested("stats.paid.description"),
      trend: getNested("stats.paid.trend"),
    },
  ];

  /* ================= TREND ================= */

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

  /* ================= RENDER ================= */

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center mb-12">
          <SectionTitle
            icon="🏆"
            text={replaceCountry(
              getText(data.title, translations?.title, "Platform Stats")
            )}
          />

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            {replaceCountry(
              getText(
                data.description,
                translations?.description,
                ""
              )
            )}
          </p>
        </div>

        {/* GRID */}
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
                  {replaceCountry(stat.value)}
                </div>

                <CardTitle>
                  {replaceCountry(stat.label)}
                </CardTitle>

                <CardDescription>
                  {replaceCountry(stat.description)}
                </CardDescription>

                {renderTrend(stat.trend)}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          {(data.highlights || translations?.highlights || []).map(
            (item: string, i: number) => (
              <span key={i}>
                {replaceCountry(item)}
              </span>
            )
          )}
        </div>

        {/* TRUST */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          {(data.trust || translations?.trust || []).map(
            (item: string, i: number) => (
              <span key={i}>
                {replaceCountry(item)}
              </span>
            )
          )}
        </div>

      </section>
    </OpeningStyle>
  );
}
