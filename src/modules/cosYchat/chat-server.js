import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Standarddaten beim erstellen
const adapter = new JSONFile('db.json');
const defaultData = { messages: [] };
const db = new Low(adapter, defaultData);

await db.read(); // Liest vorhandene Datei oder initialisiert mit defaultData

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('🔌 Client verbunden');

  // Beim Start: Alle Nachrichten senden
  socket.emit('initMessages', db.data.messages);

  socket.on('chatMessage', async (msg) => {
    const timeFormatted = new Date().toLocaleTimeString();
    const message = { ...msg, timeFormatted };

    db.data.messages.push(message);
    await db.write();

    io.emit('chatMessage', message);
  });
});

app.get("/", (req, res) => {
  res.send("🌸 Hello my friend! Let's chat 💬");
});

server.listen(3000, () => {
  console.log('🚀 Server läuft auf http://localhost:3000');
});
