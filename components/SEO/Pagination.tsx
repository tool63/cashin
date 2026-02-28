import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  prevPage?: string;
  nextPage?: string;
  slug?: string;
}

export const PaginationSEO: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  prevPage,
  nextPage,
  slug,
}) => {
  const base = slug ? `/${slug}` : baseUrl;

  return (
    <Head>
      {(prevPage || currentPage > 1) && (
        <link 
          rel="prev" 
          href={prevPage || `${base}?page=${currentPage - 1}`} 
        />
      )}
      
      {(nextPage || currentPage < totalPages) && (
        <link 
          rel="next" 
          href={nextPage || `${base}?page=${currentPage + 1}`} 
        />
      )}
    </Head>
  );
};

interface PaginationLinksProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  slug?: string;
}

export const PaginationLinks: React.FC<PaginationLinksProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  slug,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(page => 
    page === 1 || 
    page === totalPages || 
    Math.abs(page - currentPage) <= 2
  );

  return (
    <nav aria-label="Pagination" className={`flex justify-center gap-2 my-4 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 transition"
        aria-label="Previous page"
      >
        ←
      </button>
      
      {showPages.map((page, index) => {
        const prevPage = showPages[index - 1];
        if (prevPage && page - prevPage > 1) {
          return (
            <React.Fragment key={page}>
              <span className="px-3 py-1">...</span>
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border rounded transition ${
                  currentPage === page 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'hover:bg-gray-50'
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            </React.Fragment>
          );
        }
        
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded transition ${
              currentPage === page 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'hover:bg-gray-50'
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 transition"
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
};
