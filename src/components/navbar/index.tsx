import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import CartModal from "../cart/modal";
import ThemeSwitch from "../theme/theme-switch";
import { navigationLinks } from "@/constant";

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
           
          </Link>

          <ul className="hidden gap-6 text-sm md:flex md:items-center mt-[2px] ">
            {menu.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.path}
                  className="text-black/80  
                   font-semibold underline-offset-4 hover:text-black hover:underline
                    dark:text-neutral-200 dark:hover:text-neutral-50"
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
