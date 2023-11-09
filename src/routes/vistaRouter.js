const express = require('express');
const router = express.Router();
const { Producto } = require('../manager/productosManager.js');

const productosManager = new Producto();

router.get('/', (request, response) => {
  response.status(200).render('home');
});

router.get('/api/products', async (request, response) => {
  try {
    const productos = await productosManager.GetProductosAll(request, response);
    response.status(200).render('products', { products: productos });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al obtener los productos' });
  }
});

module.exports = router;
