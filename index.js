// Configs
require("dotenv").config();
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 9000;

// Server Imports
const express = require("express");
const path = require("path");
const http = require("http");
const { Server: SocketServer } = require("socket.io");

// Servers
const app = express();
app.use(express.static(path.join(__dirname, "public")))
const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: corsOptions } });

// Routes
const tweetsNamespace = io.of("/tweets");

// Utils
const { getFormattedDate } = require("./utils/date");

tweetsNamespace.on("connection", (socket) => {
  const now = getFormattedDate();
  console.log(`[${now}] ✅ Client connected: ${socket.id}`);

  // Client JOINS a Room on "joinRoom" event and Server LISTENS on "joinRoom" event
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`[${now}] ✅ Client ${socket.id} joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    const now = getFormattedDate();
    console.log(`[${now}] ❌ Client disconnected: ${socket.id}`);
  });

  // Client SENDS/EMITS on "clientMessage" event and Server LISTENS on "clientMessage" event
  socket.on("clientMessage", ({ room, message }) => {
    const now = getFormattedDate();

    if (typeof message !== "string" || message.trim() === "") {
      console.warn(`[${now}] ⚠️ Invalid message received`);
      return;
    }

    console.log(`[${now}] 📝 New message in room ${room}: ${message}`);

    // Server SENDS/EMITS on "serverMessage" event and Client LISTENS on "serverMessage" event (on a specific room received on payload from client)
    tweetsNamespace.to(room).emit("serverMessage", {
      message: message,
      timestamp: now,
    });
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
