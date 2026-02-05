"use client"

import { useParams } from "next/navigation"
import HeroSection from "../../components/HeroSection"
import { earningOptions } from "../../components/earningOptions"
import RootLayout from "../layout"

export default function DynamicPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  // Find matching earning option from earningOptions
  const option = earningOptions.find(([icon, title, href]) => href === `/${slug}`)

  // Dynamic meta
  const title = option ? `${option[1]} | PayUp` : slug ? `${slug.replace("-", " ")} | PayUp` : "PayUp"
  const description = option
    ? `Earn money by ${option[1].toLowerCase()} instantly on PayUp.`
    : slug
      ? `Learn more about ${slug.replace("-", " ")} and earn real money on PayUp.`
      : "PayUp - Earn rewards online"

  return (
    <RootLayout pageTitle={title} pageDescription={description}>
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">
          {option ? option[1] : slug ? slug.replace("-", " ").charAt(0).toUpperCase() + slug.slice(1) : "Page"}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-10">
          {option
            ? `Start earning by ${option[1].toLowerCase()} today!`
            : "Explore opportunities and start earning rewards now."}
        </p>

        {/* Optional: You can render the HeroSection or slug-specific content */}
        <HeroSection />
      </main>
    </RootLayout>
  )
}
