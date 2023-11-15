const express = require('express');
const router = express.Router();
const utils = require('../../utils.js');
const { Producto } = require(utils.getAbsolutePath('./src/manager/productosManager.js'));
const products = new Producto();
const  { io } = require(utils.getAbsolutePath('./app.js'))
// const io = app.get('io');
//Productos --->
router.get('/api/products', products.GetProductosAll);
router.get('/api/products/active', products.GetProductosActives);
router.get('/api/products/inactive', products.GetProductosInactives);
router.get('/api/products/:id', (request, response) => {
  const producto = products.GetProductosById(request.params.id, response);
  if (producto) {
    response.json(producto);
  }
});
router.put('/api/products/:id', products.updateProductById);
router.post('/api/products/', products.createProduct);
router.delete('/api/products/delete/:id', products.deleteProduct);
//Fin Productos ---!

module.exports = router;