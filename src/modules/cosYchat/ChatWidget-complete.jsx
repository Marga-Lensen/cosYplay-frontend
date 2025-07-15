import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Verbindung zum Server herstellen
const socket = io('http://localhost:3000');

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // ✅ Verbindung erfolgreich
    socket.on('connect', () => {
      console.log('✅ Verbunden mit dem Chat-Server (Socket-ID):', socket.id);
    });

    // ❌ Verbindung verloren
    socket.on('disconnect', (reason) => {
      console.log('⚠️ Verbindung getrennt:', reason);
    });

    // ⚠️ Verbindungsfehler
    socket.on('connect_error', (error) => {
      console.error('❌ Verbindungsfehler:', error.message);
    });

    // Erste Nachrichten vom Server (z. B. nach Reload)
    socket.on('initMessages', (msgs) => {
      console.log('📥 Init-Nachrichten empfangen:', msgs);
      setMessages(msgs);
    });

    // Neue Nachricht vom Server
    socket.on('chatMessage', (msg) => {
      console.log('📥 Neue Nachricht empfangen:', msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup beim Unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('initMessages');
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const msgObj = { text: input };
      socket.emit('chatMessage', msgObj);
      console.log('📤 Nachricht gesendet:', msgObj);
      setInput('');
    }
  };

  return (
    <div className="chat-widget">
      <h2>cosYchat</h2>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i}>
            <span>{m.timeFormatted}</span>: {m.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nachricht schreiben..."
      />
      <button onClick={sendMessage}>Senden</button>
    </div>
  );
}
