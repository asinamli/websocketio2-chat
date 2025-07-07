"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

const ROOMS = ["genel", "yazılım", "donanım"];


export default function JoinPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [room , setRoom] = useState(ROOMS[0]);

  const handleJoin = ()=>{
    if(!name.trim()){
      alert("Lütfen bir isim girin.");
      return;
    }
    router.push(`/chat?name=${encodeURIComponent(name)}&room=${encodeURIComponent(room)}`);
  };

  return(
    <div className="max-w-md mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">ODAYA KATIL</h1>
  <input type="text" placeholder="isminiz" value={name} onChange={(e)=>setName(e.target.value)} className="border p-2 rounded w-full mb-4" />

  <label htmlFor="room-select" className="block mb-2">Oda seçin:</label>
  <select id="room-select" value={room} onChange={(e)=>setRoom(e.target.value)} className="border p-2 rounded w-full mb-4">
    {ROOMS.map((r)=>(
      <option key={r} value={r}>
        {r}
      </option>
    ))}
  </select>

  <button onClick={handleJoin} className="bg-blue-500 text-white py-2 px-4 rounded w-full">Katıl</button>
    </div>
  );}