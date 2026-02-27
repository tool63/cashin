import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface LanguageEntry {
  code: string;
  url: string;
}

interface LanguageSEOProps {
  currentLang: string;
  languages: LanguageEntry[];
}

export const LanguageSEO: React.FC<LanguageSEOProps> = ({
  currentLang,
  languages,
}) => {
  const router = useRouter();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://cashog.com";

  return (
    <Head>
      {/* Default language (x-default) */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${router.pathname}`}
      />

      {/* Language variants (English only) */}
      {languages.map((lang) => (
        <link
          key={lang.code}
          rel="alternate"
          hrefLang={lang.code}
          href={lang.url}
        />
      ))}

      {/* Current language metadata */}
      <meta httpEquiv="content-language" content={currentLang} />
    </Head>
  );
};
