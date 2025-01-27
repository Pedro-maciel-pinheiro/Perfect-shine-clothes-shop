import React from "react";
import Image from "next/image";
import { collectionsImages } from "@/constant";
import Link from "next/link";
export default function CollectionSection() {
  return (
    <div className="flex h-auto w-full p-2 ">
      <ul className="mb-2 flex w-full flex-col gap-3 md:gap-0">
        {collectionsImages.map((item) => (
          <li key={item.alt}>
            <Link href={item.path}>
              <Image
                src={item.image}
                alt={item.alt}
                width={1500}
                height={1500}
                className="h-full w-full rounded-lg"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
