"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

function InputGroup({ className, children, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn("flex", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface InputGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  position?: "left" | "right"
}

function InputGroupText({
  className,
  position = "left",
  children,
  ...props
}: InputGroupTextProps) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "inline-flex items-center px-3 border border-input bg-muted text-muted-foreground text-sm",
        position === "left" && "rounded-l-md border-r-0",
        position === "right" && "rounded-r-md border-l-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right"
}

function InputGroupAddon({
  className,
  position = "left",
  children,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      data-slot="input-group-addon"
      className={cn(
        "[&>button]:rounded-none",
        position === "left" && "[&>button]:rounded-l-md [&>button]:border-r-0",
        position === "right" && "[&>button]:rounded-r-md [&>button]:border-l-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Utility to wrap Input with proper styling
interface InputGroupInputProps {
  hasLeftAddon?: boolean
  hasRightAddon?: boolean
  className?: string
}

function getInputGroupInputClass({
  hasLeftAddon,
  hasRightAddon,
  className,
}: InputGroupInputProps) {
  return cn(
    hasLeftAddon && "rounded-l-none",
    hasRightAddon && "rounded-r-none",
    !hasLeftAddon && !hasRightAddon && "",
    className
  )
}

export {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  getInputGroupInputClass,
}
export type { InputGroupProps, InputGroupTextProps, InputGroupAddonProps }
