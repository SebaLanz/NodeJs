  const express = require('express');
  const router = express.Router();
  const { generatePagination }  = require('../public/javascript/pagination.js')
  const { Producto } = require('../dao/manager/productosManager.js');
  const productosManager = new Producto();
  const { Usuario } = require('../dao/manager/usuariosManager.js');
  const usuariosManager = new Usuario();
  const bcrypt = require('bcrypt');


// Middleware para verificar la autenticación del usuario
const authenticateMiddleware = (request, response, next) => {
  // Lista de rutas públicas que pueden ser accedidas sin iniciar sesión
  const publicRoutes = ['/api/login', '/api/registrar'];

  // Verifica si la ruta actual es pública
  if (publicRoutes.includes(request.path)) {
    // Ruta pública, permitir acceso
    return next();
  }

  // Verifica si el usuario está autenticado, de lo contrario, renderiza la vista de login
  if (request.session && request.session.email) {
    next();
  } else {
    response.status(401).render('login', { isLoginPage: true });
  }
};

//Index
router.get('/', authenticateMiddleware, (request, response) => {
  const userEmail = request.session.email; // Obtén el email desde la sesión
  response.status(200).render('index', { email: userEmail }); // Renderiza la vista con el email
});

// Ruta para renderizar la vista con productos paginados
router.get('/api/productsDb',authenticateMiddleware, async (request, response) => {
  try {
    const itemsPerPage = 9;
    const currentPage = request.query.page || 1;
    
    const [allProducts, totalItems] = await Promise.all([
      productosManager.GetProductosAllDb(request, response),
      productosManager.GetCountProductos()
    ]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedProducts = allProducts.slice(startIndex, endIndex);
    const pagination = generatePagination(totalItems, itemsPerPage, currentPage);
    response.status(200).render('products', {
      products: paginatedProducts,
      pagination,
    });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Carrito ->
router.get('/api/carritosDb',authenticateMiddleware, async (request, response) => {
  response.status(200).render('carrito');
});

// Usuarios ->
router.get('/api/usersDb',authenticateMiddleware, async (request, response) => {
  try {
    const itemsPerPage = 9; // Puedes ajustar la cantidad de usuarios por página
    const currentPage = request.query.page || 1;

    const [allUsers, totalItems] = await Promise.all([
      usuariosManager.getUsuariosAllDb(request, response),
      //usuariosManager.getCountUsuarios() // Asegúrate de tener un método similar para obtener el total de usuarios
      10
    ]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedUsers = allUsers.slice(startIndex, endIndex);
    const pagination = generatePagination(totalItems, itemsPerPage, currentPage);

    // Asegúrate de tener un archivo de vista llamado 'users.handlebars' para renderizar
    response.status(200).render('usuarios', {
      users: paginatedUsers,
      pagination,
    });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login ->
router.all('/api/login', async (request, response) => {
  if (request.method === 'GET') {
    return response.status(200).render('login', { isLoginPage: true });
  }

  // Si es una solicitud POST, ejecuta la lógica de inicio de sesión
  try {
    const { email, password } = request.body;
    const user = await usuariosManager.getUsuarioByEmailDb(email, response);

    if (!user) {
      return response.status(401).json({ error: 'Email' });
    }

    const passwordMatch = await usuariosManager.comparePassword(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // El inicio de sesión fue exitoso
    request.session.email = email; // Establece la sesión
    response.status(200).render('index', { success: 'Inicio de sesión exitoso', email });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Registrar ->
router.get('/api/registrar', async (request, response) => {
  response.status(200).render('registrar', { isLoginPage: true });
});

// Perfil ->
router.get('/api/perfilDb', authenticateMiddleware, (request, response) => {
  // Renderiza la vista del perfil
  response.status(200).render('perfil');
});

// Logout ->
router.get('/api/logout', (request, response) => {
  // Destruye la sesión y redirige al login
  request.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    response.redirect('/api/login');
  });
});

module.exports = router;

