const express = require('express');
const router = express.Router();
const utils = require('../../utils.js');
const { Producto } = require(utils.getAbsolutePath('./src/dao/manager/productosManager.js'));
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

//Inicio productosDB

router.get('/api/productsDb', products.GetProductosAllDb);
router.get('/api/productsDb/active', products.GetProductosActivesDb);
router.get('/api/productsDb/inactive', products.GetProductosInactivesDb);
router.get('/api/productsDb/:id', async (request, response) => {
  try {
    const producto = await products.GetProductosByIdDb(request.params.id, response);
    if (producto) {
      response.json(producto);
    }
  } catch (error) {
    response.status(500).json({ error: 'Error en la ruta' });
  }
});
router.put('/api/productsDb/:id', products.updateProductByIdDb);
router.post('/api/productsDb/', products.createProductDb);
router.delete('/api/productsDb/delete/:id', products.deleteProductDb);

module.exports = router;