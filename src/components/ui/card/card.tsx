import { HTMLAttributes } from "react";

import { CardMedia } from "./card-media";
import { CardContent } from "./card-content";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ children, ...nativeProps }: CardProps) => {
  return (
    <div className="relative h-full" {...nativeProps}>
      {children}
    </div>
  );
};

Card.Media = CardMedia;
Card.Content = CardContent;
