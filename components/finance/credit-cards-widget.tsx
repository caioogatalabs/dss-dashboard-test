"use client"

import * as React from "react"
import { IconArrowRight, IconCreditCard, IconPlus } from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CategoryDonut } from "./category-donut"
import { CardDetailsModal } from "./modals/card-details-modal"
import { NewTransactionModal } from "./modals/new-transaction-modal"
import { AddAccountModal } from "./modals/add-account-modal"
import type { CreditCard } from "@/lib/types/finance"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/**
 * Calcula o percentual de uso do cartão
 * @param currentBalance - Saldo atual da fatura
 * @param limit - Limite total do cartão
 * @returns Percentual arredondado para inteiro
 */
function calculateUsagePercentage(currentBalance: number, limit: number): number {
  if (limit === 0) return 0
  return Math.round((currentBalance / limit) * 100)
}

/**
 * Retorna a cor baseada no percentual de uso
 * @param percentage - Percentual de uso (0-100)
 * @returns Cor HSL do design system
 */
function getUsageColor(percentage: number): string {
  if (percentage >= 90) return "hsl(var(--destructive))" // Vermelho para uso alto
  if (percentage >= 70) return "hsl(var(--warning))" // Laranja para uso médio-alto
  return "hsl(var(--chart-3))" // Verde para uso normal
}

/**
 * Componente CreditCardsWidget
 * 
 * Exibe cartões de crédito do contexto financeiro global.
 * Cada cartão mostra informações como banco, limite, saldo atual e últimos dígitos.
 */
export function CreditCardsWidget() {
  const { creditCards } = useFinance()
  const [showAddAccountModal, setShowAddAccountModal] = React.useState(false)

  if (creditCards.length === 0) {
    return (
      <Card className="py-4">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <IconCreditCard className="size-5" />
            Cards/Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="py-8 text-center text-sm text-muted-foreground">
            Nenhum cartão cadastrado
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="py-4">
      <CardHeader className="flex flex-row items-center justify-between pb-4 w-full">
        <CardTitle className="flex items-center gap-2 text-base flex-shrink-0">
          <IconCreditCard className="size-5" />
          Cards/Accounts
        </CardTitle>
        <div className="flex gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => setShowAddAccountModal(true)}
          >
            <IconPlus className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7">
            <IconArrowRight className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4">
        {creditCards.map((card) => {
          const usagePercentage = calculateUsagePercentage(
            card.currentBalance,
            card.limit
          )
          const usageColor = getUsageColor(usagePercentage)

          return (
            <CreditCardItem
              key={card.id}
              card={card}
              usagePercentage={usagePercentage}
              usageColor={usageColor}
            />
          )
        })}
      </CardContent>
      <AddAccountModal open={showAddAccountModal} onOpenChange={setShowAddAccountModal} />
    </Card>
  )
}

/**
 * Componente para cada item de cartão individual
 */
function CreditCardItem({
  card,
  usagePercentage,
  usageColor,
}: {
  card: CreditCard
  usagePercentage: number
  usageColor: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [showNewTransactionModal, setShowNewTransactionModal] = React.useState(false)

  return (
    <>
      <div
        className="flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-all hover:bg-muted/50 hover:border-primary/50 hover:shadow-sm"
        onClick={() => setIsOpen(true)}
      >
          <div className="flex items-center gap-3">
            <div
              className="flex size-8 items-center justify-center rounded text-xs font-bold text-white"
              style={{ backgroundColor: card.color }}
            >
              {card.bank.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium">{card.name}</div>
              <div className="text-lg font-bold">
                {formatCurrency(card.currentBalance)}
              </div>
              <div className="text-xs text-muted-foreground">
                Vence dia {card.dueDay}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              **** {card.lastDigits}
            </div>
            {/* Donut Chart - Badge circular com percentual de uso */}
            <CategoryDonut
              percentage={usagePercentage}
              color={usageColor}
              size={48}
              strokeWidth={6}
              showDecimal={false}
            />
          </div>
        </div>
      <CardDetailsModal
        open={isOpen}
        onOpenChange={setIsOpen}
        card={card}
        onAddExpense={() => setShowNewTransactionModal(true)}
      />
      <NewTransactionModal
        open={showNewTransactionModal}
        onOpenChange={setShowNewTransactionModal}
        defaultCreditCardId={card.id}
      />
    </>
  )
}
