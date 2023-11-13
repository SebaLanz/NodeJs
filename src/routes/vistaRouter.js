const express = require('express');
const router = express.Router();
const { Producto } = require('../manager/productosManager.js');

const productosManager = new Producto();

router.get('/', (request, response) => {
  response.status(200).render('index');//renderizo el archivo index.handlebars
});


router.get('/api/products', (request, response) => {
    let products =  productosManager.GetProductosAll(request, response);
    response.status(200).render('products',{//renderizo el archivo products.handlebars
        products
    });
})







module.exports = router;

