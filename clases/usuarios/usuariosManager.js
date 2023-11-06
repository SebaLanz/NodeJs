const fs = require('fs');
const path = require('path');
const utils = require('../../utils.js');
const { STATUS_CODES } = require('http');
const usersData = require(utils.getAbsolutePath('clases/usuarios/usuarios.js'));
const { validatorByAll, validatorById, validatorStatusActive, validatorStatusInactive, validatorUpdate } = require(utils.getAbsolutePath('clases/error/validatorManager.js'));
const RegEx = require(utils.getAbsolutePath('clases/regEx/expresionesRegulares.js'));
const encriptador = new RegEx();

class Usuario { 
    constructor(username, password, mail, name, surname) {
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.name = name;
        this.surname = surname;
    }

    getUsuariosAll(request, response) {
        const limit = request.query.limit || usersData.usuarios.length;
            if (validatorByAll(limit, response)) {
                const usuariosLimitados = usersData.usuarios.slice(0, parseInt(limit, 10));//Podría no mostrar la clave.
                response.json(usuariosLimitados);
            }
    }
    getUsuarioById(id_usuario, response){
        id_usuario = +id_usuario; // lo mismo que hacer parseInt..
        const usuarioEncontrado = usersData.usuarios.find((user) => user.id_usuario === id_usuario);
            if (!usuarioEncontrado) {
                validatorById(usuarioEncontrado, id_usuario, response);
                return null;
            }
            return usuarioEncontrado;
    }
    getUsuarioActivo(request, response){//Si no pongo la request, me arroja error, por más que no la utilice, la tengo que tener como param.
        const tipo = 'usuarios';
        const usuario = usersData.usuarios.filter((user => user.status === true));
            if (validatorStatusActive(usuario, response, tipo)) {
                response.json(usuario);
            }
    }
    getUsuarioInactivo(request, response){
        const tipo = 'usuarios';
        const usuario = usersData.usuarios.filter((user => user.status === false));
            if (validatorStatusInactive(usuario, response, tipo)) {
                response.json(usuario);
            }
    }
    updateUserById(request, response){
        const tipo = 'Usuario';
        const userId = +request.params.id;
        const updatedUser = request.body;
        const userToUpdate = usersData.usuarios.find((usuario) => usuario.id_usuario === userId);
  
        if (userToUpdate) {
          for (const key in updatedUser) {
            if (key === 'id_usuario') {
                return response.status(402).json({ error: 'Error, no se puede modificar el ID' });                    
            }
            else if(key === 'password'){
                const testValida = encriptador.validatePassword(updatedUser[key]);
                if (testValida) {
                    encriptador.encryptPassword(updatedUser[key])
                    .then((hash) => {
                        userToUpdate[key] = hash;
                    })
                    .catch((error) => {
                        return response.status(500).json({error: `Error en el servidor, no se guardó la actualización ${error}`})
                    });
                    } else {
                        return response.status(402).json({ error: `No se puede modificar el Usuario. La clave no cumple los requisitos.`});
                }
            }
            else{
                userToUpdate[key] = updatedUser[key];
            }
          }
          const lastUserId = usersData.lastUserId;
          const formattedUsersArray = usersData.usuarios.map(usuarios => JSON.stringify(usuarios, null, 2)).join(',\n');
          const formattedUsuarios = `const lastUserId = ${lastUserId};\n\nconst usuarios = [\n${formattedUsersArray}\n]; \nmodule.exports = { \nusuarios,\nlastUserId};`;
          const filePath = path.join(__dirname, '../usuarios/usuarios.js');
          fs.writeFile(filePath, formattedUsuarios, (err) => {
            if (err) {
              return response.status(500).json({ error: 'Error al guardar el usuario' });
            }
            validatorUpdate(response, true, userId, tipo);
          });
        } else {
          validatorUpdate(response, false, userId, tipo);
        }
    }
    createUser = (request, response) => {
        const newUser = request.body;
        if (!newUser.username || !newUser.password || !newUser.mail || !newUser.name || !newUser.surname) {
            return response.status(400).json({ error: 'Faltan datos obligatorios' });
        }
        if (usersData.usuarios.some(usuario => usuario.username === newUser.username)) {
            return response.status(400).json({ error: 'El usuario ya existe' });
        }//hasta acá
        const lastProductId = productos.lastProductId;
        if (typeof lastProductId !== 'number') {
            return response.status(500).json({ error: 'lastProductId no es un número' });
        }
        const newUserId = lastProductId + 1;

        newUser.id_producto = newUserId;

        const productWithId = { id_producto: newUser, ...newUser };

        productos.productos.push(productWithId);

        const formattedProductos = `const lastProductId = ${newUserId};\n\nconst productos = [\n  ${productos.productos.map(producto => JSON.stringify(producto, null, 2)).join(',\n')}];
            module.exports = {
            productos,
            lastProductId
            };`;
        const filePath = path.join(__dirname, '../productos/productos.js');// Guardo los cambios en el archivo productos.js
        fs.writeFile(filePath, formattedProductos, (err) => {
            if (err) {
            console.error(err);
            return response.status(500).json({ error: 'Error al guardar los productos' });
            }
            response.status(201).json({ message: 'Producto creado', id_producto: newProduct.id_producto }); //Muestro el id de momento para pruebas, no es necesario.
        });
    };
}

module.exports = {
    Usuario
};
