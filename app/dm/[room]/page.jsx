"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";
import ChatBubble from "@/components/ChatBubble";

export default function Room({ params }) {
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState("");
  const [txt, setTxt] = useState("");

  const room = params.room;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setMe(token);

    fetch(`/api/dm/room?room=${room}`, {
      headers: { authorization: token }
    })
      .then(r => r.json())
      .then(d => setMessages(d.messages));
  }, []);

  const send = async () => {
    if (!txt.trim()) return;

    const token = localStorage.getItem("token");

    await fetch("/api/dm/send", {
      method: "POST",
      headers: { authorization: token },
      body: JSON.stringify({ text: txt, room }),
    });

    setTxt("");

    const res = await fetch(`/api/dm/room?room=${room}`, {
      headers: { authorization: token },
    });
    setMessages((await res.json()).messages);
  };

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
