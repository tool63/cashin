"use client"

import Head from "next/head"

interface SeoEngineProps {
  title?: string
  description?: string
}

export default function SeoEngine({ title, description }: SeoEngineProps) {
  const defaultTitle = "Cashog - Earn Real Money Online"
  const defaultDescription =
    "Complete offers, play games, answer surveys and cash out instantly on Cashog."

  return (
    <Head>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {/* Open Graph / Social Sharing */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
      <meta property="og:image" content="/og-image.png" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content="/og-image.png" />
    </Head>
  )
}
