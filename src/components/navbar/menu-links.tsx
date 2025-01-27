"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MenuProps } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const MenuLinks = ({ menu, className }: MenuProps) => {
  const pathname = usePathname();
  return (
    <ul className={`flex items-center gap-2 text-lg text-black/80 dark:text-gray-300 ${className}`}>
      {menu.map((link) => (
        <li
          className={cn(
            "flex flex-col text-sm font-semibold hover:underline",
            pathname === link.path ? "text-black dark:text-white" : "",
          )}
          key={link.label}
        >
          <Link href={link.path}>
            {link.label}
          </Link>
          <span className="h-1 w-fit bg-red-500" />
        </li>
      ))}
    </ul>
  );
};
