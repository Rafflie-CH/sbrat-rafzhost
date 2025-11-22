"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";

export default function Notifications() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return (window.location.href = "/auth/login");

    setToken(t);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    fetch("/api/notif/get", {
      cache: "no-store",
      headers: { Authorization: token },
    })
      .then((r) => r.json())
      .then((d) => setList(d.notif || []));
  }, [ready]);

  if (!ready) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Notifikasi</h1>

      {list.length === 0 && <p>Tidak ada notifikasi.</p>}

      {list.map((n, i) => (
        <p key={i} className="border-b py-2 dark:border-neutral-700">
          {n.text}
        </p>
      ))}
    </div>
  );
}
