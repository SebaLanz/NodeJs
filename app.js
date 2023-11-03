
const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extends:true}));

const productosControlador = require('./clases/productos/productosManager');


// Ruta Raiz
app.get('/', (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200; //OK
    res.setHeader('Content-Type', 'text/html', 'charset=utf-8') //seteo header para que me devuelta un texto plano y utf-8 (caracteres en esp.)
    res.send('Bienvenido a la prueba de Express con contento de desarrollar una api2');
  }
  
});


//Productos -------------------------------------------------------------------------------------------------------------------------------------------------------->
//Todos los productos
app.get('/api/products', productosControlador.GetProductosAll);
//-------------------------------------------------------------->
//Productos Activos
app.get('/api/products/active', productosControlador.GetProductosActives);
//-------------------------------------------------------------->
//Productos Inactivos
app.get('/api/products/inactive', productosControlador.GetProductosInactives);
//-------------------------------------------------------------->
//Productos por ID (id)
app.get('/api/products/:id', productosControlador.GetProductosById);

/* FIN GETS -------------------------------------------------------------------------------------------------------------------------------------------------------->*/



//PUT------------------------------------------------------------
//Actualizar producto por id
app.put('/api/products/:id', productosControlador.updateProductById);

/* FIN PUTS -------------------------------------------------------------------------------------------------------------------------------------------------------->*/
//POST------------------------------------------------------------
//Crear
app.post('/api/', productosControlador.createProduct);



//Fin Productos
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
