// components/SEO/seoAnalytics.ts

export function logSeoMetrics(data: {
  page: string
  generationTime: number
}) {

  if (process.env.NODE_ENV === "development") {

    console.log("SEO Metrics", {
      page: data.page,
      generationTime: `${data.generationTime}ms`,
    })

  }

}
