import React from "react";
import { GridTileImage } from "@/components/grid/tile";
import { getCollectionProducts } from "@/lib/shopify";
import Link from "next/link";

export default async function page() {
  const menCollection = await getCollectionProducts({ collection: "MEN" });
  if (!menCollection?.length) return null;
  return (
    <>
      <div className="ManPage-bg-image flex h-96 w-full items-end justify-center bg-black bg-fixed md:h-[550px]">
        <h1 className="mb-10 text-5xl font-semibold text-white md:text-7xl">
          Men Clothing
        </h1>
      </div>
      <section className="mx-auto min-h-screen w-full max-w-screen-2xl p-12 md:p-8">
        <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {menCollection.map((product) => (
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
