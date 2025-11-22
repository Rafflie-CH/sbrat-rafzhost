"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";
import ChatBubble from "@/components/ChatBubble";

export default function Room({ params }) {
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState(null);
  const [txt, setTxt] = useState("");
  const [loading, setLoading] = useState(true);

  const room = params.room;

  // fungsi ambil pesan
  const loadMessages = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    try {
      const res = await fetch(`/api/dm/room?room=${room}`, {
        cache: "no-store",
        headers: {
          authorization: token,
        },
      });

      const data = await res.json();
      setMessages(data.messages || []);
      setMe(data.me || null);
    } catch (err) {
      console.error("ERR LOAD MSG:", err);
    }
  };

  // load pertama + auto refresh
  useEffect(() => {
    loadMessages().finally(() => setLoading(false));

    const interval = setInterval(() => {
      loadMessages();
    }, 3000); // refresh setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  // fungsi kirim pesan
  const send = async () => {
    if (!txt.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    await fetch("/api/dm/send", {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: txt, room }),
    });

    setTxt("");
    await loadMessages();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="h-[70vh] overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <ChatBubble key={i} me={me} msg={m} />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 w-full rounded"
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          placeholder="Ketik pesan…"
        />
        <button onClick={send} className="px-4 bg-blue-600 text-white rounded">
          Kirim
        </button>
      </div>
    </div>
  );
}
