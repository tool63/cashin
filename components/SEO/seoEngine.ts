// components/SEO/seoEngine.ts

import { buildMetadata } from "./metadata"
import { detectPageType } from "./pageTypes"
import { buildOrganizationSchema, buildWebsiteSchema } from "./schema"
import { logSeoMetrics } from "./seoAnalytics"

interface BuildSEOParams {
  route: string
  title: string
  description?: string
  locale?: string
  keywords?: string[]
}

export async function buildSEO({
  route,
  title,
  description,
  locale,
  keywords,
}: BuildSEOParams) {

  const start = Date.now()

  const metadata = buildMetadata({
    title,
    description,
    path: route,
    locale,
    keywords,
  })

  const pageType = detectPageType(route)

  const structuredData = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ]

  const generationTime = Date.now() - start

  logSeoMetrics({
    page: route,
    generationTime,
  })

  return {
    metadata,
    structuredData,
    pageType,
  }

}
