"use client"

import * as React from "react"
import { IconX } from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryDonut } from "@/components/finance/category-donut"
import type { CreditCard } from "@/lib/types/finance"

interface CardDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: CreditCard | null
  onAddExpense?: () => void
  onEditCard?: () => void
}

/**
 * Modal de Detalhes do Cartão
 * 
 * Exibe informações completas do cartão, incluindo limite, fatura atual,
 * uso do limite e tabela de despesas vinculadas.
 */
export function CardDetailsModal({
  open,
  onOpenChange,
  card,
  onAddExpense,
  onEditCard,
}: CardDetailsModalProps) {
  const { transactions, categories } = useFinance()

  // Filtra despesas vinculadas ao cartão
  const cardExpenses = React.useMemo(() => {
    if (!card) return []
    return transactions.filter(
      (tx) => tx.type === "expense" && tx.creditCardId === card.id
    )
  }, [transactions, card])

  // Calcula métricas
  const metrics = React.useMemo(() => {
    if (!card) return null

    const availableLimit = card.limit - card.currentBalance
    const usagePercentage = card.limit > 0 ? (card.currentBalance / card.limit) * 100 : 0

    return {
      totalLimit: card.limit,
      currentBill: card.currentBalance,
      availableLimit,
      usagePercentage: Math.round(usagePercentage * 10) / 10,
      closingDay: card.closingDay,
      dueDay: card.dueDay,
      lastDigits: card.lastDigits,
    }
  }, [card])

  /**
   * Formata valor monetário
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  /**
   * Formata dia
   */
  const formatDay = (day: number): string => {
    return `Dia ${day}`
  }

  if (!card || !metrics) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-[500px]">
        {/* Header */}
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-lg font-semibold">{card.name}</DrawerTitle>
              <DrawerDescription className="text-sm">Detalhes do cartão de crédito</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="size-9">
                <IconX className="size-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-full space-y-4">
            {/* Cartão visual (só identificação do banco) */}
            <div
              className="relative aspect-[1.586] w-full overflow-hidden rounded-xl border shadow-sm"
              style={{ backgroundColor: card.color }}
            >
              <div className="flex h-full flex-col justify-between p-4 text-white">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium opacity-90">{card.bank}</span>
                  <span className="font-mono text-sm tracking-widest opacity-90">
                    •••• {metrics.lastDigits}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xs font-medium opacity-80">{card.name}</span>
                </div>
              </div>
            </div>

            {/* Informações do cartão: empilhadas verticalmente, título à esquerda e valor à direita */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">Limite total</span>
                <span className="font-semibold tabular-nums">{formatCurrency(metrics.totalLimit)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">Fatura atual</span>
                <span className="font-semibold tabular-nums">{formatCurrency(metrics.currentBill)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">Limite disponível</span>
                <span className="font-semibold tabular-nums">{formatCurrency(metrics.availableLimit)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">Fechamento</span>
                <span className="font-semibold">{formatDay(metrics.closingDay)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">Vencimento</span>
                <span className="font-semibold">{formatDay(metrics.dueDay)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">Últimos 4 dígitos</span>
                <span className="font-semibold font-mono">•••• {metrics.lastDigits}</span>
              </div>
            </div>

            {/* Gráfico de Uso */}
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-4 py-3">
              <div>
                <p className="text-sm text-muted-foreground">Uso do limite</p>
                <p className="text-lg font-bold">{metrics.usagePercentage}%</p>
              </div>
              <CategoryDonut
                percentage={metrics.usagePercentage}
                color={
                  metrics.usagePercentage >= 90
                    ? "hsl(var(--destructive))"
                    : metrics.usagePercentage >= 70
                      ? "hsl(var(--warning))"
                      : "hsl(var(--chart-3))"
                }
                size={64}
                strokeWidth={6}
                showDecimal={true}
              />
            </div>

            {/* Área de Despesas */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Despesas vinculadas</h3>
              {cardExpenses.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nenhuma despesa registrada neste cartão ainda.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-3 text-left">Data</th>
                          <th className="p-3 text-left">Descrição</th>
                          <th className="p-3 text-left">Categoria</th>
                          <th className="p-3 text-left">Parcelas</th>
                          <th className="p-3 text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cardExpenses.slice(0, 10).map((expense) => {
                          const category = categories.find((c) => c.id === expense.categoryId)
                          return (
                            <tr key={expense.id} className="border-b hover:bg-muted/50">
                              <td className="p-3 text-muted-foreground">
                                {new Date(expense.date).toLocaleDateString("pt-BR")}
                              </td>
                              <td className="p-3 font-medium">{expense.description}</td>
                              <td className="p-3">
                                <span className="rounded-md bg-muted px-2 py-1 text-xs">
                                  {category?.name || "Sem categoria"}
                                </span>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                {expense.installments
                                  ? `${expense.installments.current}/${expense.installments.total}`
                                  : "-"}
                              </td>
                              <td className="p-3 text-right font-semibold">
                                {formatCurrency(expense.amount)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  {cardExpenses.length > 10 && (
                    <div className="border-t p-4 text-center text-sm text-muted-foreground">
                      Mostrando 10 de {cardExpenses.length} despesas
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t">
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <Button variant="ghost" size="sm">
              Ver Extrato Completo
            </Button>
            <div className="flex flex-wrap gap-2">
              <DrawerClose asChild>
                <Button variant="outline" size="sm">
                  Fechar
                </Button>
              </DrawerClose>
              {onAddExpense && (
                <Button
                  onClick={() => {
                    onAddExpense()
                    onOpenChange(false)
                  }}
                  variant="outline"
                  size="sm"
                >
                  Adicionar Despesa
                </Button>
              )}
              {onEditCard && (
                <Button
                  onClick={() => {
                    onEditCard()
                    onOpenChange(false)
                  }}
                  variant="outline"
                  size="sm"
                >
                  Editar Cartão
                </Button>
              )}
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
