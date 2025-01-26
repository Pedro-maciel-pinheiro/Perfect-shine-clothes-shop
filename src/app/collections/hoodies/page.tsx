import CustomPage from '@/components/custom/custom-page';
import { getCollectionProducts } from '@/lib/shopify';
import React from 'react'

export default async function page() {
   const Collection = await getCollectionProducts({ collection: "HOODIES" });
    if (!Collection?.length) return null;
    return (
      <>
        <CustomPage Collection={Collection} className="SpecialPage-bg-image" title={'Hoodies'} />
      </>
    );
}
