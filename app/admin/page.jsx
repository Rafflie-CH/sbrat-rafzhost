"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/admin/check", { headers: { authorization: token } })
      .then(r => r.json())
      .then(d => {
        if (!d.ok) window.location.href = "/";
      });

    fetch("/api/admin/users")
      .then(r => r.json())
      .then(d => setUsers(d.users));

    fetch("/api/admin/stickers")
      .then(r => r.json())
      .then(d => setStickers(d.stickers));
  }, []);

  const verify = async (id) => {
    await fetch("/api/admin/verify", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    location.reload();
  };

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