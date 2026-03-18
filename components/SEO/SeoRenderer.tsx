"use client";

import React from "react";

interface SeoRendererProps {
  structuredData?: Record<string, any>[]; // Array of JSON-LD objects
  prettyPrint?: boolean;                  // Optional: format JSON for readability
}

export default function SeoRenderer({ structuredData, prettyPrint = false }: SeoRendererProps) {
  if (!structuredData || structuredData.length === 0) return null;

  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Pretty-print in dev for readability; minified in production
          dangerouslySetInnerHTML={{
            __html: prettyPrint
              ? JSON.stringify(schema, null, 2)
              : JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
