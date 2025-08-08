import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  showPrevNext = true,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className = '',
  ...props 
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange && onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const buttonClasses = "px-3 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";
  const activeButtonClasses = "px-3 py-2 text-sm font-medium bg-blue-600 text-white border border-blue-600 hover:bg-blue-700";
  const disabledButtonClasses = "px-3 py-2 text-sm font-medium border border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100";

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`} {...props}>
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded-l-md ${currentPage === 1 ? disabledButtonClasses : buttonClasses}`}
        >
          <span className="sr-only">Previous</span>
          &lt;
        </button>
      )}

      {showPageNumbers && (
        <>
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={buttonClasses}
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? activeButtonClasses : buttonClasses}
            >
              {page}
            </button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={buttonClasses}
              >
                {totalPages}
              </button>
            </>
          )}
        </>
      )}

      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`rounded-r-md ${currentPage === totalPages ? disabledButtonClasses : buttonClasses}`}
        >
          <span className="sr-only">Next</span>
          &gt;
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  showPrevNext: PropTypes.bool,
  showPageNumbers: PropTypes.bool,
  maxVisiblePages: PropTypes.number,
  className: PropTypes.string,
};

export default Pagination;