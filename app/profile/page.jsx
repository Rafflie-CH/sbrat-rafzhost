"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";

export default function Profile() {
  const [me, setMe] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch("/api/user/me", {
      cache: "no-store",
      headers: { authorization: token },
    })
      .then((r) => r.json())
      .then((d) => {
        setMe(d.user || null);
        setStickers(d.stickers || []);
      })
      .catch((err) => console.error("PROFILE ERR:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!me) return <p className="p-6">Gagal memuat profil.</p>;

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
