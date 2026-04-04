// app/[country]/(marketing)/earn-money-as-a-student/page.tsx

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

interface StudentJob {
  title: string;
  type: string;
  icon: string;
  description: string;
  earnings: string;
  timeCommitment: string;
  skillsNeeded: string[];
  platforms: string[];
  link: string;
}

interface StudentPlatform {
  name: string;
  logo: string;
  category: string;
  signupBonus: string;
  description: string;
  bestFor: string[];
  payoutMethods: string[];
  link: string;
}

interface Tip {
  title: string;
  description: string;
  icon: string;
}

interface SuccessStory {
  name: string;
  age: number;
  university: string;
  earnings: string;
  story: string;
  method: string;
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
  studentJobsTitle?: string;
  studentJobs?: StudentJob[];
  platformsTitle?: string;
  platforms?: StudentPlatform[];
  tipsTitle?: string;
  tips?: Tip[];
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  timeManagementTitle?: string;
  timeManagement?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  taxTipsTitle?: string;
  taxTips?: Array<{
    title: string;
    description: string;
  }>;
  balanceTipsTitle?: string;
  balanceTips?: string[];
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
    `earn money as a student ${lowerCountry}`,
    `student side hustles ${lowerCountry}`,
    `part time jobs for students ${lowerCountry}`,
    `online jobs for students ${lowerCountry}`,
    `make money while studying ${lowerCountry}`,
    `student freelance jobs ${lowerCountry}`,
    `work from home student ${lowerCountry}`,
    `flexible jobs for students ${lowerCountry}`,
    `student earning ideas ${lowerCountry}`,
    `college student jobs online ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "student jobs usa",
      "college side hustles america",
      "online jobs for college students usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "student jobs uk",
      "university side hustles britain",
      "online jobs for students uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "student jobs canada",
      "college side hustles canada",
      "online jobs for students canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "student jobs australia",
      "university side hustles australia",
      "online jobs for students australia"
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
    translation = await loadSectionTranslation(language, "earn-money-as-a-student");
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
    `Earn Money as a Student in ${countryName} - Flexible Side Hustles | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover flexible ways to earn money as a student in ${countryName}. From online tutoring and freelancing to surveys and cashback - balance work and study with these student-friendly opportunities.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-money-as-a-student`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-money-as-a-student`,
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

export default async function EarnMoneyAsAStudentPage({
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
  const tData = await loadSectionTranslation(language, "earn-money-as-a-student");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money as a Student in ${countryName}`);
  const description = t(rawDescription, `Discover flexible ways to earn money as a student in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-money-as-a-student`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money as a Student"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Balance studying with earning! Discover flexible, student-friendly ways to make money in ${countryName}. From online tutoring to freelancing - start earning without compromising your grades.`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Student Earnings by the Numbers"),
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
        value: "70%",
        label: "of Students",
        description: "Work while studying",
      },
      {
        value: "$15-25",
        label: "Average Hourly Rate",
        description: "For student-friendly jobs",
      },
      {
        value: "10-15 hrs",
        label: "Flexible Hours",
        description: "Perfect for class schedules",
      },
      {
        value: "$500-2,000",
        label: "Monthly Potential",
        description: "With part-time work",
      },
    ];
  }

  const studentJobsData = {
    title: t(tData?.studentJobsTitle, "Best Student-Friendly Jobs"),
    jobs: (tData?.studentJobs || []).map((job) => ({
      ...job,
      title: t(job.title, job.title),
      description: t(job.description, job.description),
    })),
  };

  // Default student jobs if not in translation
  if (studentJobsData.jobs.length === 0) {
    studentJobsData.jobs = [
      {
        title: "Online Tutoring",
        type: "Teaching",
        icon: "📚",
        description: "Teach subjects you're good at to younger students. Perfect for honor students.",
        earnings: "$15-30/hour",
        timeCommitment: "5-15 hours/week",
        skillsNeeded: ["Subject expertise", "Patience", "Communication"],
        platforms: ["VIPKid", "Chegg", "Wyzant"],
        link: "/student/tutoring",
      },
      {
        title: "Freelance Writing",
        type: "Writing",
        icon: "✍️",
        description: "Write articles, blog posts, or social media content for businesses.",
        earnings: "$20-50/hour",
        timeCommitment: "5-20 hours/week",
        skillsNeeded: ["Writing skills", "Grammar", "Research"],
        platforms: ["Upwork", "Fiverr", "Contena"],
        link: "/student/freelance-writing",
      },
      {
        title: "Virtual Assistant",
        type: "Admin",
        icon: "📋",
        description: "Help businesses with email, scheduling, and social media management.",
        earnings: "$15-25/hour",
        timeCommitment: "10-20 hours/week",
        skillsNeeded: ["Organization", "Communication", "Tech skills"],
        platforms: ["Belay", "Time Etc", "Upwork"],
        link: "/student/virtual-assistant",
      },
      {
        title: "Survey & Cashback",
        type: "Passive",
        icon: "💰",
        description: "Earn money during study breaks with surveys and cashback apps.",
        earnings: "$50-200/month",
        timeCommitment: "2-5 hours/week",
        skillsNeeded: ["None - just time"],
        platforms: ["Swagbucks", "Survey Junkie", "Cashog"],
        link: "/student/surveys",
      },
      {
        title: "Social Media Manager",
        type: "Marketing",
        icon: "📱",
        description: "Manage Instagram, TikTok, or Twitter for small businesses.",
        earnings: "$18-35/hour",
        timeCommitment: "5-15 hours/week",
        skillsNeeded: ["Social media savvy", "Creativity", "Analytics"],
        platforms: ["Upwork", "Fiverr", "LinkedIn"],
        link: "/student/social-media",
      },
      {
        title: "Data Entry",
        type: "Admin",
        icon: "📊",
        description: "Enter and organize data for companies. Great for detail-oriented students.",
        earnings: "$12-18/hour",
        timeCommitment: "5-20 hours/week",
        skillsNeeded: ["Typing speed", "Accuracy", "Excel"],
        platforms: ["Clickworker", "Amazon MTurk", "Upwork"],
        link: "/student/data-entry",
      },
      {
        title: "Graphic Design",
        type: "Creative",
        icon: "🎨",
        description: "Create logos, social media graphics, and marketing materials.",
        earnings: "$20-45/hour",
        timeCommitment: "5-15 hours/week",
        skillsNeeded: ["Design software", "Creativity", "Portfolio"],
        platforms: ["99designs", "Fiverr", "Upwork"],
        link: "/student/graphic-design",
      },
      {
        title: "Transcription",
        type: "Audio",
        icon: "🎙️",
        description: "Convert audio and video files to text. Flexible schedule.",
        earnings: "$12-20/hour",
        timeCommitment: "5-15 hours/week",
        skillsNeeded: ["Fast typing", "Good listening", "Grammar"],
        platforms: ["Rev", "TranscribeMe", "GoTranscript"],
        link: "/student/transcription",
      },
    ];
  }

  const platformsData = {
    title: t(tData?.platformsTitle, "Student-Friendly Earning Platforms"),
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
        name: "Cashog",
        logo: "💰",
        category: "Cashback",
        signupBonus: "$5",
        description: "Earn cashback on everyday purchases. Perfect for student shopping needs.",
        bestFor: ["Shopping", "Groceries", "Textbooks"],
        payoutMethods: ["PayPal", "Gift Cards", "Bank Transfer"],
        link: "/signup",
      },
      {
        name: "Swagbucks",
        logo: "🎯",
        category: "Surveys & Tasks",
        signupBonus: "$10",
        description: "Complete surveys, watch videos, and shop online for points.",
        bestFor: ["Study breaks", "Free time", "Passive earning"],
        payoutMethods: ["PayPal", "Amazon", "Visa"],
        link: "/platform/swagbucks",
      },
      {
        name: "Upwork",
        logo: "💼",
        category: "Freelancing",
        signupBonus: "$0",
        description: "Find freelance work in writing, design, programming, and more.",
        bestFor: ["Skilled students", "Portfolio building", "Career experience"],
        payoutMethods: ["PayPal", "Direct Deposit", "Wire Transfer"],
        link: "/platform/upwork",
      },
      {
        name: "Fiverr",
        logo: "⭐",
        category: "Gigs",
        signupBonus: "$0",
        description: "Create 'gigs' offering your skills starting at $5.",
        bestFor: ["Creative students", "Quick tasks", "Building reputation"],
        payoutMethods: ["PayPal", "Fiverr Revenue Card"],
        link: "/platform/fiverr",
      },
      {
        name: "Chegg",
        logo: "📚",
        category: "Tutoring",
        signupBonus: "$0",
        description: "Get paid to help other students with homework and test prep.",
        bestFor: ["High GPA students", "STEM majors", "Teaching skills"],
        payoutMethods: ["Direct Deposit", "PayPal"],
        link: "/platform/chegg",
      },
      {
        name: "Rev",
        logo: "🎙️",
        category: "Transcription",
        signupBonus: "$0",
        description: "Earn money transcribing audio and video files.",
        bestFor: ["Fast typists", "Detail-oriented", "Flexible schedule"],
        payoutMethods: ["PayPal"],
        link: "/platform/rev",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Tips for Student Earners"),
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
        title: "Start During Summer Break",
        description: "Build skills and save money before the school year starts.",
        icon: "☀️",
      },
      {
        title: "Use Your Class Schedule",
        description: "Choose jobs that fit around your classes, not the other way around.",
        icon: "📅",
      },
      {
        title: "Leverage Your Major",
        description: "Look for jobs related to your field of study for experience + money.",
        icon: "🎓",
      },
      {
        title: "Set a Weekly Hour Limit",
        description: "Decide how many hours you can work without hurting your grades.",
        icon: "⏰",
      },
      {
        title: "Use Campus Resources",
        description: "Check your university's job board for on-campus opportunities.",
        icon: "🏫",
      },
      {
        title: "Build Your Resume",
        description: "Even part-time work adds valuable experience for future jobs.",
        icon: "📄",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "Student Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      university: t(story.university, story.university),
      story: t(story.story, story.story),
      method: t(story.method, story.method),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Alex",
        age: 21,
        university: "University of Texas",
        earnings: "$1,200/month",
        story: "Started freelance writing during sophomore year. Now I pay for my own rent and textbooks.",
        method: "Freelance Writing",
      },
      {
        name: "Sarah",
        age: 20,
        university: "Ohio State",
        earnings: "$800/month",
        story: "Tutor math and science online. Work 10 hours/week and still have time for studying.",
        method: "Online Tutoring",
      },
      {
        name: "Michael",
        age: 22,
        university: "UC Berkeley",
        earnings: "$2,000/month",
        story: "Run social media for 3 local businesses. Graduating with no debt and job offers lined up.",
        method: "Social Media Management",
      },
    ];
  }

  const timeManagementData = {
    title: t(tData?.timeManagementTitle, "Time Management Tips for Working Students"),
    tips: (tData?.timeManagement || []).map((tip) => ({
      ...tip,
      title: t(tip.title, tip.title),
      description: t(tip.description, tip.description),
    })),
  };

  // Default time management tips if not in translation
  if (timeManagementData.tips.length === 0) {
    timeManagementData.tips = [
      {
        title: "Use a Digital Calendar",
        description: "Block out class time, study time, and work time in Google Calendar.",
        icon: "📱",
      },
      {
        title: "Study During Downtime",
        description: "Listen to lectures or read while doing low-focus tasks like data entry.",
        icon: "🎧",
      },
      {
        title: "Batch Similar Tasks",
        description: "Group similar work tasks together to save mental energy.",
        icon: "📦",
      },
      {
        title: "Set Boundaries",
        description: "Communicate your availability clearly to employers and clients.",
        icon: "🚧",
      },
    ];
  }

  const taxTipsData = {
    title: t(tData?.taxTipsTitle, "Tax Tips for Students"),
    tips: (tData?.taxTips || []).map((tip) => ({
      ...tip,
      title: t(tip.title, tip.title),
      description: t(tip.description, tip.description),
    })),
  };

  // Default tax tips if not in translation
  if (taxTipsData.tips.length === 0) {
    taxTipsData.tips = [
      {
        title: "Track Your Earnings",
        description: "Keep records of all income, even if under the filing threshold.",
      },
      {
        title: "Save for Taxes",
        description: "Set aside 15-20% of freelance income for tax time.",
      },
      {
        title: "Claim Education Credits",
        description: "Students may qualify for education tax credits. Consult a tax professional.",
      },
      {
        title: "Deduct Business Expenses",
        description: "Freelancers can deduct computer, internet, and software costs.",
      },
    ];
  }

  const balanceTipsData = {
    title: t(tData?.balanceTipsTitle, "How to Balance Work and Study"),
    tips: (tData?.balanceTips || []).map((tip) => t(tip, tip)),
  };

  // Default balance tips if not in translation
  if (balanceTipsData.tips.length === 0) {
    balanceTipsData.tips = [
      "🎯 Prioritize assignments by due date",
      "📝 Create a weekly schedule every Sunday",
      "💪 Take breaks to avoid burnout",
      "🎓 Remember why you're in school",
      "🤝 Communicate with professors about deadlines",
      "😴 Get enough sleep - don't overwork",
    ];
  }

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Student Earning Tips"),
    subtitle: t(tData?.newsletter?.subtitle, "Subscribe for weekly student-friendly job opportunities and money tips"),
    buttonText: t(tData?.newsletter?.buttonText, "Subscribe"),
    placeholder: t(tData?.newsletter?.placeholder, "Enter your email"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Earn Money as a Student FAQ - ${countryName}`),
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
        q: "How many hours can a student work while studying?",
        a: "Most students work 10-20 hours per week successfully. Full-time students should aim for 15 hours or less to maintain good grades.",
      },
      {
        q: "What's the best job for a student with no experience?",
        a: "Survey sites, cashback apps, and data entry require no experience. Online tutoring is great if you excel in certain subjects.",
      },
      {
        q: "Can international students work online?",
        a: "It depends on your visa. Many international students can work on-campus or do freelance work. Check your visa terms carefully.",
      },
      {
        q: "How do I get paid as a student?",
        a: "Most platforms pay via PayPal, direct deposit, or gift cards. Set up a PayPal account to receive payments easily.",
      },
      {
        q: "Will working affect my financial aid?",
        a: "Earnings can affect need-based aid. Check with your financial aid office about income limits before earning too much.",
      },
      {
        q: "What skills pay the most for students?",
        a: "Programming, graphic design, and tutoring pay the highest ($25-50/hour). Writing and social media management also pay well ($18-35/hour).",
      },
      {
        q: "Can I work from my dorm room?",
        a: "Yes! Most online jobs can be done from your dorm. Just need a laptop and reliable internet.",
      },
      {
        q: "How do I find legitimate online jobs?",
        a: "Use reputable platforms like Upwork, Fiverr, and Chegg. Avoid any job asking for upfront payment.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning as a Student Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of students already making money while pursuing their degrees"),
    buttonText: t(tData?.final?.buttonText, "Find Student Jobs"),
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
              href="/student-jobs"
              translationKey="find_student_jobs"
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
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {statsData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl"
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
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

      {/* Student Jobs Section */}
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
                {studentJobsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentJobsData.jobs.map((job, index) => (
                <a
                  key={index}
                  href={job.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {job.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mb-2">
                    {job.type}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {job.description}
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Earnings:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {job.earnings}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Time:</span>
                      <span className="text-gray-700 dark:text-gray-300">{job.timeCommitment}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

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
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
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
                          {platform.category}
                        </p>
                      </div>
                    </div>
                    {platform.signupBonus !== "$0" && (
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">
                        Bonus: {platform.signupBonus}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {platform.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {platform.bestFor.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <PrimaryCTA
                    href={platform.link}
                    translationKey="sign_up_free"
                    observer={false}
                  />
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
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
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
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
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
                      <div className="text-5xl mb-2">👩‍🎓</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {story.name}, {story.age}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {story.university}
                      </p>
                      <div className="text-purple-600 dark:text-purple-400 font-bold text-lg mt-2">
                        {story.earnings}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        via {story.method}
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

      {/* Time Management Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="time-management-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="time-management-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {timeManagementData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeManagementData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4">{tip.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Tax Tips Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="tax-tips-heading"
          >
            <div className="text-center mb-12">
              <h2
                id="tax-tips-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {taxTipsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taxTipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Balance Tips Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="balance-heading"
          >
            <div className="text-center mb-12">
              <h2
                id="balance-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {balanceTipsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {balanceTipsData.tips.map((tip, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {tip}
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12">
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
                <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  {newsletterData.buttonText}
                </button>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder)

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
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/student-jobs"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
