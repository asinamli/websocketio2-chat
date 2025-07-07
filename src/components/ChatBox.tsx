"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface ChatBoxProps {
  room: string;
  name: string;
}

export default function ChatBox({ room, name }: ChatBoxProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io({
        path: "/api/socket",
      });
    }

 
    socketRef.current.emit("join-room", { room, name });

    return () => {
      
    };
  }, [room, name]);

 
  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    const handleReceive = (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleError = (msg: string) => {
      alert(msg);
    };

    socket.on("receive-message", handleReceive);
    socket.on("error", handleError);

    return () => {
      socket.off("receive-message", handleReceive);
      socket.off("error", handleError);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    socketRef.current?.emit("send-message", {
      room,
      message: input,
      name,
    });
    setInput("");
  };

  return (
    <div className="border rounded p-4 flex flex-col h-96 max-w-xl mx-auto">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="mesajınızı girin"
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
    </div>
  );
}
