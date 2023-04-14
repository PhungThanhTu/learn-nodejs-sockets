let readyPlayerCount = 0;

function socketListen (io) {

    const pongNamespace = io.of('/pong');

    pongNamespace.on('connection', (socket) => {
        let room;

        console.log(`A user connected as ${socket.id}`);

        room = `room${Math.floor(readyPlayerCount / 2)}`

        socket.join(room);

        socket.on('ready', () => {
            console.log(`player ready ${socket.id}`);

            readyPlayerCount++;

            if(readyPlayerCount % 2 === 0)
            {
                pongNamespace.in(room).emit('startGame', socket.id)
            }
        });

        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        });

        socket.on('disconnect', (reason) => {
            socket.to(room).emit('disconnected');
            console.log(`client  ${socket.id} disconnected ${reason}`);
            socket.leave(room);
        });
    });
}

module.exports = {
    socketListen
}