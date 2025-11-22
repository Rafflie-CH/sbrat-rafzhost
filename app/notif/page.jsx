"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Notifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // redirect kalau belum login
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch("/api/notif/get", {
      cache: "no-store",
      headers: { authorization: token },
    })
      .then((r) => r.json())
      .then((d) => setList(d.notif || []))
      .catch((err) => console.error("ERR NOTIF:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Notifikasi</h1>

      {list.length === 0 && (
        <p className="opacity-70">Tidak ada notifikasi.</p>
      )}

      {list.map((n, i) => (
        <p
          key={i}
          className="border-b py-2 dark:border-neutral-700"
        >
          {n.text}
        </p>
      ))}
    </div>
  );
}
