import { getCollectionProducts } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await getCollectionProducts({ collection: "Hoodies" });
  if (!products?.length) return null;
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 place-items-center w-full h-full">
        {products.map((item, index) => (
          <div className="flex" key={item.id}>
            <Link href={`/product/${item.handle}`}>
              <Image
                src={item.featuredImage.url}
                alt={item.id}
                width={500}
                height={500}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
