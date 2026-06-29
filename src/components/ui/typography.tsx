import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold tracking-tight",
      h6: "text-base font-semibold tracking-tight",
      p: "text-base leading-7",
      span: "text-sm",
      blockquote: "border-l-2 border-border pl-6 italic",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      code: "rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
    lineClamp: {
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      5: "line-clamp-5",
      6: "line-clamp-6",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
    truncate: false,
  },
})

// Map variant to its default semantic HTML element
const variantElementMap: Record<string, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
  blockquote: "blockquote",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
  code: "code",
}

type TypographyVariantProps = VariantProps<typeof typographyVariants>

type TypographyProps = React.ComponentProps<"p"> &
  TypographyVariantProps & {
    /** Render as a different HTML element */
    as?: keyof React.JSX.IntrinsicElements
    /** Merge props onto child element instead of rendering a wrapper */
    asChild?: boolean
  }

function Typography({
  className,
  variant = "p",
  weight,
  align,
  color,
  truncate,
  lineClamp,
  as,
  asChild = false,
  ...props
}: TypographyProps) {
  const Comp: React.ElementType = asChild
    ? Slot.Root
    : as || variantElementMap[variant ?? "p"] || "p"

  return (
    <Comp
      data-slot="typography"
      data-variant={variant}
      className={cn(
        typographyVariants({ variant, weight, align, color, truncate, lineClamp }),
        className
      )}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
export type { TypographyProps }
