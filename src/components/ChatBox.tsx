"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import RoomUsersModal from "./RoomUsersModal";
import RoomListModal from "./RoomListModal";

interface ChatBoxProps {
  room: string;
  name: string;
}

interface Message {
  message: string;
  username: string;
  timestamp: string;
}

export default function ChatBox({ room, name }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showRooms, setShowRooms] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io({ path: "/api/socket" });
    socketRef.current = socket;

    socket.emit("join-room", { room, username: name });

    socket.on("receive-message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("room-users", (users: string[]) => {
      setUsers(users);
    });

    socket.on("error", (msg: string) => {
      alert(msg);
    });

    setMessages([]);

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [room, name]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socketRef.current?.emit("send-message", {
      room,
      message: input,
      username: name,
    });

    setInput("");
  };

  return (
    <div className="border rounded p-4 flex flex-col h-[500px] max-w-xl mx-auto">
      <div className="flex justify-between mb-2">
        <button
          onClick={() => setShowUsers(true)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Odadaki Kullanıcılar
        </button>
        <button
          onClick={() => setShowRooms(true)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Odalar Arası Geçiş
        </button>
      </div>

      <div className="flex-grow overflow-y-auto mb-4 border p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1">
            <span className="font-bold">{msg.username}: </span>
            <span>{msg.message}</span>
            <small className="text-gray-500 ml-2">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Mesajınızı girin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="border rounded px-3 py-2 flex-grow"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Gönder
        </button>
      </div>

      <RoomUsersModal
        open={showUsers}
        onClose={() => setShowUsers(false)}
        users={users}
      />

      <RoomListModal
        open={showRooms}
        onClose={() => setShowRooms(false)}
        currentRoom={room}
        name={name}
      />
    </div>
  );
}