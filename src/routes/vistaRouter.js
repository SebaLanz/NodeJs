const express = require('express');
const router = express.Router();
const { Producto } = require('../manager/productosManager.js');

const productosManager = new Producto();

router.get('/', (request, response) => {
  response.status(200).render('home');
});

// En vistasRouter.js

// En vistasRouter.js

router.get('/api/products', async (request, response) => {
  try {
      const productos = productosManager.GetProductosAll(request, response);
      response.status(200).render('products', { products: productos });
  } catch (error) {
      response.status(500).render({ error: 'Error al obtener los productos' });
  }
});






module.exports = router;

