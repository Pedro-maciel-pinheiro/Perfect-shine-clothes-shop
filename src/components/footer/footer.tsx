import LogoSquare from "@/components/logo-square";
import Link from "next/link";
import { navigationLinks } from "@/constant";
import { MenuLinks } from "../navbar/menu-links";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = currentYear;
  const menu = navigationLinks;
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link
            className="flex items-center gap-2 text-black dark:text-white md:pt-1"
            href="/"
          >
            <LogoSquare/>
            <span className="uppercase">Perfect-shine</span>
          </Link>
        </div>

        <MenuLinks menu={menu} className="mt-2" />
        
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>
            <a href="@">View the source</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
