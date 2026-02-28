import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SeoBuilder } from '@/lib/seo';

interface StructuredDataProps {
  data?: Record<string, any>[];
  type?: 'WebSite' | 'Organization' | 'Article' | 'Product' | 'FAQPage' | 'BreadcrumbList' | 'HowTo';
  customData?: Record<string, any>;
  slug?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ 
  data, 
  type,
  customData,
  slug,
}) => {
  const router = useRouter();
  const path = slug ? `/${slug}` : router.asPath.split('?')[0];
  const builder = new SeoBuilder({ slug }, path);
  
  let structuredData = data || builder.buildStructuredData();
  
  if (type && customData) {
    structuredData = [{
      '@context': 'https://schema.org',
      '@type': type,
      ...customData,
    }];
  }

  return (
    <Head>
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
};

// Pre-built components
export const WebsiteSchema: React.FC = () => {
  const builder = new SeoBuilder();
  const [websiteSchema] = builder.buildStructuredData();
  
  return (
    <StructuredData data={[websiteSchema]} />
  );
};

export const OrganizationSchema: React.FC = () => {
  const builder = new SeoBuilder();
  const [, organizationSchema] = builder.buildStructuredData();
  
  return (
    <StructuredData data={[organizationSchema]} />
  );
};

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher?: string;
  slug?: string;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  publisher = 'Cashog',
  slug,
}) => (
  <StructuredData
    type="Article"
    slug={slug}
    customData={{
      headline: title,
      description,
      image,
      url,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: publisher,
        logo: {
          '@type': 'ImageObject',
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        },
      },
    }}
  />
);

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
  slug?: string;
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ questions, slug }) => (
  <StructuredData
    type="FAQPage"
    slug={slug}
    customData={{
      mainEntity: questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    }}
  />
);

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
  slug?: string;
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items, slug }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';
  
  return (
    <StructuredData
      type="BreadcrumbList"
      slug={slug}
      customData={{
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      }}
    />
  );
};

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    url?: string;
    image?: string;
  }>;
  totalTime?: string;
  slug?: string;
}

export const HowToSchema: React.FC<HowToSchemaProps> = ({
  name,
  description,
  steps,
  totalTime,
  slug,
}) => (
  <StructuredData
    type="HowTo"
    slug={slug}
    customData={{
      name,
      description,
      totalTime,
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        url: step.url,
        image: step.image,
      })),
    }}
  />
);
