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
  skillsNeeded: string[];
  jobType: string;
  link: string;
}

interface Platform {
  name: string;
  logo: string;
  type: string;
  signupBonus: string;
  description: string;
  bestFor: string[];
  payoutMethods: string[];
  link: string;
}

interface Skill {
  name: string;
  icon: string;
  description: string;
  learningTime: string;
  earningPotential: string;
  resources: string[];
}

interface Tip {
  title: string;
  description: string;
  icon: string;
}

interface SuccessStory {
  name: string;
  age: number;
  location: string;
  earnings: string;
  story: string;
  jobType: string;
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
  jobCategoriesTitle?: string;
  jobCategories?: Array<{
    name: string;
    icon: string;
    description: string;
    jobCount: number;
    startingPay: string;
  }>;
  beginnerJobsTitle?: string;
  beginnerJobs?: BeginnerJob[];
  platformsTitle?: string;
  platforms?: Platform[];
  skillsTitle?: string;
  skills?: Skill[];
  tipsTitle?: string;
  tips?: Tip[];
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  checklistTitle?: string;
  checklist?: {
    title?: string;
    items?: string[];
  };
  redFlagsTitle?: string;
  redFlags?: string[];
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
    `beginner friendly online jobs ${lowerCountry}`,
    `easy online jobs from home ${lowerCountry}`,
    `no experience remote jobs ${lowerCountry}`,
    `online jobs for students ${lowerCountry}`,
    `work from home jobs entry level ${lowerCountry}`,
    `online side hustles for beginners ${lowerCountry}`,
    `legitimate online jobs beginners ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "beginner remote jobs usa",
      "entry level work from home usa",
      "online jobs for beginners america"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "beginner remote jobs uk",
      "entry level work from home uk",
      "online jobs for beginners britain"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "beginner remote jobs canada",
      "entry level work from home canada",
      "online jobs for beginners canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "beginner remote jobs australia",
      "entry level work from home australia",
      "online jobs for beginners australia"
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
    `Online Jobs for Beginners in ${countryName} - No Experience Needed | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Find beginner-friendly online jobs in ${countryName}. No experience required! Discover legit work-from-home opportunities, entry-level remote jobs, and side hustles for beginners.`
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
  const description = t(rawDescription, `Find beginner-friendly online jobs in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/online-jobs-for-beginners`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Online Jobs for Beginners"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Start your remote career today with zero experience needed! Discover legit online jobs perfect for beginners in ${countryName}. No degree required - just willingness to learn and earn.`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Beginner-Friendly Online Jobs by the Numbers"),
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
        value: "2M+",
        label: "Entry-Level Remote Jobs",
        description: "Available worldwide",
      },
      {
        value: "$15-25",
        label: "Average Hourly Rate",
        description: "For beginner positions",
      },
      {
        value: "No Experience",
        label: "Required for Most",
        description: "Just basic computer skills",
      },
      {
        value: "1-2 Weeks",
        label: "To Land First Job",
        description: "With consistent effort",
      },
    ];
  }

  const jobCategoriesData = {
    title: t(tData?.jobCategoriesTitle, "Beginner-Friendly Job Categories"),
    categories: (tData?.jobCategories || []).map((category) => ({
      ...category,
      name: t(category.name, category.name),
      description: t(category.description, category.description),
    })),
  };

  // Default job categories if not in translation
  if (jobCategoriesData.categories.length === 0) {
    jobCategoriesData.categories = [
      {
        name: "Virtual Assistant",
        icon: "📋",
        description: "Administrative support for businesses and entrepreneurs",
        jobCount: 15000,
        startingPay: "$15-25/hr",
      },
      {
        name: "Data Entry",
        icon: "📊",
        description: "Input and manage data for companies",
        jobCount: 12000,
        startingPay: "$14-20/hr",
      },
      {
        name: "Customer Service",
        icon: "🎧",
        description: "Support customers via chat, email, or phone",
        jobCount: 25000,
        startingPay: "$15-22/hr",
      },
      {
        name: "Social Media Manager",
        icon: "📱",
        description: "Manage social accounts for small businesses",
        jobCount: 8000,
        startingPay: "$18-30/hr",
      },
      {
        name: "Transcription",
        icon: "🎙️",
        description: "Convert audio/video to text",
        jobCount: 6000,
        startingPay: "$12-20/hr",
      },
      {
        name: "Online Tutoring",
        icon: "📚",
        description: "Teach students online in various subjects",
        jobCount: 10000,
        startingPay: "$15-30/hr",
      },
    ];
  }

  const beginnerJobsData = {
    title: t(tData?.beginnerJobsTitle, "Entry-Level Remote Jobs Hiring Now"),
    jobs: (tData?.beginnerJobs || []).map((job) => ({
      ...job,
      title: t(job.title, job.title),
      company: t(job.company, job.company),
      description: t(job.description, job.description),
    })),
  };

  // Default beginner jobs if not in translation
  if (beginnerJobsData.jobs.length === 0) {
    beginnerJobsData.jobs = [
      {
        title: "Virtual Assistant",
        company: "Belay Solutions",
        logo: "📋",
        salary: "$15-22/hour",
        description: "Help entrepreneurs with email management, scheduling, and administrative tasks.",
        requirements: ["Reliable internet", "Basic computer skills", "Organized"],
        skillsNeeded: ["Communication", "Time management", "Google Workspace"],
        jobType: "Part-time / Full-time",
        link: "/job/virtual-assistant",
      },
      {
        title: "Customer Support Representative",
        company: "SupportNinja",
        logo: "🎧",
        salary: "$16-20/hour",
        description: "Answer customer questions via chat and email for e-commerce brands.",
        requirements: ["Good writing skills", "Empathy", "Problem-solving"],
        skillsNeeded: ["Written communication", "Patience", "CRM tools"],
        jobType: "Full-time",
        link: "/job/customer-support",
      },
      {
        title: "Data Entry Clerk",
        company: "Precision Sourcing",
        logo: "📊",
        salary: "$14-18/hour",
        description: "Enter and verify data in spreadsheets and databases accurately.",
        requirements: ["Typing 40+ WPM", "Attention to detail", "Excel basics"],
        skillsNeeded: ["Typing speed", "Accuracy", "Organization"],
        jobType: "Part-time",
        link: "/job/data-entry",
      },
      {
        title: "Social Media Assistant",
        company: "SocialBee",
        logo: "📱",
        salary: "$18-25/hour",
        description: "Schedule posts, engage with followers, and create basic content.",
        requirements: ["Familiar with social platforms", "Creative", "Reliable"],
        skillsNeeded": ["Instagram", "Facebook", "Content creation basics"],
        jobType: "Part-time",
        link: "/job/social-media-assistant",
      },
      {
        title: "Transcriptionist",
        company: "Rev",
        logo: "🎙️",
        salary: "$12-20/hour",
        description: "Transcribe audio and video files into text documents.",
        requirements: ["Good listening skills", "Fast typing", "Grammar knowledge"],
        skillsNeeded: ["Typing speed", "English proficiency", "Attention to detail"],
        jobType: "Flexible",
        link: "/job/transcription",
      },
      {
        title: "Online Tutor",
        company: "VIPKid",
        logo: "📚",
        salary: "$16-22/hour",
        description: "Teach English to students online using provided curriculum.",
        requirements: ["Bachelor's degree (any field)", "TESOL/TEFL (can obtain)", "Enthusiastic"],
        skillsNeeded: ["Patience", "Clear speech", "Lesson planning"],
        jobType: "Part-time",
        link: "/job/online-tutor",
      },
    ];
  }

  const platformsData = {
    title: t(tData?.platformsTitle, "Best Platforms to Find Beginner Online Jobs"),
    platforms: (tData?.platforms || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default platforms if not in translation
  if (platformsData.platforms.length === 0) {
    platformsData.platforms = [
      {
        name: "Upwork",
        logo: "💼",
        type: "Freelance Marketplace",
        signupBonus: "$0",
        description: "Find entry-level freelance work in writing, VA, data entry, and more.",
        bestFor: ["Virtual Assistant", "Data Entry", "Customer Service"],
        payoutMethods: ["PayPal", "Bank Transfer", "Direct Deposit"],
        link: "/platform/upwork",
      },
      {
        name: "Fiverr",
        logo: "⭐",
        type: "Gig Marketplace",
        signupBonus: "$0",
        description: "Create 'gigs' offering your services starting at $5.",
        bestFor: ["Social Media", "Transcription", "Basic Design"],
        payoutMethods: ["PayPal", "Fiverr Revenue Card"],
        link: "/platform/fiverr",
      },
      {
        name: "Remote.co",
        logo: "🌐",
        type: "Remote Job Board",
        signupBonus: "$0",
        description: "Curated remote jobs from companies hiring beginners.",
        bestFor: ["Customer Service", "Admin Support", "Entry Level"],
        payoutMethods: ["Varies by employer"],
        link: "/platform/remote-co",
      },
      {
        name: "FlexJobs",
        logo: "💪",
        type: "Premium Job Board",
        signupBonus: "$0",
        description: "Hand-screened remote and flexible jobs (subscription required).",
        bestFor: ["All beginner roles", "Legitimate companies"],
        payoutMethods: ["Varies by employer"],
        link: "/platform/flexjobs",
      },
      {
        name: "Rev",
        logo: "🎙️",
        type: "Transcription Platform",
        signupBonus: "$0",
        description: "Get paid to transcribe audio and video files.",
        bestFor: ["Transcription", "Captioning"],
        payoutMethods: ["PayPal"],
        link: "/platform/rev",
      },
      {
        name: "Belay",
        logo: "📋",
        type: "VA Staffing",
        signupBonus: "$0",
        description: "Match with businesses needing virtual assistants.",
        bestFor: ["Virtual Assistant", "Admin Support"],
        payoutMethods: ["Direct Deposit"],
        link: "/platform/belay",
      },
    ];
  }

  const skillsData = {
    title: t(tData?.skillsTitle, "In-Demand Skills You Can Learn Free"),
    skills: (tData?.skills || []).map((skill) => ({
      ...skill,
      name: t(skill.name, skill.name),
      description: t(skill.description, skill.description),
    })),
  };

  // Default skills if not in translation
  if (skillsData.skills.length === 0) {
    skillsData.skills = [
      {
        name: "Typing",
        icon: "⌨️",
        description: "Learn to type faster with free online tools. Aim for 40+ WPM.",
        learningTime: "2-4 weeks",
        earningPotential: "$12-20/hr",
        resources: ["TypingClub", "Keybr", "10FastFingers"],
      },
      {
        name: "Google Workspace",
        icon: "🔵",
        description: "Master Docs, Sheets, Gmail, and Calendar for admin roles.",
        learningTime: "1-2 weeks",
        earningPotential: "$15-25/hr",
        resources: ["Google Skillshop", "YouTube", "Coursera"],
      },
      {
        name: "Social Media",
        icon: "📱",
        description: "Learn to schedule posts, engage, and analyze basic metrics.",
        learningTime: "2-3 weeks",
        earningPotential: "$18-30/hr",
        resources: ["Meta Blueprint", "HubSpot Academy", "Later Blog"],
      },
      {
        name: "Customer Service",
        icon: "🎧",
        description: "Develop empathy, problem-solving, and communication skills.",
        learningTime: "1-2 weeks",
        earningPotential: "$15-22/hr",
        resources: ["Zendesk Training", "LinkedIn Learning", "Udemy"],
      },
      {
        name: "Transcription",
        icon: "🎙️",
        description: "Learn to transcribe accurately with proper grammar.",
        learningTime: "1-2 weeks",
        earningPotential: "$12-20/hr",
        resources: ["Transcribe Anywhere", "YouTube tutorials", "Practice audio"],
      },
      {
        name: "Data Entry",
        icon: "📊",
        description: "Master Excel basics and database management.",
        learningTime: "1-2 weeks",
        earningPotential: "$14-18/hr",
        resources: ["Excel Easy", "GCFGlobal", "Coursera"],
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Tips for Landing Your First Online Job"),
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
        title: "Create a Professional Email",
        description: "Use a simple email like firstname.lastname@gmail.com for job applications.",
        icon: "📧",
      },
      {
        title: "Build a Simple Resume",
        description: "Highlight transferable skills, computer literacy, and any volunteer work.",
        icon: "📄",
      },
      {
        title: "Start with Small Gigs",
        description: "Build your reputation by taking smaller, lower-paid jobs first.",
        icon: "🎯",
      },
      {
        title: "Create a Portfolio",
        description: "Save samples of your work, even if self-created, to show skills.",
        icon: "📁",
      },
      {
        title: "Be Consistent",
        description: "Apply to multiple jobs daily. First job may take 1-2 weeks of consistent effort.",
        icon: "⏰",
      },
      {
        title: "Avoid Scams",
        description: "Never pay for a job. Legitimate employers won't ask for upfront payment.",
        icon: "🛡️",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "Beginners Who Started with No Experience"),
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
        name: "Emily",
        age: 24,
        location: "Ohio",
        earnings: "$2,800/month",
        story: "Started as a virtual assistant with no experience. Within 6 months, I had 3 regular clients and quit my retail job.",
        jobType: "Virtual Assistant",
      },
      {
        name: "Carlos",
        age: 32,
        location: "Texas",
        earnings: "$1,500/month",
        story: "Learned transcription in 2 weeks using free resources. Now I work 15 hours/week while staying home with my kids.",
        jobType: "Transcriptionist",
      },
      {
        name: "Priya",
        age: 28,
        location: "California",
        earnings: "$3,200/month",
        story: "No degree, just basic social media skills. Started managing Instagram for small businesses and grew from there.",
        jobType: "Social Media Manager",
      },
    ];
  }

  const checklistData = {
    title: t(tData?.checklist?.title, "Your First Online Job Checklist"),
    items: (tData?.checklist?.items || []).map((item) => t(item, item)),
  };

  // Default checklist if not in translation
  if (checklistData.items.length === 0) {
    checklistData.items = [
      "☐ Create a professional email address",
      "☐ Set up a PayPal account for payments",
      "☐ Write a simple beginner resume",
      "☐ Choose 1-2 skills to focus on",
      "☐ Complete free training for chosen skills",
      "☐ Create profiles on 2-3 job platforms",
      "☐ Apply to 5-10 jobs daily",
      "☐ Complete first small gig for experience",
    ];
  }

  const redFlagsData = {
    title: t(tData?.redFlagsTitle, "Red Flags to Avoid in Online Jobs"),
    flags: (tData?.redFlags || []).map((flag) => t(flag, flag)),
  };

  // Default red flags if not in translation
  if (redFlagsData.flags.length === 0) {
    redFlagsData.flags = [
      "⚠️ Any job asking for upfront payment or training fees",
      "⚠️ Promises of 'get rich quick' or unrealistic earnings",
      "⚠️ Requests for your bank login or sensitive personal info",
      "⚠️ Jobs that require paying for a 'starter kit'",
      "⚠️ Vague job descriptions with no clear responsibilities",
      "⚠️ Communication only through messaging apps (no email/phone)",
    ];
  }

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Beginner Job Alerts"),
    subtitle: t(tData?.newsletter?.subtitle, "Subscribe for weekly entry-level remote job opportunities"),
    buttonText: t(tData?.newsletter?.buttonText, "Subscribe"),
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
        a: "Yes! Many entry-level remote jobs like virtual assistant, data entry, and customer service require no prior experience - just basic computer skills and willingness to learn.",
      },
      {
        q: "How much can a beginner earn online?",
        a: "Beginners typically earn $12-25/hour depending on the role. Virtual assistants start around $15-20/hr, while transcription and data entry start around $12-18/hr.",
      },
      {
        q: "Do I need a degree for online jobs?",
        a: "No! Most beginner online jobs don't require a degree. Employers care more about your skills, reliability, and willingness to learn.",
      },
      {
        q: "How long does it take to find my first online job?",
        a: "With consistent effort (applying to 5-10 jobs daily), most beginners land their first job within 1-3 weeks.",
      },
      {
        q: "What equipment do I need?",
        a: "At minimum: a reliable computer/laptop, high-speed internet, and a quiet workspace. Some roles may require a headset or microphone.",
      },
      {
        q: "Are these jobs legit or scams?",
        a: "The platforms and jobs we recommend are legitimate. Always follow our red flags guide to avoid scams - never pay for a job opportunity.",
      },
      {
        q: "Can I work from anywhere in the world?",
        a: "Many online jobs are location-independent. However, some require you to be in specific countries due to time zones or legal requirements.",
      },
      {
        q: "How do I get paid for online work?",
        a: "Most platforms pay via PayPal, direct deposit, or bank transfer. Payment schedules vary - weekly, bi-weekly, or monthly.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Your Online Career Journey Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of beginners who started with no experience and now earn from home"),
    buttonText: t(tData?.final?.buttonText, "Find Beginner Jobs"),
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
              href="/remote-jobs"
              translationKey="find_jobs"
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

      {/* Job Categories Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="categories-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="categories-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {jobCategoriesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {jobCategoriesData.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                    {category.description}
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    {category.startingPay}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {category.jobCount.toLocaleString()}+ jobs
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Beginner Jobs Section */}
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
                {beginnerJobsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerJobsData.jobs.map((job, index) => (
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
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">
                      {job.salary}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {job.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {job.requirements.slice(0, 2).map((req, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {job.jobType}
                    </div>
                  </div>
                  <PrimaryCTA
                    href={job.link}
                    translationKey="apply_now"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder)

      {/* Platforms Section */}
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
                {platformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformsData.platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{platform.logo}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {platform.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {platform.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {platform.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {platform.bestFor.slice(0, 3).map((role, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <PrimaryCTA
                    href={platform.link}
                    translationKey="sign_up"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Skills Section */}
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
                {skillsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-4xl">{skill.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {skill.description}
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Learning:</span>
                          <span className="font-semibold">{skill.learningTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Potential:</span>
                          <span className="font-semibold text-green-600">{skill.earningPotential}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

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
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
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
                      <div className="text-5xl mb-2">👤</div>
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
                        {story.jobType}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic text-center">
                      "{story.story}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Checklist Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="checklist-heading"
          >
            <div className="text-center mb-12">
              <h2
                id="checklist-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {checklistData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8">
              <ul className="space-y-3">
                {checklistData.items.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Red Flags Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="redflags-heading"
          >
            <div className="text-center mb-12">
              <h2
                id="redflags-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {redFlagsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 border border-red-200 dark:border-red-800">
              <ul className="space-y-3">
                {redFlagsData.flags.map((flag, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <span className="text-gray-700 dark:text-gray-300">{flag}</span>
                  </li>
                ))}
              </ul>
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
              href="/remote-jobs"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
