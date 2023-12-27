const fs = require('fs');
const path = require('path');
const utils = require('../../../utils.js');
const usersData = require(utils.getAbsolutePath('clases/usuarios/usuarios.js'));
const { validatorByAll, validatorById, validatorStatusActive, validatorStatusInactive, validatorUpdate,validatorId } = require(utils.getAbsolutePath('clases/error/validatorManager.js'));
const RegEx = require(utils.getAbsolutePath('clases/regEx/expresionesRegulares.js'));
const encriptador = new RegEx();
const { Conexion } = require('../conexion/conexion.js'); 

class Usuario { 
    constructor() {
        this.conec = new Conexion();
      }

    // getUsuariosAll(request, response) {
    //     const limit = request.query.limit || usersData.usuarios.length;
    //         if (validatorByAll(limit, response)) {
    //             const usuariosLimitados = usersData.usuarios.slice(0, parseInt(limit, 10));//Podría no mostrar la clave.
    //             response.json(usuariosLimitados);
    //         }
    // }
    // getUsuarioById(id_usuario, response){
    //     id_usuario = +id_usuario; // lo mismo que hacer parseInt..
    //     const usuarioEncontrado = usersData.usuarios.find((user) => user.id_usuario === id_usuario);
    //         if (!usuarioEncontrado) {
    //             validatorById(usuarioEncontrado, id_usuario, response);
    //             return null;
    //         }
    //         return usuarioEncontrado;
    // }
    // getUsuarioActivo(request, response){//Si no pongo la request, me arroja error, por más que no la utilice, la tengo que tener como param.
    //     const tipo = 'usuarios';
    //     const usuario = usersData.usuarios.filter((user => user.status === true));
    //         if (validatorStatusActive(usuario, response, tipo)) {
    //             response.json(usuario);
    //         }
    // }
    // getUsuarioInactivo(request, response){
    //     const tipo = 'usuarios';
    //     const usuario = usersData.usuarios.filter((user => user.status === false));
    //         if (validatorStatusInactive(usuario, response, tipo)) {
    //             response.json(usuario);
    //         }
    // }
    // updateUserById(request, response){
    //     const tipo = 'Usuario';
    //     const userId = +request.params.id;
    //     const updatedUser = request.body;
    //     const userToUpdate = usersData.usuarios.find((usuario) => usuario.id_usuario === userId);
    //     if (userToUpdate) {
    //         for (const key in updatedUser) {
    //             if (key === 'id_usuario') {
    //                 return response.status(402).json({ error: 'Error, no se puede modificar el ID' });                    
    //             }
    //             else if(key === 'password'){
    //                 const testValida = encriptador.validatePassword(updatedUser[key]);
    //                 if (testValida) {
    //                     encriptador.encryptPassword(updatedUser[key])
    //                     .then((hash) => {
    //                         userToUpdate[key] = hash;
    //                     })
    //                     .catch((error) => {
    //                         return response.status(500).json({error: `Error en el servidor, no se guardó la actualización ${error}`})
    //                     });
    //                     } else {
    //                         return response.status(402).json({ error: `No se puede modificar el Usuario. La clave no cumple los requisitos.`});
    //                 }
    //             }
    //             else{
    //                 userToUpdate[key] = updatedUser[key];
    //             }
    //         }
    //         const lastUserId = usersData.lastUserId;
    //         const formattedUsersArray = usersData.usuarios.map(usuarios => JSON.stringify(usuarios, null, 2)).join(',\n');
    //         const formattedUsuarios = `const lastUserId = ${lastUserId};\n\nconst usuarios = [\n${formattedUsersArray}\n]; \nmodule.exports = { \nusuarios,\nlastUserId};`;
    //         const filePath = path.join(__dirname, '../../clases/usuarios/usuarios.js');
    //         fs.writeFile(filePath, formattedUsuarios, (err) => {
    //             if (err) {
    //                 return response.status(500).json({ error: 'Error al guardar el usuario' });
    //             }
    //             validatorUpdate(response, true, userId, tipo);
    //             });
    //     } else {
    //         validatorUpdate(response, false, userId, tipo);
    //     }
    // }
    // createUser = (request, response) => {
    //     const newUser = request.body;
    //     if (!newUser.username || !newUser.password || !newUser.mail || !newUser.name || !newUser.surname) {
    //         return response.status(400).json({ error: 'Faltan datos obligatorios' });
    //     }
    //     if (usersData.usuarios.some(usuario => usuario.username === newUser.username)) {
    //         return response.status(400).json({ error: 'El usuario ya existe' });
    //     }
    //     for (const key in newUser) {
    //         if (key === 'id_usuario') {
    //             return response.status(402).json({ error: 'Error, no se puede pasar el ID' });                    
    //         }
    //     }
    //     const lastUserId = usersData.lastUserId;
    //     if (typeof lastUserId !== 'number') {
    //         return response.status(500).json({ error: `${lastUserId} no es un número` });
    //     }
    //     const newUserId = lastUserId + 1;
    //     newUser.id_usuario = newUserId;
    //     const userWithId = { id_usuario: newUserId, ...newUser, status: true };
    //     usersData.usuarios.push(userWithId);
    //     const formattedUsuarios = `const lastUserId = ${newUserId};\n\nconst usuarios = [\n  ${usersData.usuarios.map(usuario => JSON.stringify(usuario, null, 2)).join(',\n')}];
    //         module.exports = {
    //         usuarios,
    //         lastUserId
    //         };`;
    //     const filePath = path.join(__dirname, '../../clases/usuarios/usuarios.js');
    //     fs.writeFile(filePath, formattedUsuarios, (err) => {
    //         if (err) {
    //         return response.status(500).json({ error: 'Error al crear el usuario' });
    //         }
    //         response.status(201).json({ message: 'Usuario creado', id_usuario: newUser.id_usuario });
    //     });
    // };
    // deleteUser = (request, response) => {
    //     const userId = +request.params.id;
    //     const index = usersData.usuarios.findIndex((usuario) => usuario.id_usuario === userId);
    //         if (index !== -1) {
    //                 const deletedUser = usersData.usuarios.splice(index, 1)[0]; // elimino el producto
    //                 const updatedUsersArray = usersData.usuarios.map(usuario => JSON.stringify(usuario, null, 2)).join(',\n');
    //                 const formattedUsers = `const lastUserId = ${usersData.lastUserId};\n\nconst usuarios = [\n${updatedUsersArray}\n];module.exports = {\n  usuarios,\n  lastUserId\n};`;
    //                 const filePath = path.join(__dirname, '../../clases/usuarios/usuarios.js');
    //                 fs.writeFile(filePath, formattedUsers, (err) => {
    //                 if (err) {
    //                     return response.status(500).json({ error: 'Error al eliminar el usuario' });
    //                 }
    //                     return response.status(200).json({ message: `El Usuario con ID: ${userId} eliminado`});
    //                 });
                
    //         }else{
    //             validatorId(userId, response);
    //         }
        
    // }

    
    // Inicio Usuarios con MONGODB --->
    getUsuariosAllDb = async (request, response) => {
        try {
          await this.conec.conectar();
          const limit = request.query.limit || 999999;
      
          if (validatorByAll(limit, response)) {
            const usuariosCollection = this.conec.db.collection('users');
            const usuariosLimitados = await usuariosCollection.find().toArray();
      
            return usuariosLimitados; // Devuelve el resultado explícitamente
          }
        } catch (error) {
          console.error('Error al obtener usuarios:', error);
          response.status(500).json({ error: 'Error al obtener usuarios' });
        }
      };

    // getUsuariosAllDb = async (request, response) => {
    //     try {
    //         await this.conec.conectar();
    //         const limit = request.query.limit || 999999;
    
    //         if (validatorByAll(limit, response)) {
    //             const usuariosCollection = this.conec.db.collection('users');
    //             const usuariosLimitados = await usuariosCollection.find().toArray();
    //             response.json(usuariosLimitados); // Enviar la respuesta al cliente
    //         }
    //     } catch (error) {
    //         console.error('Error al obtener usuarios:', error);
    //         response.status(500).json({ error: 'Error al obtener usuarios' });
    //     } finally {
    //         this.conec.desconectar();
    //     }
    // };
    
    
    getUsuarioByIdDb = async (userId, response) => {
      try {
        userId = +userId;
        await this.conec.conectar();
        const usuariosCollection = this.conec.db.collection('users');
        const usuario = await usuariosCollection.findOne({ id_usuario: userId });
        if (!usuario) {
          validatorById(usuario, userId, response);
          return null;
        }
        return usuario;
      } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        response.status(500).json({ error: 'Error al obtener usuario por ID' });
      } finally {
        this.conec.desconectar();
      }
    };
     
    
    createUser = async (usuario, mail, password) => {
      try {
        await this.conec.conectar();
  
        const usuariosCollection = this.conec.db.collection('users');
  
        // Verifica si el usuario ya existe
        const existingUser = await usuariosCollection.findOne({ usuario });
  
        if (existingUser) {
          return { success: false, message: 'El usuario ya existe' };
        }
  
        // Si el usuario no existe, crea un nuevo usuario
        const newUser = { usuario, mail, password };
  
        await usuariosCollection.insertOne(newUser);
  
        return { success: true, message: 'Usuario creado exitosamente' };
      } catch (error) {
        console.error('Error al crear usuario:', error);
        return { success: false, message: 'Error al crear usuario' };
      }
    }
}

module.exports = {
    Usuario
};
