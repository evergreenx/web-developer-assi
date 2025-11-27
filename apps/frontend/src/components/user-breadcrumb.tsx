import React from "react";

interface BreadcrumbProps {
  userName: string;
  onBackClick: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ userName, onBackClick }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <button
            onClick={onBackClick}
            className="inline-flex text-muted-foreground items-center text-sm font-medium  cursor-pointer hover:text-foreground
            
"
          >
            Home
          </button>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="#62748E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="ms-1 text-sm text-foreground md:ms-2 font-normal">
              {userName}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
