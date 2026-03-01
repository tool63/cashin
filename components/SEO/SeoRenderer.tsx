import React from "react";

interface SeoRendererProps {
  structuredData?: Record<string, any>[];
}

export default function SeoRenderer({
  structuredData = [],
}: SeoRendererProps) {
  if (!Array.isArray(structuredData) || structuredData.length === 0) {
    return null;
  }

  return (
    <>
      {structuredData
        .filter((schema) => schema && Object.keys(schema).length > 0)
        .map((schema, index) => {
          const json = JSON.stringify(schema);

          return (
            <script
              key={`schema-${index}-${schema["@type"] || "data"}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: json }}
            />
          );
        })}
    </>
  );
}
