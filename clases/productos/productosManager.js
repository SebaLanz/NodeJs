
const productos = require('./productos.js');
const { validatorById, validatorByAll, validatorStatusActive, validatorStatusInactive } = require('../error/errorManager.js');

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
          // Actualiza todas las propiedades del producto, excepto el ID
          for (const key in updatedProduct) {
            if (key !== 'id_producto') {
              productToUpdate[key] = updatedProduct[key];
            }
          }
      
          response.json(productToUpdate);
        } else {
          response.status(404).json({ message: 'Producto no encontrado3' });//Duda
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
