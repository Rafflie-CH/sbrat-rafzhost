"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useState } from "react";

export default function StickerMaker() {
  const [t, setT] = useState("");
  const [genList, setGenList] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!t.trim()) return;

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        text: t,
        background: "#ffffff",
        color: "#000000",
        emojiStyle: "apple",
      }),
    });

    const data = await res.json();
    const url = data.url;
    setGenList((prev) => [...prev, url]);

    const token = localStorage.getItem("token");

    await fetch("/api/stickers/draft", {
      method: "POST",
      headers: { Authorization: token },
      body: JSON.stringify({ url }),
    });

    setT("");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-3">Buat Stiker BRAT</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Masukkan teks..."
        value={t}
        onChange={(e) => setT(e.target.value)}
      />

      <button
        className="bg-black text-white w-full p-2 rounded"
        onClick={generate}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {genList.map((u, i) => (
          <div key={i} className="border p-2 rounded">
            <img src={u} />
          </div>
        ))}
      </div>
    </div>
  );
}
