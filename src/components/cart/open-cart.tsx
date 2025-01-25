import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import React from "react";

type OpenCartProps = {
  quantity?: number;
};

export const OpenCart = ({ quantity }: OpenCartProps) => {
  return (
    <div
      className="relative flex h-11 w-11 items-center justify-center
     rounded-md border transition-colors"
    >
      <ShoppingBag
        className={cn(
          "h-4 transition-all  ease-in-out hover:scale-110",
          quantity ?? 0 ? "text-blue-500" : ""
        )}
      />

      {quantity ? (
        <div className="text-white absolute right-0 top-0 -mr-2 h-4 w-4 rounded-full bg-blue-600 text-[11px] font-medium">
            {quantity}
        </div>
      ) : null}
    </div>
  );
};
