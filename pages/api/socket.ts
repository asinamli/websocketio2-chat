import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

let io: Server;
let roomUsers: Record<string, string[]> = {};
let userSocketMap: Record<string, string> = {}; // socket.id -> username mapping

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!io) {
    console.log("Socket.IO server starting...");
    io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("admin-join", () => {
        console.log(`Admin bağlandı: ${socket.id}`);
        console.log("Admin'e gönderilen roomUsers:", roomUsers);
        socket.emit("all-room-users", roomUsers);
      });

      socket.on("join-room", (data: { room: string; username: string }) => {
        const { room, username } = data;
        
        userSocketMap[socket.id] = username;
        
        socket.join(room);
        
        if (!roomUsers[room]) {
          roomUsers[room] = [];
        }
        
        if (!roomUsers[room].includes(username)) {
          roomUsers[room].push(username);
        }
        
        socket.to(room).emit("user-joined", { username });
        
        io.to(room).emit("room-users", roomUsers[room]);
        
        console.log("Güncel roomUsers:", roomUsers);
        io.emit("all-room-users", roomUsers);
        
        console.log(`${username} joined room ${room}`);
      });

      socket.on("send-message", (data: { room: string; message: string; username: string }) => {
        const { room, message, username } = data;
        
        io.to(room).emit("receive-message", {
          message,
          username,
          timestamp: new Date().toISOString()
        });
        
        console.log(`Message in ${room} from ${username}: ${message}`);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        
        const username = userSocketMap[socket.id];
        if (username) {
          let userRoom = null;
          Object.keys(roomUsers).forEach(room => {
            if (roomUsers[room].includes(username)) {
              userRoom = room;
            }
          });
          
          Object.keys(roomUsers).forEach(room => {
            roomUsers[room] = roomUsers[room].filter(user => user !== username);
            if (roomUsers[room].length === 0) {
              delete roomUsers[room];
            }
          });
          
          if (userRoom && roomUsers[userRoom]) {
            io.to(userRoom).emit("room-users", roomUsers[userRoom]);
          }
          
          delete userSocketMap[socket.id];
        }
        
        console.log("Disconnect sonrası roomUsers:", roomUsers);
        io.emit("all-room-users", roomUsers);
      });
    });
  }

  res.end();
}