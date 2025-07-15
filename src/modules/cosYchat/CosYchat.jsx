import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { io } from 'socket.io-client';
import socket from "./utils/connectIO";

import EmojiPicker from "emoji-picker-react";
import Blossoms from "../../components/Blossoms";
// import '../../styles/chat-styles.css';
import "./CosYchat.css";
// import './CosYchat-bg-test.css';

// const socket = io('http://localhost:3000');

function CosYchat() {
  const [messages, setMessages] = useState([]);
  // const [username, setUsername] = useState('');
  const [message, setMessage] = useState("");
  const [userColor, setUserColor] = useState("#c8b8e2");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userId, setUserId] = useState("");

  const messagesEndRef = useRef(null);
  const navigate =useNavigate()

  useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
  }, []);

  useEffect(() => {
    socket.on("initMessages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("initMessages");
      socket.off("chatMessage");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = {
        text: message,
        // username: username || "Anonym",
        userId: userId,
        timeFormatted: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        color: userColor,
      };
      socket.emit("chatMessage", msgData);
      setMessage("");
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="chat-background">
      <Blossoms />
      <div className="chat-container">
        <div className="chat-header">💬 Mein Chat</div>

        <div className="chat-messages">
          {messages.map((msg, i) => {
            // const isManne = msg.username === 'Manne';
            const isCurrentUser = msg.userId === userId;
            return (
              <div
                key={i}
                // className={`chat-message-wrapper ${isManne ? 'right' : 'left'}`}
                className={`chat-message-wrapper ${
                  isCurrentUser ? "right" : "left"
                }`}
              >
                <div
                  className="chat-message"
                  style={{
                    backgroundColor: msg.color || "#e0e0e0",
                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div>
                    {/* <strong>{msg.username}</strong>{" "} */}
                    <span style={{ fontSize: "0.8em", color: "gray" }}>
                      ({msg.timeFormatted})
                    </span>
                  </div>
                  <div className="chat-msg-text">{msg.text}</div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          {/*           <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
            required
          /> */}
          <input
            type="color"
            value={userColor}
            onChange={(e) => setUserColor(e.target.value)}
            title="Farbe für deine Sprechblase"
          />
          <input
          className="chat-input-text"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nachricht..."
            required
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            style={{
              fontSize: "15px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            😊
          </button>
          <button type="submit">Senden</button>
        </form>

        <div className="chat-buttons">
          <button
            className="chat-nav-button"
            onClick={() => navigate("/cosYspace")}
          >
            🌸 cosYspace
          </button>
          <button
            className="chat-nav-button"
            onClick={() => navigate("/cosYpost")}
          >
            <img
                src="/upload/upload-favicon-no-bg.png"
                alt="upload"
                style={{ width: 20, marginRight: ".6em" }}
              />
            {/* ➕ */} cosYpost
          </button>
        </div>

        {showEmojiPicker && (
  <div style={{ 
    position: 'absolute', 
    bottom: '130px', 
    right: '20px', 
    zIndex: 1000, 
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    width: '300px'
  }}>
    <button
      onClick={() => setShowEmojiPicker(false)}
      style={{
        background: 'transparent',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        marginRight: '10px',
      }}
    >
      <strong>X</strong>
    </button>
    
    <EmojiPicker 
      onEmojiClick={handleEmojiClick} 
      width="100%"
      height={350}
      searchDisabled={false}
    />
  </div>
)}
        
      </div> {/* // chat-container */}
    </div> /* chat-background */
  );
}

export default CosYchat;
