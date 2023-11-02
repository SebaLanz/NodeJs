
const productos = require('./productos.js');
const { validatorById, validatorByAll } = require('../error/errorManager.js');

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
        validatorById(producto, productId, response);
    };

    
    module.exports = {
        GetProductosAll,
        GetProductosById
    };
