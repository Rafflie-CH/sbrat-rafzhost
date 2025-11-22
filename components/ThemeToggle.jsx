"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState("system");

  const apply = (m) => {
    setMode(m);

    if (m === "light") {
      document.documentElement.classList.remove("dark");
    } else if (m === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    apply(mode);
  }, [mode]);

  return (
    <div className="flex gap-2">
      <button onClick={() => apply("light")} className="px-3 py-1 border rounded dark:border-neutral-700">
        Light
      </button>
      <button onClick={() => apply("dark")} className="px-3 py-1 border rounded dark:border-neutral-700">
        Dark
      </button>
      <button onClick={() => apply("system")} className="px-3 py-1 border rounded dark:border-neutral-700">
        Auto
      </button>
    </div>
  );
}