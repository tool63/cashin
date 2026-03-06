// components/SEO/seoEngine.ts (around line 324-340)

// ============================================================
// Resource Hints - UPDATED with proper types
// ============================================================
function generateResourceHints(pageType: PageTypeResult, data: any): LinkHint[] {
  const hints: LinkHint[] = [];

  // Add preconnect hints from config
  SEO_CONFIG.preconnect?.forEach((url) => {
    hints.push({ rel: 'preconnect', href: url });
  });

  // Add DNS prefetch for external domains
  SEO_CONFIG.dnsPrefetch?.forEach((url) => {
    hints.push({ rel: 'dns-prefetch', href: url });
  });

  // Add page-specific preloads with proper 'as' attribute
  if (pageType.type === 'home') {
    hints.push({ 
      rel: 'preload', 
      href: '/images/hero.webp', 
      as: 'image',
      type: 'image/webp'
    });
  }

  if (data?.image) {
    hints.push({ 
      rel: 'preload', 
      href: data.image, 
      as: 'image' 
    });
  }

  if (data?.video) {
    hints.push({ 
      rel: 'preload', 
      href: data.video, 
      as: 'video' 
    });
  }

  // Add font preloading for better LCP - FIXED: Removed 'generic' which doesn't exist
  if (pageType.type === 'home' || pageType.type === 'static' || pageType.type === 'earn') {
    hints.push({
      rel: 'preload',
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    });
  }

  // Add preconnect for critical third-party domains
  hints.push(
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  );

  return hints;
}
