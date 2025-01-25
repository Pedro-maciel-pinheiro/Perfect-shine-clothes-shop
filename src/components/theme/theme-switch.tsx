"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Loader,  Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border transition-all hover:border-gray-400">
        <Loader className="animate-spin duration-1000 transition-all" />
      </span>
    );

  if (resolvedTheme === "dark") {
    return (
      <div
        onClick={() => setTheme("light")}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border transition-all hover:border-gray-400"
      >
        <Moon size={20} className="transition-all hover:scale-110" />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div
        onClick={() => setTheme("dark")}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border transition-all hover:border-gray-400"
      >
        <Sun size={20} className="transition-all hover:scale-110" />
      </div>
    );
  }
}
