import Hero from "./home/hero";
import CollectionSection from "./home/collection-section";

export default function Home() {
  return (
    <div className="max-w-[1920px] mx-auto">
      <Hero />
      <CollectionSection />
    </div>
  );
}
