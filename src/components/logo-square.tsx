import { cn } from "@/lib/utils";
import { Circle} from "lucide-react";

export default function LogoSquare() {
  return (
    <div
      className={cn(
        "flex h-[35px] w-[35px] flex-none items-center justify-center rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 lg:h-[40px] lg:w-[40px]",
      )}
    >
      <Circle
        className={cn("rounded-full bg-red-500 text-red-500 h-[16px] w-[16px]")}
      />
    </div>
  );
}
