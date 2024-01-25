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

$(document).ready(function() {
    // Agrega un evento de clic al botón de actualizar
    $('#actualizarBtn').on('click', function() {
        const userId = $(this).data('id');

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
                // Utiliza SweetAlert2 en lugar de console.log
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario Actualizado',
                    showConfirmButton: false,
                    timer: 2000,
                    width: '400px'
                });
                // Puedes manejar la respuesta según tus necesidades
            },
            error: function(error) {
                // Utiliza SweetAlert2 en lugar de console.error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.responseText}`,
                    width: '400px'
                });
                // Puedes manejar el error según tus necesidades
            }
        });
    });
});
