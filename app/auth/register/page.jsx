"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const register = async () => {
    setErr("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });

    const data = await res.json();

    if (!data.token) {
      setErr(data.error || "Register gagal");
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "/";
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar</h1>

      {err && <p className="text-red-500 mb-2">{err}</p>}

      <input
        className="border p-2 w-full mb-2"
        placeholder="Username"
        value={u}
        onChange={(e) => setU(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Password"
        value={p}
        onChange={(e) => setP(e.target.value)}
      />

      <button
        className="bg-black w-full text-white p-2 rounded"
        onClick={register}
      >
        Daftar
      </button>

      <p className="mt-4">
        Sudah punya akun?{" "}
        <a href="/auth/login" className="underline">
          Login
        </a>
      </p>
    </div>
  );
}
