  const express = require('express');
  const router = express.Router();
  const { generatePagination }  = require('../public/javascript/pagination.js')
  const { Producto } = require('../dao/manager/productosManager.js');
  const productosManager = new Producto();
  const { Usuario } = require('../dao/manager/usuariosManager.js');
  const usuariosManager = new Usuario();
  const bcrypt = require('bcrypt');

router.get('/', (request, response) => {
  response.status(200).render('index');//renderizo el archivo login.handlebars
});

// Ruta para renderizar la vista con productos paginados
router.get('/api/productsDb', async (request, response) => {
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
router.get('/api/carritosDb', async (request, response) => {
  response.status(200).render('carrito');
});

// Usuarios ->
router.get('/api/usersDb', async (request, response) => {
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
// router.get('/api/login', async (request, response) => {
//   response.status(200).render('login', { isLoginPage: true });
// });

// router.all('/api/login', async (request, response) => {
//   if (request.method === 'GET') {
//     return response.status(200).render('login', { isLoginPage: true });
//   }
//   // Si es una solicitud POST, ejecuta la lógica de inicio de sesión
//   try {
//     const { email, password } = request.body;

//     if (!email || !password) {
//       return response.status(200).render('index');
//     }

//   } catch (error) {
//     console.error('Error:', error);
//     response.status(500).json({ success: false, message: 'Error interno del servidor' });
//   }
// });

router.all('/api/login', async (request, response) => {
  if (request.method === 'GET') {
    return response.status(200).render('login', { isLoginPage: true });
  }

  // Si es una solicitud POST, ejecuta la lógica de inicio de sesión
  try {
    const { email, password } = request.body;
    const user = await usuariosManager.getUsuarioByEmailDb(email, response);

    if (!user) {
      return response.status(401).json({ error: 'Email' });    }
    const passwordMatch = await usuariosManager.comparePassword(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    //el inicio de sesión fue exitoso
    response.status(200).render('index', { success: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


// Registrar ->
router.get('/api/registrar', async (request, response) => {
  response.status(200).render('registrar', { isLoginPage: true });
});
module.exports = router;

