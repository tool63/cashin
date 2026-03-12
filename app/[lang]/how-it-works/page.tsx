// app/[lang]/how-it-works/page.tsx

import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import TypingText from "@/components/typing/home";

import SeoRenderer from "@/components/SEO/SeoRenderer";
import { buildSEO } from "@/components/SEO/seoEngine";

export default async function HowItWorksPage() {

  const seo = await buildSEO({
    route: "/how-it-works",
    description:
      "Learn how Cashog works to help you earn rewards easily — step by step guide for tasks, games, surveys & payouts.",
  });

  const steps = [
    {
      title: "Sign Up Instantly",
      desc: "Create your Cashog account in seconds and start earning.",
      icon: "📲",
    },
    {
      title: "Explore Offers",
      desc: "Browse tasks, surveys and games.",
      icon: "🎯",
    },
    {
      title: "Complete & Earn",
      desc: "Finish offers and build your balance.",
      icon: "💰",
    },
    {
      title: "Withdraw Easily",
      desc: "Cash out securely.",
      icon: "💳",
    },
  ];

  return (
    <>
      <SeoRenderer seo={seo} />

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl font-bold mb-6">
          How Cashog Works
        </h1>

        <div className="text-5xl font-bold mb-6">
          <TypingText />
        </div>

        <PrimaryCTA href="/signup">
          Start Earning
        </PrimaryCTA>

      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {steps.map((step, i) => (

          <OpeningStyle key={i}>
            <div className="p-8 shadow-xl rounded-xl">

              <div className="text-5xl mb-4">{step.icon}</div>

              <h3 className="text-xl font-bold mb-2">
                {step.title}
              </h3>

              <p>{step.desc}</p>

            </div>
          </OpeningStyle>

        ))}

      </section>
    </>
  );
}
