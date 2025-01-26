import React from "react";
import { getCollectionProducts } from "@/lib/shopify";
import CustomPage from "@/components/custom/custom-page";

export default async function page() {
  const Collection = await getCollectionProducts({ collection: "MEN" });
  if (!Collection?.length) return null;
  return (
    <>
      <CustomPage Collection={Collection} className="ManPage-bg-image" title="Men Clothing"/>
    </>
  );
}
