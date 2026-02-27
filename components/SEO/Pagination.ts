interface PaginationOptions {
  baseUrl: string;      // e.g. https://cashog.com/blog
  currentPage: number;  // current page number
  totalPages: number;   // total available pages
}

export function generatePaginationSEO({
  baseUrl,
  currentPage,
  totalPages,
}: PaginationOptions) {
  if (totalPages <= 1) return {};

  const seo: {
    prev?: string;
    next?: string;
    canonical: string;
  } = {
    canonical:
      currentPage === 1
        ? baseUrl
        : `${baseUrl}?page=${currentPage}`,
  };

  if (currentPage > 1) {
    seo.prev =
      currentPage === 2
        ? baseUrl
        : `${baseUrl}?page=${currentPage - 1}`;
  }

  if (currentPage < totalPages) {
    seo.next = `${baseUrl}?page=${currentPage + 1}`;
  }

  return seo;
}
