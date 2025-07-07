"use client";
import { useRouter } from "next/navigation";

const ROOMS = ["genel", "yazılım", "donanım"];

export default function RoomListModal({
  open,
  onClose,
  currentRoom,
  name,
}: {
  open: boolean;
  onClose: () => void;
  currentRoom: string;
  name: string;
}) {
  const router = useRouter();

  const switchRoom = (room: string) => {
    if (room === currentRoom) {
      alert("Zaten bu odadasın!");
      return;
    }
    onClose(); 
    router.push(`/chat?room=${room}&name=${name}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-4 w-80">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Odalar</h2>
        <ul className="mb-4 text-gray-900">
          {ROOMS.map((room) => (
            <li
              key={room}
              className="cursor-pointer hover:underline"
              onClick={() => switchRoom(room)}
            >
              {room}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-1 rounded"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
