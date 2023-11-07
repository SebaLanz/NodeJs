    
    const statusCodes = require('./statusCodes');
    const fs = require('fs'); //instancio filesystem
    
    
    
    
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
    const validatorById = (objetoAVerificar, id_objetoAVerificar, response) => {
      //objetoAVerificar = puede ser un usuario, un producto, etc
      //id_objetoAVerificar = puede ser el id de un usuario, producto, etc

        if (typeof id_objetoAVerificar !== 'undefined') {
          if (objetoAVerificar) {
            return true;
          } else if (isNaN(id_objetoAVerificar)) {
            sendErrorResponse(response, statusCodes.BAD_REQUEST, `El ID debe ser numérico`);
          } else if (id_objetoAVerificar <= 0) {
            sendErrorResponse(response, statusCodes.BAD_REQUEST, `El ID número: ${id_objetoAVerificar} debe ser mayor a 0`);
          } else {
            sendErrorResponse(response, statusCodes.NOT_FOUND, `El ID número: ${id_objetoAVerificar} no existe`);
          }
        }
    };
    const validatorStatusActive = (objetoAVerificar, response, tipo) =>{
      if (objetoAVerificar.length > 0) {//objetoAVerificar = recibo un array, que puede ser de productos, usuarios, etc
        return true;
      } else {
        return sendErrorResponse(response, statusCodes.NOT_FOUND, `No se encontraron ${tipo} activos`);
      }
    }
    const validatorStatusInactive = (objetoAVerificar, response, tipo) =>{
      //objetoAVerificar = recibo un array, que puede ser de productos, usuarios, etc
      if (objetoAVerificar.length > 0) {
        return true;
      } else {
        return sendErrorResponse(response, statusCodes.NOT_FOUND, `No se encontraron ${tipo} inactivos`);
      }
    }
    const validatorUpdate = (response, true_ok, productId, tipo) => {
      //En tipo me traigo un varchar del tipo de validación, puede contener 'producto, 'usuario', etc, para realizar un msg dinámico.
      if (true_ok) {
        return sendErrorResponse(response, statusCodes.OK, `${tipo} actualizado`);
      }
      else if (isNaN(productId)) {
        return sendErrorResponse(response, statusCodes.BAD_REQUEST, 'Ingrese un valor númerico'); 
      }
      else if (productId <= 0){
        return sendErrorResponse(response, statusCodes.BAD_REQUEST, 'Ingrese un valor númerico mayor a 0'); 
      }
      else{ return sendErrorResponse(response, statusCodes.BAD_REQUEST, `${tipo} no encontrado, no se pudo actualizar.`); 
      }
    }
    const validatorId = (id_objetoAVerificar, response) => { //Solo recibo id, tengo que modificar para borrar el anterior.
        if (isNaN(id_objetoAVerificar)) {
            sendErrorResponse(response, statusCodes.BAD_REQUEST, `El ID debe ser numérico`);
          } else if (id_objetoAVerificar <= 0) {
            sendErrorResponse(response, statusCodes.BAD_REQUEST, `El ID número: ${id_objetoAVerificar} debe ser mayor a 0`);
          } else {
            sendErrorResponse(response, statusCodes.NOT_FOUND, `El ID número: ${id_objetoAVerificar} no existe`);
        }
        
    };

module.exports = {
    sendErrorResponse,
    validatorById,
    validatorByAll,
    validatorStatusActive,
    validatorStatusInactive,
    validatorUpdate,
    validatorId
};