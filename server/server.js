const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Defined port for app to run on
app.set('port', 3000);

app.use(express.static(publicPath));

// Listening when new user connects
io.on('connection', (socket) => {
    console.log('User is online!');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to ChatMeOut!',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined!',
        createdAt: new Date().getTime()
    });

    // Listen for event from chat app
    socket.on('createMessage', (message) => {
        console.log('Create Message', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // Listening when user disconnects
    socket.on('disconnect', () => {
        console.log('User went offline.');
    })
});

// Listen the requests
server.listen(app.get('port'), () => {
   console.log('Server is up on', app.get('port'));
});