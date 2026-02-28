import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface LanguageSEOProps {
  currentLang?: string;
  languages?: Array<{
    code: string;
    url: string;
    isDefault?: boolean;
  }>;
  slug?: string;
}

export const LanguageSEO: React.FC<LanguageSEOProps> = ({ 
  currentLang = 'en',
  languages = [],
  slug,
}) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';
  const path = slug ? `/${slug}` : router.asPath.split('?')[0];
  
  const defaultLanguages = [
    { code: 'en-us', url: `${baseUrl}${path}`, isDefault: true },
    { code: 'en-gb', url: `${baseUrl}/uk${path}` },
    { code: 'en-au', url: `${baseUrl}/au${path}` },
    { code: 'en-ca', url: `${baseUrl}/ca${path}` },
  ];

  const langList = languages.length > 0 ? languages : defaultLanguages;

  return (
    <Head>
      <meta httpEquiv="content-language" content={currentLang} />
      
      <link
        rel="alternate"
        hrefLang="x-default"
        href={langList.find(l => l.isDefault)?.url || langList[0]?.url}
      />
      
      {langList.map(lang => (
        <link
          key={lang.code}
          rel="alternate"
          hrefLang={lang.code}
          href={lang.url}
        />
      ))}
    </Head>
  );
};

export const EnglishLanguageSEO: React.FC<{ slug?: string }> = ({ slug }) => (
  <LanguageSEO currentLang="en" slug={slug} />
);
