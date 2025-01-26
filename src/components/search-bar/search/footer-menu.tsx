"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinksProps } from "@/types";

export function FooterMenuItem({ link }: { link: navigationLinksProps }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === link.path);

  useEffect(() => {
    setActive(pathname === link.path);
  }, [pathname, link.path]);

  return (
    <li >
      <Link
        href={link.path}
        className={clsx(
          "block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm",
          {
            "text-black dark:text-white underline": active,
          },
        )}
      >
        {link.label}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: navigationLinksProps[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((linkpath: navigationLinksProps) => {
          return <FooterMenuItem key={linkpath.label} link={linkpath} />;
        })}
      </ul>
    </nav>
  );
}
