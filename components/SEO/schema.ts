export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cashog",
    url: "https://cashog.com",
    logo: "https://cashog.com/logo.png",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cashog",
    url: "https://cashog.com",
  };
}

export function webpageSchema(title: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
  };
}
