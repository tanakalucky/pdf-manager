import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control border border-transparent bg-transparent px-3.5 py-2 font-heading text-sm/tight font-extrabold whitespace-nowrap text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-background hover:bg-accent-600 active:bg-accent-700",
        secondary: "border-divider hover:bg-foreground/7 active:bg-foreground/15",
        ghost: "px-1 text-accent hover:bg-accent/10 active:bg-accent/20",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type Props = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export const Button = ({ className, variant, type = "button", ...props }: Props) => {
  return <button type={type} className={cn(buttonVariants({ variant, className }))} {...props} />;
};
