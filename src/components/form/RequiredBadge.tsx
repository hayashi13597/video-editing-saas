import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "@/components/ui/badge";

const RequiredBadge = ({ required = false, text = "必須" }) => (
  <Badge
    variant="outline"
    className={cn("rounded-xs border-none !px-[5px]", {
      "bg-red-bg": required,
      "bg-light-gray": !required
    })}
  >
    <span
      className={cn("very-small-text", {
        "text-red": required,
        "text-gray": !required
      })}
    >
      {text}
    </span>
  </Badge>
);

export default RequiredBadge;
