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
// app.get('/', (req, res) => {
//   if (req.url === "/") {
//     res.setHeader('Content-Type', 'text/html', 'charset=utf-8') //seteo header para que me devuelta un texto plano y utf-8 (caracteres en esp.)
//   }
// })
app.use('/', vistasRouter);
app.use('/', usuariosRoutes);
app.use('/', productosRoutes);




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
