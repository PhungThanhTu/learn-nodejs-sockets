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

        if(readyPlayerCount === 2)
        {
            io.emit('startGame', socket.id)
        }

    })
});