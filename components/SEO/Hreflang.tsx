import React from 'react';
import Head from 'next/head';

interface HreflangProps {
  currentPath: string;
  languages?: Array<{
    code: string;
    url: string;
    isDefault?: boolean;
  }>;
  slug?: string;
}

export const Hreflang: React.FC<HreflangProps> = ({ 
  currentPath, 
  languages,
  slug,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';
  const path = slug ? `/${slug}` : currentPath;
  
  const defaultLanguages = [
    { code: 'en-us', url: `${baseUrl}${path}`, isDefault: true },
    { code: 'en-gb', url: `${baseUrl}/uk${path}` },
    { code: 'en-au', url: `${baseUrl}/au${path}` },
    { code: 'en-ca', url: `${baseUrl}/ca${path}` },
  ];

  const langList = languages || defaultLanguages;

  return (
    <Head>
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

export const EnglishHreflang: React.FC<{ slug?: string }> = ({ slug }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';
  const path = slug ? `/${slug}` : '';
  
  const languages = [
    { code: 'en-us', url: `${baseUrl}${path}`, isDefault: true },
    { code: 'en-gb', url: `${baseUrl}/uk${path}` },
    { code: 'en-au', url: `${baseUrl}/au${path}` },
    { code: 'en-ca', url: `${baseUrl}/ca${path}` },
  ];

  return <Hreflang currentPath={path} languages={languages} slug={slug} />;
};
