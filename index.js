// Configs
require("dotenv").config();
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 9000;

// Server Initialization
const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");

// Servers
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: corsOptions } });

// Routes
const tweetsNamespace = io.of("/tweets");

// Utils
const { getFormattedDate } = require("./utils/date");

tweetsNamespace.on("connection", (socket) => {
  const now = getFormattedDate();
  console.log(`[${now}] ✅ Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    const now = getFormattedDate();
    console.log(`[${now}] ❌ Client disconnected: ${socket.id}`);
  });

  // Client SENDS/EMITS on "clientMessage" event and Server LISTENS on "clientMessage" event
  socket.on("clientMessage", (message) => {
    const now = getFormattedDate();

    if (typeof message !== "string" || message.trim() === "") {
      console.warn(`[${now}] ⚠️ Invalid tweet received`);
      return;
    }

    console.log(`[${now}] 📝 New tweet: ${message}`);

    // Server SENDS/EMITS on "serverMessage" event and Client LISTENS on "serverMessage" event
    tweetsNamespace.emit("serverMessage", {
      tweet: message,
      timestamp: now,
    });
  });

  socket.on("typing", (username) => {
    tweetsNamespace.emit("userTyping", `${username} is typing...`);
  });
});

server.listen(PORT, () => {
  const now = getFormattedDate();
  console.log(`🚀 Server running on port ${PORT} [${now}]`);
});

server.on("error", (error) => {
  const now = getFormattedDate();
  console.error(`[${now}] ❌ Server error:`, error);
});
