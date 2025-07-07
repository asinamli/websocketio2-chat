import {Server as IOServer} from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

const ROOMS = ["genel", "yazılım", "donanım"];

export const config = {
  api:{
    bodyParser: false, 
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(!res.socket.server.io){
    console.log("socket.io server başlatılıyor...");
  
  const io= new IOServer(res.socket.server, {
    path: '/api/socket',
   });

   res.socket.server.io =io;

io.on("connection", (socket) => {
      console.log("Yeni kullanıcı bağlandı:", socket.id);

   socket.on("join-room", ({ room, name }) => {
        if (!ROOMS.includes(room)) {
          socket.emit("error", "Böyle bir oda yok!");
          return;
        }

     socket.join(room);
        socket.data.username = name;
        console.log(`${name} "${room}" odasına katıldı.`);

        socket.to(room).emit("receive-message",`${name} odaya katıldı.`);
      });

      
      socket.on("send-message", ({ room, message, name }) => {
    const fullMessage = `${name}: ${message}`;
    io.to(room).emit("receive-message", fullMessage);
  });


      socket.on("disconnecting", () => {
        const rooms = Array.from(socket.rooms).filter((r)=>r !== socket.id);
        rooms.forEach((room) =>{
          io.to(room).emit("receive-message", `${socket.data.username || "anonim"} odayı terk etti.`);
        });
      });

       socket.on("disconnect", () => {
        console.log("Kullanıcı ayrıldı:", socket.id);
      });
    });
  } else{
    console.log("Socket.io zaten çalışıyor");
  }
    res.end();
}