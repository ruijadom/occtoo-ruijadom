import { HTMLAttributes } from "react";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
}

export const CardContent = ({ children, ...nativeProps }: CardContentProps) => {
  return <div className="relative w-full px-1 py-2 capitalize space-y-2" {...nativeProps}>{children}</div>;
}
