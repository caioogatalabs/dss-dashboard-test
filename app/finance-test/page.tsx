"use client"

import { useFinance } from "@/hooks/use-finance"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function FinanceTestPage() {
  const {
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,
    categories,
    filters,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateExpensesByCategory,
    calculateSavingsRate,
    getFilteredTransactions,
    setSelectedMember,
    setTransactionType,
  } = useFinance()

  const totalBalance = calculateTotalBalance()
  const income = calculateIncomeForPeriod()
  const expenses = calculateExpensesForPeriod()
  const savingsRate = calculateSavingsRate()
  const expensesByCategory = calculateExpensesByCategory()
  const filteredTransactions = getFilteredTransactions()

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Finance Context Test</h1>
        <p className="text-muted-foreground">
          Sistema de gerenciamento de estado global - Teste de funcionalidades
        </p>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Saldo Total</CardDescription>
            <CardTitle className="text-3xl">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalBalance)}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Receitas (Período)</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(income)}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Despesas (Período)</CardDescription>
            <CardTitle className="text-3xl text-red-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(expenses)}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Taxa de Economia</CardDescription>
            <CardTitle className="text-3xl">
              {savingsRate.toFixed(1)}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros Ativos</CardTitle>
          <CardDescription>
            Teste os filtros e veja os cálculos atualizarem em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Filtrar por Membro:</h4>
            <div className="flex gap-2">
              <Button
                variant={filters.selectedMember === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMember(null)}
              >
                Todos
              </Button>
              {familyMembers.map((member) => (
                <Button
                  key={member.id}
                  variant={
                    filters.selectedMember === member.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedMember(member.id)}
                  style={{
                    borderColor:
                      filters.selectedMember === member.id ? member.color : undefined,
                  }}
                >
                  {member.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Filtrar por Tipo:</h4>
            <div className="flex gap-2">
              <Button
                variant={filters.transactionType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransactionType("all")}
              >
                Todos
              </Button>
              <Button
                variant={filters.transactionType === "income" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransactionType("income")}
              >
                Receitas
              </Button>
              <Button
                variant={filters.transactionType === "expense" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransactionType("expense")}
              >
                Despesas
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Mostrando {filteredTransactions.length} de {transactions.length}{" "}
            transações
          </div>
        </CardContent>
      </Card>

      {/* Despesas por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
          <CardDescription>
            Distribuição dos gastos (período filtrado)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expensesByCategory.slice(0, 8).map((cat) => (
              <div key={cat.categoryId} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm font-medium">{cat.categoryName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(cat.amount)}
                    </span>
                    <Badge variant="secondary">{cat.percentage.toFixed(1)}%</Badge>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Contas Bancárias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {bankAccounts.map((acc) => (
                <div key={acc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: acc.color }}
                    />
                    <span className="text-sm">{acc.bank}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(acc.balance)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cartões de Crédito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {creditCards.map((card) => (
                <div key={card.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: card.color }}
                    />
                    <span className="text-sm">{card.bank}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(card.currentBalance)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objetivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {goals.slice(0, 3).map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100
                return (
                  <div key={goal.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: goal.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debug Info */}
      <Card>
        <CardHeader>
          <CardTitle>Debug - Estado do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Transações</div>
              <div className="text-2xl font-bold">{transactions.length}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Membros</div>
              <div className="text-2xl font-bold">{familyMembers.length}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Categorias</div>
              <div className="text-2xl font-bold">{categories.length}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Objetivos</div>
              <div className="text-2xl font-bold">{goals.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
