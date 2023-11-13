const socket = io(); // instancio el socket
socket.emit('message', 'Probando emit desde sockets');

socket.on('evento_individual', data => {
    console.log(data);
});

socket.on('mensaje_para_todos_menos_para_mi', data => {
    console.data(data);
})

socket.on('msj_para_todos', data => {
    console.log(data);
})