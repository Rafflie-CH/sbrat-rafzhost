"use client";

export default function Navbar() {
  return (
    <div className="w-full p-4 flex items-center justify-between border-b dark:border-neutral-800 bg-white dark:bg-black">
      <a href="/" className="text-xl font-bold">SBRAT</a>

      <div className="flex gap-4 text-sm">
        <a href="/sticker" className="hover:opacity-70">Buat</a>
        <a href="/profile" className="hover:opacity-70">Profil</a>
        <a href="/notifications" className="hover:opacity-70">Notif</a>
        <a href="/dm" className="hover:opacity-70">DM</a>
      </div>
    </div>
  );
}