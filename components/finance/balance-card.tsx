"use client"

import { useFinance } from "@/hooks/use-finance"
import { useAnimatedNumber } from "@/hooks/use-animated-number"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTrendingUp } from "@tabler/icons-react"

export function BalanceCard() {
  const { calculateTotalBalance, transactions } = useFinance()

  const currentBalance = calculateTotalBalance()
  const animatedBalance = useAnimatedNumber(currentBalance, 500)

  // Calcular crescimento percentual comparado a 30 dias atrás
  const calculateGrowth = () => {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Calcular receitas e despesas dos últimos 30 dias
    const recentTransactions = transactions.filter((tx) => tx.date >= thirtyDaysAgo)
    const income = recentTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0)
    const expenses = recentTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0)

    const netChange = income - expenses
    const previousBalance = currentBalance - netChange

    if (previousBalance === 0) return 0

    return ((netChange / Math.abs(previousBalance)) * 100)
  }

  const growth = calculateGrowth()
  const isPositive = growth >= 0

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
      <CardContent className="flex flex-col gap-3 p-4 pt-0">
        <div className="text-sm text-muted-foreground font-medium">
          Saldo Total
        </div>
        <div className="text-2xl font-bold tracking-tight md:text-3xl break-words">
          {formatCurrency(animatedBalance)}
        </div>
        <Badge
          variant="secondary"
          className="w-fit gap-1.5 rounded-full px-2.5 py-1"
        >
          <IconTrendingUp className="size-3.5" />
          <span className="text-xs font-medium">
            {isPositive ? "+" : ""}
            {growth.toFixed(1)}% esse mês
          </span>
        </Badge>
      </CardContent>
    </Card>
  )
}
