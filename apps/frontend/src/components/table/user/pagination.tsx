import React from "react";

// Helper function to generate page numbers
const generatePageNumbers = (currentPage: number, totalPages: number) => {
  const pageNumbers = [];
  const maxPagesToShow = 5; // e.g., 1 2 3 ... 8 9 10

  if (totalPages <= maxPagesToShow) {
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always show first two pages
    pageNumbers.push(0, 1);

    // Determine if ellipsis is needed at the start
    if (currentPage > 2) {
      pageNumbers.push(-1); // -1 signifies ellipsis
    }

    // Show current page and its immediate neighbors
    if (currentPage > 1 && currentPage < totalPages - 2) {
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
    } else if (currentPage === totalPages - 2) {
      pageNumbers.push(currentPage - 2, currentPage - 1, currentPage);
    } else if (currentPage === totalPages - 1) {
      pageNumbers.push(currentPage - 3, currentPage - 2, currentPage - 1);
    }

    // Determine if ellipsis is needed at the end
    if (currentPage < totalPages - 3) {
      pageNumbers.push(-1); // -1 signifies ellipsis
    }

    // Always show last two pages
    if (totalPages > 2) {
      pageNumbers.push(totalPages - 2, totalPages - 1);
    }

    // Filter out duplicates and sort
    const uniquePageNumbers = Array.from(new Set(pageNumbers)).sort(
      (a, b) => a - b
    );
    return uniquePageNumbers.filter(
      (page, index, self) =>
        page !== -1 || (index > 0 && self[index - 1] !== -1)
    );
  }

  return pageNumbers;
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
  const pagesToDisplay = generatePageNumbers(currentPage, totalPages);

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
        page === -1 ? (
          <span key={index} className="px-2 py-1 mr-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`py-1 px-2 rounded mr-2 text-sm text-foreground font-medium leading-5 tracking-normal ${
              currentPage === page
                ? "bg-background text-foreground border-border border  rounded-md"
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
