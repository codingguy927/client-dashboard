"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setEnabled(isDark);
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setEnabled(!enabled);
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
    >
      {enabled ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
