import Product from "./Product";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
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
        <div className="flex items-center justify-center space-x-2 mt-8 mb-6">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 text-xs font-light text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="w-3 h-3 mr-1" />
            prev
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 text-xs font-light rounded-md transition-colors duration-200 ${
                page === currentPage
                  ? 'bg-black text-white'
                  : page === '...'
                  ? 'text-gray-400 cursor-default bg-transparent'
                  : 'text-gray-700 bg-gray-100 hover:bg-black hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 text-xs font-light text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            next
            <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center text-sm text-gray-500 mb-8">
        Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of {products.length} products
      </div>
    </div>
  );
}

export default ProductFeed;