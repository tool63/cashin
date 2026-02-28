import React from 'react';
import { MetadataBuilder } from './MetadataBuilder';
import { useRouter } from 'next/router';
import { findRouteSeo } from '@/lib/seo';

interface RouteMetadataProps {
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  noIndex?: boolean;
  image?: string;
  publishedTime?: string;
  author?: string;
  tags?: string[];
  slug?: string;
}

export const RouteMetadata: React.FC<RouteMetadataProps> = (props) => {
  const router = useRouter();
  const path = router.asPath.split('?')[0];
  const routeData = findRouteSeo(path);
  
  return (
    <MetadataBuilder 
      {...routeData}
      {...props}
      slug={props.slug || routeData.slug}
    />
  );
};

// Specialized components for different route types
export const HomeMetadata: React.FC = () => (
  <RouteMetadata />
);

export const AffiliateMetadata: React.FC = () => (
  <RouteMetadata 
    customTitle="Cashog Affiliate Program"
    customKeywords={['affiliate marketing', 'referral earnings']}
  />
);

export const EarningMethodMetadata: React.FC<{ method: string }> = ({ method }) => {
  const titles: Record<string, string> = {
    surveys: "Paid Surveys",
    'app-installs': "App Installs",
    'play-games': "Play Games",
    'watch-videos': "Watch Videos",
    'complete-offers': "Complete Offers",
  };

  const title = titles[method] || method.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <RouteMetadata 
      customTitle={`${title} - Earn Money | Cashog`}
      slug={method}
    />
  );
};

export const RewardMetadata: React.FC<{ type: string; brand?: string }> = ({ type, brand }) => {
  let title = "";
  let keywords: string[] = [];

  if (type === 'paypal') {
    title = "Earn PayPal Money";
    keywords = ['paypal money', 'paypal cash'];
  } else if (type === 'gift-cards') {
    title = brand ? `Earn ${brand} Gift Cards` : "Earn Gift Cards";
    keywords = ['gift cards', brand?.toLowerCase() || ''];
  } else if (type === 'crypto') {
    title = brand ? `Earn ${brand}` : "Earn Cryptocurrency";
    keywords = ['crypto', 'bitcoin', brand?.toLowerCase() || ''];
  }

  return (
    <RouteMetadata 
      customTitle={`${title} Online | Cashog`}
      customKeywords={keywords}
      slug={brand ? `${type}/${brand.toLowerCase()}` : type}
    />
  );
};

export const GuideMetadata: React.FC<{ topic: string }> = ({ topic }) => {
  const title = topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <RouteMetadata 
      customTitle={`How to ${title} - Complete Guide | Cashog`}
      slug={`guides/${topic}`}
    />
  );
};

export const CashbackMetadata: React.FC<{ category: string; subcategory?: string }> = ({ category, subcategory }) => {
  let title = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  if (subcategory) {
    title = `${subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cashback`;
  }

  return (
    <RouteMetadata 
      customTitle={`${title} - Earn Cashback | Cashog`}
      slug={subcategory ? `shopping-rewards/${category}/${subcategory}` : `shopping-rewards/${category}`}
    />
  );
};

export const BlogMetadata: React.FC<{ post: any }> = ({ post }) => (
  <RouteMetadata 
    customTitle={post.title}
    customDescription={post.excerpt}
    image={post.image}
    publishedTime={post.date}
    author={post.author}
    tags={post.tags}
    slug={`blog/${post.slug}`}
  />
);

export const LegalMetadata: React.FC<{ type: string }> = ({ type }) => (
  <RouteMetadata 
    customTitle={`${type} | Cashog`}
    noIndex={true}
    slug={type.toLowerCase().replace(/\s+/g, '-')}
  />
);
