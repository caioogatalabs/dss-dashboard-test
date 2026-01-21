"use client"

import * as React from "react"
import { useFinance } from "@/hooks/use-finance"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CategoryDonut } from "./category-donut"

/**
 * Array de cores accendentes do design system que rotaciona entre as categorias
 * Usa as variáveis de cor do design system
 */
const ACCENT_COLORS = [
  "hsl(var(--chart-1))", // Primary
  "hsl(var(--chart-2))", // Accent/Light Blue
  "hsl(var(--chart-3))", // Success/Green
  "hsl(var(--chart-4))", // Warning/Orange
  "hsl(var(--chart-5))", // Destructive/Red
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/**
 * Componente ExpensesByCategoryCarousel
 * 
 * Exibe despesas agrupadas por categoria em um carousel.
 * Busca dados do contexto financeiro global e calcula percentuais
 * em relação à receita total do período.
 */
export function ExpensesByCategoryCarousel() {
  const {
    calculateExpensesByCategory,
    calculateCategoryPercentage,
  } = useFinance()

  const expensesByCategory = React.useMemo(() => {
    return calculateExpensesByCategory()
  }, [calculateExpensesByCategory])

  if (expensesByCategory.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Nenhuma despesa encontrada no período
      </div>
    )
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {expensesByCategory.map((category, index) => {
          // Calcula o percentual em relação à receita total
          const percentage = calculateCategoryPercentage(category.categoryId)
          
          // Rotaciona as cores accendentes do design system
          const color = ACCENT_COLORS[index % ACCENT_COLORS.length]

          return (
            <CarouselItem
              key={category.categoryId}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card className="py-4 h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-3 h-full">
                  {/* Donut Chart */}
                  <CategoryDonut
                    percentage={percentage}
                    color={color}
                    size={80}
                    strokeWidth={8}
                  />
                  
                  {/* Category Name */}
                  <div className="text-sm text-muted-foreground text-center">
                    {category.categoryName}
                  </div>
                  
                  {/* Expense Amount */}
                  <div className="text-lg font-semibold text-center">
                    {formatCurrency(category.amount)}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4 z-10" />
      <CarouselNext className="right-4 z-10" />
    </Carousel>
  )
}
