var socket = io();

socket.on('connect', () => {
   console.log('Connected to the chat server');
});

socket.on('disconnect', () => {
   console.log('Disconnected from the chat server.')
});

// Listen for event from chat server
socket.on('newMessage', (message) => {
    console.log('New Message', message)
});