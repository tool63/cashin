"use client";

import { useParams } from "next/navigation";
import { earningOptions } from "@/components/earning/earningOptions";
import Meta from "@/components/seo/SeoEngine";

import HeroSection from "@/components/homepage/HeroSection";
import TasksSection from "@/components/homepage/TasksSection";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

export default function DynamicPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const option = earningOptions.find(([, , href]) => href === `/${slug}`);

  const title = option
    ? `${option[1]} - Earn Real Money | Cashog`
    : slug
    ? `${slug.replace("-", " ").charAt(0).toUpperCase() + slug.slice(1)} - Cashog`
    : "Cashog - Earn Rewards Online";

  const description = option
    ? `Discover how to earn real money by ${option[1].toLowerCase()} on Cashog. Fast, secure, and trusted ways to earn rewards online.`
    : slug
    ? `Learn more about ${slug.replace("-", " ")} and start earning real money on Cashog today!`
    : "Cashog - Earn rewards, complete offers, watch videos, and get paid instantly.";

  return (
    <>
      <Meta title={title} description={description} />
      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">
        <HeroSection />
        <TasksSection />
        <TrustSection />
        <PaymentSection />
        <FeaturesSection />
        <FinalCTASection />
      </main>
    </>
  );
}
