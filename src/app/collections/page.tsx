import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4  rounded-lg">
        <h1 className="text-7xl uppercase">Page not Found</h1>
        <Link href={"/"} >
          <Button variant={"link"} className="text-xl">Back to main page</Button>
        </Link>
      </div>
    </div>
  );
}
