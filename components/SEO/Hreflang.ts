interface HreflangEntry {
  code: string; // e.g. en, en-US
  url: string;
}

interface HreflangOptions {
  includeDefault?: boolean;
  defaultUrl?: string;
}

export function generateHreflang(
  entries: HreflangEntry[],
  options: HreflangOptions = {}
) {
  const { includeDefault = true, defaultUrl } = options;

  // Remove duplicate language codes
  const uniqueEntries = Array.from(
    new Map(entries.map((e) => [e.code.toLowerCase(), e])).values()
  );

  const tags = uniqueEntries.map((entry) => ({
    rel: "alternate",
    hreflang: entry.code,
    href: entry.url,
  }));

  // Add x-default if enabled
  if (includeDefault && defaultUrl) {
    tags.push({
      rel: "alternate",
      hreflang: "x-default",
      href: defaultUrl,
    });
  }

  return tags;
}
