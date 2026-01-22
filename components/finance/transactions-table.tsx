"use client"

import * as React from "react"
import {
  IconArrowDown,
  IconArrowDownLeft,
  IconArrowUp,
  IconArrowUpRight,
  IconSearch,
  IconUser,
} from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Transaction } from "@/lib/types/finance"

/**
 * Formata valor monetário em Real brasileiro
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/**
 * Formata data como DD/MM/AAAA
 */
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Obtém nome da conta/cartão vinculado à transação
 */
function getAccountOrCardName(
  transaction: Transaction,
  bankAccounts: ReturnType<typeof useFinance>["bankAccounts"],
  creditCards: ReturnType<typeof useFinance>["creditCards"]
): string {
  if (transaction.accountId) {
    const account = bankAccounts.find((a) => a.id === transaction.accountId)
    if (account) {
      return account.name || account.bank
    }
  }

  if (transaction.creditCardId) {
    const card = creditCards.find((c) => c.id === transaction.creditCardId)
    if (card) {
      return card.name || card.bank
    }
  }

  return "Desconhecido"
}

/**
 * Formata parcelas
 */
function formatInstallments(installments?: { current: number; total: number }): string {
  if (!installments || installments.total === 1) {
    return "-"
  }
  return `${installments.total}x`
}

type SortKey = "date" | "amount" | "description"
type SortOrder = "asc" | "desc"

interface TransactionsTableProps {
  /** Quando informado, usa esta lista em vez de getFilteredTransactions */
  transactions?: Transaction[]
  /** Linhas por página na paginação "ver mais" */
  linesPerPage?: number
  /** Oculta filtros de busca e tipo (uso em modo expandido) */
  hideFilters?: boolean
  /** Habilita ordenação pelos headers Data, Valor, Descrição */
  sortable?: boolean
  className?: string
}

/**
 * Componente de Tabela de Transações Detalhada
 *
 * Exibe transações com filtros globais e locais, ordenação por data,
 * paginação de "ver mais" e formatação completa das colunas.
 */
export function TransactionsTable({
  transactions: propTransactions,
  linesPerPage = 5,
  hideFilters = false,
  sortable = false,
  className,
}: TransactionsTableProps = {}) {
  const {
    getFilteredTransactions,
    categories,
    familyMembers,
    bankAccounts,
    creditCards,
  } = useFinance()

  const [searchText, setSearchText] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<"all" | "income" | "expense">("all")
  const [visibleCount, setVisibleCount] = React.useState(linesPerPage)
  const [sortKey, setSortKey] = React.useState<SortKey>("date")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("desc")

  const baseTransactions = React.useMemo(
    () => (propTransactions ?? getFilteredTransactions()),
    [propTransactions, getFilteredTransactions]
  )

  const localFilteredTransactions = React.useMemo(() => {
    let filtered = baseTransactions
    if (hideFilters) return filtered
    if (typeFilter !== "all") filtered = filtered.filter((tx) => tx.type === typeFilter)
    if (searchText.trim()) {
      const q = searchText.toLowerCase().trim()
      filtered = filtered.filter((tx) => {
        const matchDesc = tx.description.toLowerCase().includes(q)
        const cat = categories.find((c) => c.id === tx.categoryId)
        return matchDesc || (cat?.name.toLowerCase().includes(q) ?? false)
      })
    }
    return filtered
  }, [baseTransactions, hideFilters, typeFilter, searchText, categories])

  const sortedTransactions = React.useMemo(() => {
    const arr = [...localFilteredTransactions]
    arr.sort((a, b) => {
      let cmp = 0
      if (sortKey === "date") {
        cmp = a.date.getTime() - b.date.getTime()
      } else if (sortKey === "amount") {
        cmp = a.amount - b.amount
      } else {
        cmp = a.description.localeCompare(b.description)
      }
      return sortOrder === "asc" ? cmp : -cmp
    })
    return arr
  }, [localFilteredTransactions, sortKey, sortOrder])

  const visibleTransactions = React.useMemo(
    () => sortedTransactions.slice(0, visibleCount),
    [sortedTransactions, visibleCount]
  )

  React.useEffect(() => {
    setVisibleCount(linesPerPage)
  }, [linesPerPage, searchText, typeFilter, baseTransactions.length])

  const handleLoadMore = React.useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + linesPerPage, sortedTransactions.length))
  }, [linesPerPage, sortedTransactions.length])

  const toggleSort = (key: SortKey) => {
    if (!sortable) return
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortOrder(key === "date" || key === "amount" ? "desc" : "asc")
    }
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (!sortable || sortKey !== column) return null
    return sortOrder === "asc" ? (
      <IconArrowUp className="ml-1 inline size-3.5" />
    ) : (
      <IconArrowDown className="ml-1 inline size-3.5" />
    )
  }

  const hasMore = visibleCount < sortedTransactions.length
  const totalCount = sortedTransactions.length

  return (
    <div className={className ?? "space-y-4"}>
      {!hideFilters && (
        <div className="flex items-center gap-2">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar lançamentos"
              className="max-w-sm pl-9"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(v: "all" | "income" | "expense") => setTypeFilter(v)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="expense">Despesas</SelectItem>
              <SelectItem value="income">Receitas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead
                className={`w-[100px] ${sortable ? "cursor-pointer select-none" : ""}`}
                onClick={() => toggleSort("date")}
              >
                Data
                <SortIcon column="date" />
              </TableHead>
              <TableHead
                className={sortable ? "cursor-pointer select-none" : ""}
                onClick={() => toggleSort("description")}
              >
                Descrição
                <SortIcon column="description" />
              </TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Conta/Cartão</TableHead>
              <TableHead className="w-[80px]">Parcelas</TableHead>
              <TableHead
                className={`text-right ${sortable ? "cursor-pointer select-none" : ""}`}
                onClick={() => toggleSort("amount")}
              >
                Valor
                <SortIcon column="amount" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <p className="text-muted-foreground">Nenhum lançamento encontrado.</p>
                </TableCell>
              </TableRow>
            ) : (
              visibleTransactions.map((transaction) => {
                const member = familyMembers.find((m) => m.id === transaction.memberId)
                const category = categories.find((c) => c.id === transaction.categoryId)
                const accountOrCardName = getAccountOrCardName(
                  transaction,
                  bankAccounts,
                  creditCards
                )
                const isIncome = transaction.type === "income"

                return (
                  <TableRow key={transaction.id}>
                    {/* Avatar */}
                    <TableCell className="w-[50px]">
                      <Avatar className="size-6">
                        <AvatarImage src={member?.avatar} />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          {member?.avatar && member.avatar.trim() ? (
                            member.name.substring(0, 2).toUpperCase()
                          ) : (
                            <IconUser className="size-3" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    {/* Data */}
                    <TableCell className="w-[100px] text-muted-foreground">
                      {formatDate(transaction.date)}
                    </TableCell>

                    {/* Descrição */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex size-5 items-center justify-center rounded-full ${
                            isIncome
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {isIncome ? (
                            <IconArrowDownLeft className="size-3" />
                          ) : (
                            <IconArrowUpRight className="size-3" />
                          )}
                        </div>
                        <span className="font-semibold text-foreground">
                          {transaction.description}
                        </span>
                      </div>
                    </TableCell>

                    {/* Categoria */}
                    <TableCell>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        {category?.name || "Sem categoria"}
                      </Badge>
                    </TableCell>

                    {/* Conta/Cartão */}
                    <TableCell className="text-muted-foreground">
                      {accountOrCardName}
                    </TableCell>

                    {/* Parcelas */}
                    <TableCell className="w-[80px] text-muted-foreground">
                      {formatInstallments(transaction.installments)}
                    </TableCell>

                    {/* Valor */}
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          isIncome ? "text-green-600 dark:text-green-400" : "text-foreground"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação "Ver mais" */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {Math.min(visibleCount, totalCount)} de {totalCount}
          </div>
          {hasMore && (
            <Button variant="outline" onClick={handleLoadMore}>
              Ver mais
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
