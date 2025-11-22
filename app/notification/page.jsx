"use client";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/notif/get", { headers: { authorization: token } })
      .then(r => r.json())
      .then(d => setList(d.notif));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Notifikasi</h1>

      {list.map((n, i) => (
        <p key={i} className="border-b py-2 dark:border-neutral-700">{n.text}</p>
      ))}
    </div>
  );
}