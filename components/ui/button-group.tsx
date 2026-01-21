"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  attached?: boolean
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  attached = true,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn(
        buttonGroupVariants({ orientation }),
        attached && orientation === "horizontal" && [
          "[&>button]:rounded-none",
          "[&>button:first-child]:rounded-l-md",
          "[&>button:last-child]:rounded-r-md",
          "[&>button:not(:first-child)]:-ml-px",
          "[&>button:focus-visible]:z-10",
          "[&>button:hover]:z-10",
        ],
        attached && orientation === "vertical" && [
          "[&>button]:rounded-none",
          "[&>button:first-child]:rounded-t-md",
          "[&>button:last-child]:rounded-b-md",
          "[&>button:not(:first-child)]:-mt-px",
          "[&>button:focus-visible]:z-10",
          "[&>button:hover]:z-10",
        ],
        !attached && orientation === "horizontal" && "gap-2",
        !attached && orientation === "vertical" && "gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { ButtonGroup, buttonGroupVariants }
export type { ButtonGroupProps }
