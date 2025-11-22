"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";

export default function Profile() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const [me, setMe] = useState(null);
  const [stickers, setStickers] = useState([]);

  // CEK TOKEN
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return (window.location.href = "/auth/login");

    setToken(t);
    setReady(true);
  }, []);

  // FETCH PROFIL
  useEffect(() => {
    if (!ready) return;

    fetch("/api/user/me", {
      cache: "no-store",
      headers: { Authorization: token },
    })
      .then((r) => r.json())
      .then((d) => {
        setMe(d.user || null);
        setStickers(d.stickers || []);
      });
  }, [ready]);

  if (!ready || !me) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {me.username} {me.verified && "✔"}
      </h1>
      <p className="opacity-70">{me.followers} pengikut</p>

      <h2 className="font-bold mt-5 mb-2">Stiker Publik</h2>

      <div className="grid grid-cols-2 gap-3">
        {stickers.map((s) => (
          <div
            key={s.slug}
            className="border p-2 rounded dark:border-neutral-700"
          >
            <img src={s.url} />
            <a
              href={`/s/${s.slug}`}
              className="block text-center mt-1 underline"
            >
              Detail
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
