import { HTMLAttributes } from "react";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = ({ children, ...nativeProps }: CardContentProps) => {
  return (
    <div
      className="relative w-full space-y-2 px-1 py-2 capitalize"
      {...nativeProps}
    >
      {children}
    </div>
  );
};
