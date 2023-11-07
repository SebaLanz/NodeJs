const express = require('express');
const handlebars = require('express-handlebars');
const utils = require('./utils');
const app = express();
const port = 8080;
const productosControlador = require(utils.getAbsolutePath('./clases/productos/productosManager.js')); // Genero ruta absoluta.
const { Usuario } = require(utils.getAbsolutePath('./clases/usuarios/usuariosManager.js'));
const users = new Usuario();
app.use(express.json());
app.use(express.urlencoded({extends:true}));


const absolutePathToViews = utils.getAbsolutePath('./views');
//const absolutePathToPublic = utils.getAbsolutePath('./public');

app.engine('handlebars', handlebars.engine());
app.set('views',absolutePathToViews);

// Middleware para establecer el encabezado Content-Type en application/json
app.use((request, response, next) => {
  response.setHeader('Content-Type', 'application/json'); // Configura el Content-Type como application/json
  next();
});


// Ruta Raiz
app.get('/', (req, res) => {
  if (req.url === "/") {
    res.setHeader('Content-Type', 'text/html', 'charset=utf-8') //seteo header para que me devuelta un texto plano y utf-8 (caracteres en esp.)

    let testUser = {name: 'pepe', apellido: 'pompin'}
    res.render('index.handlebars', testUser);
  }
});

//Productos --->
app.get('/api/products', productosControlador.GetProductosAll);
app.get('/api/products/active', productosControlador.GetProductosActives);
app.get('/api/products/inactive', productosControlador.GetProductosInactives);
app.get('/api/products/:id', (request, response) => {
  const producto = productosControlador.GetProductosById(request.params.id, response);
  if (producto) {
    response.json(producto);
  }
});
app.put('/api/products/:id', productosControlador.updateProductById);
app.post('/api/products/', productosControlador.createProduct);
app.delete('/api/products/delete/:id', productosControlador.deleteProduct);
//Fin Productos ---!

//Inicio Usuarios --->
app.get('/api/users', users.getUsuariosAll);
app.get('/api/users/active', users.getUsuarioActivo);
app.get('/api/users/inactive', users.getUsuarioInactivo);
app.get('/api/users/:id', (request, response) => {
  const usuario = users.getUsuarioById(request.params.id, response);
  if (usuario) {
    response.json(usuario);
  }
});
app.put('/api/users/:id', users.updateUserById);
app.post('/api/users/', users.createUser);
app.delete('/api/users/delete/:id', users.deleteUser);



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
