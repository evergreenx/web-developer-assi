import React, { useMemo } from "react";

const DOTS = -1;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  totalPages: number;
  siblingCount?: number;
  currentPage: number;
}

const usePagination = ({
  totalPages,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(0, totalPages - 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 0);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages - 1
    );

    const shouldShowLeftDots = leftSiblingIndex > 1;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 0;
    const lastPageIndex = totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(0, leftItemCount);
      return [...new Set([...leftRange, DOTS, lastPageIndex])];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount -1, totalPages - 1);
      return [...new Set([firstPageIndex, DOTS, ...rightRange])];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [...new Set([firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex])];
    }

    return range(0, totalPages - 1);
  }, [totalPages, siblingCount, currentPage]);

  return paginationRange;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesToDisplay = usePagination({ currentPage, totalPages });

  return (
    <div className="flex justify-end items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="bg-background flex items-center  rounded-md text-foreground cursor-pointer hover:bg-gray-100 text-sm leading-5 tracking-normal  font-medium py-1 px-2 mr-2 disabled:opacity-50"
      >
        <div className="mr-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4L6 8L10 12"
              stroke="#020618"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        Previous
      </button>
      {pagesToDisplay.map((page, index) =>
        page === DOTS ? (
          <span key={index} className="px-2 py-1 mr-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`py-1 px-2 rounded mr-2  h-10 w-10 cursor-pointer text-sm text-foreground font-medium leading-5 tracking-normal ${
              currentPage === page
                ? "bg-background text-foreground border-border border  rounded-md "
                : "bg-background hover:bg-gray-100"
            }`}
          >
            {page + 1}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="bg-background flex items-center rounded-md text-foreground cursor-pointer hover:bg-gray-100 text-sm leading-5 tracking-normal  font-medium py-1 px-2 mr-2 disabled:opacity-50"
      >
        Next
        <svg
          width="16"
          className="ml-1"
          height="16"

          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="#020618"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

