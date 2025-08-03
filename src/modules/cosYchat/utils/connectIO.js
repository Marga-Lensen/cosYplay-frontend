// src/modules/cosYchat/utils/connectIO.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.PROD
      ? "https://cosyplay-backend.onrender.com"
      : "http://localhost:3000",
      { autoConnect: false }
    );

    socket.on("connect", () => {
      console.log("✅ Verbunden mit dem Chat-Server (Socket-ID):", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ Verbindung getrennt:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Verbindungsfehler:", error.message);
    });
  }
  return socket;
};
