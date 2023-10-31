console.log(1);

const express = require('express');
const app = express();
const port = 3000;
const productosControlador = require('./productos/productosControlador'); // Asegúrate de que la ruta sea correcta
// Ruta Raiz
app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
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
