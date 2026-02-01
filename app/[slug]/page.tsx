"use client"

import { useParams } from "next/navigation"

export default function DynamicPage() {
  const params = useParams()

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold">Dynamic Page</h1>
      <p className="mt-2">Slug: {params.slug}</p>
    </main>
  )
}
