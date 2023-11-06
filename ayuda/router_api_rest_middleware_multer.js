//Router ---------------------------------------------------------------------------------------------------------------
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});

//API ---------------------------------------------------------------------------------------------------------------
app.get('/api/usuarios', (req, res) => {
  const usuarios = ['Usuario 1', 'Usuario 2', 'Usuario 3'];
  res.json(usuarios);
});

app.listen(3000, () => {
  console.log('API en ejecución en el puerto 3000');
});

//REST ---------------------------------------------------------------------------------------------------------------
app.get('/api/usuarios', (req, res) => {
  // Obtener lista de usuarios
});

app.post('/api/usuarios', (req, res) => {
  // Crear un nuevo usuario
});

app.put('/api/usuarios/:id', (req, res) => {
  // Actualizar un usuario por su ID
});

app.delete('/api/usuarios/:id', (req, res) => {
  // Eliminar un usuario por su ID
});

app.listen(3000, () => {
  console.log('API RESTful en ejecución en el puerto 3000');
});

//MIDDLEWARE ---------------------------------------------------------------------------------------------------------------
// Middleware para registrar las solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida en: ${new Date()}`);
  next();
});

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});

//MULTER ---------------------------------------------------------------------------------------------------------------
// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio de destino para los archivos cargados
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  },
});

const upload = multer({ storage: storage });

// Ruta para cargar un archivo
app.post('/subir', upload.single('archivo'), (req, res) => {
  res.send('Archivo cargado exitosamente');
});

app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
