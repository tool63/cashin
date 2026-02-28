import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface CanonicalProps {
  url?: string;
  removeQueryParams?: boolean;
  slug?: string;
}

export const Canonical: React.FC<CanonicalProps> = ({ 
  url, 
  removeQueryParams = true,
  slug,
}) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';
  
  let canonicalUrl = url || '';
  
  if (!canonicalUrl) {
    const path = slug ? `/${slug}` : router.pathname;
    
    if (removeQueryParams) {
      canonicalUrl = `${baseUrl}${path}`;
    } else {
      canonicalUrl = `${baseUrl}${router.asPath}`;
    }
  }

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export const CanonicalWithParams: React.FC<{ 
  params?: Record<string, string>;
  slug?: string;
}> = ({ params, slug }) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';
  const path = slug ? `/${slug}` : router.pathname;
  
  const url = params 
    ? `${baseUrl}${path}?${new URLSearchParams(params)}`
    : `${baseUrl}${path}`;

  return <Canonical url={url} removeQueryParams={false} slug={slug} />;
};
