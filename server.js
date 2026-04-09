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

// Render geeft een poort via process.env.PORT, anders gebruiken we 3000
const PORT = process.env.PORT || 3000;

// '0.0.0.0' is cruciaal voor Render om de server bereikbaar te maken voor de buitenwereld
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server draait op poort ${PORT}`);
});