// app/[country]/(marketing)/work-from-home-jobs/page.tsx

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

interface JobPlatform {
  name: string;
  logo: string;
  jobTypes: string[];
  description: string;
  averagePay: string;
  features: string[];
  rating: number;
  link: string;
  isFeatured?: boolean;
}

interface JobCategory {
  name: string;
  icon: string;
  description: string;
  jobCount: number;
  skills: string[];
  averagePay: string;
}

interface RemoteJob {
  title: string;
  company: string;
  jobType: string;
  description: string;
  payRange: string;
  requirements: string[];
  link: string;
  isUrgent?: boolean;
}

interface FreelanceGig {
  title: string;
  category: string;
  averagePay: string;
  demand: "High" | "Medium" | "Low";
  skills: string[];
  platforms: string[];
  link: string;
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
  categoryTitle?: string;
  categories?: JobCategory[];
  featuredPlatformsTitle?: string;
  featuredPlatforms?: JobPlatform[];
  remoteJobsTitle?: string;
  remoteJobs?: RemoteJob[];
  freelanceGigsTitle?: string;
  freelanceGigs?: FreelanceGig[];
  entryLevelTitle?: string;
  entryLevel?: RemoteJob[];
  highestPayingTitle?: string;
  highestPaying?: FreelanceGig[];
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  salaryCalculator?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  compareTitle?: string;
  compare?: {
    description?: string;
    items?: Array<{
      name: string;
      jobTypes: string;
      averagePay: string;
      flexibility: string;
      rating: number;
    }>;
  };
  successStoriesTitle?: string;
  successStories?: Array<{
    name: string;
    earnings: string;
    story: string;
    role: string;
  }>;
  resourcesTitle?: string;
  resources?: Array<{
    title: string;
    description: string;
    readTime: string;
    link: string;
  }>;
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
    `work from home jobs ${lowerCountry}`,
    `remote jobs ${lowerCountry}`,
    `online jobs from home ${lowerCountry}`,
    `work at home jobs ${lowerCountry}`,
    `remote work opportunities ${lowerCountry}`,
    `telecommuting jobs ${lowerCountry}`,
    `home based jobs ${lowerCountry}`,
    `virtual jobs ${lowerCountry}`,
    `freelance work from home ${lowerCountry}`,
    `legitimate work from home ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "remote jobs usa",
      "work from home jobs usa",
      "online jobs usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "remote jobs uk",
      "work from home jobs uk",
      "online jobs uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "remote jobs canada",
      "work from home jobs canada",
      "online jobs canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "remote jobs australia",
      "work from home jobs australia",
      "online jobs australia"
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
    translation = await loadSectionTranslation(language, "work-from-home-jobs");
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
    `Work From Home Jobs - Legitimate Remote Jobs in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Find legitimate work from home jobs in ${countryName}. Browse remote positions, freelance gigs, and online opportunities. Start your remote career today with verified employers.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/work-from-home-jobs`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/work-from-home-jobs`,
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

export default async function WorkFromHomeJobsPage({
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
  const tData = await loadSectionTranslation(language, "work-from-home-jobs");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Work From Home Jobs - Legitimate Remote Jobs`);
  const description = t(rawDescription, `Find legitimate work from home jobs in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/work-from-home-jobs`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Find Legitimate Work From Home Jobs"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Discover real remote job opportunities in ${countryName}. Whether you're looking for full-time remote positions, freelance gigs, or part-time online work - start your work from home journey today.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Remote Job Categories"),
    categories: (tData?.categories || []).map((category) => ({
      ...category,
      name: t(category.name, category.name),
      description: t(category.description, category.description),
    })),
  };

  // Default categories if not in translation
  if (categoryData.categories.length === 0) {
    categoryData.categories = [
      {
        name: "Customer Support",
        icon: "💬",
        description: "Remote customer service and support roles",
        jobCount: 2340,
        skills: ["Communication", "Problem Solving", "CRM Software"],
        averagePay: "$15-25/hour",
      },
      {
        name: "Virtual Assistant",
        icon: "📋",
        description: "Administrative support from home",
        jobCount: 1850,
        skills: ["Organization", "Email Management", "Calendar Management"],
        averagePay: "$18-30/hour",
      },
      {
        name: "Data Entry",
        icon: "📊",
        description: "Typing and data processing jobs",
        jobCount: 2100,
        skills: ["Typing Speed", "Attention to Detail", "Excel"],
        averagePay: "$12-20/hour",
      },
      {
        name: "Writing & Editing",
        icon: "✍️",
        description: "Content creation and editing roles",
        jobCount: 3200,
        skills: ["Grammar", "SEO", "Research"],
        averagePay: "$25-50/hour",
      },
      {
        name: "IT & Tech Support",
        icon: "💻",
        description: "Technical support and IT roles",
        jobCount: 1950,
        skills: ["Troubleshooting", "Networking", "Help Desk"],
        averagePay: "$25-45/hour",
      },
      {
        name: "Sales & Marketing",
        icon: "📈",
        description: "Remote sales and digital marketing",
        jobCount: 2800,
        skills: ["Communication", "Social Media", "CRM"],
        averagePay: "$20-40/hour + commission",
      },
    ];
  }

  const featuredPlatformsData = {
    title: t(tData?.featuredPlatformsTitle, "🌟 Best Platforms for Remote Work"),
    platforms: (tData?.featuredPlatforms || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default featured platforms if not in translation
  if (featuredPlatformsData.platforms.length === 0) {
    featuredPlatformsData.platforms = [
      {
        name: "FlexJobs",
        logo: "💼",
        jobTypes: ["Full-Time", "Part-Time", "Freelance"],
        description: "Curated remote and flexible jobs - all hand-screened",
        averagePay: "$40-80k/year",
        features: ["Scam-free jobs", "Career coaching", "Skills tests"],
        rating: 4.7,
        link: "/platform/flexjobs",
        isFeatured: true,
      },
      {
        name: "Upwork",
        logo: "🌐",
        jobTypes: ["Freelance", "Contract", "Hourly"],
        description: "World's largest freelance marketplace",
        averagePay: "$20-100/hour",
        features: ["Escrow protection", "Dispute resolution", "Time tracking"],
        rating: 4.5,
        link: "/platform/upwork",
        isFeatured: true,
      },
      {
        name: "Remote.co",
        logo: "🏠",
        jobTypes: ["Full-Time", "Part-Time"],
        description: "Remote jobs from top companies",
        averagePay: "$50-100k/year",
        features: ["Remote-first companies", "Expert advice", "Job alerts"],
        rating: 4.6,
        link: "/platform/remote-co",
        isFeatured: true,
      },
    ];
  }

  const remoteJobsData = {
    title: t(tData?.remoteJobsTitle, "🔍 Featured Remote Jobs"),
    jobs: (tData?.remoteJobs || []).map((job) => ({
      ...job,
      title: t(job.title, job.title),
      company: t(job.company, job.company),
      description: t(job.description, job.description),
    })),
  };

  // Default remote jobs if not in translation
  if (remoteJobsData.jobs.length === 0) {
    remoteJobsData.jobs = [
      {
        title: "Remote Customer Support Specialist",
        company: "Atlassian",
        jobType: "Full-Time",
        description: "Provide exceptional support to global customers via chat and email",
        payRange: "$45,000 - $60,000",
        requirements: ["1+ year support experience", "Excellent communication", "CRM knowledge"],
        link: "/job/customer-support-atlassian",
        isUrgent: true,
      },
      {
        title: "Virtual Assistant",
        company: "Belay",
        jobType: "Part-Time",
        description: "Support executives with scheduling, email, and administrative tasks",
        payRange: "$18 - $25/hour",
        requirements: ["2+ years admin experience", "Tech savvy", "Self-motivated"],
        link: "/job/virtual-assistant-belay",
        isUrgent: false,
      },
      {
        title: "Content Writer",
        company: "HubSpot",
        jobType: "Contract",
        description: "Create engaging blog content and marketing materials",
        payRange: "$30 - $50/hour",
        requirements: ["Writing portfolio", "SEO knowledge", "B2B experience"],
        link: "/job/content-writer-hubspot",
        isUrgent: true,
      },
    ];
  }

  const freelanceGigsData = {
    title: t(tData?.freelanceGigsTitle, "💼 High-Demand Freelance Gigs"),
    gigs: (tData?.freelanceGigs || []).map((gig) => ({
      ...gig,
      title: t(gig.title, gig.title),
    })),
  };

  // Default freelance gigs if not in translation
  if (freelanceGigsData.gigs.length === 0) {
    freelanceGigsData.gigs = [
      {
        title: "Social Media Manager",
        category: "Marketing",
        averagePay: "$25-75/hour",
        demand: "High",
        skills: ["Content creation", "Analytics", "Community management"],
        platforms: ["Upwork", "Fiverr", "LinkedIn"],
        link: "/freelance/social-media-manager",
      },
      {
        title: "Web Developer",
        category: "Tech",
        averagePay: "$40-150/hour",
        demand: "High",
        skills: ["JavaScript", "React", "HTML/CSS"],
        platforms: ["Toptal", "Upwork", "Freelancer"],
        link: "/freelance/web-developer",
      },
      {
        title: "Graphic Designer",
        category: "Design",
        averagePay: "$30-80/hour",
        demand: "High",
        skills: ["Adobe Suite", "Figma", "Typography"],
        platforms: ["99designs", "Upwork", "Fiverr"],
        link: "/freelance/graphic-designer",
      },
    ];
  }

  const entryLevelData = {
    title: t(tData?.entryLevelTitle, "🎯 Entry Level Remote Jobs"),
    jobs: (tData?.entryLevel || []).map((job) => ({
      ...job,
      title: t(job.title, job.title),
      company: t(job.company, job.company),
      description: t(job.description, job.description),
    })),
  };

  // Default entry level jobs if not in translation
  if (entryLevelData.jobs.length === 0) {
    entryLevelData.jobs = [
      {
        title: "Data Entry Clerk",
        company: "Accenture",
        jobType: "Full-Time",
        description: "Enter and verify data in company systems",
        payRange: "$30,000 - $40,000",
        requirements: ["Typing 40+ WPM", "High school diploma", "Detail-oriented"],
        link: "/job/data-entry-accenture",
        isUrgent: false,
      },
      {
        title: "Junior Copywriter",
        company: "Brafton",
        jobType: "Full-Time",
        description: "Write blog posts and social media content",
        payRange: "$35,000 - $45,000",
        requirements: ["Writing samples", "English degree or equivalent", "Creativity"],
        link: "/job/junior-copywriter-brafton",
        isUrgent: false,
      },
    ];
  }

  const highestPayingData = {
    title: t(tData?.highestPayingTitle, "💰 Highest Paying Remote Skills"),
    gigs: (tData?.highestPaying || []).map((gig) => ({
      ...gig,
      title: t(gig.title, gig.title),
    })),
  };

  // Default highest paying if not in translation
  if (highestPayingData.gigs.length === 0) {
    highestPayingData.gigs = [
      {
        title: "Software Engineer",
        category: "Tech",
        averagePay: "$80-200/hour",
        demand: "High",
        skills: ["Python", "Java", "Cloud Computing"],
        platforms: ["Toptal", "Arc", "Upwork"],
        link: "/freelance/software-engineer",
      },
      {
        title: "UX/UI Designer",
        category: "Design",
        averagePay: "$60-150/hour",
        demand: "High",
        skills: ["Figma", "User Research", "Prototyping"],
        platforms: ["Dribbble", "Upwork", "Toptal"],
        link: "/freelance/ux-designer",
      },
      {
        title: "Digital Marketing Consultant",
        category: "Marketing",
        averagePay: "$50-200/hour",
        demand: "High",
        skills: ["SEO", "PPC", "Analytics"],
        platforms: ["Upwork", "LinkedIn", "Clutch"],
        link: "/freelance/marketing-consultant",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Work From Home Tips"),
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
        title: "Create a Dedicated Workspace",
        description: "Set up a quiet, organized area for work to boost productivity and separate work from personal life.",
        icon: "🏠",
      },
      {
        title: "Avoid Scams",
        description: "Never pay for a job opportunity. Legitimate employers won't ask for upfront fees.",
        icon: "🛡️",
      },
      {
        title: "Build Your Portfolio",
        description: "Showcase your best work to attract higher-paying clients and employers.",
        icon: "📁",
      },
      {
        title: "Network Online",
        description: "Join remote work communities and LinkedIn groups to find opportunities.",
        icon: "🤝",
      },
    ];
  }

  const salaryCalculatorData = {
    title: t(tData?.salaryCalculator?.title, "Calculate Your Remote Salary"),
    description: t(tData?.salaryCalculator?.description, "See how much you could earn working from home based on your skills and experience"),
    buttonText: t(tData?.salaryCalculator?.buttonText, "Try Calculator"),
  };

  const compareData = {
    title: t(tData?.compareTitle, "Compare Remote Job Platforms"),
    description: t(tData?.compare?.description, "Find the best platform for your remote work journey"),
    items: (tData?.compare?.items || []).map((item) => ({
      ...item,
      name: t(item.name, item.name),
    })),
  };

  // Default compare items if not in translation
  if (!compareData.items || compareData.items.length === 0) {
    compareData.items = [
      {
        name: "FlexJobs",
        jobTypes: "Full-Time, Part-Time",
        averagePay: "$40-80k/year",
        flexibility: "High",
        rating: 4.7,
      },
      {
        name: "Upwork",
        jobTypes: "Freelance, Contract",
        averagePay: "$20-100/hour",
        flexibility: "Very High",
        rating: 4.5,
      },
      {
        name: "Remote.co",
        jobTypes: "Full-Time, Part-Time",
        averagePay: "$50-100k/year",
        flexibility: "High",
        rating: 4.6,
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      story: t(story.story, story.story),
      role: t(story.role, story.role),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Sarah J.",
        earnings: "$65,000",
        story: "Found a remote customer success role on FlexJobs. Now I work from home and save 15 hours weekly on commuting!",
        role: "Customer Success Manager",
      },
      {
        name: "Mike R.",
        earnings: "$85,000",
        story: "Transitioned from office to remote software development. Better pay, better work-life balance.",
        role: "Software Developer",
      },
      {
        name: "Jessica T.",
        earnings: "$52,000",
        story: "Started as a freelance writer on Upwork, now have steady clients and work from anywhere.",
        role: "Content Writer",
      },
    ];
  }

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Remote Work Resources"),
    resources: (tData?.resources || []).map((resource) => ({
      ...resource,
      title: t(resource.title, resource.title),
      description: t(resource.description, resource.description),
    })),
  };

  // Default resources if not in translation
  if (resourcesData.resources.length === 0) {
    resourcesData.resources = [
      {
        title: "How to Create a Remote Resume",
        description: "Tips for highlighting remote-ready skills",
        readTime: "8 min",
        link: "/resource/remote-resume",
      },
      {
        title: "Remote Interview Tips",
        description: "Ace your virtual interview with these strategies",
        readTime: "6 min",
        link: "/resource/remote-interview",
      },
      {
        title: "Productivity Tools for Remote Workers",
        description: "Essential apps and software for working from home",
        readTime: "10 min",
        link: "/resource/productivity-tools",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Work From Home Jobs FAQ - ${countryName}`),
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
        q: "Are work from home jobs legitimate?",
        a: "Yes! Many reputable companies now offer remote positions. However, be cautious of scams - legitimate jobs never ask for upfront payment."
      },
      {
        q: "What skills do I need to work from home?",
        a: "Essential skills include self-discipline, time management, communication, and basic computer literacy. Specific technical skills vary by role."
      },
      {
        q: "How much can I earn working from home?",
        a: "Earnings vary widely: entry-level $30-45k/year, mid-level $45-80k/year, and senior roles $80-150k+. Freelancers can earn $20-200+/hour based on skills."
      },
      {
        q: "Where can I find legitimate remote jobs?",
        a: "Trusted platforms include FlexJobs, Remote.co, We Work Remotely, and LinkedIn. These sites screen jobs to reduce scam listings."
      },
      {
        q: "Do I need experience to start?",
        a: "Many entry-level remote jobs don't require experience. Focus on building relevant skills through online courses and freelance projects."
      },
      {
        q: "Can I work from home outside my country?",
        a: "Some companies allow international remote work, but consider time zones, tax implications, and visa requirements. Check each company's policy."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Your Remote Career Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands who found legitimate work from home jobs and transformed their lives"),
    buttonText: t(tData?.final?.buttonText, "Browse Remote Jobs"),
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

      {/* Categories Section */}
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
                {categoryData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4" aria-hidden="true">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.jobCount.toLocaleString()}+ jobs
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      {category.averagePay}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {category.skills.slice(0, 2).map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/jobs/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
                  >
                    Browse jobs →
                  </a>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Platforms Section */}
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
                {featuredPlatformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlatformsData.platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                >
                  {platform.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                      🌟 Top Pick
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center p-8">
                    <div className="text-6xl">{platform.logo}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {platform.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{platform.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {platform.description}
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {platform.averagePay}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">average pay</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {platform.jobTypes.map((type, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1 mb-4">
                      {platform.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span className="text-green-500 mr-1">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <PrimaryCTA
                      href={platform.link}
                      translationKey="visit_platform"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Remote Jobs Section */}
      {remoteJobsData.jobs.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="jobs-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="jobs-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {remoteJobsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remoteJobsData.jobs.map((job, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                  >
                    {job.isUrgent && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                        Urgent
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <span className="text-xs text-gray-500">{job.jobType}</span>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        {job.company}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {job.description}
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 mb-3">
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {job.payRange}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Requirements:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {job.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx}>• {req}</li>
                          ))}
                        </ul>
                      </div>
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
      )}

      {/* Freelance Gigs Section */}
      {freelanceGigsData.gigs.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="gigs-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="gigs-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {freelanceGigsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {freelanceGigsData.gigs.map((gig, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {gig.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        gig.demand === "High" ? "bg-green-100 text-green-700" :
                        gig.demand === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {gig.demand} Demand
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{gig.category}</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
                      {gig.averagePay}
                    </p>
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Skills needed:</p>
                      <div className="flex flex-wrap gap-1">
                        {gig.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Platforms: {gig.platforms.join(", ")}
                    </p>
                    <PrimaryCTA
                      href={gig.link}
                      translationKey="learn_more"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Entry Level Jobs Section */}
      {entryLevelData.jobs.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="entry-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="entry-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {entryLevelData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entryLevelData.jobs.map((job, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {job.title}
                      </h3>
                      <span className="text-xs text-gray-500">{job.jobType}</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {job.company}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {job.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-green-600">
                        {job.payRange}
                      </span>
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
        </CircleBorder>
      )}

      {/* Highest Paying Section */}
      {highestPayingData.gigs.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="highest-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="highest-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {highestPayingData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {highestPayingData.gigs.map((gig, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">
                        {index === 0 ? "💻" : index === 1 ? "🎨" : "📈"}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {gig.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{gig.category}</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-3">
                        {gig.averagePay}
                      </p>
                      <p className="text-sm font-semibold text-green-600 mb-2">
                        {gig.demand} Demand
                      </p>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Top Skills:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {gig.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-white rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <PrimaryCTA
                        href={gig.link}
                        translationKey="explore"
                        observer={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Compare Section */}
      {compareData.items && compareData.items.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="compare-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="compare-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {compareData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Platform</th>
                      <th className="px-6 py-3 text-left">Job Types</th>
                      <th className="px-6 py-3 text-left">Average Pay</th>
                      <th className="px-6 py-3 text-left">Flexibility</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.jobTypes}
                        </td>
                        <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">
                          {item.averagePay}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.flexibility}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600 dark:text-gray-300">{item.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PrimaryCTA
                            href={`/platform/${item.name.toLowerCase().replace(/ /g, '-')}`}
                            translationKey="visit"
                            observer={false}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Success Stories Section */}
      {successStoriesData.stories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
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
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
                  >
                    <div className="text-4xl mb-3">⭐</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        ${story.earnings}/year • {story.role}
                      </p>
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
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                >
                  <div className="text-5xl mb-4" aria-hidden="true">
                    {tip.icon}
                  </div>
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

      {/* Salary Calculator Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="calculator-heading"
          >
            <h2
              id="calculator-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {salaryCalculatorData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {salaryCalculatorData.description}
            </p>
            <PrimaryCTA
              href="/salary-calculator"
              translationKey={salaryCalculatorData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Resources Section */}
      {resourcesData.resources.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="resources-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="resources-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {resourcesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resourcesData.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {resource.readTime} read
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        Read →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

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
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full mb-8"
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
