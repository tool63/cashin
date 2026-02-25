"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  Users,
  Gift,
  DollarSign,
  Trophy,
  Star,
  User,
  Target,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink,
  ChevronDown,
  ClipboardList,
  Gamepad2,
  Film,
  LayoutGrid,
  Eye,
  Sparkles,
  FlaskConical,
  Mail,
  MousePointerClick,
  FileText,
  Award,
  Ticket,
  Hammer,
  CheckSquare,
  Timer,
  Puzzle,
  PenTool,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  Shield,
  Clock,
  Globe,
  Wallet,
  BarChart3,
  Rocket,
  Crown,
  Gem,
  Diamond,
  Medal,
  ThumbsUp,
  HeartHandshake,
  Briefcase,
  Coffee,
  Compass,
  Cpu,
  CreditCard,
  Database,
  Headphones,
  Heart,
  Infinity,
  Key,
  Layers,
  Lightbulb,
  Link,
  Lock,
  Map,
  Maximize2,
  Mic,
  Minimize2,
  Moon,
  Move,
  Music,
  Navigation,
  Network,
  Package,
  Paintbrush,
  Paperclip,
  Phone,
  PieChart,
  PiggyBank,
  Pin,
  Plane,
  Play,
  Plus,
  Power,
  Printer,
  Radio,
  RefreshCw,
  Repeat,
  Rewind,
  RotateCcw,
  Rss,
  Save,
  Scan,
  Search,
  Send,
  Server,
  Settings,
  Share,
  ShieldAlert,
  ShoppingBag,
  Shuffle,
  SkipBack,
  SkipForward,
  Sliders,
  SmartphoneCharging,
  Smile,
  Speaker,
  Square,
  Star as StarIcon,
  Sun,
  SwitchCamera,
  Table,
  Tag,
  Target as TargetIcon,
  Terminal,
  Thermometer,
  ThumbsDown,
  ThumbsUp as ThumbsUpIcon,
  ToggleLeft,
  ToggleRight,
  Trash,
  Trello,
  Truck,
  Tv,
  Umbrella,
  Underline,
  Undo,
  Unlink,
  Unlock,
  Upload,
  Usb,
  UserCheck,
  UserMinus,
  UserPlus,
  UserX,
  Users as UsersIcon,
  Verified,
  Vibrate,
  Video,
  Voicemail,
  Volume1,
  Volume2,
  VolumeX,
  Wallet as WalletIcon,
  Wand,
  Watch,
  Waves,
  Webcam,
  Wifi,
  Wind,
  X,
  XCircle,
  XOctagon,
  XSquare,
  Youtube,
  Zap as ZapIcon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

/* ================= AFFILIATE STATS ================= */
const affiliateStats = [
  {
    label: "Commission Rate",
    value: "15%",
    icon: <DollarSign className="w-8 h-8 text-white" />,
    description: "Earn 15% commission on all referrals' earnings",
    trend: "+25% this month",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    label: "Active Affiliates",
    value: "50K+",
    icon: <Users className="w-8 h-8 text-white" />,
    description: "Join thousands of earning affiliates",
    trend: "Growing daily",
    gradient: "from-blue-400 to-indigo-400",
  },
  {
    label: "Trustpilot Rating",
    value: "4.7",
    icon: <Star className="w-8 h-8 text-white" />,
    description: "Excellent rating from 266K+ reviews",
    trend: "Top rated",
    gradient: "from-amber-400 to-orange-400",
  },
];

/* ================= HOW IT WORKS STEPS ================= */
const steps = [
  {
    icon: <User className="w-10 h-10 text-white" />,
    title: "Invite Your Friends",
    desc: "Create your custom referral link and share it with friends across social media.",
    gradient: "from-amber-400 to-orange-400",
    badge: "Step 1",
  },
  {
    icon: <Gift className="w-10 h-10 text-white" />,
    title: "They Earn, You Earn",
    desc: "When your friends complete any task, you earn 15% commission on their earnings.",
    gradient: "from-emerald-400 to-teal-400",
    badge: "Step 2",
  },
  {
    icon: <DollarSign className="w-10 h-10 text-white" />,
    title: "Cashout Together",
    desc: "Withdraw your commissions instantly via PayPal, crypto, or gift cards.",
    gradient: "from-blue-400 to-indigo-400",
    badge: "Step 3",
  },
];

/* ================= AFFILIATE BONUSES ================= */
const bonuses = [
  {
    icon: <Users className="w-10 h-10 text-white" />,
    title: "Team Bonuses",
    desc: "Earn extra rewards when your team reaches milestone targets together.",
    metric: "Up to +5%",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: <Zap className="w-10 h-10 text-white" />,
    title: "Boosting Events",
    desc: "During special events, earn double or triple commissions on all referrals.",
    metric: "2x-3x",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: <Target className="w-10 h-10 text-white" />,
    title: "Monthly Contests",
    desc: "Compete with top affiliates for massive bonus prizes and recognition.",
    metric: "$10K Pool",
    gradient: "from-rose-400 to-red-400",
  },
];

/* ================= ALL EARNING METHODS ================= */
const allEarningMethods = [
  { name: "Surveys", path: "/surveys", icon: <ClipboardList className="w-6 h-6" />, gradient: "from-blue-400 to-cyan-400", earnings: "$2-5", color: "blue" },
  { name: "App Installs", path: "/app-installs", icon: <Smartphone className="w-6 h-6" />, gradient: "from-green-400 to-emerald-400", earnings: "$2-4", color: "green" },
  { name: "Playing Games", path: "/play-games", icon: <Gamepad2 className="w-6 h-6" />, gradient: "from-purple-400 to-pink-400", earnings: "$3-10", color: "purple" },
  { name: "Watching Videos", path: "/watch-videos", icon: <Film className="w-6 h-6" />, gradient: "from-red-400 to-rose-400", earnings: "$1-3", color: "red" },
  { name: "Mining Rewards", path: "/mining-rewards", icon: <Hammer className="w-6 h-6" />, gradient: "from-amber-400 to-orange-400", earnings: "$5-20", color: "amber" },
  { name: "Completing Offers", path: "/complete-offers", icon: <CheckSquare className="w-6 h-6" />, gradient: "from-indigo-400 to-purple-400", earnings: "$2-15", color: "indigo" },
  { name: "Offerwall", path: "/offerwall", icon: <LayoutGrid className="w-6 h-6" />, gradient: "from-pink-400 to-rose-400", earnings: "$1-50", color: "pink" },
  { name: "Surveywall", path: "/surveywall", icon: <ClipboardList className="w-6 h-6" />, gradient: "from-cyan-400 to-blue-400", earnings: "$2-8", color: "cyan" },
  { name: "Watching Ads", path: "/watch-ads", icon: <Eye className="w-6 h-6" />, gradient: "from-amber-400 to-yellow-400", earnings: "$0.5-2", color: "amber" },
  { name: "Micro Tasks", path: "/micro-tasks", icon: <Sparkles className="w-6 h-6" />, gradient: "from-lime-400 to-green-400", earnings: "$1-5", color: "lime" },
  { name: "Free Trials", path: "/complete-free-trials", icon: <Timer className="w-6 h-6" />, gradient: "from-emerald-400 to-teal-400", earnings: "$5-25", color: "emerald" },
  { name: "Testing Products", path: "/test-products", icon: <FlaskConical className="w-6 h-6" />, gradient: "from-teal-400 to-cyan-400", earnings: "$10-50", color: "teal" },
  { name: "Reading Emails", path: "/read-emails", icon: <Mail className="w-6 h-6" />, gradient: "from-orange-400 to-amber-400", earnings: "$0.5-2", color: "orange" },
  { name: "Visiting Websites", path: "/visit-websites", icon: <Globe className="w-6 h-6" />, gradient: "from-rose-400 to-pink-400", earnings: "$0.5-3", color: "rose" },
  { name: "Review Tasks", path: "/review-tasks", icon: <PenTool className="w-6 h-6" />, gradient: "from-violet-400 to-purple-400", earnings: "$3-15", color: "violet" },
  { name: "Spinning Wheel", path: "/spinning-wheel", icon: <Puzzle className="w-6 h-6" />, gradient: "from-fuchsia-400 to-pink-400", earnings: "$1-100", color: "fuchsia" },
  { name: "Loyalty", path: "/loyalty", icon: <Crown className="w-6 h-6" />, gradient: "from-yellow-400 to-amber-400", earnings: "Exclusive", color: "yellow" },
  { name: "Vouchers", path: "/vouchers", icon: <Ticket className="w-6 h-6" />, gradient: "from-green-400 to-emerald-400", earnings: "Gift cards", color: "green" },
];

/* ================= FEATURES ================= */
const features = [
  {
    icon: <Rocket className="w-8 h-8 text-white" />,
    title: "Instant Payouts",
    desc: "Get your commissions instantly, no waiting periods",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Secure Platform",
    desc: "Bank-level security for your earnings and data",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-white" />,
    title: "Real-time Analytics",
    desc: "Track your referrals and earnings in real-time",
    gradient: "from-green-400 to-emerald-400",
  },
  {
    icon: <Wallet className="w-8 h-8 text-white" />,
    title: "Multiple Payouts",
    desc: "PayPal, crypto, gift cards, and more options",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: <Clock className="w-8 h-8 text-white" />,
    title: "24/7 Support",
    desc: "Dedicated support team always ready to help",
    gradient: "from-red-400 to-rose-400",
  },
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    title: "Global Program",
    desc: "Available in 100+ countries worldwide",
    gradient: "from-indigo-400 to-purple-400",
  },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  {
    name: "Cryptozeal",
    date: "February 18, 2026",
    content: "The 15% commission is amazing! I'm earning passive income from my friends' daily activities. Made over $500 in my first month!",
    rating: 5,
    avatar: "C",
    earnings: "$2,450+",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Michael Raisner",
    date: "February 11, 2026",
    content: "Great affiliate program! My friends love the platform and I love the recurring commissions.",
    rating: 5,
    avatar: "M",
    earnings: "$1,280+",
    gradient: "from-green-400 to-emerald-400",
  },
  {
    name: "Dx Tik",
    date: "January 30, 2026",
    content: "I share my link everywhere. Every time my friends complete surveys or install apps, I earn. Best decision ever!",
    rating: 5,
    avatar: "D",
    earnings: "$3,100+",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    name: "Sarah Johnson",
    date: "February 5, 2026",
    content: "The team bonuses are incredible. Built a team of 50+ active members and earning daily commissions.",
    rating: 5,
    avatar: "S",
    earnings: "$5,670+",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    name: "Nichole",
    date: "January 15, 2026",
    content: "I've cashed out over $1000 from referrals alone. The 15% commission adds up fast!",
    rating: 5,
    avatar: "N",
    earnings: "$1,890+",
    gradient: "from-red-400 to-rose-400",
  },
  {
    name: "David Chen",
    date: "February 20, 2026",
    content: "Boosting events doubled my earnings last month. Best affiliate program I've ever joined.",
    rating: 5,
    avatar: "D",
    earnings: "$4,230+",
    gradient: "from-indigo-400 to-purple-400",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How does the 15% commission work?",
    a: "You earn 15% commission on everything your referrals earn on Cashog. If they complete surveys, install apps, play games, or do any other task, you get 15% of their earnings automatically.",
  },
  {
    q: "Is there a limit to how many friends I can refer?",
    a: "No, there's no limit! You can refer unlimited friends and earn 15% commission on all their earnings.",
  },
  {
    q: "How can I track my earnings from referrals?",
    a: "You can track all your referral earnings and activity in your dashboard under the 'Invite Friends' section with real-time analytics.",
  },
  {
    q: "Do I earn from all earning methods?",
    a: "Yes! You earn 15% commission from every earning method: surveys, app installs, games, videos, mining rewards, offers, offerwall, surveywall, and all extra earning methods.",
  },
  {
    q: "When do commissions get credited?",
    a: "Commissions are credited instantly when your referrals complete tasks and their earnings are confirmed.",
  },
  {
    q: "What payment methods are available?",
    a: "You can withdraw your commissions via PayPal, cryptocurrency, gift cards, and more with instant processing.",
  },
];

/* ================= PAGE ================= */
export default function AffiliatePage() {
  return (
    <>
      <Meta
        title="Affiliate Program - Earn 15% Commission | Cashog"
        description="Join the #1 affiliate program. Earn 15% commission on everything your referrals earn. Surveys, apps, games, and more!"
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        {/* Premium Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400/5 to-green-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        </div>

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO WITH PREMIUM BADGES */}
          <Reveal>
            <div className="text-center mb-20 relative">
              {/* Animated Background - FIXED: Removed Infinity reference */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-400/10 rounded-full"
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/10 to-green-400/10 rounded-full border border-yellow-400/20 backdrop-blur-sm mb-8"
              >
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">The #1 Affiliate Program</span>
                <Crown className="w-5 h-5 text-green-400" />
              </motion.div>
              
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Earn 15%
                </span>
                <br />
                <span className="text-4xl sm:text-5xl md:text-6xl text-gray-600 dark:text-gray-400">
                  On Everything Your Friends Do
                </span>
              </h1>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center text-black font-bold text-sm border-2 border-white dark:border-gray-900 shadow-lg"
                    >
                      {i}
                    </motion.div>
                  ))}
                </div>
                <span className="text-2xl font-bold">Excellent</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <motion.div
                      key={star}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-3 text-lg">
                <span className="font-bold text-2xl">266,096+</span> reviews on
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-3 mb-10"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  TP
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Trustpilot</span>
              </motion.div>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                {[
                  { icon: <Zap className="w-4 h-4" />, text: "Instant Payouts" },
                  { icon: <Infinity className="w-4 h-4" />, text: "No Limits" },
                  { icon: <Globe className="w-4 h-4" />, text: "Global Program" },
                  { icon: <Clock className="w-4 h-4" />, text: "24/7 Support" },
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

              <div className="flex justify-center">
                <PrimaryCTA href="/signup">
                  Start Earning 15% Now
                </PrimaryCTA>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
              />
            </div>
          </Reveal>

          {/* STATS SECTION WITH PREMIUM CARDS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    Affiliate Program Stats
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Real numbers from our top-earning affiliates
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {affiliateStats.map((stat, index) => (
                <Reveal key={stat.label}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative"
                  >
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    
                    {/* Card */}
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                      
                      <div className="relative">
                        {/* Icon Container */}
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.gradient} p-0.5 mb-6`}>
                          <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0a0d16] flex items-center justify-center">
                            {stat.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                          {stat.label}
                        </h3>
                        
                        <div className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
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

          {/* HOW IT WORKS WITH PREMIUM CARDS */}
          <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    How It Works
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Start earning 15% commission in three simple steps
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.title}>
                  <motion.div
                    whileHover={{ y: -12 }}
                    className="group relative"
                  >
                    {/* Step Number Badge */}
                    <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-2xl z-10 shadow-2xl`}>
                      {index + 1}
                    </div>
                    
                    {/* Card */}
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-3xl p-8 pt-16 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                      
                      <div className="relative">
                        {/* Icon */}
                        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-r ${step.gradient} p-0.5 mb-6 mx-auto`}>
                          <div className="w-full h-full rounded-3xl bg-white dark:bg-[#0a0d16] flex items-center justify-center">
                            {step.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                          {step.desc}
                        </p>
                        
                        {/* Decorative Line */}
                        <div className={`mt-6 h-1 w-20 mx-auto bg-gradient-to-r ${step.gradient} rounded-full`} />
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ALL EARNING METHODS - ULTRA PREMIUM SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    18+ Ways to Earn
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                  Your referrals can earn through these methods - and you earn 15% on everything!
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                  {[
                    { icon: "💰", text: "15% Commission", gradient: "from-yellow-400 to-green-400" },
                    { icon: "⚡", text: "Instant Tracking", gradient: "from-blue-400 to-cyan-400" },
                    { icon: "🚀", text: "No Limits", gradient: "from-purple-400 to-pink-400" },
                    { icon: "🌍", text: "Global", gradient: "from-emerald-400 to-teal-400" },
                  ].map((badge, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-6 py-3 bg-gradient-to-r ${badge.gradient} rounded-full text-black font-semibold shadow-xl flex items-center gap-2`}
                    >
                      <span className="text-lg">{badge.icon}</span>
                      <span>{badge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </>
            </Reveal>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {allEarningMethods.map((method) => (
                <Reveal key={method.name}>
                  <motion.a
                    href={method.path}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative block"
                  >
                    {/* Premium Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                    
                    {/* Card */}
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Icon Container with Gradient - ULTRA PREMIUM */}
                      <div className="relative mb-4">
                        {/* Outer Glow Ring */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                        
                        {/* Main Icon Container */}
                        <div className={`relative w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${method.gradient} p-[2px]`}>
                          <div className="w-full h-full rounded-xl bg-white dark:bg-[#0a0d16] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className={`text-${method.color}-400 group-hover:text-white transition-colors duration-300 relative z-10`}>
                              {method.icon}
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating 15% Badge - ANIMATED */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-white text-xs font-bold shadow-xl"
                        >
                          15%
                        </motion.div>
                        
                        {/* Sparkle Effect */}
                        <motion.div
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full blur-sm"
                        />
                      </div>
                      
                      <h3 className="text-base font-bold text-center mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-300">
                        {method.name}
                      </h3>
                      
                      <div className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {method.earnings}
                      </div>
                      
                      {/* Premium Progress Indicator */}
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                          className={`h-full bg-gradient-to-r ${method.gradient}`}
                        />
                      </div>
                      
                      {/* Bottom Glow Line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${method.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-16 text-center"
            >
              <div className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 to-green-400 rounded-2xl text-black font-bold text-xl shadow-2xl">
                <span className="mr-3 text-2xl">🎯</span>
                18+ earning methods - Start referring now!
              </div>
            </motion.div>
          </section>

          {/* BONUSES SECTION WITH PREMIUM CARDS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    Unlock More Bonuses
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Extra rewards on top of your 15% commission
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {bonuses.map((bonus) => (
                <Reveal key={bonus.title}>
                  <motion.div
                    whileHover={{ y: -12 }}
                    className="group relative"
                  >
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${bonus.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                      {/* Metric Badge */}
                      <div className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${bonus.gradient} rounded-full text-white font-bold text-sm shadow-lg`}>
                        {bonus.metric}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${bonus.gradient} p-0.5 mb-6`}>
                        <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0a0d16] flex items-center justify-center">
                          {bonus.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3">{bonus.title}</h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {bonus.desc}
                      </p>
                      
                      {/* Decorative Line */}
                      <div className={`mt-6 h-1 w-20 bg-gradient-to-r ${bonus.gradient} rounded-full`} />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    Premium Features
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Everything you need to succeed as an affiliate
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {features.map((feature) => (
                <Reveal key={feature.title}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-300`} />
                    
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-4`}>
                        <div className="w-full h-full rounded-xl bg-white dark:bg-[#0a0d16] flex items-center justify-center">
                          {feature.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-bold mb-2">{feature.title}</h3>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS SECTION WITH PREMIUM CARDS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    50,000+ Affiliates Trust Us
                  </span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
                  Real earnings from real people
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={index}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative"
                  >
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                    
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                      {/* Earnings Badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r ${testimonial.gradient} rounded-full text-white text-xs font-bold shadow-lg`}>
                        {testimonial.earnings}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${testimonial.gradient} p-0.5`}>
                          <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0a0d16] flex items-center justify-center text-xl font-bold">
                            {testimonial.avatar}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-xs text-gray-500">{testimonial.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-xs text-gray-500">Verified Affiliate</span>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-16 text-lg">
                Everything you need to know about earning 15% commission
              </p>
            </Reveal>

            <FAQ faqs={faqs} />
          </section>

          {/* FINAL CTA WITH ULTRA PREMIUM DESIGN - REMOVED DASHBOARD BUTTON */}
          <section className="relative z-10 text-center py-20">
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
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 opacity-90"
                />
                
                {/* Content */}
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-16 m-1">
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"
                  />
                  
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-yellow-400/20 rounded-full"
                    />
                    
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <Crown className="w-12 h-12 text-yellow-400" />
                      <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold">
                        <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                          Ready to Earn 15%?
                        </span>
                      </h2>
                      <Crown className="w-12 h-12 text-green-400" />
                    </div>

                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                      Join 50,000+ affiliates already earning from 18+ methods
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                      {[
                        { text: "⚡ Instant Payouts", gradient: "from-yellow-400/10 to-green-400/10" },
                        { text: "🎯 No Limits", gradient: "from-blue-400/10 to-cyan-400/10" },
                        { text: "🌍 Global", gradient: "from-purple-400/10 to-pink-400/10" },
                        { text: "💰 15% Commission", gradient: "from-emerald-400/10 to-teal-400/10" },
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

                    <div className="flex justify-center">
                      <PrimaryCTA href="/signup">
                        Become an Affiliate Now
                      </PrimaryCTA>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-8">
                      🔒 Free to join • No credit card required • 50,000+ active affiliates
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
