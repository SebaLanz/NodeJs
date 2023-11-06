const path = require('path');

// Función para crear rutas absolutas a partir de rutas relativas
function getAbsolutePath(relativePath) {
  return path.resolve(__dirname, relativePath);
}

module.exports = {
  getAbsolutePath,
};
