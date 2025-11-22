"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function DM() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Kalau belum login → arahkan ke login
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch("/api/dm/room", {
      cache: "no-store",
      headers: { authorization: token },
    })
      .then((r) => r.json())
      .then((d) => setRooms(d.rooms || []))
      .catch((err) => console.error("ERR DM:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pesan</h1>

      {rooms.length === 0 && (
        <p className="opacity-70">Belum ada percakapan.</p>
      )}

      {rooms.map((room) => (
        <a
          key={room.id}
          href={`/dm/${room.id}`}
          className="block border-b py-2 dark:border-neutral-700"
        >
          Chat dengan @{room.otherUser}
        </a>
      ))}
    </div>
  );
}
