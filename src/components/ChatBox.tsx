"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import RoomUsersModal from "./RoomUsersModal";
import RoomListModal from "./RoomListModal";
import { convertEmojis, getAvailableEmojis } from "../utils/emojiUtils";

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
  const [showEmojiHelp, setShowEmojiHelp] = useState(false);

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

    socket.on("user-joined", (data: { username: string }) => {
      console.log(`${data.username} odaya katıldı`);
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

    const messageWithEmojis = convertEmojis(input);

    socketRef.current?.emit("send-message", {
      room,
      message: messageWithEmojis,
      username: name,
    });

    setInput("");
  };

  const addEmoji = (emojiCode: string) => {
    setInput(prev => prev + emojiCode + " ");
  };

  return (
    <div className="border rounded p-4 flex flex-col h-[600px] max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setShowUsers(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          👥 Odadaki Kullanıcılar ({users.length})
        </button>
        <button
          onClick={() => setShowRooms(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          🏠 Odalar Arası Geçiş
        </button>
      </div>

      {showEmojiHelp && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-4 border border-purple-200">
          <p className="text-sm text-gray-700 mb-2 font-medium">🎉 Hızlı emoji ekleme:</p>
          <div className="flex flex-wrap gap-2">
            {[':smile:', ':laugh:', ':heart:', ':thumbs_up:', ':fire:', ':rocket:', ':star:', ':clap:', ':wave:', ':ok:'].map((code) => (
              <button
                key={code}
                onClick={() => addEmoji(code)}
                className="bg-white px-3 py-2 rounded-lg text-lg hover:bg-purple-50 hover:scale-110 transition-all border border-gray-200 shadow-sm"
                title={`${code} ekle`}
              >
                {convertEmojis(code)}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            💡 İpucu: Mesajınızda :smile: :heart: :fire: gibi kodları da kullanabilirsiniz
          </p>
        </div>
      )}

      {/* Chat Mesajları Alanı */}
      <div className="flex-grow overflow-y-auto mb-4 border-2 p-4 rounded-lg bg-black-50 border-gray-200">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-gray-500">Henüz mesaj yok... İlk mesajı sen gönder!</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="mb-3 p-3 bg-black rounded-lg shadow-sm border border-gray-100">
              <span className="font-bold text-blue-600">{msg.username}: </span>
              <span className="text-white-800">{msg.message}</span>
              <small className="text-gray-300 ml-2 block mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
          ))
        )}
      </div>

      {/* Input Alanı */}
      <div className="space-y-2">
        <div className="flex gap-2">
          {/* Emoji Butonu - Input'un solunda */}
          <button
            onClick={() => setShowEmojiHelp(!showEmojiHelp)}
            className={`px-4 py-2 rounded-lg text-lg transition-all ${
              showEmojiHelp 
                ? 'bg-purple-500 text-white shadow-lg scale-105' 
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            }`}
            title="Emoji panelini aç/kapat"
          >
            😊
          </button>

          {/* Mesaj Input'u */}
          <input
            type="text"
            placeholder="Mesajınızı girin... (emoji için sol butona tıklayın)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="border-2 rounded-lg px-4 py-2 flex-grow focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />

          {/* Gönder Butonu */}
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md"
          >
            📤 Gönder
          </button>
        </div>

        {/* Hızlı Emoji İpucu */}
        <p className="text-xs text-gray-500 text-center">
          💡 Klavye kısayolu: Enter tuşu ile mesaj gönder
        </p>
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