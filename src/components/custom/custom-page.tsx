import React, { Suspense } from "react";
import { GridTileImage } from "../grid/tile";
import Link from "next/link";
import { CustomPageProps } from "@/types";

const SkeletonGrid = () => (
  <ul className="my-10 grid gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <li key={index} className="aspect-square h-full w-full flex-none">
        <div className="animate-pulse aspect-square h-full w-full bg-gray-300" />
      </li>
    ))}
  </ul>
);

export default function CustomPage({ Collection, className, title }: CustomPageProps) {
  return (
    <>
      <div
        className={`${className} flex h-96 w-full items-center justify-center bg-fixed md:h-[550px] md:items-end`}
      >
        <h1 className="mb-10 text-5xl font-semibold uppercase text-white md:text-7xl">
          {title}
        </h1>
      </div>
      <section className="mx-auto h-auto w-full max-w-screen-2xl p-12 md:p-8">
        <Suspense fallback={<SkeletonGrid />}>
          <ul className="my-10 grid gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {Collection.map((product) => (
              <li
                key={product.id}
                className="aspect-square h-full w-full flex-none"
              >
                <Link
                  href={`/product/${product.handle}`}
                  prefetch={true}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode:
                        product.priceRange.maxVariantPrice.currencyCode,
                    }}
                    src={product.featuredImage?.url}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 550px) 50vw, 100vw"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Suspense>
      </section>
    </>
  );
}
