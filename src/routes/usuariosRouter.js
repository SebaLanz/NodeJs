const express = require('express');
const router = express.Router();
const utils = require('../../utils.js');
const { Usuario } = require(utils.getAbsolutePath('./src/dao/manager/usuariosManager.js'));
const users = new Usuario();


//Inicio Usuarios Rutas Viejas para archivos--->
// router.get('/api/users', users.getUsuariosAll);
// router.get('/api/users/active', users.getUsuarioActivo);
// router.get('/api/users/inactive', users.getUsuarioInactivo);
// router.get('/api/users/:id', (request, response) => {
//   const usuario = users.getUsuarioById(request.params.id, response);
//   if (usuario) {
//     response.json(usuario);
//   }
// });
// router.put('/api/users/:id', users.updateUserById);
// router.post('/api/users/', users.createUser);
// router.delete('/api/users/delete/:id', users.deleteUser);

//Inicio Usuarios BDD ->
router.get('/api/usersDb', users.getUsuariosAllDb);

router.get('/api/usersDb/:id', async (request, response) => {
  try {
    const usuario = await users.getUsuarioByIdDb(request.params.id, response);
    if (usuario) {
      response.json(usuario);
    }
  } catch (error) {
    response.status(500).json({ error: 'Error en la ruta' });
  }
});

module.exports = router;