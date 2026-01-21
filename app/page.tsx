"use client"

import * as React from "react"
import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCreditCard,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { FinanceSidebar } from "@/components/finance-sidebar"
import { DashboardHeader } from "@/components/finance/dashboard-header"
import { BalanceCard } from "@/components/finance/balance-card"
import { IncomeCard } from "@/components/finance/income-card"
import { ExpenseCard } from "@/components/finance/expense-card"
import { ExpensesByCategoryCarousel } from "@/components/finance/expenses-by-category-carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import financeData from "./finance-data.json"

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
  const [transactionFilter, setTransactionFilter] = React.useState<"expenses" | "income" | "all">("expenses")
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5

  // Gera dados de fluxo financeiro (mock por enquanto, futuro: do contexto)
  const cashFlowData = React.useMemo(() => generateCashFlowData(), [])

  const filteredTransactions = financeData.transactions.filter((t) => {
    if (transactionFilter === "all") return true
    if (transactionFilter === "expenses") return t.type === "expense"
    return t.type === "income"
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
              <Card className="py-4">
                <CardHeader className="flex-row items-center justify-between pb-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <IconCreditCard className="size-5" />
                    Cards/Accounts
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="size-7">
                      <IconPlus className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7">
                      <IconArrowRight className="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 px-4">
                  {financeData.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex size-8 items-center justify-center rounded text-xs font-bold text-white"
                          style={{ backgroundColor: account.color }}
                        >
                          {account.bank.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{account.bank}</div>
                          <div className="text-lg font-bold">{formatCurrency(account.balance)}</div>
                          <div className="text-xs text-muted-foreground">
                            Vence dia {account.dueDay}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        **** {account.lastDigits}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
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
              <Card className="py-4">
                <CardHeader className="flex-row items-center justify-between pb-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <IconCreditCard className="size-5" />
                    Próximas despesas
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="size-7">
                    <IconPlus className="size-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-0 px-4">
                  {financeData.upcomingExpenses.map((expense, index) => (
                    <div
                      key={expense.id}
                      className={`flex items-center justify-between py-4 ${
                        index !== financeData.upcomingExpenses.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div>
                        <div className="font-medium">{expense.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Vence dia {expense.dueDay}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {expense.account}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {formatCurrency(expense.value)}
                        </span>
                        {expense.paid && (
                          <div className="flex size-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <IconCheck className="size-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
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
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar lançamentos"
                      className="w-48 pl-9"
                    />
                  </div>
                  <Select
                    value={transactionFilter}
                    onValueChange={(value: "expenses" | "income" | "all") =>
                      setTransactionFilter(value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="expenses">Despesas</SelectItem>
                      <SelectItem value="income">Receitas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="px-4">
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-16">Membro</TableHead>
                        <TableHead className="hidden sm:table-cell">Datas</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="hidden md:table-cell">Categorias</TableHead>
                        <TableHead className="hidden lg:table-cell">Conta/cartão</TableHead>
                        <TableHead className="hidden lg:table-cell">Parcelas</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <Avatar className="size-8">
                              <AvatarImage src={transaction.member} />
                              <AvatarFallback>
                                {transaction.description.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="hidden text-muted-foreground sm:table-cell">
                            {transaction.date}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <IconArrowUp
                                className={`size-4 ${
                                  transaction.type === "income"
                                    ? "rotate-180 text-green-500"
                                    : "text-red-500"
                                }`}
                              />
                              {transaction.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="secondary">{transaction.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden text-muted-foreground lg:table-cell">
                            {transaction.account}
                          </TableCell>
                          <TableCell className="hidden text-muted-foreground lg:table-cell">
                            {transaction.installments}
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              transaction.type === "income"
                                ? "text-green-600"
                                : ""
                            }`}
                          >
                            {transaction.type === "income" ? "+" : ""}
                            {formatCurrency(transaction.value)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                    {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} de{" "}
                    {filteredTransactions.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <IconChevronLeft className="size-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className="size-8"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <IconChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
