import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import CartModal from "../cart/modal";
import ThemeSwitch from "../theme/theme-switch";
import { navigationLinks } from "@/constant";
import LogoSquare from "../logo-square";
import { MenuLinks } from "./menu-links";

// const { SITE_NAME } = process.env;

export function Navbar() {
  const menu = navigationLinks;

  return (
    <nav className="relative flex items-center p-3">
      <div className="block flex-none lg:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex items-center ">
        <div className="flex w-full gap-3">
          <Link
            href="/"
            prefetch={true}
            className="flex w-full items-center justify-center gap-2 px-2 md:w-auto lg:px-0"
          >
            <LogoSquare /> <p className="font-semibold">Perfect-Shine</p>
          </Link>
          <section className="mt-[2px] hidden gap-2 text-sm md:items-center lg:flex">
            <MenuLinks menu={menu} className="mt-1" />
          </section>
        </div>
        <div className="absolute right-0 flex w-full max-w-96 items-center justify-end gap-3 px-2">
          <div className="hidden lg:block">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <span className="mt-1 hidden h-8 w-px rounded-full bg-gray-400 lg:block" />
          <ThemeSwitch />
          <span className="mt-1 h-8 w-px rounded-full bg-gray-400" />
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
