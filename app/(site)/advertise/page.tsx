// app/(site)/advertise/page.tsx

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
  // Core icons - All valid Lucide exports
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
  Video,
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
  Beer,
  Wine,
  Utensils,
  Megaphone,
  RadioTower,
  Wifi,
  Activity,
  Crosshair,
  MousePointer,
  MousePointerClick,
  Pointer,
  Hand,
  QrCode,
  Newspaper,
  BookOpen,
  FileText,
  FileSpreadsheet,
  FileBarChart,
  FilePieChart,
  FileLineChart,
  FileCog,
  FileCheck,
  FileWarning,
  FileX,
  FileMinus,
  FilePlus,
  FileSearch,
  FileScan,
  FileVideo,
  FileAudio,
  FileImage,
  FileCode,
  FileJson,
  FileType,
  FileDigit,
  LayoutGrid,
} from "lucide-react";

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

const AreaChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
  </svg>
);

const CandlestickChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V4M7 8h4M7 12h4M7 16h4M13 20V4M13 8h4M13 12h4M13 16h4" />
  </svg>
);

const BarChart4 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18M5 16h2M9 12h2M13 8h2M17 4h2" />
  </svg>
);

const FileSliders = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    <circle cx="8" cy="6" r="2" fill="currentColor" />
    <circle cx="16" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="18" r="2" fill="currentColor" />
  </svg>
);

/* ================= AD STATS ================= */
const adStats = [
  {
    label: "Daily Impressions",
    value: "10M+",
    icon: <Eye className="w-5 h-5" />,
    trend: "+25%",
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Click-Through Rate",
    value: "3.2%",
    icon: <MousePointerClick className="w-5 h-5" />,
    trend: "+0.5%",
    gradient: "from-blue-400 to-indigo-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Active Campaigns",
    value: "1,250+",
    icon: <Megaphone className="w-5 h-5" />,
    trend: "+18%",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

/* ================= AD FORMATS ================= */
const adFormats = [
  { name: "Banner Ads", icon: <LayoutGrid className="w-4 h-4" />, ctr: "0.8%", gradient: "from-blue-400 to-cyan-400", color: "blue" },
  { name: "Native Ads", icon: <Newspaper className="w-4 h-4" />, ctr: "1.2%", gradient: "from-green-400 to-emerald-400", color: "green" },
  { name: "Video Ads", icon: <Film className="w-4 h-4" />, ctr: "2.5%", gradient: "from-purple-400 to-pink-400", color: "purple" },
  { name: "Interstitial", icon: <Maximize2 className="w-4 h-4" />, ctr: "1.8%", gradient: "from-red-400 to-rose-400", color: "red" },
  { name: "Rewarded Video", icon: <Gift className="w-4 h-4" />, ctr: "4.2%", gradient: "from-amber-400 to-orange-400", color: "amber" },
  { name: "Playable Ads", icon: <Gamepad2 className="w-4 h-4" />, ctr: "3.5%", gradient: "from-indigo-400 to-purple-400", color: "indigo" },
  { name: "Offerwall", icon: <LayoutGrid className="w-4 h-4" />, ctr: "2.8%", gradient: "from-pink-400 to-rose-400", color: "pink" },
  { name: "Native Video", icon: <Video className="w-4 h-4" />, ctr: "3.1%", gradient: "from-cyan-400 to-blue-400", color: "cyan" },
  { name: "Rich Media", icon: <Sparkles className="w-4 h-4" />, ctr: "2.2%", gradient: "from-lime-400 to-green-400", color: "lime" },
  { name: "Display Ads", icon: <Monitor className="w-4 h-4" />, ctr: "0.9%", gradient: "from-teal-400 to-cyan-400", color: "teal" },
  { name: "Mobile Ads", icon: <Smartphone className="w-4 h-4" />, ctr: "2.7%", gradient: "from-orange-400 to-amber-400", color: "orange" },
  { name: "Desktop Ads", icon: <Laptop className="w-4 h-4" />, ctr: "1.4%", gradient: "from-rose-400 to-pink-400", color: "rose" },
];

/* ================= TARGETING OPTIONS ================= */
const targetingOptions = [
  { name: "Demographic", icon: <Users className="w-4 h-4" />, gradient: "from-blue-400 to-cyan-400", color: "blue" },
  { name: "Geographic", icon: <Globe className="w-4 h-4" />, gradient: "from-green-400 to-emerald-400", color: "green" },
  { name: "Behavioral", icon: <Activity className="w-4 h-4" />, gradient: "from-purple-400 to-pink-400", color: "purple" },
  { name: "Contextual", icon: <FileText className="w-4 h-4" />, gradient: "from-red-400 to-rose-400", color: "red" },
  { name: "Device", icon: <Smartphone className="w-4 h-4" />, gradient: "from-amber-400 to-orange-400", color: "amber" },
  { name: "Time of Day", icon: <Clock className="w-4 h-4" />, gradient: "from-indigo-400 to-purple-400", color: "indigo" },
  { name: "Interest", icon: <Heart className="w-4 h-4" />, gradient: "from-pink-400 to-rose-400", color: "pink" },
  { name: "Retargeting", icon: <Repeat className="w-4 h-4" />, gradient: "from-cyan-400 to-blue-400", color: "cyan" },
];

/* ================= AD PLACEMENTS ================= */
const adPlacements = [
  { name: "In-App", icon: <Smartphone className="w-4 h-4" />, reach: "500M+", gradient: "from-blue-400 to-cyan-400" },
  { name: "Mobile Web", icon: <Globe className="w-4 h-4" />, reach: "750M+", gradient: "from-green-400 to-emerald-400" },
  { name: "Desktop", icon: <Monitor className="w-4 h-4" />, reach: "350M+", gradient: "from-purple-400 to-pink-400" },
  { name: "CTV", icon: <Tv className="w-4 h-4" />, reach: "200M+", gradient: "from-red-400 to-rose-400" },
];

/* ================= PERFORMANCE METRICS ================= */
const performanceMetrics = [
  { label: "Avg. CPM", value: "$4.50", icon: <DollarSign className="w-4 h-4" />, gradient: "from-emerald-400 to-teal-400" },
  { label: "Avg. CPC", value: "$0.35", icon: <MousePointerClick className="w-4 h-4" />, gradient: "from-blue-400 to-indigo-400" },
  { label: "Fill Rate", value: "98%", icon: <Percent className="w-4 h-4" />, gradient: "from-amber-400 to-orange-400" },
  { label: "Viewability", value: "92%", icon: <Eye className="w-4 h-4" />, gradient: "from-purple-400 to-pink-400" },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  {
    name: "Global Brands Inc.",
    avatar: "GB",
    revenue: "+156%",
    quote: "Best ROI we've seen across all ad networks.",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "TechStart",
    avatar: "TS",
    revenue: "+243%",
    quote: "Incredible reach and targeting capabilities.",
    gradient: "from-green-400 to-emerald-400",
  },
  {
    name: "Media Group",
    avatar: "MG",
    revenue: "+189%",
    quote: "The analytics and reporting are unmatched.",
    gradient: "from-purple-400 to-pink-400",
  },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "What ad formats do you support?", a: "We support banners, native, video, interstitial, rewarded video, and playable ads." },
  { q: "What targeting options are available?", a: "Demographic, geographic, behavioral, contextual, device, and retargeting." },
  { q: "What is the minimum campaign budget?", a: "Start with as low as $500 for testing campaigns." },
  { q: "How are payments processed?", a: "Net-30 terms for qualified advertisers, prepay options available." },
  { q: "Do you offer self-serve platform?", a: "Yes, our self-serve dashboard gives you full control over campaigns." },
  { q: "What reporting is available?", a: "Real-time analytics, custom reports, and API access." },
];

/* ================= PAGE ================= */
export default function AdvertisePage() {
  return (
    <>
      <Meta
        title="Advertise - Reach Millions of Users | Cashog"
        description="Scale your brand with our premium ad inventory. Reach millions of engaged users across web and mobile."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        {/* Premium Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/5 to-green-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        </div>

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO SECTION - Yellow/Green gradient like affiliate page */}
          <Reveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl mb-20"
            >
              {/* Animated Background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 180],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 opacity-90"
              />
              
              {/* Content */}
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-16 m-1">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"
                />
                
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-yellow-400/20 rounded-full"
                  />
                  
                  <div className="relative text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/10 to-green-400/10 rounded-full border border-yellow-400/20 backdrop-blur-sm mb-8"
                    >
                      <Megaphone className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Premium Ad Network</span>
                      <Megaphone className="w-5 h-5 text-green-400" />
                    </motion.div>
                    
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 leading-tight">
                      <span className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                        Reach Millions
                      </span>
                      <br />
                      <span className="text-4xl sm:text-5xl md:text-6xl text-gray-600 dark:text-gray-400">
                        of Engaged Users
                      </span>
                    </h1>

                    <div className="flex items-center justify-center gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">10M+</div>
                        <div className="text-sm text-gray-500">Daily Impressions</div>
                      </div>
                      <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">98%</div>
                        <div className="text-sm text-gray-500">Fill Rate</div>
                      </div>
                      <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">100+</div>
                        <div className="text-sm text-gray-500">Countries</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                      {[
                        { icon: <Target className="w-4 h-4" />, text: "Precise Targeting" },
                        { icon: <BarChart3 className="w-4 h-4" />, text: "Real-time Analytics" },
                        { icon: <Shield className="w-4 h-4" />, text: "Brand Safe" },
                        { icon: <Rocket className="w-4 h-4" />, text: "Fast Delivery" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800 shadow-lg"
                        >
                          <div className="text-yellow-400">{item.icon}</div>
                          <span className="text-sm font-medium">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <PrimaryCTA href="/advertise/start">
                        Start Campaign
                      </PrimaryCTA>
                      <motion.a
                        href="/contact-sales"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-4 text-lg font-semibold rounded-xl bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:shadow-lg transition-all duration-300"
                      >
                        Contact Sales
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* STATS SECTION - Emerald/Teal gradient like affiliate page */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
            <RevealWithBorder
              gradientFrom="from-emerald-400"
              gradientVia="via-teal-400"
              gradientTo="to-cyan-400"
              borderColor="border-emerald-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Network Performance
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-12">
                  {adStats.map((stat) => (
                    <Reveal key={stat.label}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={stat.iconColor}>
                            {stat.icon}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold">{stat.value}</span>
                            <span className="text-xs text-green-400">{stat.trend}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* AD FORMATS - Blue/Cyan gradient like affiliate page */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-blue-400"
              gradientVia="via-cyan-400"
              gradientTo="to-sky-400"
              borderColor="border-blue-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Ad Formats
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {adFormats.map((format) => (
                    <Reveal key={format.name}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${format.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={`text-${format.color}-600 dark:text-${format.color}-400`}>
                            {format.icon}
                          </div>
                        </div>
                        <span className="text-xs font-medium">{format.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                          {format.ctr}
                        </span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* TARGETING OPTIONS - Green/Teal gradient like affiliate page */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-green-400"
              gradientVia="via-emerald-400"
              gradientTo="to-teal-400"
              borderColor="border-green-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                    Targeting Options
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {targetingOptions.map((option) => (
                    <Reveal key={option.name}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${option.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={`text-${option.color}-600 dark:text-${option.color}-400`}>
                            {option.icon}
                          </div>
                        </div>
                        <span className="text-xs font-medium">{option.name}</span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* AD PLACEMENTS - Amber/Red gradient like affiliate page */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-amber-400"
              gradientVia="via-orange-400"
              gradientTo="to-red-400"
              borderColor="border-amber-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                    Ad Placements
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-8">
                  {adPlacements.map((placement) => (
                    <Reveal key={placement.name}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${placement.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={`text-${placement.gradient.split(' ')[0].replace('from-', '')}-600 dark:text-white`}>
                            {placement.icon}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">{placement.name}</div>
                          <div className="text-xs text-gray-500">{placement.reach} users</div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* PERFORMANCE METRICS - Indigo/Pink gradient like affiliate page */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-indigo-400"
              gradientVia="via-purple-400"
              gradientTo="to-pink-400"
              borderColor="border-indigo-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                    Performance Metrics
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-12">
                  {performanceMetrics.map((metric) => (
                    <Reveal key={metric.label}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${metric.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={`text-${metric.gradient.split(' ')[0].replace('from-', '')}-600 dark:text-white`}>
                            {metric.icon}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">{metric.label}</div>
                          <div className="text-xl font-bold">{metric.value}</div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* TESTIMONIALS - Rose/Purple gradient like affiliate page */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-rose-400"
              gradientVia="via-pink-400"
              gradientTo="to-purple-400"
              borderColor="border-rose-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                    Success Stories
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-8">
                  {testimonials.map((testimonial) => (
                    <Reveal key={testimonial.name}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                          {testimonial.avatar}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">{testimonial.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-green-400">{testimonial.revenue}</span>
                            <span className="text-[10px] text-gray-500">ROI</span>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* FAQ SECTION - Orange/Yellow gradient like affiliate page */}
          <section className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-orange-400"
              gradientVia="via-amber-400"
              gradientTo="to-yellow-400"
              borderColor="border-orange-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8 px-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <Reveal key={index}>
                      <motion.div
                        whileHover={{ y: -1 }}
                        className="p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-gray-800"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-1">{faq.q}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{faq.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* FINAL CTA - Yellow/Green gradient like affiliate page */}
          <section className="relative z-10 text-center">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180],
                  }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 opacity-90"
                />
                
                {/* Content */}
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-16 m-1">
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"
                  />
                  
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-yellow-400/20 rounded-full"
                    />
                    
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <Megaphone className="w-12 h-12 text-yellow-400" />
                      <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold">
                        <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                          Ready to Launch?
                        </span>
                      </h2>
                      <Megaphone className="w-12 h-12 text-green-400" />
                    </div>

                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                      Start reaching millions of engaged users today
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                      {[
                        { text: "🎯 Precise Targeting", gradient: "from-yellow-400/10 to-green-400/10" },
                        { text: "📊 Real-time Analytics", gradient: "from-blue-400/10 to-cyan-400/10" },
                        { text: "🛡️ Brand Safe", gradient: "from-purple-400/10 to-pink-400/10" },
                        { text: "🚀 Fast Delivery", gradient: "from-emerald-400/10 to-teal-400/10" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className={`px-6 py-3 bg-gradient-to-r ${item.gradient} rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20`}
                        >
                          {item.text}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <PrimaryCTA href="/advertise/start">
                        Start Campaign
                      </PrimaryCTA>
                      <motion.a
                        href="/contact-sales"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-4 text-lg font-semibold rounded-xl bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:shadow-lg transition-all duration-300"
                      >
                        Contact Sales
                      </motion.a>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-8">
                      🔒 No minimum commitment • Cancel anytime • 1,250+ active campaigns
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </section>

        </section>
      </main>
    </>
  );
}
