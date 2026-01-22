"use client"

import * as React from "react"
import {
  IconArrowDown,
  IconArrowRight,
} from "@tabler/icons-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { FinanceSidebar } from "@/components/finance-sidebar"
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
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const chartConfig = {
  income: {
    label: "Receitas",
    color: "hsl(var(--chart-3))",
  },
  expenses: {
    label: "Despesas",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/**
 * Gera dados de fluxo financeiro agrupados por mês
 * 
 * TODO: No futuro, esta função deve receber transações reais do contexto financeiro
 * e agrupá-las por mês, calculando receitas e despesas.
 * 
 * @returns Array com dados de fluxo financeiro por mês
 */
function generateCashFlowData() {
  // Dados mock para 12 meses (JAN até DEZ)
  // TODO: Substituir por lógica que agrupa transações reais por mês
  // const transactions = getFilteredTransactions()
  // const groupedByMonth = groupTransactionsByMonth(transactions)
  // return calculateMonthlyCashFlow(groupedByMonth)
  
  const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
  
  return monthNames.map((month, index) => ({
    month,
    income: 10000 + Math.random() * 6000, // Mock: receitas entre 10k e 16k
    expenses: 6000 + Math.random() * 5000, // Mock: despesas entre 6k e 11k
  })).map((item) => ({
    ...item,
    income: Math.round(item.income),
    expenses: Math.round(item.expenses),
  }))
}

export default function Home() {
  const [chartFilter, setChartFilter] = React.useState<"all" | "income" | "expenses">("all")

  // Gera dados de fluxo financeiro (mock por enquanto, futuro: do contexto)
  const cashFlowData = React.useMemo(() => generateCashFlowData(), [])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <FinanceSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col bg-muted/0">
          {/* Header */}
          <DashboardHeader />

          {/* Main Content */}
          <div 
            className="flex flex-1 flex-col gap-6 p-4 lg:p-6"
            style={{ backgroundColor: "oklab(0.290478 0.0000131577 0.00000579655 / 0.0)" }}
          >
            {/* Top Section: Cards Grid */}
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px]">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                {/* Summary Cards - Balance, Income, Expenses */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <BalanceCard />
                  <IncomeCard />
                  <ExpenseCard />
                </div>

                {/* Expense Category Cards */}
                <ExpensesByCategoryCarousel />
              </div>

              {/* Right Column - Cards/Accounts */}
              <CreditCardsWidget />
            </div>

            {/* Middle Section: Chart + Upcoming Expenses */}
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px]">
              {/* Cash Flow Chart */}
              <Card className="py-4 flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-4 w-full">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 3v18h18" />
                      <path d="M7 16l4-8 4 4 4-8" />
                    </svg>
                    Fluxo financeiro
                  </CardTitle>
                  {/* Filter Buttons - Canto superior direito, inline */}
                  <div className="flex items-center">
                    <ButtonGroup>
                      <Button
                        variant={chartFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setChartFilter("all")}
                      >
                        Ambos
                      </Button>
                      <Button
                        variant={chartFilter === "income" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setChartFilter("income")}
                      >
                        Receitas
                      </Button>
                      <Button
                        variant={chartFilter === "expenses" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setChartFilter("expenses")}
                      >
                        Despesas
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardContent className="px-4 mt-auto">
                  {/* Chart */}
                  <ChartContainer config={chartConfig} className="h-[230px] w-full">
                    <BarChart data={cashFlowData} barGap={2}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                        tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                      />
                      {(chartFilter === "all" || chartFilter === "income") && (
                        <Bar
                          dataKey="income"
                          fill="hsl(var(--chart-3))"
                          radius={[4, 4, 0, 0]}
                        />
                      )}
                      {(chartFilter === "all" || chartFilter === "expenses") && (
                        <Bar
                          dataKey="expenses"
                          fill="hsl(var(--chart-3))"
                          fillOpacity={0.5}
                          radius={[4, 4, 0, 0]}
                        />
                      )}
                    </BarChart>
                  </ChartContainer>
                  
                  {/* Legend - Parte inferior centralizada */}
                  <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-[hsl(var(--chart-3))]" />
                        Receitas
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-[hsl(var(--chart-3))]/50" />
                        Despesas
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Expenses */}
              <UpcomingExpenses />
            </div>

            {/* Bottom Section: Transactions Table */}
            <Card className="py-4">
              <CardHeader className="flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
