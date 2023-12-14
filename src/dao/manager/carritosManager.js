const path = require('path');
const utils = require('../../../utils.js');
const productos = require(utils.getAbsolutePath('clases/productos/productos.js'));
const { Conexion } = require('../conexion/conexion.js'); 



class Carrito { 
    constructor() {
        this.conec = new Conexion();
      }

    GetCarritosAllDb = async (request, response) => {
    try {
        await this.conec.conectar();
        const limit = request.query.limit || 999999;
    
        if (validatorByAll(limit, response)) {
        const productosCollection = this.conec.db.collection('products');
        const productosLimitados = await productosCollection.find().toArray();
    
        return productosLimitados; // Devuelve el resultado explícitamente
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
        response.status(500).json({ error: 'Error al obtener productos' });
    }
    };
}