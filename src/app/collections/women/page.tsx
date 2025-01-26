import React from "react";

import { getCollectionProducts } from "@/lib/shopify";
import CustomPage from "@/components/custom/custom-page";

export default async function page() {
  const womanCollection = await getCollectionProducts({ collection: "WOMEN" });
  if (!womanCollection?.length) return null;
  return (
    <>
     <CustomPage Collection={womanCollection} className="WomenPage-bg-image" title="Women Clothing"/>
    </>
  );
}
