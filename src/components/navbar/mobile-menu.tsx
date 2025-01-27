"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Search, { SearchSkeleton } from "./search";

import { Menu as Menubar } from "lucide-react";
import { navigationLinksProps, MenuProps } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function MobileMenu({ menu }: MenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-500 transition-colors lg:hidden">
          <Menubar className="h-8" />
        </SheetTrigger>

        <SheetContent side={"left"}>
          <SheetHeader className="flex flex-col gap-2">
            <SheetTitle>MENU</SheetTitle>

            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </SheetHeader>
          {menu.length ? (
            <ul className="flex w-full flex-col">
              {menu.map((item: navigationLinksProps) => (
                <li
                  className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                  key={item.label}
                >
                  <Link
                    href={item.path}
                    prefetch={true}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
