import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface InternalLink {
  text: string;
  href: string;
  priority?: 'high' | 'medium' | 'low';
  icon?: React.ReactNode;
  badge?: string;
}

interface InternalLinksProps {
  links: InternalLink[];
  className?: string;
  title?: string;
  columns?: number;
  slug?: string;
}

export const InternalLinks: React.FC<InternalLinksProps> = ({ 
  links, 
  className = '',
  title,
  columns = 1,
  slug,
}) => {
  const router = useRouter();
  const currentPath = slug ? `/${slug}` : router.asPath;

  return (
    <div className={className}>
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-2`}>
        {links.map((link, index) => {
          const isActive = currentPath === link.href;
          
          return (
            <Link
              key={index}
              href={link.href}
              className={`
                flex items-center gap-2 p-2 rounded-lg transition
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'hover:bg-gray-50 text-gray-700'
                }
                ${link.priority === 'high' ? 'font-semibold' : ''}
                ${link.priority === 'low' ? 'text-sm opacity-80' : ''}
              `}
            >
              {link.icon && (
                <span className="w-5 h-5">{link.icon}</span>
              )}
              <span>{link.text}</span>
              {link.badge && (
                <span className="ml-auto text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Pre-built internal link components
export const EarningMethodsLinks: React.FC<{ slug?: string }> = ({ slug }) => {
  const links = [
    { text: 'Paid Surveys', href: '/surveys', icon: '📝' },
    { text: 'App Installs', href: '/app-installs', icon: '📱' },
    { text: 'Play Games', href: '/play-games', icon: '🎮' },
    { text: 'Watch Videos', href: '/watch-videos', icon: '🎥' },
    { text: 'Complete Offers', href: '/complete-offers', icon: '🎯' },
  ];

  return <InternalLinks title="Earning Methods" links={links} columns={2} slug={slug} />;
};

export const RewardLinks: React.FC<{ slug?: string }> = ({ slug }) => {
  const links = [
    { text: 'Earn PayPal Money', href: '/earn-paypal-money', icon: '💰' },
    { text: 'Earn Gift Cards', href: '/earn-gift-cards-online', icon: '🎁' },
    { text: 'Earn Crypto', href: '/earn-crypto-online', icon: '₿' },
    { text: 'Earn Gaming Cards', href: '/earn-gaming-gift-cards', icon: '🎮' },
  ];

  return <InternalLinks title="Rewards" links={links} columns={2} slug={slug} />;
};

export const GuideLinks: React.FC<{ slug?: string }> = ({ slug }) => {
  const links = [
    { text: 'Make Money Online', href: '/make-money-online', priority: 'high' },
    { text: 'Earn from Home', href: '/earn-money-from-home' },
    { text: 'No Investment', href: '/earn-without-investment' },
    { text: 'For Beginners', href: '/online-jobs-for-beginners' },
    { text: 'For Students', href: '/earn-money-as-a-student' },
    { text: 'Passive Income', href: '/passive-income-online' },
  ];

  return <InternalLinks title="Guides" links={links} columns={2} slug={slug} />;
};
