import { useEffect, useState } from 'react';
import socket from './utils/connectIO';

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('initMessages', (msgs) => setMessages(msgs));
    socket.on('chatMessage', (msg) => setMessages((prev) => [...prev, msg]));

    return () => {
      socket.off('initMessages');
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chatMessage', { text: input });
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
