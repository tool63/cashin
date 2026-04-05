// app/[country]/(marketing)/online-jobs-for-beginners/page.tsx

import { cookies } from "next/headers";
import { Metadata } from "next";

import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
} from "@/app/core/countries";

import {
  COOKIE_KEYS,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import type { SupportedLanguage } from "@/app/core/types";

import { generateJsonLd } from "@/components/SEO/schema";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import CircleBorder from "@/components/animations/CircleBorder";
import OpeningStyle from "@/components/animations/openingstyle";
import FAQ from "@/components/animations/FAQ";

/* ================= TYPES ================= */

interface BeginnerJob {
  title: string;
  company: string;
  logo: string;
  salary: string;
  description: string;
  requirements: string[];
  jobType: string;
  startImmediately: boolean;
  link: string;
}

interface Skill {
  name: string;
  icon: string;
  description: string;
  timeToLearn: string;
  difficulty: string;
  freeResources: string[];
}

interface Platform {
  name: string;
  icon: string;
  description: string;
  bestFor: string[];
  jobsAvailable: number;
  link: string;
}

interface SuccessStory {
  name: string;
  age: number;
  location: string;
  earnings: string;
  story: string;
  jobType: string;
  startPoint: string;
}

interface Tip {
  title: string;
  description: string;
  icon: string;
}

interface TranslationSection {
  seo?: {
    title?: string;
    description?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
  };
  statsTitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  quickStartJobsTitle?: string;
  quickStartJobs?: BeginnerJob[];
  inDemandSkillsTitle?: string;
  inDemandSkills?: Skill[];
  topPlatformsTitle?: string;
  topPlatforms?: Platform[];
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  tipsTitle?: string;
  tips?: Tip[];
  redFlagsTitle?: string;
  redFlags?: Array<{
    warning: string;
    description: string;
    icon: string;
  }>;
  checklistTitle?: string;
  checklist?: {
    title?: string;
    items?: string[];
  };
  newsletterTitle?: string;
  newsletter?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    placeholder?: string;
  };
  faq?: {
    title?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  };
  final?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
}

/* ================= HELPERS ================= */

async function loadSectionTranslation(
  language: string,
  section: string
): Promise<TranslationSection> {
  try {
    const file = await import(`@/app/locales/${language}/${section}.json`);
    return file.default;
  } catch (error) {
    console.warn(`Missing translation: ${section} (${language})`);
    return {};
  }
}

function getLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  return getCountry(country).defaultLanguage as SupportedLanguage;
}

// Helper to replace placeholders
const replacePlaceholders = (text: string, countryName: string): string => {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName);
};

// Dynamic keywords based on country
const getCountrySpecificKeywords = (countryName: string, countryCode: string): string[] => {
  const lowerCountry = countryName.toLowerCase();
  
  const baseKeywords = [
    `online jobs for beginners ${lowerCountry}`,
    `entry level remote jobs ${lowerCountry}`,
    `work from home no experience ${lowerCountry}`,
    `easy online jobs ${lowerCountry}`,
    `beginner friendly remote work ${lowerCountry}`,
    `no experience work from home ${lowerCountry}`,
    `online jobs for students ${lowerCountry}`,
    `part time online jobs ${lowerCountry}`,
    `flexible online jobs ${lowerCountry}`,
    `legit online jobs for beginners ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "online jobs for beginners usa",
      "entry level remote work america",
      "no experience jobs usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "online jobs for beginners uk",
      "entry level remote work britain",
      "no experience jobs uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "online jobs for beginners canada",
      "entry level remote work canada",
      "no experience jobs canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "online jobs for beginners australia",
      "entry level remote work australia",
      "no experience jobs australia"
    );
  }

  return baseKeywords;
};

/* ================= METADATA ================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country?: string }> | { country?: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return {
      title: "Country Not Found | Cashog",
      robots: { index: false },
    };
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const language = getLanguage(country);

  let translation: TranslationSection = {};
  try {
    translation = await loadSectionTranslation(language, "online-jobs-for-beginners");
  } catch (error) {
    // Use defaults
  }

  const replaceCountry = (text: string | undefined, fallback: string): string => {
    const str = text || fallback;
    return str.replace(/\{country\}/g, countryName);
  };

  const rawTitle = translation?.seo?.title;
  const rawDescription = translation?.seo?.description;

  const seoTitle = replaceCountry(
    rawTitle,
    `Online Jobs for Beginners in ${countryName} - No Experience Remote Work | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Find legit online jobs for beginners in ${countryName}. No experience required! Discover entry-level remote work, flexible side hustles, and start earning from home today.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/online-jobs-for-beginners`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/online-jobs-for-beginners`,
      siteName: "Cashog",
      type: "website",
      locale: language === "es" ? "es_ES" : language === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ================= PAGE COMPONENT ================= */

export default async function OnlineJobsForBeginnersPage({
  params,
}: {
  params: Promise<{ country?: string }> | { country?: string };
}) {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Country Not Supported</h1>
          <p className="mt-2">Please check your region settings.</p>
        </div>
      </main>
    );
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const language = getLanguage(country);

  // Load translations
  const tData = await loadSectionTranslation(language, "online-jobs-for-beginners");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Online Jobs for Beginners in ${countryName}`);
  const description = t(rawDescription, `Find legit online jobs for beginners in ${countryName}. No experience required!`);

  const structuredData = generateJsonLd({
    path: `/${country}/online-jobs-for-beginners`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Online Jobs for Beginners in {country}"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Start your remote career today with zero experience! Discover legit online jobs perfect for beginners in ${countryName}. No degree required - just motivation and a computer.`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Why Start with Online Jobs?"),
    stats: (tData?.stats || []).map((stat) => ({
      ...stat,
      value: t(stat.value, stat.value),
      label: t(stat.label, stat.label),
      description: t(stat.description, stat.description),
    })),
  };

  // Default stats if not in translation
  if (statsData.stats.length === 0) {
    statsData.stats = [
      {
        value: "67%",
        label: "of beginners",
        description: "find work within 2 weeks",
      },
      {
        value: "$15-25",
        label: "average hourly rate",
        description: "for entry-level online jobs",
      },
      {
        value: "0",
        label: "years experience",
        description: "required to start",
      },
      {
        value: "500K+",
        label: "beginner jobs",
        description: "available worldwide",
      },
    ];
  }

  const quickStartJobsData = {
    title: t(tData?.quickStartJobsTitle, "Quick-Start Online Jobs (No Experience Needed)"),
    jobs: (tData?.quickStartJobs || []).map((job) => ({
      ...job,
      title: t(job.title, job.title),
      company: t(job.company, job.company),
      description: t(job.description, job.description),
    })),
  };

  // Default quick start jobs if not in translation
  if (quickStartJobsData.jobs.length === 0) {
    quickStartJobsData.jobs = [
      {
        title: "Data Entry Clerk",
        company: "Various Companies",
        logo: "📊",
        salary: "$15-22/hour",
        description: "Enter and manage data in spreadsheets and databases. Perfect for beginners with basic computer skills.",
        requirements: ["Basic typing", "Attention to detail", "Computer access"],
        jobType: "Flexible",
        startImmediately: true,
        link: "/job/data-entry",
      },
      {
        title: "Customer Support Agent",
        company: "Global Support Inc.",
        logo: "🎧",
        salary: "$16-24/hour",
        description: "Help customers via chat and email. Training provided - no phone calls required!",
        requirements: ["Good communication", "Problem solving", "Reliable internet"],
        jobType: "Part/Full Time",
        startImmediately: true,
        link: "/job/customer-support",
      },
      {
        title: "Social Media Assistant",
        company: "SocialBee",
        logo: "📱",
        salary: "$18-28/hour",
        description: "Schedule posts, respond to comments, and grow social media accounts.",
        requirements: ["Familiar with social media", "Creative thinking", "Basic writing"],
        jobType: "Flexible",
        startImmediately: true,
        link: "/job/social-media-assistant",
      },
      {
        title: "Transcriptionist",
        company: "Rev & Similar",
        logo: "🎙️",
        salary: "$12-20/hour",
        description: "Convert audio and video files into text. No experience needed - just good listening skills.",
        requirements: ["Good typing speed", "English fluency", "Attention to detail"],
        jobType: "Flexible",
        startImmediately: true,
        link: "/job/transcription",
      },
      {
        title: "Virtual Assistant",
        company: "Small Businesses",
        logo: "📋",
        salary: "$15-30/hour",
        description: "Help entrepreneurs with email, scheduling, research, and admin tasks.",
        requirements: ["Organized", "Reliable", "Basic computer skills"],
        jobType: "Part-time",
        startImmediately: true,
        link: "/job/virtual-assistant",
      },
      {
        title: "Online Survey Taker",
        company: "Market Research",
        logo: "📝",
        salary: "$10-20/hour",
        description: "Share your opinions and get paid. Perfect for extra cash in spare time.",
        requirements: ["Internet access", "Honest opinions", "Basic English"],
        jobType: "Very Flexible",
        startImmediately: true,
        link: "/job/surveys",
      },
    ];
  }

  const inDemandSkillsData = {
    title: t(tData?.inDemandSkillsTitle, "In-Demand Skills You Can Learn for Free"),
    skills: (tData?.inDemandSkills || []).map((skill) => ({
      ...skill,
      name: t(skill.name, skill.name),
      description: t(skill.description, skill.description),
    })),
  };

  // Default skills if not in translation
  if (inDemandSkillsData.skills.length === 0) {
    inDemandSkillsData.skills = [
      {
        name: "Microsoft Excel",
        icon: "📊",
        description: "Learn data entry, formulas, and basic analysis",
        timeToLearn: "2-4 weeks",
        difficulty: "Easy",
        freeResources: ["YouTube", "Microsoft Learn", "GCF Global"],
      },
      {
        name: "Social Media Management",
        icon: "📱",
        description: "Schedule posts, create content, engage audiences",
        timeToLearn: "1-2 weeks",
        difficulty: "Easy",
        freeResources: ["HubSpot Academy", "Meta Blueprint", "YouTube"],
      },
      {
        name: "Customer Service",
        icon: "💬",
        description: "Learn to handle inquiries, complaints, and support",
        timeToLearn: "1-3 weeks",
        difficulty: "Easy",
        freeResources: ["Coursera (audit)", "LinkedIn Learning (free trial)"],
      },
      {
        name: "Basic HTML/CSS",
        icon: "💻",
        description: "Understand website basics for entry-level web jobs",
        timeToLearn: "4-6 weeks",
        difficulty: "Medium",
        freeResources: ["freeCodeCamp", "Codecademy", "W3Schools"],
      },
      {
        name: "Email Marketing",
        icon: "✉️",
        description: "Learn Mailchimp, newsletters, and campaigns",
        timeToLearn: "2-3 weeks",
        difficulty: "Easy",
        freeResources: ["Mailchimp Academy", "HubSpot Academy"],
      },
      {
        name: "Time Management",
        icon: "⏰",
        description: "Essential for remote work success",
        timeToLearn: "1 week",
        difficulty: "Easy",
        freeResources: ["Trello guides", "YouTube productivity channels"],
      },
    ];
  }

  const topPlatformsData = {
    title: t(tData?.topPlatformsTitle, "Best Platforms for Beginner Online Jobs"),
    platforms: (tData?.topPlatforms || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default platforms if not in translation
  if (topPlatformsData.platforms.length === 0) {
    topPlatformsData.platforms = [
      {
        name: "Upwork",
        icon: "💼",
        description: "Largest freelance marketplace with entry-level jobs",
        bestFor: ["Writing", "Virtual Assistant", "Data Entry"],
        jobsAvailable: 15000,
        link: "/platform/upwork",
      },
      {
        name: "Fiverr",
        icon: "⭐",
        description: "Sell services starting at $5 - perfect for beginners",
        bestFor: ["Logo Design", "Voice Over", "Social Media"],
        jobsAvailable: 20000,
        link: "/platform/fiverr",
      },
      {
        name: "Amazon Mechanical Turk",
        icon: "🤖",
        description: "Micro-tasks like data categorization and surveys",
        bestFor: ["Data Entry", "Surveys", "Image Tagging"],
        jobsAvailable: 5000,
        link: "/platform/mturk",
      },
      {
        name: "Appen",
        icon: "📱",
        description: "Work on AI training and data projects",
        bestFor: ["Data Annotation", "Search Evaluation"],
        jobsAvailable: 3000,
        link: "/platform/appen",
      },
      {
        name: "RemoteOK",
        icon: "🌍",
        description: "Curated remote jobs with beginner filters",
        bestFor: ["Customer Support", "Sales", "Admin"],
        jobsAvailable: 8000,
        link: "/platform/remoteok",
      },
      {
        name: "FlexJobs",
        icon: "🔧",
        description: "Hand-screened remote jobs (paid but worth it)",
        bestFor: ["Professional entry-level roles"],
        jobsAvailable: 25000,
        link: "/platform/flexjobs",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "Real Success Stories from Beginners"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      location: t(story.location, story.location),
      story: t(story.story, story.story),
      jobType: t(story.jobType, story.jobType),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Sarah",
        age: 24,
        location: "Nebraska",
        earnings: "$3,200/month",
        story: "Started with zero experience as a virtual assistant. Within 3 months, I had 5 regular clients and quit my retail job.",
        jobType: "Virtual Assistant",
        startPoint: "No experience",
      },
      {
        name: "James",
        age: 19,
        location: "Florida",
        earnings: "$1,800/month",
        story: "I'm a college student who started doing data entry part-time. It pays for my tuition and I study on my own schedule.",
        jobType: "Data Entry",
        startPoint: "Student",
      },
      {
        name: "Maria",
        age: 35,
        location: "Texas",
        earnings: "$4,500/month",
        story: "After being laid off, I learned social media management in 2 weeks. Now I manage accounts for 8 small businesses.",
        jobType: "Social Media Manager",
        startPoint: "No tech background",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Essential Tips for Online Job Beginners"),
    tips: (tData?.tips || []).map((tip) => ({
      ...tip,
      title: t(tip.title, tip.title),
      description: t(tip.description, tip.description),
    })),
  };

  // Default tips if not in translation
  if (tipsData.tips.length === 0) {
    tipsData.tips = [
      {
        title: "Start with Small Gigs",
        description: "Build your reputation with smaller jobs first. Positive reviews lead to better opportunities.",
        icon: "🎯",
      },
      {
        title: "Create a Simple Portfolio",
        description: "Even without experience, create sample work to show your skills (e.g., sample social media posts).",
        icon: "📁",
      },
      {
        title: "Be Professional",
        description: "Respond quickly, meet deadlines, and communicate clearly. Professionalism beats experience.",
        icon: "💼",
      },
      {
        title: "Learn While You Earn",
        description: "Take free courses in your spare time to upgrade your skills and command higher rates.",
        icon: "📚",
      },
      {
        title: "Avoid Scams",
        description: "Never pay to get a job. Legitimate employers pay you, not the other way around.",
        icon: "⚠️",
      },
      {
        title: "Set Realistic Goals",
        description: "Start with 10-15 hours per week while you learn the ropes. Increase hours as you gain confidence.",
        icon: "🎯",
      },
    ];
  }

  const redFlagsData = {
    title: t(tData?.redFlagsTitle, "🚩 Red Flags: How to Spot Online Job Scams"),
    flags: (tData?.redFlags || []).map((flag) => ({
      ...flag,
      warning: t(flag.warning, flag.warning),
      description: t(flag.description, flag.description),
    })),
  };

  // Default red flags if not in translation
  if (redFlagsData.flags.length === 0) {
    redFlagsData.flags = [
      {
        warning: "Asking for upfront payment",
        description: "Legitimate jobs never ask you to pay for training, software, or 'background checks'.",
        icon: "💰",
      },
      {
        warning: "Too good to be true",
        description: "$5,000/week for data entry? That's a scam. Research average rates for each job type.",
        icon: "🤔",
      },
      {
        warning: "Vague job descriptions",
        description: "If they won't tell you exactly what you'll be doing, walk away.",
        icon: "❓",
      },
      {
        warning: "Unprofessional communication",
        description: "Poor grammar, generic email addresses (@gmail.com), and pressure tactics are red flags.",
        icon: "📧",
      },
      {
        warning: "Request for personal info",
        description: "Never share your SSN or bank info before being officially hired by a legitimate company.",
        icon: "🔒",
      },
    ];
  }

  const checklistData = {
    title: t(tData?.checklist?.title, "Your First 30 Days: Beginner Action Plan"),
    items: (tData?.checklist?.items || []).map((item) => t(item, item)),
  };

  // Default checklist if not in translation
  if (checklistData.items.length === 0) {
    checklistData.items = [
      "Week 1: Choose 2-3 job types that interest you",
      "Week 1: Complete 1-2 free courses in those areas",
      "Week 2: Create profiles on 2-3 job platforms",
      "Week 2: Apply to 10-20 beginner jobs",
      "Week 3: Complete your first small gig or job",
      "Week 3: Ask for feedback and a review",
      "Week 4: Apply to higher-paying jobs with your new review",
      "Week 4: Start building your portfolio",
    ];
  }

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Beginner Jobs Sent to Your Inbox"),
    subtitle: t(tData?.newsletter?.subtitle, "Weekly curated list of entry-level remote jobs - perfect for beginners"),
    buttonText: t(tData?.newsletter?.buttonText, "Send Me Jobs"),
    placeholder: t(tData?.newsletter?.placeholder, "Enter your email"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Online Jobs for Beginners FAQ - ${countryName}`),
    items: (tData?.faq?.items || [])
      .map((item) => ({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      }))
      .filter((item) => item.q && item.a),
  };

  // Default FAQ if not in translation
  if (faqData.items.length === 0) {
    faqData.items = [
      {
        q: "Can I really get an online job with no experience?",
        a: "Yes! Many entry-level online jobs only require basic computer skills and a willingness to learn. Data entry, virtual assistance, and customer support are great starting points.",
      },
      {
        q: "How much money can I make as a beginner?",
        a: "Most beginners earn $12-25 per hour. As you gain skills and positive reviews, you can quickly increase your rates to $25-40+ per hour.",
      },
      {
        q: "What equipment do I need?",
        a: "At minimum: a reliable computer (Windows or Mac), high-speed internet, and a quiet workspace. A headset is helpful for customer service roles.",
      },
      {
        q: "How do I avoid online job scams?",
        a: "Never pay for a job, research companies before applying, trust your gut if something feels wrong, and stick to reputable platforms like Upwork and FlexJobs.",
      },
      {
        q: "Can I work online while living outside the US?",
        a: "Absolutely! Many platforms accept workers worldwide. Some jobs are location-specific, but many are open globally. Check each job's requirements.",
      },
      {
        q: "How long until I get my first job?",
        a: "Most beginners land their first gig within 1-3 weeks if they apply consistently. Start with smaller jobs to build your reputation quickly.",
      },
      {
        q: "Do I need to pay taxes on online income?",
        a: "Yes, online income is taxable in most countries. Keep records of your earnings and consult a tax professional about deductions (home office, internet, etc.).",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Ready to Start Your Online Career?"),
    subtitle: t(tData?.final?.subtitle, "Thousands of beginners are earning from home. You can too."),
    buttonText: t(tData?.final?.buttonText, "Find Beginner Jobs Now"),
  };

  /* ================= RENDER ================= */
  return (
    <main className="flex flex-col items-center w-full">
      {structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Hero Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="hero-heading"
          >
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white"
            >
              {heroData.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            <PrimaryCTA
              href="/beginner-jobs"
              translationKey="find_beginner_jobs"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Stats Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="stats-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="stats-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {statsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {statsData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl"
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Quick Start Jobs Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="jobs-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="jobs-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {quickStartJobsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                These jobs are perfect for beginners - no degree or experience required
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickStartJobsData.jobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{job.logo}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    {job.startImmediately && (
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-bold">
                        Start Today
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-bold">
                      {job.salary}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {job.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.map((req, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {job.jobType}
                    </span>
                    <PrimaryCTA
                      href={job.link}
                      translationKey="apply_now"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* In-Demand Skills Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="skills-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="skills-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {inDemandSkillsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                Learn these skills for free and start earning within weeks
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inDemandSkillsData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {skill.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Time to learn:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {skill.timeToLearn}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                      <span className="text-gray-700 dark:text-gray-300">{skill.difficulty}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-500 dark:text-gray-400 text-xs">Free resources:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {skill.freeResources.map((resource, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Platforms Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="platforms-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="platforms-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {topPlatformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPlatformsData.platforms.map((platform, index) => (
                <a
                  key={index}
                  href={platform.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {platform.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {platform.jobsAvailable.toLocaleString()}+ jobs
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {platform.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {platform.bestFor.map((category, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Red Flags Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="redflags-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="redflags-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {redFlagsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redFlagsData.flags.map((flag, index) => (
                <div
                  key={index}
                  className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800"
                >
                  <div className="text-3xl mb-3">{flag.icon}</div>
                  <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                    {flag.warning}
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    {flag.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Success Stories Section */}
      {successStoriesData.stories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="stories-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="stories-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {successStoriesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">🌟</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {story.name}, {story.age}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {story.location}
                      </p>
                      <div className="text-green-600 dark:text-green-400 font-bold text-lg mt-2">
                        {story.earnings}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Started: {story.startPoint}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic text-center">
                      "{story.story}"
                    </p>
                    <div className="mt-3 text-center">
                      <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-xs">
                        {story.jobType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Tips Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="tips-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="tips-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {tipsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{tip.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Checklist Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="checklist-heading"
          >
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
              <h2
                id="checklist-heading"
                className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center"
              >
                {checklistData.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checklistData.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Newsletter Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="newsletter-heading"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl p-12">
              <h2
                id="newsletter-heading"
                className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
              >
                {newsletterData.title}
              </h2>
              <p className="text-lg text-white/90 mb-8">
                {newsletterData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder={newsletterData.placeholder}
                  className="flex-1 px-6 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  {newsletterData.buttonText}
                </button>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* FAQ Section */}
      {faqData.items.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
              <FAQ title={faqData.title} faqs={faqData.items} />
            </div>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Final CTA Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="final-heading"
          >
            <h2
              id="final-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {finalData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/beginner-jobs"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
