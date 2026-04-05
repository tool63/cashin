// app/[country]/(marketing)/earn-money-from-home/page.tsx

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

interface WorkFromHomeJob {
  title: string;
  company: string;
  logo: string;
  salary: string;
  description: string;
  requirements: string[];
  jobType: string;
  link: string;
}

interface SideHustle {
  name: string;
  icon: string;
  description: string;
  earnings: string;
  timeRequired: string;
  difficulty: string;
  link: string;
}

interface RemoteCompany {
  name: string;
  logo: string;
  industry: string;
  hiringFor: string[];
  link: string;
}

interface Tool {
  name: string;
  icon: string;
  description: string;
  freeTier: boolean;
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
  location: string;
  earnings: string;
  story: string;
  role: string;
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
  }>;
  featuredJobsTitle?: string;
  featuredJobs?: WorkFromHomeJob[];
  sideHustlesTitle?: string;
  sideHustles?: SideHustle[];
  remoteCompaniesTitle?: string;
  remoteCompanies?: RemoteCompany[];
  essentialToolsTitle?: string;
  essentialTools?: Tool[];
  tipsTitle?: string;
  tips?: Tip[];
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  salaryGuideTitle?: string;
  salaryGuide?: {
    title?: string;
    description?: string;
    roles?: Array<{
      role: string;
      entryLevel: string;
      experienced: string;
      expert: string;
    }>;
  };
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
    `work from home jobs ${lowerCountry}`,
    `remote jobs ${lowerCountry}`,
    `earn money from home ${lowerCountry}`,
    `home based jobs ${lowerCountry}`,
    `remote work opportunities ${lowerCountry}`,
    `telecommute jobs ${lowerCountry}`,
    `online jobs from home ${lowerCountry}`,
    `virtual jobs ${lowerCountry}`,
    `work from home careers ${lowerCountry}`,
    `legit work from home ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "remote jobs usa",
      "work from home america",
      "us telecommute jobs"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "remote jobs uk",
      "work from home britain",
      "uk telecommute jobs"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "remote jobs canada",
      "work from home canada",
      "canada telecommute jobs"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "remote jobs australia",
      "work from home australia",
      "australia telecommute jobs"
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
    translation = await loadSectionTranslation(language, "earn-money-from-home");
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
    `Earn Money from Home in ${countryName} - Legit Remote Jobs & Side Hustles | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Find legit ways to earn money from home in ${countryName}. Discover remote jobs, side hustles, and work-from-home opportunities that actually pay. Start your home-based career today.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-money-from-home`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-money-from-home`,
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

export default async function EarnMoneyFromHomePage({
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
  const tData = await loadSectionTranslation(language, "earn-money-from-home");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money from Home in ${countryName}`);
  const description = t(rawDescription, `Find legit ways to earn money from home in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-money-from-home`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money from Home in {country}"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Discover legitimate work-from-home opportunities in ${countryName}. Whether you're looking for a full-time remote job or a flexible side hustle, find proven ways to earn income from the comfort of your home.`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "The Work-from-Home Revolution"),
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
        value: "58%",
        label: "of workers",
        description: "want to work remotely full-time",
      },
      {
        value: "4.7M+",
        label: "remote jobs",
        description: "available worldwide",
      },
      {
        value: "$50K+",
        label: "average salary",
        description: "for remote positions",
      },
      {
        value: "30%",
        label: "higher productivity",
        description: "for remote workers",
      },
    ];
  }

  const jobCategoriesData = {
    title: t(tData?.jobCategoriesTitle, "Popular Work-from-Home Categories"),
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
        name: "Customer Service",
        icon: "🎧",
        description: "Support customers via phone, chat, or email",
        jobCount: 12500,
      },
      {
        name: "Virtual Assistant",
        icon: "📋",
        description: "Administrative support for businesses",
        jobCount: 8900,
      },
      {
        name: "Data Entry",
        icon: "📊",
        description: "Input and manage data remotely",
        jobCount: 7500,
      },
      {
        name: "Sales",
        icon: "📞",
        description: "Sell products and services remotely",
        jobCount: 6200,
      },
      {
        name: "IT & Tech Support",
        icon: "💻",
        description: "Technical support and IT services",
        jobCount: 15400,
      },
      {
        name: "Writing & Editing",
        icon: "✍️",
        description: "Content creation and editing",
        jobCount: 9800,
      },
      {
        name: "Design",
        icon: "🎨",
        description: "Graphic and web design services",
        jobCount: 7300,
      },
      {
        name: "Accounting",
        icon: "📈",
        description: "Bookkeeping and accounting services",
        jobCount: 4100,
      },
    ];
  }

  const featuredJobsData = {
    title: t(tData?.featuredJobsTitle, "Featured Remote Jobs"),
    jobs: (tData?.featuredJobs || []).map((job) => ({
      ...job,
      title: t(job.title, job.title),
      company: t(job.company, job.company),
      description: t(job.description, job.description),
    })),
  };

  // Default featured jobs if not in translation
  if (featuredJobsData.jobs.length === 0) {
    featuredJobsData.jobs = [
      {
        title: "Customer Support Specialist",
        company: "SupportHub",
        logo: "🎧",
        salary: "$35,000 - $45,000",
        description: "Provide exceptional customer support via chat and email for a growing tech company.",
        requirements: ["Excellent communication", "Problem-solving skills", "1+ year experience"],
        jobType: "Full-time",
        link: "/job/customer-support",
      },
      {
        title: "Virtual Assistant",
        company: "AdminPro",
        logo: "📋",
        salary: "$25 - $35/hour",
        description: "Help entrepreneurs and businesses with administrative tasks, scheduling, and email management.",
        requirements: ["Organized", "Tech-savvy", "Self-motivated"],
        jobType: "Part-time",
        link: "/job/virtual-assistant",
      },
      {
        title: "Remote Sales Representative",
        company: "SalesForce",
        logo: "📞",
        salary: "$50,000 - $70,000 + commission",
        description: "Sell software solutions to businesses across the country.",
        requirements: ["Sales experience", "CRM knowledge", "Excellent communication"],
        jobType: "Full-time",
        link: "/job/sales-representative",
      },
      {
        title: "Content Writer",
        company: "ContentCo",
        logo: "✍️",
        salary: "$45,000 - $60,000",
        description: "Create engaging blog posts, articles, and web content for various clients.",
        requirements: ["Writing portfolio", "SEO knowledge", "Research skills"],
        jobType: "Full-time",
        link: "/job/content-writer",
      },
    ];
  }

  const sideHustlesData = {
    title: t(tData?.sideHustlesTitle, "Best Side Hustles from Home"),
    hustles: (tData?.sideHustles || []).map((hustle) => ({
      ...hustle,
      name: t(hustle.name, hustle.name),
      description: t(hustle.description, hustle.description),
    })),
  };

  // Default side hustles if not in translation
  if (sideHustlesData.hustles.length === 0) {
    sideHustlesData.hustles = [
      {
        name: "Freelance Writing",
        icon: "✍️",
        description: "Write articles, blog posts, and copy for clients",
        earnings: "$500-5,000/month",
        timeRequired: "10-20 hrs/week",
        difficulty: "Medium",
        link: "/freelance-writing",
      },
      {
        name: "Online Tutoring",
        icon: "📚",
        description: "Teach students online in your area of expertise",
        earnings: "$500-3,000/month",
        timeRequired: "5-15 hrs/week",
        difficulty: "Easy",
        link: "/online-tutoring",
      },
      {
        name: "Virtual Assistant",
        icon: "📋",
        description: "Help businesses with administrative tasks",
        earnings: "$1,000-4,000/month",
        timeRequired: "10-20 hrs/week",
        difficulty: "Easy",
        link: "/virtual-assistant",
      },
      {
        name: "Transcription",
        icon: "🎙️",
        description: "Convert audio and video to text",
        earnings: "$500-2,000/month",
        timeRequired: "10-15 hrs/week",
        difficulty: "Easy",
        link: "/transcription",
      },
      {
        name: "Social Media Management",
        icon: "📱",
        description: "Manage social media accounts for businesses",
        earnings: "$1,000-5,000/month",
        timeRequired: "5-10 hrs/week",
        difficulty: "Medium",
        link: "/social-media-manager",
      },
      {
        name: "Graphic Design",
        icon: "🎨",
        description: "Create designs for logos, social media, and websites",
        earnings: "$1,000-6,000/month",
        timeRequired: "10-20 hrs/week",
        difficulty: "Hard",
        link: "/graphic-design",
      },
    ];
  }

  const remoteCompaniesData = {
    title: t(tData?.remoteCompaniesTitle, "Top Remote-Friendly Companies"),
    companies: (tData?.remoteCompanies || []).map((company) => ({
      ...company,
      name: t(company.name, company.name),
      industry: t(company.industry, company.industry),
    })),
  };

  // Default remote companies if not in translation
  if (remoteCompaniesData.companies.length === 0) {
    remoteCompaniesData.companies = [
      {
        name: "FlexJobs",
        logo: "💼",
        industry: "Job Board",
        hiringFor: ["Customer Service", "Writing", "Tech", "Admin"],
        link: "/company/flexjobs",
      },
      {
        name: "Automattic",
        logo: "🔵",
        industry: "Tech",
        hiringFor: ["Developers", "Designers", "Support", "Marketing"],
        link: "/company/automattic",
      },
      {
        name: "Zapier",
        logo: "⚡",
        industry: "Automation",
        hiringFor: ["Engineering", "Product", "Support", "Ops"],
        link: "/company/zapier",
      },
      {
        name: "Buffer",
        logo: "🔴",
        industry: "Social Media",
        hiringFor: ["Marketing", "Engineering", "Support", "Content"],
        link: "/company/buffer",
      },
      {
        name: "GitLab",
        logo: "🟠",
        industry: "DevOps",
        hiringFor: ["Engineering", "Sales", "Marketing", "Support"],
        link: "/company/gitlab",
      },
      {
        name: "InVision",
        logo: "🎨",
        industry: "Design",
        hiringFor: ["Design", "Engineering", "Product", "Sales"],
        link: "/company/invision",
      },
    ];
  }

  const essentialToolsData = {
    title: t(tData?.essentialToolsTitle, "Essential Tools for Working from Home"),
    tools: (tData?.essentialTools || []).map((tool) => ({
      ...tool,
      name: t(tool.name, tool.name),
      description: t(tool.description, tool.description),
    })),
  };

  // Default tools if not in translation
  if (essentialToolsData.tools.length === 0) {
    essentialToolsData.tools = [
      {
        name: "Zoom",
        icon: "🎥",
        description: "Video conferencing and meetings",
        freeTier: true,
        link: "/tool/zoom",
      },
      {
        name: "Slack",
        icon: "💬",
        description: "Team communication and collaboration",
        freeTier: true,
        link: "/tool/slack",
      },
      {
        name: "Trello",
        icon: "📋",
        description: "Project management and task tracking",
        freeTier: true,
        link: "/tool/trello",
      },
      {
        name: "Google Workspace",
        icon: "🔵",
        description: "Email, documents, and cloud storage",
        freeTier: true,
        link: "/tool/google-workspace",
      },
      {
        name: "LastPass",
        icon: "🔒",
        description: "Password management",
        freeTier: true,
        link: "/tool/lastpass",
      },
      {
        name: "Grammarly",
        icon: "✍️",
        description: "Writing assistance and grammar check",
        freeTier: true,
        link: "/tool/grammarly",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Tips for Success Working from Home"),
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
        description: "Set up a quiet, organized area for work to maintain focus and productivity.",
        icon: "🏠",
      },
      {
        title: "Stick to a Schedule",
        description: "Maintain regular work hours to create boundaries between work and personal life.",
        icon: "⏰",
      },
      {
        title: "Minimize Distractions",
        description: "Turn off notifications, use noise-canceling headphones, and set boundaries with family.",
        icon: "📵",
      },
      {
        title: "Stay Connected",
        description: "Regular communication with colleagues helps combat isolation and stay aligned.",
        icon: "💬",
      },
      {
        title: "Take Breaks",
        description: "Step away from your screen regularly to avoid burnout and stay fresh.",
        icon: "☕",
      },
      {
        title: "Invest in Ergonomics",
        description: "Good chair, desk, and equipment prevent physical strain and injury.",
        icon: "🪑",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      location: t(story.location, story.location),
      story: t(story.story, story.story),
      role: t(story.role, story.role),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Emily",
        age: 32,
        location: "Ohio",
        earnings: "$65,000/year",
        story: "Left my office job to work remotely as a customer success manager. Now I have more time with family and no commute.",
        role: "Customer Success Manager",
      },
      {
        name: "David",
        age: 28,
        location: "Texas",
        earnings: "$80,000/year",
        story: "Started as a freelance web developer, now run my own remote agency with 5 team members.",
        role: "Web Developer",
      },
      {
        name: "Maria",
        age: 45,
        location: "Florida",
        earnings: "$55,000/year",
        story: "Transitioned from teaching to virtual tutoring. I work fewer hours and earn more than before.",
        role: "Online Tutor",
      },
    ];
  }

  const salaryGuideData = {
    title: t(tData?.salaryGuideTitle, "Remote Work Salary Guide"),
    roles: (tData?.salaryGuide?.roles || []).map((role) => ({
      ...role,
      role: t(role.role, role.role),
    })),
  };

  const checklistData = {
    title: t(tData?.checklist?.title, "Get Started Checklist"),
    items: (tData?.checklist?.items || []).map((item) => t(item, item)),
  };

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Remote Job Alerts"),
    subtitle: t(tData?.newsletter?.subtitle, "Subscribe for weekly work-from-home opportunities"),
    buttonText: t(tData?.newsletter?.buttonText, "Subscribe"),
    placeholder: t(tData?.newsletter?.placeholder, "Enter your email"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Earn Money from Home FAQ - ${countryName}`),
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
        q: "Are work-from-home jobs legit?",
        a: "Yes! Many legitimate companies hire remote workers. Always research companies and avoid anything asking for upfront payment.",
      },
      {
        q: "What equipment do I need to work from home?",
        a: "At minimum: a reliable computer, high-speed internet, and a quiet workspace. Some jobs may require specific software or equipment.",
      },
      {
        q: "How do I find remote jobs?",
        a: "Use remote job boards like FlexJobs, We Work Remotely, and Remote.co. Also check company career pages directly.",
      },
      {
        q: "Can I work from home without experience?",
        a: "Yes! Entry-level remote jobs exist in customer service, data entry, virtual assisting, and more.",
      },
      {
        q: "How much can I earn working from home?",
        a: "Earnings vary widely. Entry-level positions start around $15-25/hour, while skilled roles can earn $50-100+/hour.",
      },
      {
        q: "Do remote jobs pay less than office jobs?",
        a: "Not necessarily. Many remote jobs pay competitive salaries. Some even pay more due to reduced overhead costs.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Your Work-from-Home Journey Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of people already earning money from home"),
    buttonText: t(tData?.final?.buttonText, "Find Remote Jobs"),
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {jobCategoriesData.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {category.jobCount.toLocaleString()}+ jobs
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Jobs Section */}
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
                {featuredJobsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobsData.jobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{job.logo}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                      {job.salary}
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
                  <div className="flex justify-between items-center">
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

      {/* Side Hustles Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="hustles-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="hustles-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {sideHustlesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sideHustlesData.hustles.map((hustle, index) => (
                <a
                  key={index}
                  href={hustle.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {hustle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {hustle.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {hustle.description}
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Earnings:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {hustle.earnings}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Time:</span>
                      <span className="text-gray-700 dark:text-gray-300">{hustle.timeRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                      <span className="text-gray-700 dark:text-gray-300">{hustle.difficulty}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Remote Companies Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="companies-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="companies-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {remoteCompaniesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remoteCompaniesData.companies.map((company, index) => (
                <a
                  key={index}
                  href={company.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{company.logo}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {company.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {company.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {company.hiringFor.map((role, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Essential Tools Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="tools-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="tools-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {essentialToolsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {essentialToolsData.tools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {tool.freeTier ? "Free tier available" : "Paid"}
                  </p>
                </a>
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
                        {story.role}
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
