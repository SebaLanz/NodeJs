const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');  // Agregamos la importación de 'path'
const app = express();
const port = 8080;
const utils = require('./utils');
const usuariosRoutes = require('./src/routes/usuariosRouter.js');
const productosRoutes = require('./src/routes/productosRouter.js');
const vistasRouter = require('./src/routes/vistaRouter.js');

const absolutePathToViews = utils.getAbsolutePath('./src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

const hbs = handlebars.create({
  partialsDir: path.join(__dirname, 'src', 'views', 'partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', absolutePathToViews);

// Rutas
app.use('/', vistasRouter);
app.use('/', usuariosRoutes);
app.use('/', productosRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
