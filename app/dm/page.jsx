"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";

export default function DM() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return (window.location.href = "/auth/login");

    setToken(t);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    fetch("/api/dm/room", {
      cache: "no-store",
      headers: { Authorization: token },
    })
      .then((r) => r.json())
      .then((d) => setRooms(d.rooms || []));
  }, [ready]);

  if (!ready) return <p className="p-6">Loading...</p>;

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
