// components/homepage/StatsSection.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Target, CheckCircle, Building2, DollarSign, TrendingUp } from "lucide-react";
import OpeningStyle from "@/components/animations/openingstyle";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { Card, CardIcon, CardTitle, CardDescription, CardGrid } from "@/components/animations/container";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  trend?: string;
  color: string;
}

export default function StatsSection() {
  const stats: Stat[] = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "2.5M+",
      label: "Total Users",
      description: "Registered users worldwide",
      trend: "+150k this month",
      color: "blue"
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: "1,200+",
      label: "Total Offers",
      description: "Active earning opportunities",
      trend: "+50 new offers",
      color: "purple"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      value: "15M+",
      label: "Offers Completed",
      description: "Total tasks and offers finished",
      trend: "+2M this quarter",
      color: "green"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: "350+",
      label: "Total Advertisers",
      description: "Trusted brand partners",
      trend: "Including Fortune 500",
      color: "orange"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "$8.5M+",
      label: "Total Amount Paid",
      description: "Earnings paid to users",
      trend: "+$1.2M this year",
      color: "emerald"
    }
  ];

  // Color mappings
  const colorClasses = {
    blue: "text-blue-500 bg-blue-100 dark:bg-blue-500/10",
    purple: "text-purple-500 bg-purple-100 dark:bg-purple-500/10",
    green: "text-green-500 bg-green-100 dark:bg-green-500/10",
    orange: "text-orange-500 bg-orange-100 dark:bg-orange-500/10",
    emerald: "text-emerald-500 bg-emerald-100 dark:bg-emerald-500/10",
  };

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

        {/* Stats Grid - First row with 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.slice(0, 3).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl -mr-10 -mt-10`} />
                
                <div className="flex items-start gap-4">
                  {/* Icon with colored background */}
                  <div className={`p-3 rounded-2xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    {stat.icon}
                  </div>
                  
                  <div className="flex-1">
                    {/* Value */}
                    <div className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <CardTitle className="text-left !mb-1">{stat.label}</CardTitle>
                    
                    {/* Description */}
                    <CardDescription className="text-left">{stat.description}</CardDescription>
                    
                    {/* Trend indicator */}
                    {stat.trend && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                        <TrendingUp size={12} />
                        {stat.trend}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid - Second row with 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.slice(3, 5).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl -mr-10 -mt-10`} />
                
                <div className="flex items-start gap-4">
                  {/* Icon with colored background */}
                  <div className={`p-3 rounded-2xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    {stat.icon}
                  </div>
                  
                  <div className="flex-1">
                    {/* Value */}
                    <div className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <CardTitle className="text-left !mb-1">{stat.label}</CardTitle>
                    
                    {/* Description */}
                    <CardDescription className="text-left">{stat.description}</CardDescription>
                    
                    {/* Trend indicator */}
                    {stat.trend && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                        <TrendingUp size={12} />
                        {stat.trend}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.8★</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Trustpilot Rating</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">99.9%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">5+ Years</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Business</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Secure</div>
          </div>
        </div>

        {/* Trust Indicators */}
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
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Updated Daily
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
