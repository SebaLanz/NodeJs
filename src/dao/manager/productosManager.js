const fs = require('fs');
const path = require('path');
const utils = require('../../../utils.js');
const productos = require(utils.getAbsolutePath('clases/productos/productos.js'));
const { Conexion } = require('../conexion/conexion.js'); //cambiar a abs
const { validatorById, validatorByAll, validatorStatusActive, validatorStatusInactive, validatorUpdate } = require(utils.getAbsolutePath('clases/error/validatorManager.js'));

class Producto {

  constructor() {
    this.conec = new Conexion();
  }

  // ------>GetProductosAll<------
  GetProductosAll = (request, response) => {
    const limit = request.query.limit || productos.productos.length;
    if (validatorByAll(limit, response)) {
      // validatorByAll(limit, response) = True -> happy path
      const productosLimitados = productos.productos.slice(0, parseInt(limit, 10));
      // response.json(productosLimitados); si es necesario devuelvo json
      return productosLimitados;
    }
  }

  //------>GetProductosById<------
  GetProductosById = (productId, response) => {
    productId = +productId; // Parsea el productId a número si es necesario
    const producto = productos.productos.find((producto) => producto.id_producto === productId);
    if (!producto) {
      //sendErrorResponse(response, 404, 'Producto no encontrado');
      validatorById(producto, productId, response);
      return null;
    }
    return producto;
  };

  //------>GetProductosActives<------
  GetProductosActives = (request, response) => {
    const tipo = 'productos';
    const producto = productos.productos.filter((producto) => producto.status === true);
    if (validatorStatusActive(producto, response, tipo)) {
      response.json(producto);
    }
  };
  //------>GetProductosInactives<------
  GetProductosInactives = (request, response) => {
    const tipo = 'productos';
    const producto = productos.productos.filter((producto) => producto.status === false);
    if (validatorStatusInactive(producto, response, tipo)) {
      response.json(producto);
    }
  };
  //FIN GET
  //INICIO UPDATE
  //------->updateProductById<---------
  updateProductById = (request, response) => {
    const tipo = 'Producto';
    const productId = +request.params.id;
    const updatedProduct = request.body;
    const productToUpdate = productos.productos.find((producto) => producto.id_producto === productId);

    if (productToUpdate) {
      for (const key in updatedProduct) {
        if (key !== 'id_producto' && key !== 'code') {
          productToUpdate[key] = updatedProduct[key];
        }
      }
      const lastProductId = productos.lastProductId;
      const formattedProductsArray = productos.productos.map(producto => JSON.stringify(producto, null, 2)).join(',\n');
      const formattedProductos = `const lastProductId = ${lastProductId};\n\nconst productos = [\n${formattedProductsArray}\n];\n\n
        module.exports = 
        {\n   productos,\n  
              lastProductId\n};`;
      const filePath = path.join(__dirname, '../../clases/productos/productos.js');
      fs.writeFile(filePath, formattedProductos, (err) => {
        if (err) {
          return response.status(500).json({ error: 'Error al guardar los productos' });
        }
        validatorUpdate(response, true, productId, tipo);
      });
    } else {
      validatorUpdate(response, false, productId, tipo);
    }
  };


  //FIN UPDATE
  //INICIO Create
  createProduct = (request, response) => {
    const newProduct = request.body;//DATOS DE LA PETICIÓN
    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.stock || !newProduct.code) {
      return response.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    // no permito código repetido
    if (productos.productos.some(producto => producto.code === newProduct.code)) {
      return response.status(400).json({ error: 'El código del producto ya existe' });
    }
    // Obtengo el id de la variable lastProductId del archivo productos.
    const lastProductId = productos.lastProductId;
    // Verifica si lastProductId es un número // en caso de que haya un error y la variable se modifique y pase a ser un valor diferente a un número, gen
    //ero un error 500 por parte del serv.
    if (typeof lastProductId !== 'number') {
      return response.status(500).json({ error: `${lastProductId} no es un número` });
    }
    const newProductId = lastProductId + 1; //Genero el id para el nuevo producto.
    newProduct.id_producto = newProductId; // lo asigno al nuevo array del producto nuevo. Podría hacerlo sin crear la variable, pero para entender mejor la cree.
    const productWithId = { id_producto: newProductId, ...newProduct };// Agreg la propiedad id_producto al principio del objeto newProduct gracias al spread
    productos.productos.push(productWithId);// Agrega el nuevo producto al final con push.
    // Formateo el archivo producto, genero la variable de lastid con el nuevo id y creo el array de productos.
    const formattedProductos = `const lastProductId = ${newProductId};\n\nconst productos = [\n  ${productos.productos.map(producto => JSON.stringify(producto, null, 2)).join(',\n')}];
        module.exports = {
        productos,
        lastProductId
        };`;

    const filePath = path.join(__dirname, '../../clases/productos/productos.js');// Guardo los cambios en el archivo productos.js
    fs.writeFile(filePath, formattedProductos, (err) => {
      if (err) {
        console.error(err);
        return response.status(500).json({ error: 'Error al guardar los productos' });
      }
      response.status(201).json({ message: 'Producto creado', id_producto: newProduct.id_producto }); //Muestro el id de momento para pruebas, no es necesario.
    });
  };
  //FIN CREATE
  //INICIO DELETE

  deleteProduct = (request, response) => {
    const productId = +request.params.id;
    const index = productos.productos.findIndex((producto) => producto.id_producto === productId);
    if (index !== -1) {
      const deletedProduct = productos.productos.splice(index, 1)[0]; // elimino el producto
      const updatedProductsArray = productos.productos.map(producto => JSON.stringify(producto, null, 2)).join(',\n');
      const formattedProductos = `const lastProductId = ${productos.lastProductId};\n\nconst productos = [\n${updatedProductsArray}\n];\n
        module.exports =
        {productos,\n  
          lastProductId\n};`;

      const filePath = path.join(__dirname, '../../clases/productos/productos.js');
      fs.writeFile(filePath, formattedProductos, (err) => {
        if (err) {
          return response.status(500).json({ error: 'Error al guardar los productos' });
        }
        response.status(200).json({ message: `Producto con ID: ${productId} eliminado` });
      });
    } else {
      response.status(404).json({ message: `No se encontró el producto con ID: ${productId}` });
    }
  };
  //FIN DELETE.


  //------------INICIO PRODUCTOS CRUD CON MONGODB------------

  // ------>GetProductosAllDB<------
  GetProductosAllDb = async (request, response) => {
    try {
      const limit = request.query.limit || 999999; // 999999 es el máximo de productos que muestra si no recibo un limite.
      if (validatorByAll(limit, response)) {
        await this.conec.conectar();
        const productosCollection = this.conec.db.collection('products');
        const productosLimitados = await productosCollection.find().limit(parseInt(limit, 10)).toArray();
        response.json(productosLimitados);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      response.status(500).json({ error: 'Error al obtener productos' });
    } finally {
      this.conec.desconectar();
    }
  };

  //------>GetProductosByIdDB<------
  GetProductosByIdDb = async (productId, response) => {
    try {
      productId = +productId;
      await this.conec.conectar();
      const productosCollection = this.conec.db.collection('products');
      const producto = await productosCollection.findOne({ id_producto: productId });
      if (!producto) {
        validatorById(producto, productId, response);
        return null;
      }
      return producto;
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      response.status(500).json({ error: 'Error al obtener producto por ID' });
    } finally {
      this.conec.desconectar();
    }
  };

  //------>GetProductosActivesDB<------
  GetProductosActivesDb = async (request, response) => {
    try {
      const tipo = 'productos';
      await this.conec.conectar();
      const productosCollection = this.conec.db.collection('products');
      const productosActivos = await productosCollection.find({ status: true }).toArray();

      if (validatorStatusActive(productosActivos, response, tipo)) {
        response.json(productosActivos);
      }
    } catch (error) {
      console.error('Error al obtener productos activos:', error);
      response.status(500).json({ error: 'Error al obtener productos activos' });
    } finally {
      this.conec.desconectar();
    }
  };

  GetProductosInactivesDb = async (request, response) => {
    try {
      const tipo = 'productos';
      await this.conec.conectar();
      const productosCollection = this.conec.db.collection('products');
      const productosActivos = await productosCollection.find({ status: false }).toArray();

      if (validatorStatusActive(productosActivos, response, tipo)) {
        response.json(productosActivos);
      }
    } catch (error) {
      response.status(500).json({ error: 'Error al obtener productos inactivos' });
    } finally {
      this.conec.desconectar();
    }
  };

  //------->updateProductByIdDB<---------
  updateProductByIdDb = async (request, response) => {
    const tipo = 'Producto';
    const productId = +request.params.id;
    const updatedProduct = request.body;

    if ('id_producto' in updatedProduct) {
      response.status(400).json({ error: 'No se permite actualizar el ID del producto' });
      return;
    }

    try {
      await this.conec.conectar();
      const productosCollection = this.conec.db.collection('products');

      const result = await productosCollection.updateOne(
        { id_producto: productId },
        { $set: updatedProduct }
      );

      if (result.modifiedCount > 0) {
        validatorUpdate(response, true, productId, tipo);
      } else {
        validatorUpdate(response, false, productId, tipo);
      }
    } catch (error) {
      console.error('Error al actualizar producto por ID:', error);
      response.status(500).json({ error: 'Error al actualizar producto por ID' });
    } finally {
      this.conec.desconectar();
    }
  };

  //------->createProductDB<---------
  createProductDb = async (request, response) => {
    try {
      const newProduct = request.body;
      if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.stock || !newProduct.code) {
        return response.status(400).json({ error: 'Faltan datos obligatorios' });
      }
      await this.conec.conectar();

      // Verifico si el código (propiedad 'code') ya existe en la base de datos
      const existingProduct = await this.conec.db.collection('products').findOne({ code: newProduct.code });
      if (existingProduct) {
        return response.status(400).json({ error: 'El código del producto ya existe' });
      }

      // Obtengo la colección de productos
      const productosCollection = this.conec.db.collection('products');

      // Obtengo el último id de la bdd
      const lastProductIdDoc = await productosCollection.findOne({ _id: 'lastProductId' });
      let lastProductId = lastProductIdDoc ? lastProductIdDoc.lastProductId : 0;

      const newProductId = lastProductId + 1;

      // Actualizo el último id en la base de datos
      await productosCollection.updateOne({ _id: 'lastProductId' }, { $set: { lastProductId: newProductId } }, { upsert: true });

      // Agrego el nuevo producto con el nuevo id
      newProduct.id_producto = newProductId;
      await productosCollection.insertOne(newProduct);

      response.status(201).json({ message: 'Producto creado', id_producto: newProduct.id_producto });
    } catch (error) {
      console.error('Error al crear producto:', error);
      response.status(500).json({ error: 'Error al crear producto' });
    }
  };
  //------->DeleteDB<---------
  deleteProductDb = async (request, response) => {
    const productId = +request.params.id;
      try {
        await this.conec.conectar();
        const productosCollection = this.conec.db.collection('products');
    
        const result = await productosCollection.deleteOne({ id_producto: productId });
    
        if (result.deletedCount > 0) {
          // Si se eliminó al menos un documento, significa que se encontró y eliminó
          response.status(200).json({ message: `Producto con ID: ${productId} eliminado` });
        } else {
          response.status(404).json({ message: `No se encontró el producto con ID: ${productId}` });
        }
      } catch (error) {
          console.error('Error al eliminar producto por ID:', error);
          response.status(500).json({ error: 'Error al eliminar producto por ID' });
      } finally {
          this.conec.desconectar();
      }
  };
  
  
  

}

module.exports = {
  Producto
};
