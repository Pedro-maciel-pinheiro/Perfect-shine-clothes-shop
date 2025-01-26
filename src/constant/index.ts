import { navigationLinksProps, collectionsImagesProps } from "@/types";
import Hoodie from "@/constant/img/hoodies.webp";
import Shoes from "@/constant/img/shoes-wallpaper.webp";
import Tshirts from "@/constant/img/tshirts.webp";
import Headwear from "@/constant/img/headwear.webp";

export const navigationLinks: navigationLinksProps[] = [
  { label: "New", path: "/" },
  { label: "Men", path: "/collections/men" },
  { label: "Women", path: "/collections/women" },
  { label: "T-Shirts", path:"/collections/t-shirts" },
  { label: "Hoodies", path: "/collections/hoodies" },
  { label: "Headwear", path: "/collections/headwear" },
  { label: "Shoes", path: "/collections/shoes" },
  
];

export const collectionsImages: collectionsImagesProps[] = [
  { alt: "Hoodie collection image", image: Hoodie ,path:"/collections/hoodies"},
  { alt: "T-Shirt collection image", image: Tshirts ,path:"/collections/t-shirts"},
  { alt: "Headwear collection image", image: Headwear,path:"/collections/headwear" },
  { alt: "Shoes collection image", image: Shoes ,path:"/collections/shoes"},
];
