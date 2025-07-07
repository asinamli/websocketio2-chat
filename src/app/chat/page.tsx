"use client";
import { useSearchParams } from "next/navigation";
import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room") || "";
  const name = searchParams.get("name") || "anonim";

  if(!room || !name) {
    return (
      <div className="max-w-md mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">Lütfen odaya katılın</h1>
      </div>
    );
  }

  return(
    <div >
  <h2 className="text-center text-2xl font-bold mt-6 mb-4">
    {room} odası - hoşgeldin {name}
  </h2>
  <ChatBox room={room} name={name}  />
    </div>
  );
}