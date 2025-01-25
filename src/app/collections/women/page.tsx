import React from "react";
import Image from "next/image";
import { GridTileImage } from "@/components/grid/tile";
import { getCollectionProducts } from "@/lib/shopify";
import Link from "next/link";

export default async function page() {
  const womanCollection = await getCollectionProducts({ collection: "WOMEN" });
  if (!womanCollection?.length) return null;
  return (
    <>
      <div className="WomenPage-bg-image flex h-96 w-full items-center justify-center bg-fixed md:h-[550px] md:items-end">
        <h1 className="mb-10 text-5xl font-semibold text-white md:text-7xl">
          Womens Clothing
        </h1>
      </div>
      <section className="mx-auto h-auto w-full max-w-screen-2xl p-12 md:p-8">
        <ul className="my-10 grid gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {womanCollection.map((product) => (
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
      </section>
    </>
  );
}
