
const productos = require('./productos.js');

    //GetALL
    const GetProductosAll = (response) => {
        response.json(productos);
    };

    /*---------------------------------------------------------------------------------------------
    En este método, como no tenemos una bdd estructurada, no hago un getbyid autoincremental.
    Busco en el array de productos, por CÓDIGO.
    GetByID*/
    const GetProductosById = (request, response) => {
        const productId = request.params.id;
      
        // Buscar el producto por su ID
        const producto = productos.find((producto) => producto.code === productId);
      
        if (producto) {
            response.json(producto);
        } else {
            response.status(404).json({ message: 'Producto no encontrado' });
        }
    };

    
    module.exports = {
        GetProductosAll,
        GetProductosById
    };
