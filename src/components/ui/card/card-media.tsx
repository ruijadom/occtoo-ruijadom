import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface CardMediaProps extends HTMLAttributes<HTMLImageElement> {}

export const CardMedia = ({ ...nativeProps }: CardMediaProps) => {
  const imgClasses = cn(
    "h-80 w-full rounded-xl border object-cover",
    nativeProps.className,
  );

  return <img {...nativeProps} className={imgClasses} />;
};
