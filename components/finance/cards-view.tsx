"use client"

import * as React from "react"
import { IconCreditCard, IconPlus } from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardDetailsModal } from "@/components/finance/modals/card-details-modal"
import { NewTransactionModal } from "@/components/finance/modals/new-transaction-modal"
import type { CreditCard } from "@/lib/types/finance"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function formatDay(day: number): string {
  return `Dia ${day}`
}

function usagePercentage(balance: number, limit: number): number {
  if (limit === 0) return 0
  return Math.round((balance / limit) * 1000) / 10
}

function usageColor(percentage: number): string {
  if (percentage >= 90) return "hsl(var(--destructive))"
  if (percentage >= 70) return "hsl(var(--warning))"
  return "hsl(var(--chart-3))"
}

interface CardsViewProps {
  addModalOpen: boolean
  onAddModalOpen: (open: boolean) => void
}

export function CardsView({ addModalOpen, onAddModalOpen }: CardsViewProps) {
  const { creditCards } = useFinance()

  const sorted = React.useMemo(() => {
    return [...creditCards].sort((a, b) => b.currentBalance - a.currentBalance)
  }, [creditCards])

  if (sorted.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/30 p-12">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <IconCreditCard className="size-8 text-muted-foreground" />
        </div>
        <div className="space-y-1 text-center">
          <h3 className="font-semibold">Nenhum cartão cadastrado</h3>
          <p className="text-sm text-muted-foreground">
            Cadastre seu primeiro cartão para acompanhar limite e faturas.
          </p>
        </div>
        <Button onClick={() => onAddModalOpen(true)} className="gap-2">
          <IconPlus className="size-4" />
          Cadastrar Primeiro Cartão
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sorted.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  )
}

function CardItem({ card }: { card: CreditCard }) {
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [transactionOpen, setTransactionOpen] = React.useState(false)

  const pct = usagePercentage(card.currentBalance, card.limit)
  const color = usageColor(pct)
  const available = card.limit - card.currentBalance

  const openDetails = () => setDetailsOpen(true)
  const openTransaction = (e: React.MouseEvent) => {
    e.stopPropagation()
    setTransactionOpen(true)
  }

  return (
    <>
      <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={openDetails}>
        <CardContent className="pt-4 space-y-4">
          {/* Representação visual do cartão (como na gaveta) */}
          <div
            className="relative aspect-[1.586] w-full overflow-hidden rounded-xl border shadow-sm"
            style={{ backgroundColor: card.color }}
          >
            <div className="flex h-full flex-col justify-between p-4 text-white">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium opacity-90">{card.bank}</span>
                <span className="font-mono text-sm tracking-widest opacity-90">
                  •••• {card.lastDigits || "****"}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xs font-medium opacity-80">{card.name}</span>
              </div>
            </div>
          </div>

          {/* Informações em tabela (como na gaveta) */}
          <div className="space-y-0 text-sm">
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Limite total</span>
              <span className="font-semibold tabular-nums">{formatCurrency(card.limit)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Fatura atual</span>
              <span
                className={`font-semibold tabular-nums ${
                  pct >= 90 ? "text-destructive" : "text-foreground"
                }`}
              >
                {formatCurrency(card.currentBalance)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Limite disponível</span>
              <span className="font-semibold tabular-nums">{formatCurrency(available)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Fechamento</span>
              <span className="font-semibold">{formatDay(card.closingDay)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Vencimento</span>
              <span className="font-semibold">{formatDay(card.dueDay)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Últimos 4 dígitos</span>
              <span className="font-semibold font-mono">•••• {card.lastDigits || "****"}</span>
            </div>
          </div>

          {/* Uso do limite: apenas barra horizontal */}
          <div className="rounded-md border bg-muted/30 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">Uso do limite</p>
              <p className="text-sm font-bold tabular-nums">{pct}%</p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t pt-4" onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm" className="flex-1" onClick={openDetails}>
            Ver Detalhes
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={openTransaction}>
            Adicionar Despesa
          </Button>
        </CardFooter>
      </Card>

      <CardDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        card={card}
        onAddExpense={() => {
          setDetailsOpen(false)
          setTransactionOpen(true)
        }}
      />
      <NewTransactionModal
        open={transactionOpen}
        onOpenChange={setTransactionOpen}
        defaultCreditCardId={card.id}
      />
    </>
  )
}
