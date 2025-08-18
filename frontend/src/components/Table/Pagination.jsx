// components/Table/Pagination.js
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentPage, totalPages, goToPage }) {
  return (
    <div className="flex justify-center items-center my-2 gap-1 mt-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => {
          if (totalPages <= 5) return true;
          if (currentPage <= 3) return page <= 5;
          if (currentPage >= totalPages - 2) return page >= totalPages - 4;
          return Math.abs(page - currentPage) <= 2;
        })
        .map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-green-600 text-white"
                : "bg-gray-200 cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 bg-gray-300 rounded cursor-pointer disabled:cursor-default disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
