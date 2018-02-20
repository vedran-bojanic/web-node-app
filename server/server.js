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

io.on('connection', (socket) => {
   console.log('New user connected!');

   socket.on('disconnect', () => {
      console.log('User disconnected from server.')
   });
});

// Listen the requests
server.listen(app.get('port'), () => {
   console.log('Server is up on', app.get('port'));
});