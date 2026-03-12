"use client";

import React from "react";

interface SeoRendererProps {
  structuredData?: any[]
}

export default function SeoRenderer({ structuredData }: SeoRendererProps) {

  if (!structuredData?.length) return null

  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )

}
