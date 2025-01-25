

export type navigationLinksProps = {
  label:string
  path:string
}

export type MenuProps ={
  menu:navigationLinksProps[]
}


export const navigationLinks:navigationLinksProps[] = [
    { label: "New", path: "/" },
    { label: "Men", path: "/collections/men" },
    { label: "Women", path: "/collections/women" },
    { label: "Shoes", path: "/collections/shoes" },
] 
  