const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = 5555;

server.listen(PORT);

console.log(`Listening on ${PORT}`);

io.on('connection', (socket) => {
    console.log(`A user connected`);
});