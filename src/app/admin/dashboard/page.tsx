"use client";

import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

type RoomUsers = Record<string, string[]>;

export default function AdminPage() {
  const [roomUsers, setRoomUsers] = useState<RoomUsers>({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket: Socket = io({ path: "/api/socket" });

    socket.on("connect", () => {
      console.log("Admin socket connected");
      setIsConnected(true);
      console.log("Admin-join event gönderiliyor...");
      socket.emit("admin-join");
    });

    socket.on("disconnect", () => {
      console.log("Admin socket disconnected");
      setIsConnected(false);
    });

    socket.on("all-room-users", (data: RoomUsers) => {
      console.log("Admin paneline gelen data:", data);
      if (typeof data !== "object") {
        console.error("HATALI FORMAT:", data);
        return;
      }
      setRoomUsers(data);
    });

    socket.onAny((event, ...args) => {
      console.log(`Socket event alındı: ${event}`, args);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const refreshData = () => {
    console.log("Manuel refresh tetikleniyor...");
    const socket: Socket = io({ path: "/api/socket" });
    socket.emit("admin-join");
  };

  const totalUsers = Object.values(roomUsers).reduce((sum, users) => sum + users.length, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Paneli
            </h1>
            <p className="text-gray-600">
              Aktif odalar ve kullanıcıları yönetin
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-sm font-medium ${
                isConnected ? 'text-green-600' : 'text-red-600'
              }`}>
                {isConnected ? 'Bağlı' : 'Bağlantı Yok'}
              </span>
            </div>
            
            <button
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Yenile
            </button>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Toplam Oda</p>
              <p className="text-2xl font-bold text-gray-800">{Object.keys(roomUsers).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
              <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Durum</p>
              <p className="text-2xl font-bold text-gray-800">
                {isConnected ? 'Aktif' : 'Pasif'}
              </p>
            </div>
          </div>
        </div>
      </div>

      
      {Object.keys(roomUsers).length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Henüz Aktif Oda Yok</h3>
          <p className="text-gray-500">Kullanıcılar odalar oluşturduğunda burada görünecekler.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(roomUsers).map(([room, users]) => (
            <div key={room} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {room}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Aktif</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {users.length} Kullanıcı
                  </span>
                </div>
                
                {users.length === 0 ? (
                  <p className="text-gray-500 text-sm">Bu odada henüz kullanıcı yok</p>
                ) : (
                  <div className="space-y-2">
                    {users.map((user, index) => (
                      <div key={`${user}-${index}`} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{user}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}