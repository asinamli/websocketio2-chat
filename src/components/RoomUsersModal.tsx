"use client";

export default function RoomUsersModal({
  open,
  onClose,
  users,
}: {
  open: boolean;
  onClose: () => void;
  users: string[];
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-4 w-80">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Odadaki Kullanıcılar</h2>
        {users.length === 0 ? (
          <p className="text-gray-900">Henüz kimse yok.</p>
        ) : (
          <ul className="mb-4 text-gray-900">
            {users.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        )}
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
