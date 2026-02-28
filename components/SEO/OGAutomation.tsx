import React from 'react';
import Head from 'next/head';

interface OGImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

interface OGProps {
  title: string;
  description: string;
  url: string;
  siteName?: string;
  images?: OGImage[];
  type?: 'website' | 'article' | 'product' | 'profile';
  locale?: string;
  alternateLocales?: string[];
  video?: {
    url: string;
    width?: number;
    height?: number;
    type?: string;
  };
  audio?: {
    url: string;
    type?: string;
  };
  determiner?: 'a' | 'an' | 'the' | 'auto';
  slug?: string;
}

export const OGAutomation: React.FC<OGProps> = ({
  title,
  description,
  url,
  siteName = 'Cashog',
  images = [],
  type = 'website',
  locale = 'en_US',
  alternateLocales = [],
  video,
  audio,
  determiner = 'auto',
  slug,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const defaultImage: OGImage = {
    url: `${baseUrl}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/jpeg',
  };

  const ogImages = images.length > 0 ? images : [defaultImage];

  return (
    <Head>
      {/* Basic OG */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      {determiner !== 'auto' && (
        <meta property="og:determiner" content={determiner} />
      )}
      
      {/* Alternate locales */}
      {alternateLocales.map(loc => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
      
      {/* Images */}
      {ogImages.map((img, i) => (
        <React.Fragment key={i}>
          <meta property="og:image" content={img.url} />
          {img.width && <meta property="og:image:width" content={img.width.toString()} />}
          {img.height && <meta property="og:image:height" content={img.height.toString()} />}
          {img.alt && <meta property="og:image:alt" content={img.alt} />}
          {img.type && <meta property="og:image:type" content={img.type} />}
        </React.Fragment>
      ))}
      
      {/* Video */}
      {video && (
        <>
          <meta property="og:video" content={video.url} />
          {video.width && <meta property="og:video:width" content={video.width.toString()} />}
          {video.height && <meta property="og:video:height" content={video.height.toString()} />}
          {video.type && <meta property="og:video:type" content={video.type} />}
        </>
      )}
      
      {/* Audio */}
      {audio && (
        <>
          <meta property="og:audio" content={audio.url} />
          {audio.type && <meta property="og:audio:type" content={audio.type} />}
        </>
      )}
      
      {/* Facebook */}
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
      
      {/* Twitter (falls back to OG) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cashog" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImages[0].url} />
    </Head>
  );
};

// Page-specific OG components
export const HomePageOG: React.FC<{ slug?: string }> = ({ slug }) => (
  <OGAutomation
    title="Cashog - Earn Real Money Online"
    description="Join 500K+ users earning real money daily. Complete offers, play games, answer surveys. Instant cashouts via PayPal, Venmo, Gift Cards."
    url="/"
    slug={slug}
  />
);

export const AffiliatePageOG: React.FC<{ slug?: string }> = ({ slug }) => (
  <OGAutomation
    title="Cashog Affiliate Program - Earn 30% Commission"
    description="Join Cashog affiliate program. Earn 30% recurring commission for life. Promote legitimate money-making opportunities."
    url="/affiliate"
    slug={slug}
  />
);

export const EarningMethodOG: React.FC<{ 
  method: string; 
  title: string;
  description: string;
  slug?: string;
}> = ({ method, title, description, slug }) => (
  <OGAutomation
    title={title}
    description={description}
    url={`/${method}`}
    images={[{
      url: `/og/${method}.jpg`,
      width: 1200,
      height: 630,
      alt: title,
    }]}
    slug={slug}
  />
);

export const RewardOG: React.FC<{
  type: string;
  brand?: string;
  slug?: string;
}> = ({ type, brand, slug }) => {
  let title = "";
  let description = "";

  if (type === 'paypal') {
    title = "Earn PayPal Money Online";
    description = "Make money and cash out directly to PayPal. Fast, secure, and reliable payments.";
  } else if (type === 'gift-cards') {
    title = brand ? `Earn ${brand} Gift Cards` : "Earn Gift Cards Online";
    description = `Get paid in ${brand || 'gift cards'} from top brands. Amazon, Apple, Google Play and more.`;
  } else if (type === 'crypto') {
    title = brand ? `Earn ${brand}` : "Earn Cryptocurrency Online";
    description = `Make money in ${brand || 'Bitcoin, Ethereum, and more'}. Crypto rewards platform.`;
  }

  return (
    <OGAutomation
      title={title}
      description={description}
      url={brand ? `/${type}/${brand.toLowerCase()}` : `/${type}`}
      slug={slug}
    />
  );
};

export const ArticleOG: React.FC<{
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime?: string;
  author?: string;
  tags?: string[];
  slug?: string;
}> = ({ title, description, url, image, publishedTime, author, tags, slug }) => (
  <OGAutomation
    title={title}
    description={description}
    url={url}
    type="article"
    images={[{
      url: image,
      width: 1200,
      height: 630,
      alt: title,
    }]}
    slug={slug}
  >
    {publishedTime && (
      <meta property="article:published_time" content={publishedTime} />
    )}
    {author && (
      <meta property="article:author" content={author} />
    )}
    {tags?.map(tag => (
      <meta key={tag} property="article:tag" content={tag} />
    ))}
  </OGAutomation>
);
