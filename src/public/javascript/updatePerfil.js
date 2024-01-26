document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('actualizarBtn').addEventListener('click', async () => {
        const userId = document.getElementById('actualizarBtn').getAttribute('data-id');
        console.log(1);
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

        // Realiza la actualización del perfil sin validaciones
        $.ajax({
            url: `/api/updateUser/${1}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedUserData),
            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario Actualizado',
                    showConfirmButton: false,
                    timer: 2000,
                    width: '400px'
                });
            },
            error: function (error) {
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

  
  