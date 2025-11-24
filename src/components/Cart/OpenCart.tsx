import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import React from "react";

export function OpenCartButton({ className, quantity, ...rest }: any) {
  return (
    <Button
      variant="outline" size="icon"
      className="relative p-3 m-0 bg-accent rounded-md hover:bg-white hover:text-primary dark:hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      {...rest}
    >
      <div className="flex">
        <ShoppingBag className="h-[20px] w-[20px] text-primary" />
        {quantity ? (
          <span className="text-sm font-semibold absolute right-[-2px] top-[-2px] text-primary">{quantity}</span>
        ) : null}
      </div>
    </Button>
  );
}
