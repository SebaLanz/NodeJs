
const express = require('express');
const app = express();
const port = 3000;
const productosControlador = require('./clases/productos/productosManager'); // Asegúrate de que la ruta sea correcta
// Ruta Raiz
app.get('/', (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200; //OK
    res.setHeader('Content-Type', 'text/html', 'charset=utf-8') //seteo header para que me devuelta un texto plano y utf-8 (caracteres en esp.)
    res.send('Bienvenido a la prueba de Express con contento de desarrollar una api2');
  }
  
});


//Productos ---------------------------------------------------->
//Todos los productos
app.get('/productos', productosControlador.GetProductosAll);
//--------------------------------------------------------------
//Productos por ID (código)
app.get('/productos/:id', productosControlador.GetProductosById);



//Fin Productos
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
