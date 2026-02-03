// app/[slug]/page.tsx
"use client"

import { useParams } from "next/navigation"

export default function DynamicPage() {
  const params = useParams<{ slug: string }>()

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold">Dynamic Page</h1>

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Slug: <span className="font-medium">{params.slug}</span>
      </p>
    </main>
  )
}
