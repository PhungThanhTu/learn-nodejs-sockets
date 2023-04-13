const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
const PORT = 5555;

server.listen(PORT);

console.log(`Listening on ${PORT}`);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
    console.log(`A user connected as ${socket.id}`);

    socket.on('ready', () => {
        console.log(`player ready ${socket.id}`);

        readyPlayerCount++;

        if(readyPlayerCount % 2 === 0)
        {
            io.emit('startGame', socket.id)
        }

    });

    socket.on('paddleMove', (paddleData) => {
      socket.broadcast.emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
      socket.broadcast.emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
      console.log(`client  ${socket.id} disconnected ${reason}`);
    });
});

