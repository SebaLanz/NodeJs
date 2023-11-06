const bcrypt = require('bcrypt');

class RegEx {
  constructor() {
    this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  }

  validatePassword(password) {
    return this.passwordRegex.test(password);
  }

  async encryptPassword(password) {
    if (!this.validatePassword(password)) {
      throw new Error('La clave no cumple con los requisitos.');
    }

    // Generar un hash de la contraseña utilizando bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }
}

module.exports = RegEx;