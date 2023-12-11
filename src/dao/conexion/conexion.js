// En el archivo de conexión (conexion.js)

const { MongoClient } = require('mongodb');
const { DB_URL, DB_NAME } = require('./constantes');

class Conexion {
  constructor() {
    this.client = new MongoClient(DB_URL);
  }

  async conectar() {
    try {
      await this.client.connect();
      console.log('Conectado a la base de datos');
      this.db = this.client.db(DB_NAME);
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }

  async desconectar() {
    try {
      await this.client.close();
      console.log('Desconectado de la base de datos');
    } catch (error) {
      console.error('Error al desconectar de la base de datos:', error);
    }
  }

}

module.exports = {
    Conexion,
};
