const fs = require('fs');
const path = require('path');
const usersData = require('./usuarios.js');
const { validatorByAll, sendErrorResponse, validatorById, validatorStatusActive, validatorStatusInactive } = require('../error/validatorManagerProducts.js');
const { RegEx } = require('../regEx/expresionesRegulares.js');
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
        
    }
    
}

module.exports = {
    Usuario
};
