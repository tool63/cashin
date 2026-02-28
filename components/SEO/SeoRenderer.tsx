import { ReactNode } from "react";

interface SeoRendererProps {
  structuredData?: object[];
}

export default function SeoRenderer({ structuredData = [] }: SeoRendererProps) {
  if (!structuredData || structuredData.length === 0) return null;

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
  );
}
