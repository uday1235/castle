import Product from "./Product";
import { useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

function ProductFeed({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return null;
  }

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <div className="w-full">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
        {currentProducts.map(({ _id, title, price, description, category, images }) => (
          <Product
            key={_id}
            id={_id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={images && images[0] ? images[0] : '/placeholder-image.png'}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8 mb-4">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed bg-gray-100/50'
                : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900 bg-white/50 border border-gray-200/40'
            }`}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...'}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  page === currentPage
                    ? 'bg-blue-500/80 text-white border border-blue-500/80'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900 bg-white/50 border border-gray-200/40'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed bg-gray-100/50'
                : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900 bg-white/50 border border-gray-200/40'
            }`}
          >
            Next
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
        {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
      </div>
    </div>
  );
}

export default ProductFeed;