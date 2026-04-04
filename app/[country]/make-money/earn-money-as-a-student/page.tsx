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
  company: string;
  logo: string;
  earnings: string;
  description: string;
  requirements: string[];
  timePerDay: string;
  flexibility: string;
  link: string;
}

interface Platform {
  name: string;
  icon: string;
  description: string;
  bestFor: string[];
  studentFriendly: boolean;
  link: string;
}

interface Scholarship {
  name: string;
  amount: string;
  provider: string;
  deadline: string;
  description: string;
  icon: string;
  link: string;
}

interface Tip {
  title: string;
  description: string;
  icon: string;
}

interface StudentStory {
  name: string;
  age: number;
  university: string;
  earnings: string;
  story: string;
  jobType: string;
  hoursPerWeek: string;
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
  bestStudentJobsTitle?: string;
  bestStudentJobs?: StudentJob[];
  flexiblePlatformsTitle?: string;
  flexiblePlatforms?: Platform[];
  scholarshipsTitle?: string;
  scholarships?: Scholarship[];
  studentTipsTitle?: string;
  studentTips?: Tip[];
  studentStoriesTitle?: string;
  studentStories?: StudentStory[];
  timeManagementTitle?: string;
  timeManagement?: {
    title?: string;
    tips?: Array<{
      timeSlot: string;
      activity: string;
      tip: string;
    }>;
  };
  taxTipsTitle?: string;
  taxTips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
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
    `student jobs ${lowerCountry}`,
    `part time jobs for students ${lowerCountry}`,
    `online jobs for students ${lowerCountry}`,
    `work from home for students ${lowerCountry}`,
    `flexible student jobs ${lowerCountry}`,
    `make money while studying ${lowerCountry}`,
    `student side hustles ${lowerCountry}`,
    `college student jobs ${lowerCountry}`,
    `university student work ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "student jobs usa",
      "college student jobs america",
      "work study jobs usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "student jobs uk",
      "university student work britain",
      "part time jobs for students uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "student jobs canada",
      "college student work canada",
      "part time jobs for students canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "student jobs australia",
      "university student work australia",
      "part time jobs for students australia"
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
    `Earn Money as a Student in ${countryName} - Flexible Part-Time Jobs | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover how to earn money as a student in ${countryName}. Find flexible part-time jobs, online work, and side hustles that work around your class schedule. Start earning today!`
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
  const description = t(rawDescription, `Discover how to earn money as a student in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-money-as-a-student`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money as a Student in {country}"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Balance work and study with flexible student jobs in ${countryName}. Discover part-time opportunities, online work, and side hustles that fit around your classes. No experience needed!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Why Students Love Flexible Work"),
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
        value: "76%",
        label: "of students",
        description: "work while studying",
      },
      {
        value: "$15-30",
        label: "average hourly rate",
        description: "for student-friendly jobs",
      },
      {
        value: "10-20",
        label: "hours/week",
        description: "ideal for students",
      },
      {
        value: "80%",
        label: "of employers",
        description: "value student work experience",
      },
    ];
  }

  const bestStudentJobsData = {
    title: t(tData?.bestStudentJobsTitle, "Best Jobs for Students (Flexible Hours)"),
    jobs: (tData?.bestStudentJobs || []).map((job) => ({
      ...job,
      title: t(job.title, job.title),
      company: t(job.company, job.company),
      description: t(job.description, job.description),
    })),
  };

  // Default student jobs if not in translation
  if (bestStudentJobsData.jobs.length === 0) {
    bestStudentJobsData.jobs = [
      {
        title: "Online Tutor",
        company: "Various Platforms",
        logo: "📚",
        earnings: "$20-40/hour",
        description: "Tutor students in subjects you excel at. Perfect for leveraging your academic strengths.",
        requirements: ["Good grades in subject", "Patience", "Communication skills"],
        timePerDay: "2-3 hours",
        flexibility: "Very High",
        link: "/student-jobs/tutor",
      },
      {
        title: "Freelance Writer",
        company: "Content Agencies",
        logo: "✍️",
        earnings: "$25-50/hour",
        description: "Write articles, blog posts, and academic content. Great for English/lit majors.",
        requirements: ["Writing skills", "Research ability", "Grammar knowledge"],
        timePerDay: "2-4 hours",
        flexibility: "Very High",
        link: "/student-jobs/freelance-writer",
      },
      {
        title: "Virtual Assistant",
        company: "Small Businesses",
        logo: "📋",
        earnings: "$18-30/hour",
        description: "Help entrepreneurs with email, scheduling, and administrative tasks.",
        requirements: ["Organized", "Reliable", "Basic computer skills"],
        timePerDay: "2-3 hours",
        flexibility: "High",
        link: "/student-jobs/virtual-assistant",
      },
      {
        title: "Social Media Manager",
        company: "Local Businesses",
        logo: "📱",
        earnings: "$20-35/hour",
        description: "Manage social media accounts for small businesses. Students understand social trends!",
        requirements: ["Social media savvy", "Creative", "Basic design skills"],
        timePerDay: "1-2 hours",
        flexibility: "High",
        link: "/student-jobs/social-media",
      },
      {
        title: "Data Entry",
        company: "Various Companies",
        logo: "📊",
        earnings: "$15-22/hour",
        description: "Enter and organize data. Simple work that can be done anytime.",
        requirements: ["Typing skills", "Attention to detail", "Computer access"],
        timePerDay: "2-4 hours",
        flexibility: "Very High",
        link: "/student-jobs/data-entry",
      },
      {
        title: "Graphic Designer",
        company: "Design Agencies",
        logo: "🎨",
        earnings: "$25-45/hour",
        description: "Create logos, social media graphics, and marketing materials.",
        requirements: ["Design software knowledge", "Creativity", "Portfolio"],
        timePerDay: "2-3 hours",
        flexibility: "High",
        link: "/student-jobs/graphic-designer",
      },
    ];
  }

  const flexiblePlatformsData = {
    title: t(tData?.flexiblePlatformsTitle, "Student-Friendly Work Platforms"),
    platforms: (tData?.flexiblePlatforms || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default platforms if not in translation
  if (flexiblePlatformsData.platforms.length === 0) {
    flexiblePlatformsData.platforms = [
      {
        name: "Chegg Tutors",
        icon: "🎓",
        description: "Online tutoring platform - set your own hours",
        bestFor: ["Tutoring", "Homework Help"],
        studentFriendly: true,
        link: "/platform/chegg",
      },
      {
        name: "Fiverr",
        icon: "⭐",
        description: "Sell any skill starting at $5",
        bestFor: ["Writing", "Design", "Voice Over"],
        studentFriendly: true,
        link: "/platform/fiverr",
      },
      {
        name: "Upwork",
        icon: "💼",
        description: "Find freelance jobs in your field of study",
        bestFor: ["Programming", "Writing", "Design"],
        studentFriendly: true,
        link: "/platform/upwork",
      },
      {
        name: "TaskRabbit",
        icon: "🔧",
        description: "Local tasks and errands (where available)",
        bestFor: ["Delivery", "Errands", "Assembly"],
        studentFriendly: true,
        link: "/platform/taskrabbit",
      },
      {
        name: "UserTesting",
        icon: "🧪",
        description: "Test websites and apps for $10-60/test",
        bestFor: ["User Testing", "Feedback"],
        studentFriendly: true,
        link: "/platform/usertesting",
      },
      {
        name: "Coursera",
        icon: "📖",
        description: "Get paid to help other students learn",
        bestFor: ["Teaching Assistant", "Course Help"],
        studentFriendly: true,
        link: "/platform/coursera",
      },
    ];
  }

  const studentTipsData = {
    title: t(tData?.studentTipsTitle, "Tips for Balancing Work & Study"),
    tips: (tData?.studentTips || []).map((tip) => ({
      ...tip,
      title: t(tip.title, tip.title),
      description: t(tip.description, tip.description),
    })),
  };

  // Default tips if not in translation
  if (studentTipsData.tips.length === 0) {
    studentTipsData.tips = [
      {
        title: "Work During Off-Peak Hours",
        description: "Use early mornings, evenings, and weekends when you're not in class.",
        icon: "⏰",
      },
      {
        title: "Combine Study with Work",
        description: "Listen to lectures while doing data entry or use study breaks for quick tasks.",
        icon: "📚",
      },
      {
        title: "Use University Resources",
        description: "Many universities have job boards and career centers specifically for students.",
        icon: "🏛️",
      },
      {
        title: "Communicate Your Schedule",
        description: "Be upfront with employers about your class schedule and exam periods.",
        icon: "💬",
      },
      {
        title: "Prioritize Academics",
        description: "Work is important, but your degree comes first. Don't overcommit.",
        icon: "🎓",
      },
      {
        title: "Build Relevant Experience",
        description: "Choose jobs related to your major to build your resume while earning.",
        icon: "📈",
      },
    ];
  }

  const studentStoriesData = {
    title: t(tData?.studentStoriesTitle, "Student Success Stories"),
    stories: (tData?.studentStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      university: t(story.university, story.university),
      story: t(story.story, story.story),
      jobType: t(story.jobType, story.jobType),
    })),
  };

  // Default student stories if not in translation
  if (studentStoriesData.stories.length === 0) {
    studentStoriesData.stories = [
      {
        name: "Alex",
        age: 21,
        university: "University of Michigan",
        earnings: "$2,500/month",
        story: "I tutor computer science students online. The hours are flexible, and I'm reinforcing what I learn in class.",
        jobType: "Online Tutor",
        hoursPerWeek: "15 hours",
      },
      {
        name: "Jessica",
        age: 20,
        university: "NYU",
        earnings: "$1,800/month",
        story: "I manage social media for 3 local cafes. It takes 10 hours/week and fits perfectly around my classes.",
        jobType: "Social Media Manager",
        hoursPerWeek: "10 hours",
      },
      {
        name: "Michael",
        age: 22,
        university: "UCLA",
        earnings: "$3,000/month",
        story: "Freelance writing for tech blogs. I work 20 hours/week and it's directly related to my journalism degree.",
        jobType: "Freelance Writer",
        hoursPerWeek: "20 hours",
      },
    ];
  }

  const timeManagementData = {
    title: t(tData?.timeManagement?.title, "Sample Student Schedule"),
    tips: (tData?.timeManagement?.tips || []).map((tip) => ({
      ...tip,
      timeSlot: t(tip.timeSlot, tip.timeSlot),
      activity: t(tip.activity, tip.activity),
      tip: t(tip.tip, tip.tip),
    })),
  };

  // Default time management tips if not in translation
  if (timeManagementData.tips.length === 0) {
    timeManagementData.tips = [
      {
        timeSlot: "Morning (Before Class)",
        activity: "Quick tasks (emails, small gigs)",
        tip: "Use 30-60 minutes before your first class for quick paid tasks",
      },
      {
        timeSlot: "Between Classes",
        activity: "Study or short work sessions",
        tip: "2-hour breaks are perfect for focused work or tutoring sessions",
      },
      {
        timeSlot: "Evenings",
        activity: "Main work block",
        tip: "Work 2-3 hours after classes - most productive time for many students",
      },
      {
        timeSlot: "Weekends",
        activity: "Heavy work days",
        tip: "Dedicate 4-6 hours on Saturday or Sunday for bigger projects",
      },
    ];
  }

  const taxTipsData = {
    title: t(tData?.taxTipsTitle, "Tax Tips for Student Earners"),
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
        description: "Keep records of all income - you'll need this for taxes.",
        icon: "📊",
      },
      {
        title: "Know Your Allowance",
        description: "Many countries have tax-free allowances for students. Research yours!",
        icon: "💰",
      },
      {
        title: "Save for Taxes",
        description: "Set aside 15-20% of each payment for potential taxes.",
        icon: "🏦",
      },
      {
        title: "Deduct Expenses",
        description: "You may deduct work-related expenses like internet or equipment.",
        icon: "✂️",
      },
    ];
  }

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Student Job Alerts"),
    subtitle: t(tData?.newsletter?.subtitle, "Weekly curated jobs perfect for students"),
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
        q: "How many hours can a student work?",
        a: "Most students work 10-20 hours per week during school and up to 40 hours during breaks. Check your visa restrictions if international.",
      },
      {
        q: "Can international students work online?",
        a: "It depends on your visa. Many student visas allow part-time work (usually 20 hours/week). Check with your international student office.",
      },
      {
        q: "What's the best job for a student with no experience?",
        a: "Data entry, virtual assistant, and online surveys are great starting points. Tutoring in subjects you're good at also works well.",
      },
      {
        q: "How do I balance work and studying?",
        a: "Create a schedule, use a planner, communicate with employers about exam periods, and don't overcommit. Your grades come first!",
      },
      {
        q: "Can I work from my dorm room?",
        a: "Absolutely! Most online student jobs only require a laptop and internet connection.",
      },
      {
        q: "Do I need to tell my university I'm working?",
        a: "Not usually for online freelance work, but check your university's policies. International students must follow visa work restrictions.",
      },
      {
        q: "How much can a student realistically earn?",
        a: "Most students earn $800-2,000/month working 10-20 hours/week. Some earn more with specialized skills like coding or design.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning While You Learn"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of students already earning from home"),
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

      {/* Best Student Jobs Section */}
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
                {bestStudentJobsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                These jobs offer the flexibility students need to succeed
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestStudentJobsData.jobs.map((job, index) => (
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
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                      {job.earnings}
                    </div>
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
                  <div className="space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Time/day:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {job.timePerDay}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Flexibility:</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {job.flexibility}
                      </span>
                    </div>
                  </div>
                  <PrimaryCTA
                    href={job.link}
                    translationKey="learn_more"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Flexible Platforms Section */}
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
                {flexiblePlatformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flexiblePlatformsData.platforms.map((platform, index) => (
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
                      </div>
                    </div>
                    {platform.studentFriendly && (
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-bold">
                        Student ✅
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {platform.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {platform.bestFor.map((category, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
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

      {/* Time Management Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="schedule-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="schedule-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {timeManagementData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeManagementData.tips.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
                >
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {item.timeSlot}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.activity}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.tip}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Student Tips Section */}
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
                {studentTipsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentTipsData.tips.map((tip, index) => (
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

      {/* Student Stories Section */}
      {studentStoriesData.stories.length > 0 && (
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
                  {studentStoriesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {studentStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">🎓</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {story.name}, {story.age}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {story.university}
                      </p>
                      <div className="text-green-600 dark:text-green-400 font-bold text-lg mt-2">
                        {story.earnings}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {story.hoursPerWeek} per week
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

      {/* Tax Tips Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="tax-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="tax-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {taxTipsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {taxTipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-800"
                >
                  <div className="text-4xl mb-3">{tip.icon}</div>
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
