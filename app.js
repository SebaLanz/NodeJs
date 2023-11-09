const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const port = 8080;
const utils = require('./utils');
const usuariosRoutes = require('./src/routes/usuarios.routes.js');
const productosRoutes = require('./src/routes/productos.routes.js');




app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.engine('handlebars', handlebars.engine());


const absolutePathToViews = utils.getAbsolutePath('./views');
app.set('views',absolutePathToViews);


//Rutas
app.use('/', usuariosRoutes);
app.use('/', productosRoutes);




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
