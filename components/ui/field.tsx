"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  description?: string
  error?: string
  required?: boolean
}

function Field({
  className,
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  ...props
}: FieldProps) {
  return (
    <div
      data-slot="field"
      className={cn("space-y-2", className)}
      {...props}
    >
      {label && (
        <Label
          htmlFor={htmlFor}
          className={cn(error && "text-destructive")}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && !error && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

function FieldGroup({
  className,
  orientation = "vertical",
  children,
  ...props
}: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        orientation === "vertical" && "space-y-4",
        orientation === "horizontal" && "flex flex-wrap gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface FieldRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4
}

function FieldRow({
  className,
  columns = 2,
  children,
  ...props
}: FieldRowProps) {
  return (
    <div
      data-slot="field-row"
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Field, FieldGroup, FieldRow }
export type { FieldProps, FieldGroupProps, FieldRowProps }
