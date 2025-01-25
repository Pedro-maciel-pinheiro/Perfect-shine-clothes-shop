import { ThreeItemGrid } from "@/components/grid/three-items";
import { getCollectionProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getCollectionProducts({ collection: "WOMEN" });
  if (!products?.length) return <div>nothing found</div>;
  return (
    <div className="w-full h-full flex flex-col">
      <ThreeItemGrid/>
    </div>
  );
}
