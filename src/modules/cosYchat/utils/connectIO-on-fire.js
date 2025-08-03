// src/modules/cosYchat/utils/connectIO.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Verbindungs-Logs zentral
socket.on('connect', () => {
  console.log('✅ Verbunden mit dem Chat-Server (Socket-ID):', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('⚠️ Verbindung getrennt:', reason);
});

socket.on('connect_error', (error) => {
  console.error('❌ Verbindungsfehler:', error.message);
});

export default socket;
