const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const port = 8080;
const utils = require('./utils');
const usuariosRoutes = require('./src/routes/usuariosRouter.js');
const productosRoutes = require('./src/routes/productosRouter.js');
const vistasRouter = require('./src/routes/vistaRouter.js');



const absolutePathToViews = utils.getAbsolutePath('./src/views');
app.use(express.json());
app.use(express.urlencoded({extends:true}));


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
