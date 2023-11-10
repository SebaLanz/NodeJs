const express = require('express');
const router = express.Router();
const { Producto } = require('../manager/productosManager.js');

const productosManager = new Producto();

router.get('/', (request, response) => {
  response.status(200).render('home');
});


router.get('/api/products', (request, response) => {
    let products =  productosManager.GetProductosAll(request, response);
    response.status(200).render('products',{
        products
    });
})







module.exports = router;

