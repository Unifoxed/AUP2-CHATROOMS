const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Laat de bestanden uit de map 'public' zien
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Iemand is verbonden...');

    // Gebruiker gaat een kamer in
    socket.on('join-room', (data) => {
        socket.join(data.room);
        console.log(`${data.username} zit nu in kamer: ${data.room}`);

        // Laat anderen in de kamer weten dat er iemand is
        socket.to(data.room).emit('chat-message', {
            username: 'SYSTEM',
            message: `${data.username} has joined the dark web.`
        });
    });

    // Bericht versturen naar specifieke kamer
    socket.on('send-message', (data) => {
        io.to(data.room).emit('chat-message', data);
    });
});

server.listen(3000, () => {
    console.log('Server draait op http://localhost:3000');
});