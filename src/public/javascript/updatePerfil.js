// $(document).ready(function() {
//   const userId = user.id_usuario;

//   // Datos a actualizar
//   const updatedUserData = {
//     name: user.name,
//     surname: user.surname,
//     city: user.city,
//     telephone: user.telephone,
//     mail: user.mail,
//     password: user.password
//   };
//     console.log(updatedUserData);
//   // Realiza la solicitud de actualización
//   $.ajax({
//     url: `/api/updateUser/${userId}`,
//     type: 'PUT',
//     contentType: 'application/json',
//     data: JSON.stringify(updatedUserData),
//     success: function(response) {
//       console.log('Usuario actualizado exitosamente:', response);
//       // Puedes manejar la respuesta según tus necesidades
//     },
//     error: function(error) {
//       console.error('Error al actualizar el usuario:', error);
//       // Puedes manejar el error según tus necesidades
//     }
//   });
// });

// updatePerfil.js
$(document).ready(function() {
    // Agrega un evento de clic al botón de actualizar
    $('#actualizarBtn').on('click', function() {
        const userId = 4; // Asegúrate de obtener el ID correctamente

        // Datos a actualizar
        const updatedUserData = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim(),
            mail: $("#mail").val().trim(),
            name: $("#name").val().trim(),
            surname: $("#surname").val().trim(),
            city: $("#city").val().trim(),
            telephone: $("#telephone").val().trim()
        };

        // Realiza la solicitud de actualización
        $.ajax({
            url: `/api/updateUser/${userId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedUserData),
            success: function(response) {
                console.log('Usuario actualizado exitosamente:', response);
                // Puedes manejar la respuesta según tus necesidades
            },
            error: function(error) {
                console.error(updatedUserData, error);
                // Puedes manejar el error según tus necesidades
            }
        });
    });
});
