"use client";

import { useEffect, useState } from "react";
import StickerCard from "@/components/StickerCard";

export default function Home() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch("/api/fyp", { cache: "no-store" })
      .then(r => r.json())
      .then(data => setStickers(data.stickers || []));
  }, []);

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
