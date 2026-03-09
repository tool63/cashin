// components/SEO/pageTypes.ts

export type PageType =
  | 'home'
  | 'earn'
  | 'earn_category'
  | 'earn_offer'
  | 'guides'
  | 'guide_article'
  | 'rewards'
  | 'reward_detail'
  | 'cashback'
  | 'cashback_store'
  | 'affiliate'
  | 'affiliate_dashboard'
  | 'blog'
  | 'blog_category'
  | 'blog_post'
  | 'blog_author'
  | 'blog_tag'
  | 'static'
  | 'static_policy'
  | 'static_about'
  | 'static_contact'
  | 'static_help'
  | 'static_faq'
  | 'user_profile'
  | 'user_dashboard'
  | 'user_settings'
  | 'auth'
  | 'auth_login'
  | 'auth_register'
  | 'auth_reset'
  | 'auth_verify'
  | 'search'
  | 'search_results'
  | 'search_category'
  | 'pagination'
  | 'api'
  | 'admin'
  | 'admin_dashboard'
  | 'admin_users'
  | 'admin_offers'
  | 'admin_analytics'
  | 'error'
  | 'error_404'
  | 'error_500'
  | 'unknown';

export interface PageTypeMetadata {
  noindex?: boolean;
  nofollow?: boolean;
  requiresAuth?: boolean;
  isPaginated?: boolean;
  maxDepth?: number;
}

interface PageTypePattern {
  type: PageType;
  pattern: RegExp;
  priority: number;
  parent?: PageType;
  metadata: PageTypeMetadata;
}

export const PAGE_TYPE_PATTERNS: PageTypePattern[] = [
  { type: 'home', pattern: /^\/$/, priority: 100, metadata: { noindex: false, nofollow: false } },
  { type: 'auth', pattern: /^\/auth\/?/, priority: 90, metadata: { noindex: true, nofollow: true } },
  { type: 'auth_login', pattern: /^\/auth\/login/, priority: 95, parent: 'auth', metadata: { noindex: true, nofollow: true } },
  { type: 'auth_register', pattern: /^\/auth\/register/, priority: 95, parent: 'auth', metadata: { noindex: true, nofollow: true } },
  { type: 'user_dashboard', pattern: /^\/dashboard/, priority: 80, metadata: { noindex: true, nofollow: true, requiresAuth: true } },
  { type: 'user_profile', pattern: /^\/profile/, priority: 80, metadata: { noindex: true, nofollow: true, requiresAuth: true } },
  { type: 'user_settings', pattern: /^\/settings/, priority: 80, metadata: { noindex: true, nofollow: true, requiresAuth: true } },
  { type: 'earn', pattern: /^\/earn\/?$/, priority: 70, metadata: { noindex: false, nofollow: false } },
  { type: 'earn_category', pattern: /^\/earn\/category\/[^/]+\/?$/, priority: 65, parent: 'earn', metadata: { noindex: false, nofollow: false } },
  { type: 'earn_offer', pattern: /^\/earn\/[^/]+\/[^/]+\/?$/, priority: 60, parent: 'earn', metadata: { noindex: false, nofollow: false } },
  { type: 'blog', pattern: /^\/blog\/?$/, priority: 50, metadata: { noindex: false, nofollow: false } },
  { type: 'blog_category', pattern: /^\/blog\/category\/[^/]+\/?$/, priority: 45, parent: 'blog', metadata: { noindex: false, nofollow: false } },
  { type: 'blog_post', pattern: /^\/blog\/\d{4}\/\d{2}\/[^/]+\/?$/, priority: 40, parent: 'blog', metadata: { noindex: false, nofollow: false } },
  { type: 'blog_author', pattern: /^\/blog\/author\/[^/]+\/?$/, priority: 35, parent: 'blog', metadata: { noindex: true, nofollow: true } },
  { type: 'blog_tag', pattern: /^\/blog\/tag\/[^/]+\/?$/, priority: 35, parent: 'blog', metadata: { noindex: true, nofollow: true } },
  { type: 'search', pattern: /^\/search/, priority: 30, metadata: { noindex: true, nofollow: true, isPaginated: true } },
  { type: 'pagination', pattern: /[/?](page|p)=[0-9]+/, priority: 25, metadata: { noindex: true, nofollow: true, isPaginated: true } },
  { type: 'static_about', pattern: /^\/about/, priority: 20, parent: 'static', metadata: { noindex: false, nofollow: false } },
  { type: 'static_contact', pattern: /^\/contact/, priority: 20, parent: 'static', metadata: { noindex: false, nofollow: false } },
  { type: 'static_faq', pattern: /^\/faq/, priority: 20, parent: 'static', metadata: { noindex: false, nofollow: false } },
  { type: 'static_policy', pattern: /^\/(terms|privacy|cookie|legal)/, priority: 15, parent: 'static', metadata: { noindex: true, nofollow: true } },
  { type: 'admin', pattern: /^\/admin/, priority: 10, metadata: { noindex: true, nofollow: true, requiresAuth: true } },
  { type: 'error_404', pattern: /^\/404/, priority: 5, metadata: { noindex: true, nofollow: true } },
  { type: 'error_500', pattern: /^\/500/, priority: 5, metadata: { noindex: true, nofollow: true } },
];

export interface PageTypeResult {
  type: PageType;
  parent?: PageType;
  hierarchy: PageType[];
  metadata: PageTypeMetadata;
  matches: RegExpMatchArray | null;
}

export function detectPageType(route: string, queryParams: Record<string, string> = {}): PageTypeResult {
  const cleanRoute = route.split('?')[0].split('#')[0];
  const matches = PAGE_TYPE_PATTERNS
    .filter(p => p.pattern.test(cleanRoute))
    .sort((a, b) => b.priority - a.priority);

  if (!matches.length) {
    return { type: 'unknown', hierarchy: ['unknown'], metadata: { noindex: false, nofollow: false }, matches: null };
  }

  const primary = matches[0];
  const hierarchy: PageType[] = [];
  let current: PageTypePattern | undefined = primary;
  while (current) {
    hierarchy.unshift(current.type);
    current = current.parent ? PAGE_TYPE_PATTERNS.find(p => p.type === current.parent) : undefined;
  }

  const metadata: PageTypeMetadata = { ...primary.metadata };
  // Automatically noindex paginated URLs and UTM/ref params
  if (metadata.isPaginated || Object.keys(queryParams).some(k => /(utm_|ref|source|sort|filter)/i.test(k))) {
    metadata.noindex = true;
  }

  return { type: primary.type, parent: primary.parent, hierarchy, metadata, matches: cleanRoute.match(primary.pattern) };
}

export const isPaginated = (route: string) => PAGE_TYPE_PATTERNS.some(p => p.metadata.isPaginated && p.pattern.test(route));
export const requiresAuth = (route: string) => PAGE_TYPE_PATTERNS.find(p => p.pattern.test(route))?.metadata.requiresAuth || false;
