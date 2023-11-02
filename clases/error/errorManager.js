    
    const statusCodes = require('./statusCodes');

    const sendErrorResponse = (response, statusCode, message) =>{
        response.status(statusCode).json({ message });
    }

    function validatorByAll(limit, response) {
        const limitValue = parseInt(limit, 10);
        if (limitValue <= 0) {
          sendErrorResponse(response, statusCodes.BAD_REQUEST, 'El id debe ser un número positivo');
          return false; // Error
        } else if (isNaN(limitValue)) {
          sendErrorResponse(response, statusCodes.BAD_REQUEST, 'El id debe ser numérico');
          return false; // Error
        }
        return true; // Devuelve verdadero si todas las validaciones pasan
    }
    const validatorById = (producto, productoId, response) => {
        if (typeof productoId !== 'undefined') {
          if (producto) {
            response.json(producto);
          } else if (isNaN(productoId)) {
            sendErrorResponse(response, statusCodes.BAD_REQUEST, `El ID debe ser numérico`);
          } else if (productoId <= 0) {
            sendErrorResponse(response, statusCodes.BAD_REQUEST, `El ID: ${productoId} debe ser mayor a 0`);
          } else {
            sendErrorResponse(response, statusCodes.NOT_FOUND, `Producto con ID: ${productoId} no encontrado`);
          }
        }
    };    

module.exports = {
    sendErrorResponse,
    validatorById,
    validatorByAll
};