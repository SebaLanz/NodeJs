//Sever y express.
const express = require('express');
const handlebars = require('express-handlebars');
const handlebarsHelpers = require('handlebars-helpers');
const path = require('path');
const port = 8080;
const socketIO = require('socket.io');
//Utilidades y recursos.
const utils = require('./utils');
const usuariosRoutes = require('./src/routes/usuariosRouter.js');
const productosRoutes = require('./src/routes/productosRouter.js');
const vistasRouter = require('./src/routes/vistaRouter.js');
const absolutePathToViews = utils.getAbsolutePath('./src/views');
const helpers = handlebarsHelpers();//lo uso para la paginación
const cors = require('cors');
const session = require('express-session');
// Instancia de servidor http y websocket.
const app = express();
const httpServer = app.listen(port, () => console.log(`Servidor Express escuchando en el puerto ${port}`));
const io = socketIO(httpServer); // Instancio cliente con socket io. //SocketSever  

app.use(session({
  secret: 'CoderNodeJS',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    sameSite: 'None',
  },
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

const hbs = handlebars.create({
  partialsDir: path.join(__dirname, 'src', 'views', 'partials'),
});

// Registra los helpers de handlebars-helpers
hbs.handlebars.registerHelper(helpers);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', absolutePathToViews);

app.use(cors());
// Rutas
app.use('/', vistasRouter);
app.use('/', usuariosRoutes);
app.use('/', productosRoutes);

// Instancia de socket y emisiones.
io.on('connection', socket => {

  socket.on('message', data => {
    // console.log(data);
  });

  // socket.emit('evento_individual', 'mensaje individual, el cual es una relación 1 a 1');
  // socket.broadcast.emit('mensaje_para_todos_menos_para_mi', 'Este mensaje lo ven todos menos el usuario emisor');
  // io.emit('msj_para_todos','Este msj lo reciben todos');
});

module.exports = app;