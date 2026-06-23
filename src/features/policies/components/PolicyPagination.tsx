"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/features/policies/components/Icons";

type PolicyPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

export function PolicyPagination({
  page,
  setPage,
  totalPages,
}: PolicyPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="policy-pagination" aria-label="Policy pages">
      <button
        aria-label="Previous page"
        className="pagination-arrow"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        type="button"
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((pageNumber) => (
        <button
          aria-current={pageNumber === page ? "page" : undefined}
          aria-label={`Page ${pageNumber}`}
          className="pagination-page"
          data-active={pageNumber === page}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          type="button"
        >
          {pageNumber}
        </button>
      ))}

      <button
        aria-label="Next page"
        className="pagination-arrow"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        type="button"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
