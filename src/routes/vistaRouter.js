  const express = require('express');
  const router = express.Router();
  const { generatePagination }  = require('../public/javascript/pagination.js')
  const { Producto } = require('../dao/manager/productosManager.js');
  const productosManager = new Producto();

  router.get('/', (request, response) => {
    response.status(200).render('index');//renderizo el archivo index.handlebars
  });


  router.get('/api/products', (request, response) => {
      const itemsPerPage = 9;
      const currentPage = request.query.page || 1; // Página actual (si no se proporciona, es la primera página)
      const allProducts = productosManager.GetProductosAllDb(request, response);
      const totalItems = allProducts.length;
      console.log(totalItems);
      const startIndex = (currentPage - 1) * itemsPerPage;// Calcular productos paginados
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);   // Generar información de paginación
      const pagination = generatePagination(totalItems, itemsPerPage, currentPage);
      response.status(200).render('productsDb', {
        products: paginatedProducts,
        pagination,
      });
  })

  module.exports = router;

