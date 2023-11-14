const generatePagination = (totalItems, itemsPerPage, currentPage) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  
    const pagination = {
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      pages: [],
    };
  
    // Generar un array de números para representar las páginas disponibles
    for (let i = 1; i <= totalPages; i++) {
      pagination.pages.push(i);
    }
  
    return pagination;
  };

  module.exports = {
    generatePagination,
  };