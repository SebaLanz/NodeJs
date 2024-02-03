  const express = require('express');
  const router = express.Router();
  const { generatePagination }  = require('../public/javascript/pagination.js')
  const { Producto } = require('../dao/manager/productosManager.js');
  const productosManager = new Producto();
  const { Usuario } = require('../dao/manager/usuariosManager.js');
  const usuariosManager = new Usuario();
  const bcrypt = require('bcrypt');

  // github passport
  const passport = require('passport');
  const GitHubStrategy = require('passport-github').Strategy;


// Middleware para verificar la autenticación del usuario
const authenticateMiddleware = (request, response, next) => {
  // Lista de rutas públicas que pueden ser accedidas sin iniciar sesión
  const publicRoutes = ['/api/login', '/api/registrar'];

  // Verifica si la ruta actual es pública
  if (request.session && (request.session.email || request.session.passport)) {
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

// Passport GITHUB
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, user) => {
    done(err, user);
  });
});

//login github
passport.use(new GitHubStrategy({
  clientID: '794bb9ec6c53a9e262ab',
  clientSecret: 'f1945ecdb29990c44ab590f4293c8034f0aec796',
  callbackURL: 'http://localhost:8080/auth/github/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Customize this callback function to handle GitHub user data as needed
  return done(null, profile);
}, (err) => {
  console.error('GitHub authentication error:', err);
}));
// login github

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log('GitHub authentication successful');
    res.redirect('/');
  });


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
router.get('/protected-route', ensureAuthenticated, (req, res) => {});


//Index
router.get('/', authenticateMiddleware, (request, response) => {
  const userEmail = request.session.email;
  response.status(200).render('index', { email: userEmail });
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
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

//login
router.all('/api/login', async (request, response) => {
  if (request.method === 'GET') {
    return response.status(200).render('login', { isLoginPage: true });
  }

  try {
    const { email, password } = request.body;
    const user = await usuariosManager.getUsuarioByEmailDb(email, response);

    if (user === null) {
      return response.status(401).json({ error: 'Email inexistente.' });
    }

    const passwordMatch = await usuariosManager.comparePassword(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // El inicio de sesión fue exitoso
    request.session.email = email; // Establece la sesión
    return response.status(200).json({ success: 'Inicio de sesión exitoso', email });
  } catch (error) {
    return response.status(500).json({ error: 'Error interno del servidor' });
  }
});




// Registrar ->
router.get('/api/registrar', async (request, response) => {
  response.status(200).render('registrar', { isLoginPage: true });
});

// Perfil ->
router.get('/api/perfilDb', authenticateMiddleware, async (request, response) => {
  try {
    const userEmail = request.session.email; // Obtén el email desde la sesión
    // Aquí podrías realizar la lógica necesaria para obtener otros datos del usuario si es necesario
    const user = await usuariosManager.getUsuarioByEmailDb(userEmail, response);
    if (!user) {
      return response.status(404).json({ error: 'Usuario no encontrado' });
    }

    response.status(200).render('perfil', {user});
  } catch (error) {
    response.status(500).json({ error: 'Error interno del servidor al obtener el usuario' });
  }
});

// Logout ->
router.get('/api/logout', (request, response) => {
  // Destruye la sesión y redirige al login
  request.session.destroy((err) => {
    if (err) {
      return('Error al cerrar sesión:', err);
    }
    response.redirect('/api/login');
  });
});

module.exports = router;

