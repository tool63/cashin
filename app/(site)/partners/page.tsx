// app/(site)/partners/page.tsx

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import RevealWithBorder from "@/components/animations/RevealWithBorder";
import {
  // Core icons - All verified valid Lucide React icons
  Users,
  Gift,
  DollarSign,
  Trophy,
  Star,
  User,
  Target,
  Zap,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  Wallet,
  BarChart3,
  Rocket,
  Crown,
  Infinity,
  Briefcase,
  Building2,
  Award,
  Gem,
  Diamond,
  Medal,
  TrendingUp,
  Heart,
  Network,
  Sparkles,
  PartyPopper,
  CreditCard,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  BadgeCheck,
  Verified,
  ThumbsUp,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Video,  // Keep only one Video import
  Calendar,
  Timer,
  Watch,
  AlarmClock,
  Hourglass,
  Coffee,
  Moon,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Cloudy,
  Wind,
  Compass,
  Map,
  MapPin,
  Navigation,
  Eye,
  EyeOff,
  Scan,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Move,
  RotateCw,
  RotateCcw,
  Repeat,
  Shuffle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Volume1,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio,
  Music,
  Gamepad2,
  Puzzle,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Keyboard,
  Mouse,
  Printer,
  Camera,
  // Removed duplicate Video import
  Webcam,
  Film,
  Tv,
  Bot,
  Brain,
  Fingerprint,
  Key,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Hammer,
  Wrench,
  Building,
  Home,
  Factory,
  Warehouse,
  Store,
  ShoppingBag,
  ShoppingCart,
  Banknote,
  Coins,
  PiggyBank,
  Gem as GemIcon,
  Diamond as DiamondIcon,
  Beer,
  Wine,
  Utensils,
} from "lucide-react";

// ... rest of your component code remains exactly the same

/* ================= PARTNER STATS ================= */
const partnerStats = [
  {
    label: "Global Partners",
    value: "10,000+",
    icon: <Building2 className="w-8 h-8" />,
    description: "Trusted by leading brands worldwide",
    trend: "+35% this quarter",
    gradient: "from-blue-400 to-indigo-400",
    iconColor: "text-blue-600 dark:text-white",
  },
  {
    label: "Revenue Share",
    value: "20-30%",
    icon: <Percent className="w-8 h-8" />,
    description: "Competitive revenue share models",
    trend: "Top-tier rates",
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "text-emerald-600 dark:text-white",
  },
  {
    label: "Avg. Payout",
    value: "$5,000+",
    icon: <DollarSign className="w-8 h-8" />,
    description: "Average monthly partner payout",
    trend: "+45% YoY",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-white",
  },
];

/* ================= PARTNER TIERS ================= */
const partnerTiers = [
  {
    name: "Bronze Partner",
    icon: <Medal className="w-10 h-10" />,
    revenue: "20%",
    requirement: "$1K - $10K",
    benefits: [
      "Basic API access",
      "Email support",
      "Monthly reports",
      "Partner dashboard",
    ],
    gradient: "from-amber-600 to-amber-400",
    iconColor: "text-amber-600 dark:text-amber-400",
    bgGradient: "from-amber-400/10 to-amber-600/10",
  },
  {
    name: "Silver Partner",
    icon: <Award className="w-10 h-10" />,
    revenue: "25%",
    requirement: "$10K - $50K",
    benefits: [
      "Advanced API access",
      "Priority support",
      "Weekly reports",
      "Dedicated account manager",
      "Early access to features",
    ],
    gradient: "from-gray-400 to-gray-300",
    iconColor: "text-gray-600 dark:text-gray-300",
    bgGradient: "from-gray-400/10 to-gray-600/10",
    popular: false,
  },
  {
    name: "Gold Partner",
    icon: <Crown className="w-10 h-10" />,
    revenue: "30%",
    requirement: "$50K+",
    benefits: [
      "Full API access",
      "24/7 VIP support",
      "Real-time analytics",
      "Strategic account manager",
      "Custom integrations",
      "Co-marketing opportunities",
    ],
    gradient: "from-yellow-400 to-amber-400",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    bgGradient: "from-yellow-400/10 to-amber-400/10",
    popular: true,
  },
];

/* ================= PARTNER BENEFITS ================= */
const partnerBenefits = [
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Fast Integration",
    desc: "Get started in hours with our powerful API",
    gradient: "from-purple-400 to-pink-400",
    iconColor: "text-purple-600 dark:text-white",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    desc: "Bank-level encryption and compliance",
    gradient: "from-blue-400 to-cyan-400",
    iconColor: "text-blue-600 dark:text-white",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Real-time Analytics",
    desc: "Track performance with live dashboards",
    gradient: "from-green-400 to-emerald-400",
    iconColor: "text-green-600 dark:text-white",
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Flexible Payouts",
    desc: "Multiple payment options worldwide",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-white",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Dedicated Support",
    desc: "24/7 priority partner support",
    gradient: "from-red-400 to-rose-400",
    iconColor: "text-red-600 dark:text-white",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Reach",
    desc: "Access to 100+ countries worldwide",
    gradient: "from-indigo-400 to-purple-400",
    iconColor: "text-indigo-600 dark:text-white",
  },
];

/* ================= SUCCESS STORIES ================= */
const successStories = [
  {
    company: "TechCorp Solutions",
    logo: "TC",
    revenue: "$250K+",
    growth: "+156%",
    quote: "The partner program transformed our business. Best decision we ever made.",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    company: "Global Media Group",
    logo: "GMG",
    revenue: "$1.2M+",
    growth: "+243%",
    quote: "Incredible support and the best revenue share in the industry.",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    company: "Innovate Studios",
    logo: "IS",
    revenue: "$750K+",
    growth: "+189%",
    quote: "The tools and analytics helped us scale faster than ever.",
    gradient: "from-green-400 to-emerald-400",
  },
  {
    company: "Digital Ventures",
    logo: "DV",
    revenue: "$500K+",
    growth: "+167%",
    quote: "Partnership exceeded all expectations. Highly recommended!",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    company: "NextGen Apps",
    logo: "NGA",
    revenue: "$890K+",
    growth: "+201%",
    quote: "Best partner program in the industry. Period.",
    gradient: "from-red-400 to-rose-400",
  },
  {
    company: "Creative Solutions",
    logo: "CS",
    revenue: "$420K+",
    growth: "+134%",
    quote: "The support team is phenomenal. They're always there when needed.",
    gradient: "from-indigo-400 to-purple-400",
  },
];

/* ================= INTEGRATION OPTIONS ================= */
const integrations = [
  { name: "REST API", icon: <Network className="w-6 h-6" />, status: "Live", gradient: "from-blue-400 to-cyan-400" },
  { name: "Webhooks", icon: <Zap className="w-6 h-6" />, status: "Live", gradient: "from-yellow-400 to-amber-400" },
  { name: "SDK", icon: <Package className="w-6 h-6" />, status: "Beta", gradient: "from-purple-400 to-pink-400" },
  { name: "JavaScript", icon: <Code className="w-6 h-6" />, status: "Live", gradient: "from-green-400 to-emerald-400" },
  { name: "Python", icon: <Terminal className="w-6 h-6" />, status: "Live", gradient: "from-blue-400 to-indigo-400" },
  { name: "Ruby", icon: <Gem className="w-6 h-6" />, status: "Live", gradient: "from-red-400 to-rose-400" },
  { name: "PHP", icon: <Code2 className="w-6 h-6" />, status: "Live", gradient: "from-purple-400 to-violet-400" },
  { name: "Go", icon: <Cpu className="w-6 h-6" />, status: "Beta", gradient: "from-cyan-400 to-teal-400" },
  { name: "iOS SDK", icon: <Smartphone className="w-6 h-6" />, status: "Live", gradient: "from-gray-400 to-slate-400" },
  { name: "Android SDK", icon: <Tablet className="w-6 h-6" />, status: "Live", gradient: "from-green-400 to-lime-400" },
  { name: "React", icon: <Code2 className="w-6 h-6" />, status: "Live", gradient: "from-cyan-400 to-blue-400" },
  { name: "Vue", icon: <Code2 className="w-6 h-6" />, status: "Live", gradient: "from-emerald-400 to-teal-400" },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I become a partner?",
    a: "Simply fill out our partner application form. Our team will review and get back to you within 24-48 hours.",
  },
  {
    q: "What are the revenue share rates?",
    a: "We offer tiered revenue sharing from 20% to 30% based on your monthly volume. Higher tiers unlock better rates.",
  },
  {
    q: "How are payments processed?",
    a: "We support multiple payment methods including bank transfer, PayPal, and cryptocurrency with monthly payouts.",
  },
  {
    q: "Is there a minimum requirement?",
    a: "We have flexible entry requirements. Start with $1K monthly volume and grow with us.",
  },
  {
    q: "What kind of support do partners get?",
    a: "Partners receive dedicated account management, technical support, and strategic guidance based on their tier.",
  },
  {
    q: "Can I integrate with my existing platform?",
    a: "Yes! We offer comprehensive APIs, SDKs, and webhooks for seamless integration with your platform.",
  },
];

/* ================= CUSTOM ICONS ================= */
const Code = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Code2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const Terminal = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

/* ================= PAGE ================= */
export default function PartnerPage() {
  return (
    <>
      <Meta
        title="Partner Program - Join Our Global Network | Cashog"
        description="Become a Cashog partner and earn up to 30% revenue share. Join 10,000+ partners worldwide."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        {/* Premium Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-teal-400/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-full blur-3xl" />
        </div>

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO SECTION - Using RevealWithBorder */}
          <RevealWithBorder 
            gradientFrom="from-blue-400"
            gradientVia="via-purple-400" 
            gradientTo="to-pink-400"
            borderColor="border-blue-400/20"
            floatingElements={true}
            rotatingCircle={true}
          >
            <div className="text-center">
              {/* Premium Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full border border-blue-400/20 backdrop-blur-sm mb-8"
              >
                <Heart className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Join 10,000+ Partners Worldwide</span>
                <Heart className="w-5 h-5 text-purple-400" />
              </motion.div>
              
              {/* Main Heading */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Partner With Us
                </span>
                <br />
                <span className="text-4xl sm:text-5xl md:text-6xl text-gray-600 dark:text-gray-400">
                  and Grow Together
                </span>
              </h1>

              {/* Stats Preview */}
              <div className="flex items-center justify-center gap-8 mb-10">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10K+</div>
                  <div className="text-sm text-gray-500">Global Partners</div>
                </div>
                <div className="w-px h-10 bg-gray-300 dark:bg-gray-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">30%</div>
                  <div className="text-sm text-gray-500">Revenue Share</div>
                </div>
                <div className="w-px h-10 bg-gray-300 dark:bg-gray-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">100+</div>
                  <div className="text-sm text-gray-500">Countries</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                {[
                  { icon: <BadgeCheck className="w-4 h-4" />, text: "Enterprise Grade" },
                  { icon: <Shield className="w-4 h-4" />, text: "ISO 27001 Certified" },
                  { icon: <Globe className="w-4 h-4" />, text: "Global Network" },
                  { icon: <Clock className="w-4 h-4" />, text: "24/7 Support" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800 shadow-lg"
                  >
                    <div className="text-blue-400">{item.icon}</div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <PrimaryCTA href="/partner/apply">
                  Become a Partner
                </PrimaryCTA>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 text-lg font-semibold rounded-xl bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:shadow-lg transition-all duration-300"
                >
                  Contact Sales
                </motion.a>
              </div>

              {/* Partner Logos */}
              <div className="mt-16">
                <p className="text-sm text-gray-500 mb-6">Trusted by leading companies</p>
                <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </RevealWithBorder>

          {/* STATS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Partner Program Stats
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Real numbers from our growing partner network
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {partnerStats.map((stat) => (
                <Reveal key={stat.label}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                      
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.gradient} bg-opacity-10 mb-6 flex items-center justify-center`}>
                          <div className={stat.iconColor}>
                            {stat.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                          {stat.label}
                        </h3>
                        
                        <div className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                          {stat.description}
                        </p>
                        
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-full">
                          <span className="text-sm font-semibold text-green-400">
                            {stat.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* PARTNER TIERS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Partner Tiers
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Choose the perfect partnership level for your business
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {partnerTiers.map((tier) => (
                <Reveal key={tier.name}>
                  <motion.div
                    whileHover={{ y: -12 }}
                    className="group relative"
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full text-black text-xs font-bold z-20">
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`absolute inset-0 bg-gradient-to-r ${tier.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    
                    <div className={`relative bg-white dark:bg-[#0a0d16] rounded-3xl p-8 border-2 ${tier.popular ? 'border-yellow-400' : 'border-gray-200 dark:border-gray-800'} shadow-2xl overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                      
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${tier.gradient} bg-opacity-10 mb-6 flex items-center justify-center`}>
                          <div className={tier.iconColor}>
                            {tier.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                        
                        <div className="mb-4">
                          <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {tier.revenue}
                          </span>
                          <span className="text-gray-500 ml-2">revenue share</span>
                        </div>
                        
                        <div className="mb-6">
                          <span className="text-sm text-gray-500">Min. requirement:</span>
                          <span className="text-sm font-semibold ml-2">{tier.requirement}</span>
                        </div>
                        
                        <div className="space-y-3 mb-8">
                          {tier.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        
                        <motion.a
                          href="/partner/apply"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className={`block w-full py-3 text-center rounded-xl font-semibold transition-all duration-300 ${
                            tier.popular
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-black'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          Get Started
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* BENEFITS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Why Partner With Us
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Everything you need to succeed as a partner
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {partnerBenefits.map((benefit) => (
                <Reveal key={benefit.title}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-300`} />
                    
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${benefit.gradient} bg-opacity-10 mb-4 flex items-center justify-center`}>
                        <div className={benefit.iconColor}>
                          {benefit.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-bold mb-2">{benefit.title}</h3>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* SUCCESS STORIES SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <RevealWithBorder
              gradientFrom="from-purple-400"
              gradientVia="via-pink-400"
              gradientTo="to-red-400"
              borderColor="border-purple-400/20"
              floatingElements={true}
              rotatingCircle={true}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Success Stories
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                  Real partners, real results
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {successStories.map((story, index) => (
                  <Reveal key={index}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${story.gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                      
                      <div className="relative bg-white dark:bg-[#0a0d16] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${story.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                            {story.logo}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{story.company}</h4>
                            <div className="flex items-center gap-2">
                              <ArrowUpRight className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-green-400">{story.growth}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                          "{story.quote}"
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-semibold">{story.revenue}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </RevealWithBorder>
          </section>

          {/* INTEGRATIONS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Integrations & Tools
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Everything you need to integrate seamlessly
                </p>
              </>
            </Reveal>

            <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {integrations.map((integration) => (
                <Reveal key={integration.name}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${integration.gradient} rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`} />
                    
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-xl p-4 text-center border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-r ${integration.gradient} bg-opacity-10 mb-2 flex items-center justify-center`}>
                        <div className={`text-${integration.gradient.split(' ')[0].replace('from-', '')}-600 dark:text-white`}>
                          {integration.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-xs font-bold mb-1">{integration.name}</h3>
                      
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        integration.status === 'Live' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {integration.status}
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <RevealWithBorder
              gradientFrom="from-emerald-400"
              gradientVia="via-teal-400"
              gradientTo="to-cyan-400"
              borderColor="border-emerald-400/20"
              floatingElements={true}
              rotatingCircle={true}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    How It Works
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                  Get started in three simple steps
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Apply",
                    desc: "Fill out our partner application form. Our team reviews within 24 hours.",
                    icon: <FileText className="w-12 h-12" />,
                  },
                  {
                    step: "02",
                    title: "Integrate",
                    desc: "Use our powerful API and SDKs to integrate seamlessly with your platform.",
                    icon: <Code className="w-12 h-12" />,
                  },
                  {
                    step: "03",
                    title: "Earn",
                    desc: "Start earning revenue share and grow your business with us.",
                    icon: <TrendingUp className="w-12 h-12" />,
                  },
                ].map((item, index) => (
                  <Reveal key={item.step}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="relative text-center"
                    >
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-2xl">
                        {item.step}
                      </div>
                      
                      <div className="bg-white dark:bg-[#0a0d16] rounded-3xl p-8 pt-12 border border-gray-200 dark:border-gray-800 shadow-2xl">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 flex items-center justify-center mb-4">
                          <div className="text-emerald-600 dark:text-emerald-400">
                            {item.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </RevealWithBorder>
          </section>

          {/* FAQ SECTION */}
          <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
            <RevealWithBorder
              gradientFrom="from-orange-400"
              gradientVia="via-amber-400"
              gradientTo="to-yellow-400"
              borderColor="border-orange-400/20"
              floatingElements={true}
              rotatingCircle={true}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                  Everything you need to know about our partner program
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Reveal key={index}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400/10 to-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400" />
                        </div>
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm pl-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </RevealWithBorder>
          </section>

          {/* FINAL CTA */}
          <section className="relative z-10 text-center">
            <RevealWithBorder
              gradientFrom="from-blue-400"
              gradientVia="via-purple-400"
              gradientTo="to-pink-400"
              borderColor="border-blue-400/20"
              floatingElements={true}
              rotatingCircle={true}
            >
              <div className="py-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <Heart className="w-12 h-12 text-blue-400" />
                  <h2 className="text-5xl sm:text-6xl font-extrabold">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Ready to Partner?
                    </span>
                  </h2>
                  <Heart className="w-12 h-12 text-purple-400" />
                </div>

                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                  Join 10,000+ partners and start earning up to 30% revenue share
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                  {[
                    "🚀 Fast Integration",
                    "💸 20-30% Revenue Share",
                    "🌍 Global Reach",
                    "🎯 Dedicated Support",
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20"
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <PrimaryCTA href="/partner/apply">
                    Apply Now
                  </PrimaryCTA>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 text-lg font-semibold rounded-xl bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:shadow-lg transition-all duration-300"
                  >
                    Contact Sales
                  </motion.a>
                </div>

                <p className="text-sm text-gray-500 mt-8">
                  🔒 No commitment required • Free consultation • 10,000+ partners
                </p>
              </div>
            </RevealWithBorder>
          </section>

        </section>
      </main>
    </>
  );
}
