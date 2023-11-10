const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const port = 8080;
const utils = require('./utils');
const usuariosRoutes = require('./src/routes/usuariosRouter.js');
const productosRoutes = require('./src/routes/productosRouter.js');
const vistasRouter = require('./src/routes/vistaRouter.js');
const cors = require('cors');


// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware para habilitar CORS
app.use(cors());


const absolutePathToViews = utils.getAbsolutePath('./src/views');
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(express.static('./src/public'));//Con esta línea puedo utilizar la carpeta public

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views',absolutePathToViews);




//Rutas
app.use('/', vistasRouter);
app.use('/', usuariosRoutes);
app.use('/', productosRoutes);




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
