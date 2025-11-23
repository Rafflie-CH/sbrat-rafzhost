"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // CEK DARI CLIENT DULU
    if (!token || role !== "admin") {
      window.location.href = "/";
      return;
    }

    // CEK SERVER (API)
    fetch("/api/admin/check", {
      headers: { Authorization: token },
      cache: "no-store",
    })
      .then(r => r.json())
      .then(d => {
        if (!d.ok) {
          window.location.href = "/";
          return;
        }

        // load user
        fetch("/api/admin/users")
          .then(r => r.json())
          .then(d => setUsers(d.users || []));

        // load sticker
        fetch("/api/admin/stickers")
          .then(r => r.json())
          .then(d => setStickers(d.stickers || []));

        setLoaded(true);
      });
  }, []);

  if (!loaded) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <h2 className="text-xl font-bold mb-2">Verifikasi User</h2>
      {users.map((u) => (
        <div key={u.id} className="flex items-center justify-between py-2 border-b dark:border-neutral-700">
          <p>@{u.username} {u.verified && "✔"}</p>
          {!u.verified && (
            <button onClick={() => verify(u.id)} className="bg-blue-600 text-white px-3 py-1 rounded">
              Verifikasi
            </button>
          )}
        </div>
      ))}

      <h2 className="font-bold text-xl mt-6 mb-2">Semua Stiker</h2>
      <div className="grid grid-cols-2 gap-4">
        {stickers.map((s) => (
          <div key={s.slug} className="border p-2 rounded">
            <img src={s.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
