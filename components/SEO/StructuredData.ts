import { generateStructuredData } from "@/components/SEO/StructuredData";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Cashog",
          url: "https://cashog.com",
        })}
      />

      <main>
        <h1>Welcome to Cashog</h1>
      </main>
    </>
  );
}
