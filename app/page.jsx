"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";
import StickerCard from "@/components/StickerCard";

export default function Home() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    fetch(`/api/fyp`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setStickers(data.stickers || []);
      })
      .catch((err) => console.error("Fetch error:", err));
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
