import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import LogoSquare from "../logo-square";
import CartModal from "../cart/modal";
import { ChangeThemeButton } from "../theme/change-theme-button";
import { navigationLinks } from "@/constant";
import ThemeSwitch from "../theme/theme-switch";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = navigationLinks;

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>

          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.path}
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end gap-2 md:w-1/3 md:gap-4">
          {/* Change Color Button Toggle */}
          <ThemeSwitch />

          <span className="mt-1 h-8 w-px rounded-full bg-gray-400" />
          <CartModal />
        </div>
        <div className="flex justify-end"></div>
      </div>
    </nav>
  );
}
