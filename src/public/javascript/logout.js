document.addEventListener("DOMContentLoaded", function () {
    // Función para realizar la desconexión
    async function logout() {
        try {
            // Realiza una solicitud fetch para destruir la sesión en el servidor
            const response = await fetch('/api/logout', {
                method: 'GET', // Cambia el método a GET
                credentials: 'include' // Incluye las credenciales para enviar las cookies
            });

            if (response.ok) {
                // Muestra un SweetAlert de éxito antes de redirigir
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario desconectado',
                    showConfirmButton: false,
                    timer: 2000,
                    width: '400px'
                }).then(() => {
                    // Redirige a la página de login (o la que desees) después de desconectar
                    window.location.href = "/api/login";
                });
            } else {
                console.error('Error al desconectar:', response.statusText);
            }
        } catch (error) {
            console.error('Error al desconectar:', error.message);
        }
    }

    // Agrega un event listener al botón de desconectar
    var logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
