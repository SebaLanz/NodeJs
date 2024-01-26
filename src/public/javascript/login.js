
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Verifica que los campos no estén vacíos
        if (!email || !password) {
            // Muestra una alerta indicando que los campos son obligatorios
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ambos campos son obligatorios. Por favor, complete todos los campos.',
                width: '400px'
            });
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Incluye las cookies en la solicitud
            });

            if (response.status === 200) {
                // Si la respuesta es OK (200), redirige a la página principal
                window.location.href = '/';
            } else if (response.status === 401) {
                // Email o contraseña incorrectos
                const responseData = await response.json();
                $('#errorModal').modal('show');
                document.getElementById('errorMessage').innerText = responseData.error;
            } else {
                // Otro error (500, etc.)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error interno del servidor',
                    width: '400px'
                });
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    });
});
