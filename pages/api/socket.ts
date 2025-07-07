import { Server as IOServer } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';


const ROOMS = ["genel", "yazılım", "donanım"];


const roomUsers: Record<string, string[]> = {
  genel: [],
  yazılım: [],
  donanım: [],
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    console.log(" socket.io server başlatılıyor...");

    const io = new IOServer(res.socket.server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log(`Yeni kullanıcı bağlandı: ${socket.id}`);

      socket.on("join-room", ({ room, name }) => {
        if (!ROOMS.includes(room)) {
          socket.emit("error", " Böyle bir oda yok!");
          return;
        }

        socket.join(room);
        socket.data.username = name;

        if (!roomUsers[room].includes(name)) {
          roomUsers[room].push(name);
        }


        socket.to(room).emit("receive-message", `${name} odaya katıldı.`);

        io.in(room).emit("room-users", roomUsers[room]);

      });

      socket.on("send-message", ({ room, message, name }) => {
        const fullMessage = `${name}: ${message}`;
        io.in(room).emit("receive-message", fullMessage);
      });

      socket.on("disconnecting", () => {
        const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);

        rooms.forEach((room) => {
          const username = socket.data.username;

          roomUsers[room] = roomUsers[room].filter((u) => u !== username);

          io.in(room).emit("room-users", roomUsers[room]);

          io.in(room).emit("receive-message", `${username} odadan ayrıldı.`);
        });
      });

      socket.on("disconnect", () => {
        console.log(` Kullanıcı ayrıldı: ${socket.id}`);
      });
    });
  } else {
    console.log("socket.io zaten çalışıyor");
  }

  res.end();
}
