"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CategoryDonutProps {
  percentage: number
  color: string
  size?: number
  strokeWidth?: number
  className?: string
  showDecimal?: boolean
}

/**
 * Componente CategoryDonut - Exibe um gráfico donut representando o percentual de uma categoria
 * 
 * @param percentage - Percentual de 0 a 100 (em relação à receita total)
 * @param color - Cor HSL do anel externo (ex: "hsl(var(--chart-1))")
 * @param size - Tamanho do donut em pixels (padrão: 80)
 * @param strokeWidth - Largura do anel em pixels (padrão: 8)
 */
export function CategoryDonut({
  percentage,
  color,
  size = 80,
  strokeWidth = 8,
  className,
  showDecimal = true,
}: CategoryDonutProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-hidden="true"
      >
        {/* Background circle (muted) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Percentage circle (colored) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Percentage text in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "font-semibold text-foreground",
            size <= 48 ? "text-xs" : "text-sm"
          )}
        >
          {showDecimal ? percentage.toFixed(1) : Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}
