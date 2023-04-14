const http = require('http');
const io = require('socket.io');

const api = require('./api');
const sockets = require('./sockets');

const httpServer = http.createServer(api);
const socketServer = io(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

const PORT = 5555;

httpServer.listen(PORT);

console.log(`Listening on ${PORT}`);

sockets.socketListen(socketServer);
