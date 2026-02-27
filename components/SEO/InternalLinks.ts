interface InternalLinkMap {
  keyword: string;
  url: string;
}

interface InternalLinkOptions {
  maxLinksPerKeyword?: number;
}

export function generateInternalLinks(
  content: string,
  linkMap: InternalLinkMap[],
  options: InternalLinkOptions = {}
): string {
  const { maxLinksPerKeyword = 1 } = options;

  if (!content) return content;

  let updatedContent = content;

  linkMap.forEach(({ keyword, url }) => {
    let count = 0;

    const regex = new RegExp(`\\b(${keyword})\\b`, "gi");

    updatedContent = updatedContent.replace(regex, (match) => {
      if (count >= maxLinksPerKeyword) return match;

      count++;

      return `<a href="${url}" title="${match}" class="internal-link">${match}</a>`;
    });
  });

  return updatedContent;
}
