"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";

export default function DM() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch("/api/dm/room", {
      cache: "no-store",
      headers: { authorization: token },
    })
      .then((r) => r.json())
      .then((d) => setRooms(d.rooms || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pesan</h1>

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
