import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-drab-eight-38.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

/* Socket IO */
let onlineUsers = [];
io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    if (!userId) return;
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.userId === message.receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

// Use libs
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
