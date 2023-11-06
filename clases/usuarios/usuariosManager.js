const fs = require('fs');
const path = require('path');
const utils = require('../../utils.js');
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
                                    /*}else if(key === 'password'){

                                        const testValida = encriptador.validatePassword(updatedUser[key]);
                                        console.log(testValida + ' valida <---' + updatedUser[key]);

                                        if (testValida) {
                                            encriptador.hashPassword(updatedUser[key])
                                            .then((hash) => {
                                                console.log('Contraseña válida y codificada:', hash);
                                                userToUpdate[key] = updatedUser[key];
                                            })
                                            .catch((error) => {
                                                console.error('Error al codificar la contraseña:', error);
                                            });
                                            } else {
                                                return response.status(402).json({ error: `No se puede modificar el Usuario. La clave no cumple los requisitos., ${updatedUser[key]}`});
                                        }*/
                }
            else{
                userToUpdate[key] = updatedUser[key];
            }
          }
          const lastUserId = usersData.usuarios.lastUserId;
          const formattedUsersArray = usersData.usuarios.map(usuarios => JSON.stringify(usuarios, null, 2)).join(',\n');
          const formattedUsuarios = `const lastUserId = ${lastUserId};\n\nconst usuarios = [\n${formattedUsersArray}\n];\n\n
          module.exports = 
          {\n   usuarios,\n  
                lastUserId\n};`;
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
    
}

module.exports = {
    Usuario
};
