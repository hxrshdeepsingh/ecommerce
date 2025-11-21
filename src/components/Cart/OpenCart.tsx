import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ShoppingBag } from "lucide-react";
import React from "react";

export function OpenCartButton({ className, quantity, ...rest}) {
  return (
    <Button
      variant="nav"
      size="clear"
      className="relative p-3 m-0 bg-gray-50 rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      {...rest}
    >
      {quantity ? (
        <div className="flex">
          <ShoppingBag className="h-[20px] w-[20px] text-primary" />
          <span className="text-sm font-semibold absolute right-[-2px] top-[-2px] text-primary">{quantity}</span>
        </div>
      ) : null}
    </Button>
  );
}
