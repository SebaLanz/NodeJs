const bcrypt = require('bcrypt');// Función para codificar una contraseña (ejemplo usando la biblioteca "bcrypt")

class RegEx {
    // Expresión regular para validar contraseñas: al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.
    static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);// encripto
    }
    validatePassword(password) {
        return this.passwordRegex.test(password);
    }
}

    /* Ejemplo de uso:
    const inputPassword = 'Password123';

    if (RegEx.validatePassword(inputPassword)) {
    RegEx.hashPassword(inputPassword)
    .then((hash) => {
        console.log('Contraseña válida y codificada:', hash);
    })
    .catch((error) => {
        console.error('Error al codificar la contraseña:', error);
    });
    } else {
    console.error('La contraseña no cumple con los requisitos.');
    }*/
exports = {
    RegEx
}