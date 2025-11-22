"use client";

import { useState } from "react";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const login = async () => {
    setErr("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: u, password: p }),
    });

    const data = await res.json();

    if (!data.token) {
      setErr(data.error || "Gagal login");
      return;
    }

    // Simpan token
    localStorage.setItem("token", data.token);

    // REDIRECT PENTING!!!
    window.location.href = "/profile";
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-3">Login</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Username"
        value={u}
        onChange={(e) => setU(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Password"
        type="password"
        value={p}
        onChange={(e) => setP(e.target.value)}
      />

      {err && <p className="text-red-500 mb-2">{err}</p>}

      <button className="bg-black text-white w-full p-2 rounded" onClick={login}>
        Login
      </button>

      <p className="mt-3">
        Belum punya akun?{" "}
        <a href="/auth/register" className="underline">
          Daftar
        </a>
      </p>
    </div>
  );
}
