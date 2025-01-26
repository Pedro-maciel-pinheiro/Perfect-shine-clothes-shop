import React from "react";

import { getCollectionProducts } from "@/lib/shopify";
import CustomPage from "@/components/custom/custom-page";

export default async function page() {
  const menCollection = await getCollectionProducts({ collection: "SHOES" });
  if (!menCollection?.length) return null;
  return (
    <>
     <CustomPage Collection={menCollection} className="ShoesPage-bg-image" title="Shoes"/>
    </>
  );
}
