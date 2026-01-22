"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { DashboardHeader } from "@/components/finance/dashboard-header"
import { BalanceCard } from "@/components/finance/balance-card"
import { IncomeCard } from "@/components/finance/income-card"
import { ExpenseCard } from "@/components/finance/expense-card"
import { ExpensesByCategoryCarousel } from "@/components/finance/expenses-by-category-carousel"
import { CreditCardsWidget } from "@/components/finance/credit-cards-widget"
import { UpcomingExpenses } from "@/components/finance/upcoming-expenses"
import { TransactionsTable } from "@/components/finance/transactions-table"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  income: { label: "Receitas", color: "hsl(var(--chart-3))" },
  expenses: { label: "Despesas", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig

function generateCashFlowData() {
  const monthNames = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
  ]
  return monthNames.map((month) => ({
    month,
    income: Math.round(10000 + Math.random() * 6000),
    expenses: Math.round(6000 + Math.random() * 5000),
  }))
}

export default function DashboardPage() {
  const [chartFilter, setChartFilter] = React.useState<"all" | "income" | "expenses">("all")
  const cashFlowData = React.useMemo(() => generateCashFlowData(), [])

  return (
    <>
      <DashboardHeader />
      <div
        className="flex flex-1 flex-col gap-6 p-4 lg:p-6"
        style={{ backgroundColor: "oklab(0.290478 0.0000131577 0.00000579655 / 0.0)" }}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <BalanceCard />
              <IncomeCard />
              <ExpenseCard />
            </div>
            <ExpensesByCategoryCarousel />
          </div>
          <CreditCardsWidget />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px]">
          <Card className="flex flex-col py-4">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M7 16l4-8 4 4 4-8" />
                </svg>
                Fluxo financeiro
              </CardTitle>
              <ButtonGroup>
                <Button variant={chartFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setChartFilter("all")}>
                  Ambos
                </Button>
                <Button variant={chartFilter === "income" ? "default" : "outline"} size="sm" onClick={() => setChartFilter("income")}>
                  Receitas
                </Button>
                <Button variant={chartFilter === "expenses" ? "default" : "outline"} size="sm" onClick={() => setChartFilter("expenses")}>
                  Despesas
                </Button>
              </ButtonGroup>
            </CardHeader>
            <CardContent className="mt-auto px-4">
              <ChartContainer config={chartConfig} className="h-[230px] w-full">
                <BarChart data={cashFlowData} barGap={2}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  {(chartFilter === "all" || chartFilter === "income") && (
                    <Bar dataKey="income" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                  )}
                  {(chartFilter === "all" || chartFilter === "expenses") && (
                    <Bar dataKey="expenses" fill="hsl(var(--chart-3))" fillOpacity={0.5} radius={[4, 4, 0, 0]} />
                  )}
                </BarChart>
              </ChartContainer>
              <div className="mt-4 flex items-center justify-center gap-4 border-t pt-4">
                <span className="flex items-center gap-1 text-sm">
                  <span className="size-2 rounded-full bg-[hsl(var(--chart-3))]" />
                  Receitas
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <span className="size-2 rounded-full bg-[hsl(var(--chart-3))]/50" />
                  Despesas
                </span>
              </div>
            </CardContent>
          </Card>
          <UpcomingExpenses />
        </div>

        <Card className="py-4">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <path d="M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                <path d="M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Extrato detalhado
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <TransactionsTable />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
