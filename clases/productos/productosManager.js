const fs = require('fs');
const path = require('path');
const productos = require('./productos.js');
const { validatorById, validatorByAll, validatorStatusActive, validatorStatusInactive, validatorUpdate } = require('../error/validatorManager.js');
const { json } = require('express');

    //------>GetProductosAll<------
    const GetProductosAll = (request, response) => {
        const limit = request.query.limit || productos.length;
        if (validatorByAll(limit, response)) {
            // validatorByAll(limit, response) = True -> happy path
            const productosLimitados = productos.slice(0, parseInt(limit, 10));
            response.json(productosLimitados);
        }
    };
    //------>GetProductosById<------
    const GetProductosById = (request, response) => {
        const productId = +request.params.id; // con el +reque... parseo el valor que me viene por param a número, es lo mismo que si hago ParseInt(....)
        const producto = productos.find((producto) => producto.id_producto === productId);// Buscar el producto por su ID
        if(validatorById(producto, productId, response)){
            response.json(producto)
        }
    };
    //------>GetProductosActives<------
    const GetProductosActives = (request, response) => {
        const producto = productos.filter((producto) => producto.status === true);
        if(validatorStatusActive(producto, response)){
            response.json(producto);
        }
    };
    //------>GetProductosInactives<------
    const GetProductosInactives = (request, response) => {
        const producto = productos.filter((producto) => producto.status === false);
        if(validatorStatusInactive(producto, response)){
            response.json(producto);
        }
    };
    //FIN GET
    //INICIO UPDATE
    //------->updateProductById<---------
    const updateProductById = (request, response) => {
        const productId = +request.params.id;
        const updatedProduct = request.body;
        const productToUpdate = productos.find((producto) => producto.id_producto === productId);

        if (productToUpdate) {
            for (const key in updatedProduct) {
                if (key !== 'id_producto' && key !== 'code') {
                    productToUpdate[key] = updatedProduct[key];
                }
            }
            const filePath = path.join(__dirname, '../productos/productos.js');
            fs.writeFile(filePath, 'module.exports = ' + JSON.stringify(productos, null, 2), (err) => {
            if (err) {
                console.error(err);
                return response.status(500).json({ error: 'Error al guardar los productos' });
            }
            validatorUpdate(response, true, productId);
            });
        }else{
            validatorUpdate(response, false, productId);
        }
    };
    
    //FIN UPDATE
    module.exports = {
        GetProductosAll,
        GetProductosById,
        GetProductosActives,
        GetProductosInactives,
        updateProductById
    };
