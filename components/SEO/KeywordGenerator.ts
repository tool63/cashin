import { SeoData } from '@/lib/seo';

interface KeywordOptions {
  primary: string[];
  secondary: string[];
  longTail: string[];
  local: string[];
  related: string[];
  rewards: string[];
  earning: string[];
}

export class KeywordGenerator {
  private baseKeywords: KeywordOptions = {
    primary: [
      'make money online',
      'earn cash',
      'online jobs',
      'work from home',
      'side hustle',
      'cash rewards',
    ],
    secondary: [
      'freelance work',
      'remote jobs',
      'extra cash',
      'passive income',
      'financial freedom',
      'work online',
    ],
    longTail: [
      'how to make money online fast',
      'legitimate ways to earn money from home',
      'best online jobs for beginners',
      'make extra cash in free time',
      'work from home jobs no experience',
      'earn money online for students',
    ],
    local: [
      'make money in USA',
      'online jobs UK',
      'earn money Canada',
      'work from home Australia',
      'online income India',
    ],
    related: [
      'PayPal money',
      'gift cards',
      'cash out',
      'instant payment',
      'daily payout',
      'bonus offers',
    ],
    rewards: [
      'earn paypal',
      'amazon gift cards',
      'bitcoin earnings',
      'crypto rewards',
      'gaming gift cards',
      'spotify premium',
    ],
    earning: [
      'paid surveys',
      'app installs',
      'play games earn',
      'watch videos money',
      'complete offers',
      'micro tasks',
    ],
  };

  generateForPage(page: string, region?: string, customKeywords?: string[]): string[] {
    let keywords = [...this.baseKeywords.primary];

    switch (page.toLowerCase()) {
      case 'surveys':
        keywords = [
          'paid surveys',
          'survey jobs',
          'online surveys for money',
          'paid market research',
          ...this.baseKeywords.earning,
        ];
        break;
      case 'app-installs':
        keywords = [
          'app installs',
          'try apps for money',
          'app testing jobs',
          'mobile app rewards',
          ...this.baseKeywords.earning,
        ];
        break;
      case 'play-games':
        keywords = [
          'play games earn money',
          'gaming rewards',
          'paid to play',
          'game testing jobs',
          ...this.baseKeywords.earning,
        ];
        break;
      case 'watch-videos':
        keywords = [
          'watch videos earn money',
          'video rewards',
          'paid to watch',
          'watch ads earn',
          ...this.baseKeywords.earning,
        ];
        break;
      case 'earn-paypal-money':
        keywords = [
          'earn paypal money',
          'paypal cash',
          'paypal rewards',
          'online money transfer',
          ...this.baseKeywords.rewards,
        ];
        break;
      case 'earn-gift-cards-online':
        keywords = [
          'earn gift cards',
          'free gift cards',
          'amazon gift card',
          'google play card',
          ...this.baseKeywords.rewards,
        ];
        break;
      case 'earn-crypto-online':
        keywords = [
          'earn bitcoin',
          'crypto rewards',
          'bitcoin mining',
          'ethereum earnings',
          ...this.baseKeywords.rewards,
        ];
        break;
      default:
        keywords = [...keywords, ...this.baseKeywords.secondary];
    }

    if (region) {
      const regionKeywords = this.baseKeywords.local.filter(k => 
        k.toLowerCase().includes(region.toLowerCase())
      );
      keywords = [...keywords, ...regionKeywords];
    }

    if (customKeywords) {
      keywords = [...keywords, ...customKeywords];
    }

    keywords = [...keywords, ...this.baseKeywords.longTail.slice(0, 2)];

    return [...new Set(keywords)];
  }

  generateMetaKeywords(page: string, region?: string, customKeywords?: string[]): string {
    const keywords = this.generateForPage(page, region, customKeywords);
    return keywords.slice(0, 15).join(', ');
  }

  generateSeoData(page: string, region?: string, customKeywords?: string[]): Partial<SeoData> {
    return {
      keywords: this.generateMetaKeywords(page, region, customKeywords),
    };
  }
}

export const keywordGenerator = new KeywordGenerator();
