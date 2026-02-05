"use client"

import { useRouter } from "next/router"
import Meta from "../../components/Meta"
import HeroSection from "../../components/HeroSection"
import { earningOptions } from "../../components/earningOptions"

export default function SlugPage() {
  const router = useRouter()
  const { slug } = router.query

  // Find the matching earning option
  const option = earningOptions.find(([icon, title, href]) => href === `/${slug}`)

  const title = option ? `${option[1]} | Cashog` : slug ? `${slug} | Cashog` : "Cashog"
  const description = option
    ? `Earn money by ${option[1].toLowerCase()} instantly on Cashog.`
    : slug
      ? `Learn more about ${slug} and earn real money on Cashog.`
      : "Cashog - Earn Real Money Online"

  return (
    <>
      <Meta title={title} description={description} />

      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-center mb-8">
          {option ? option[1] : slug ? slug.replace("-", " ").charAt(0).toUpperCase() + slug.slice(1) : "Page"}
        </h1>

        {/* Optional: Add HeroSection or task-specific content */}
        <HeroSection />
      </main>
    </>
  )
}
