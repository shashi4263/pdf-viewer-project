const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://pdf-viewer-project.vercel.app/",
    methods: ["GET", "POST"],
  },
});

const roomPageMap = {}; // Keeps track of the page in each room

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);

    const currentPage = roomPageMap[roomId] || 1;
    socket.emit("sync-page", currentPage);
  });

  socket.on("change-page", ({ roomId, page }) => {
    roomPageMap[roomId] = page;
    io.to(roomId).emit("sync-page", page);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
