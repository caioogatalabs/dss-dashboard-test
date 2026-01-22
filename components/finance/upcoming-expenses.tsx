"use client"

import * as React from "react"
import { IconCheck, IconCreditCard, IconPlus } from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { Transaction, BankAccount, CreditCard } from "@/lib/types/finance"
import { NewTransactionModal } from "./modals/new-transaction-modal"

/**
 * Interface para despesa pendente com informações de vencimento
 */
interface PendingExpense {
  id: string
  description: string
  amount: number
  dueDate: Date
  accountId?: string
  creditCardId?: string
  categoryId: string
  memberId: string
  isRecurring?: boolean
  recurringInterval?: "monthly" | "yearly"
  installments?: {
    current: number
    total: number
  }
}

/**
 * Formata o valor monetário
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/**
 * Formata a origem do pagamento
 */
function formatPaymentOrigin(
  accountId: string | undefined,
  creditCardId: string | undefined,
  bankAccounts: BankAccount[],
  creditCards: CreditCard[]
): string {
  if (creditCardId) {
    const card = creditCards.find((c) => c.id === creditCardId)
    if (card) {
      return `Crédito ${card.bank} **** ${card.lastDigits}`
    }
  }
  
  if (accountId) {
    const account = bankAccounts.find((a) => a.id === accountId)
    if (account) {
      return `${account.bank} conta`
    }
  }
  
  return "Não informado"
}

/**
 * Gera dados fictícios de despesas pendentes para teste
 * TODO: No futuro, buscar do contexto baseado em transações recorrentes e parcelas
 */
function generateMockPendingExpenses(
  bankAccounts: BankAccount[],
  creditCards: CreditCard[],
  categories: { id: string; name: string }[]
): PendingExpense[] {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  
  return [
    {
      id: "exp-1",
      description: "Conta de Luz",
      amount: 154.0,
      dueDate: new Date(currentYear, currentMonth, 23),
      accountId: bankAccounts[0]?.id,
      categoryId: categories.find((c) => c.name === "Moradia")?.id || "cat-3",
      memberId: "member-1",
      isRecurring: true,
      recurringInterval: "monthly",
    },
    {
      id: "exp-2",
      description: "Conta de Água",
      amount: 85.0,
      dueDate: new Date(currentYear, currentMonth, 15),
      accountId: bankAccounts[1]?.id,
      categoryId: categories.find((c) => c.name === "Moradia")?.id || "cat-3",
      memberId: "member-1",
      isRecurring: true,
      recurringInterval: "monthly",
    },
    {
      id: "exp-3",
      description: "Internet",
      amount: 120.0,
      dueDate: new Date(currentYear, currentMonth, 10),
      creditCardId: creditCards[0]?.id,
      categoryId: categories.find((c) => c.name === "Moradia")?.id || "cat-3",
      memberId: "member-1",
      isRecurring: true,
      recurringInterval: "monthly",
    },
    {
      id: "exp-4",
      description: "Telefone",
      amount: 60.0,
      dueDate: new Date(currentYear, currentMonth, 5),
      accountId: bankAccounts[2]?.id,
      categoryId: categories.find((c) => c.name === "Moradia")?.id || "cat-3",
      memberId: "member-1",
      isRecurring: true,
      recurringInterval: "monthly",
    },
    {
      id: "exp-5",
      description: "Compra parcelada - Notebook",
      amount: 450.0,
      dueDate: new Date(currentYear, currentMonth, 20),
      creditCardId: creditCards[1]?.id,
      categoryId: categories.find((c) => c.name === "Compras")?.id || "cat-7",
      memberId: "member-1",
      installments: {
        current: 2,
        total: 6,
      },
    },
  ]
}

/**
 * Componente de Próximas Despesas
 * 
 * Exibe todas as despesas pendentes ordenadas por data de vencimento.
 * Permite marcar despesas como pagas com animações e lógica de recorrência.
 */
export function UpcomingExpenses() {
  const {
    transactions,
    bankAccounts,
    creditCards,
    categories,
    updateTransaction,
    addTransaction,
  } = useFinance()

  const [pendingExpenses, setPendingExpenses] = React.useState<PendingExpense[]>([])
  const [removingIds, setRemovingIds] = React.useState<Set<string>>(new Set())
  const [processingIds, setProcessingIds] = React.useState<Set<string>>(new Set())
  const [hoveredCardIds, setHoveredCardIds] = React.useState<Set<string>>(new Set())

  // Busca despesas pendentes e ordena por data de vencimento
  React.useEffect(() => {
    // Por enquanto usa dados fictícios
    // TODO: No futuro, buscar do contexto baseado em:
    // - Transações com status "pending" do tipo "expense"
    // - Transações recorrentes que precisam de nova ocorrência
    // - Parcelas pendentes de compras parceladas
    
    const mockExpenses = generateMockPendingExpenses(
      bankAccounts,
      creditCards,
      categories.map((c) => ({ id: c.id, name: c.name }))
    )

    // Ordena por data de vencimento (mais próximas primeiro)
    const sorted = mockExpenses.sort((a, b) => {
      return a.dueDate.getTime() - b.dueDate.getTime()
    })

    setPendingExpenses(sorted)
  }, [bankAccounts, creditCards, categories])

  /**
   * Marca uma despesa como paga
   */
  const handleMarkAsPaid = React.useCallback(
    async (expense: PendingExpense) => {
      setProcessingIds((prev) => new Set(prev).add(expense.id))

      try {
        // 1. Marca a despesa como paga (se existir transação correspondente)
        const existingTransaction = transactions.find(
          (tx) =>
            tx.type === "expense" &&
            tx.description === expense.description &&
            tx.status === "pending"
        )

        if (existingTransaction) {
          updateTransaction(existingTransaction.id, { status: "paid" })
        } else {
          // Cria nova transação marcada como paga
          addTransaction({
            memberId: expense.memberId,
            date: new Date(),
            description: expense.description,
            amount: expense.amount,
            type: "expense",
            categoryId: expense.categoryId,
            accountId: expense.accountId,
            creditCardId: expense.creditCardId,
            installments: expense.installments,
            status: "paid",
          })
        }

        // 2. Se for recorrente, cria nova ocorrência para o próximo mês
        if (expense.isRecurring && expense.recurringInterval === "monthly") {
          const nextMonth = new Date(expense.dueDate)
          nextMonth.setMonth(nextMonth.getMonth() + 1)

          addTransaction({
            memberId: expense.memberId,
            date: nextMonth,
            description: expense.description,
            amount: expense.amount,
            type: "expense",
            categoryId: expense.categoryId,
            accountId: expense.accountId,
            creditCardId: expense.creditCardId,
            status: "pending",
          })
        }

        // 3. Se for parcelada, verifica se há próxima parcela
        if (expense.installments && expense.installments.current < expense.installments.total) {
          const nextInstallment = expense.installments.current + 1
          const nextMonth = new Date(expense.dueDate)
          nextMonth.setMonth(nextMonth.getMonth() + 1)

          addTransaction({
            memberId: expense.memberId,
            date: nextMonth,
            description: `${expense.description} (${nextInstallment}/${expense.installments.total})`,
            amount: expense.amount,
            type: "expense",
            categoryId: expense.categoryId,
            accountId: expense.accountId,
            creditCardId: expense.creditCardId,
            installments: {
              current: nextInstallment,
              total: expense.installments.total,
            },
            status: "pending",
          })
        }

        // 4. Anima e remove da lista
        setTimeout(() => {
          setRemovingIds((prev) => new Set(prev).add(expense.id))
          
          setTimeout(() => {
            setPendingExpenses((prev) => prev.filter((e) => e.id !== expense.id))
            setRemovingIds((prev) => {
              const next = new Set(prev)
              next.delete(expense.id)
              return next
            })
            setProcessingIds((prev) => {
              const next = new Set(prev)
              next.delete(expense.id)
              return next
            })
          }, 300) // Tempo da animação de fade out
        }, 200) // Delay para animação do botão

        // 5. Mostra mensagem de confirmação
        toast.success("Despesa marcada como paga!")
      } catch (error) {
        console.error("Erro ao marcar despesa como paga:", error)
        toast.error("Erro ao processar pagamento")
        setProcessingIds((prev) => {
          const next = new Set(prev)
          next.delete(expense.id)
          return next
        })
      }
    },
    [transactions, updateTransaction, addTransaction]
  )

  /**
   * Abre modal de adicionar nova transação
   */
  const [showNewTransactionModal, setShowNewTransactionModal] = React.useState(false)

  const handleAddTransaction = React.useCallback(() => {
    setShowNewTransactionModal(true)
  }, [])

  // Filtra despesas que não estão sendo removidas
  const visibleExpenses = pendingExpenses.filter((e) => !removingIds.has(e.id))

  return (
    <Card className="py-4">
      <CardHeader className="!flex !flex-row items-center justify-between pb-4 px-6 !grid-cols-none">
        <CardTitle className="flex items-center gap-2 text-base">
          <IconCreditCard className="size-5" />
          Próximas despesas
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={handleAddTransaction}
        >
          <IconPlus className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 px-4">
        {visibleExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <IconCheck className="size-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Nenhuma despesa pendente
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Todas as suas despesas estão em dia!
            </p>
          </div>
        ) : (
          visibleExpenses.map((expense, index) => {
            const isRemoving = removingIds.has(expense.id)
            const isProcessing = processingIds.has(expense.id)
            const paymentOrigin = formatPaymentOrigin(
              expense.accountId,
              expense.creditCardId,
              bankAccounts,
              creditCards
            )

            const isHovered = hoveredCardIds.has(expense.id)

            return (
              <div
                key={expense.id}
                className={`group flex items-center justify-between rounded-lg border p-3 transition-all ${
                  isRemoving
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
                style={{
                  transitionDuration: isRemoving ? "300ms" : "200ms",
                }}
                onMouseEnter={() => setHoveredCardIds((prev) => new Set(prev).add(expense.id))}
                onMouseLeave={() => setHoveredCardIds((prev) => {
                  const next = new Set(prev)
                  next.delete(expense.id)
                  return next
                })}
              >
                <div className="flex-1">
                  <div className="font-medium">{expense.description}</div>
                  <div className="text-sm text-muted-foreground">
                    Vence dia {expense.dueDate.getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground">{paymentOrigin}</div>
                  {expense.installments && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Parcela {expense.installments.current}/{expense.installments.total}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    {formatCurrency(expense.amount)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 w-8 p-0 transition-all ${
                      isProcessing
                        ? "scale-110 bg-primary text-primary-foreground ring-2 ring-primary/20"
                        : isHovered
                        ? "bg-muted/50 border-primary/50 shadow-sm"
                        : ""
                    }`}
                    onClick={() => handleMarkAsPaid(expense)}
                    disabled={isProcessing || isRemoving}
                  >
                    <IconCheck 
                      className={`size-4 transition-colors ${
                        isProcessing 
                          ? "text-primary-foreground" 
                          : isHovered
                          ? "text-[hsl(var(--success))]"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </CardContent>

      {/* Modal de Nova Transação */}
      <NewTransactionModal
        open={showNewTransactionModal}
        onOpenChange={setShowNewTransactionModal}
      />
    </Card>
  )
}
