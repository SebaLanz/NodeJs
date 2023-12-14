const express = require('express');
const router = express.Router();
const utils = require('../../utils.js');
const { Carrito } = require(utils.getAbsolutePath('./src/dao/manager/carritosManager.js'));
const carritos = new Carrito();




router.get('/api/carritosDb', carritos.GetCarritosAllDb);



module.exports =  router ;