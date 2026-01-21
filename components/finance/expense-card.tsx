"use client"

import { useFinance } from "@/hooks/use-finance"
import { useAnimatedNumber } from "@/hooks/use-animated-number"
import { Card, CardContent } from "@/components/ui/card"
import { IconArrowUp } from "@tabler/icons-react"

export function ExpenseCard() {
  const { calculateExpensesForPeriod } = useFinance()

  const expenses = calculateExpensesForPeriod()
  const animatedExpenses = useAnimatedNumber(expenses, 500)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Card className="py-4">
      <CardContent className="flex items-start gap-3 p-4 pt-0">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <IconArrowUp className="size-5" style={{ color: "hsl(var(--finance-expense))" }} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-sm text-muted-foreground font-medium">
            Despesas
          </div>
          <div className="text-xl font-bold tracking-tight md:text-2xl break-words" style={{ color: "hsl(var(--finance-expense))" }}>
            {formatCurrency(animatedExpenses)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
