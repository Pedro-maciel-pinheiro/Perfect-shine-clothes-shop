import Hero from "./home/hero";
import CollectionSection from "./home/collection-section";

export default  function Home() {
  // const products = await getCollectionProducts({ collection: "WOMEN" });
  // if (!products?.length) return <div>nothing found</div>;
  return (
    <div className="h-auto w-full">
      
      <Hero/>
      
      <CollectionSection/>
    </div>
  );
}
