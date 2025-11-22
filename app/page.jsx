"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";
import StickerCard from "@/components/StickerCard";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      window.location.href = "/auth/login";
      return;
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    fetch("/api/fyp", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setStickers(d.stickers || []));
  }, [ready]);

  if (!ready) return <p className="p-6">Loading...</p>;

  return (
    <div className="w-full">
      {stickers.map((s) => (
        <a key={s.slug} href={`/s/${s.slug}`}>
          <StickerCard data={s} />
        </a>
      ))}
    </div>
  );
}
