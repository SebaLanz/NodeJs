const bcrypt = require('bcrypt');// Función para codificar una contraseña (ejemplo usando la biblioteca "bcrypt")

class RegEx {
    // Expresión regular para validar contraseñas: al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.
     
    passwordRegex = /^(.{8})$/;
    hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);// encripto
    }
    
    validatePassword(password) {
        
        return this.passwordRegex.test(password); //true o false
    }
}

module.exports = RegEx;