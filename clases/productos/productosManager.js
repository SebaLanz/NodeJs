
const productos = require('./productos.js');

    //GetALL
    const GetProductosAll = (request, res) => {
        const limit = request.query.limit || productos.length;
        // Valido que "limit" sea un número  y positivo
        const limitValue = parseInt(limit, 10);
        if (isNaN(limitValue) || limitValue <= 0) {
          return res.status(400).json({ message: 'El parámetro "limit" debe ser un número positivo' });
        }
        // Obtengo los productos limitados por slice
        const productosLimitados = productos.slice(0, limitValue);
      
        res.json(productosLimitados);
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
