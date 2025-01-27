import { Product } from "@/lib/shopify/types"
import { StaticImageData } from "next/image"

export type navigationLinksProps = {
    label:string
    path:string
  }

export  type collectionsImagesProps = {
  alt:string
  image:string | StaticImageData
  path:string
}  
  
export type MenuProps ={
    menu:navigationLinksProps[]
    className?:string
}
  

export type CustomPageProps = {
  title:string
  Collection: Product[] 
  className:string
}