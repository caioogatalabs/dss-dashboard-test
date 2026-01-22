"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { IconChevronDown, IconReceipt, IconSearch, IconPlus } from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRangePicker } from "@/components/ui/date-picker"
import { TransactionsTable } from "@/components/finance/transactions-table"
import type { Transaction } from "@/lib/types/finance"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function formatDate(date: Date): string {
  const d = date instanceof Date ? date : new Date(date)
  return format(d, "dd/MM/yyyy", { locale: ptBR })
}

function toCSV(txs: Transaction[], categories: { id: string; name: string }[], bankAccounts: { id: string; name: string; bank: string }[], creditCards: { id: string; name: string; bank: string }[]): string {
  const headers = "Data;Descrição;Tipo;Categoria;Conta/Cartão;Valor;Status"
  const getCat = (id: string) => categories.find((c) => c.id === id)?.name ?? ""
  const getAccount = (tx: Transaction) => {
    if (tx.accountId) {
      const a = bankAccounts.find((x) => x.id === tx.accountId)
      return a ? a.name || a.bank : ""
    }
    if (tx.creditCardId) {
      const c = creditCards.find((x) => x.id === tx.creditCardId)
      return c ? c.name || c.bank : ""
    }
    return ""
  }
  const rows = txs.map((tx) =>
    [
      formatDate(tx.date),
      `"${(tx.description || "").replace(/"/g, '""')}"`,
      tx.type === "income" ? "Receita" : "Despesa",
      getCat(tx.categoryId),
      getAccount(tx),
      tx.amount.toFixed(2).replace(".", ","),
      tx.status === "paid" ? "Concluído" : tx.status === "pending" ? "Pendente" : "Atrasado",
    ].join(";")
  )
  return [headers, ...rows].join("\r\n")
}

interface TransactionsViewProps {
  onAddFirst?: () => void
}

export function TransactionsView({ onAddFirst }: TransactionsViewProps = {}) {
  const {
    getFilteredTransactions,
    categories,
    familyMembers,
    bankAccounts,
    creditCards,
  } = useFinance()

  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<"all" | "income" | "expense">("all")
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<Set<string>>(new Set())
  const [selectedAccountIds, setSelectedAccountIds] = React.useState<Set<string>>(new Set())
  const [selectedMemberIds, setSelectedMemberIds] = React.useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = React.useState<"all" | "paid" | "pending">("all")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)
  const [exporting, setExporting] = React.useState(false)

  const base = React.useMemo(() => getFilteredTransactions(), [getFilteredTransactions])

  const toggleSet = (set: Set<string>, id: string, checked: boolean) => {
    const next = new Set(set)
    if (checked) next.add(id)
    else next.delete(id)
    return next
  }

  const filtered = React.useMemo(() => {
    let txs = base

    if (typeFilter !== "all") txs = txs.filter((t) => t.type === typeFilter)
    if (selectedCategoryIds.size > 0) {
      txs = txs.filter((t) => selectedCategoryIds.has(t.categoryId))
    }
    if (selectedMemberIds.size > 0) {
      txs = txs.filter((t) => selectedMemberIds.has(t.memberId))
    }
    if (selectedAccountIds.size > 0) {
      txs = txs.filter((t) => {
        if (t.accountId && selectedAccountIds.has(t.accountId)) return true
        if (t.creditCardId && selectedAccountIds.has(t.creditCardId)) return true
        return false
      })
    }
    if (statusFilter !== "all") txs = txs.filter((t) => t.status === statusFilter)

    if (dateRange?.from) {
      const from = dateRange.from
      const to = dateRange.to ?? from
      txs = txs.filter((t) => {
        const d = t.date instanceof Date ? t.date : new Date(t.date)
        return d >= from && d <= to
      })
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      txs = txs.filter((t) => {
        const desc = t.description.toLowerCase().includes(q)
        const cat = categories.find((c) => c.id === t.categoryId)
        const catMatch = cat?.name.toLowerCase().includes(q) ?? false
        return desc || catMatch
      })
    }

    return txs
  }, [base, typeFilter, selectedCategoryIds, selectedMemberIds, selectedAccountIds, statusFilter, dateRange, search, categories])

  const totalIncome = React.useMemo(
    () => filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [filtered]
  )
  const totalExpenses = React.useMemo(
    () => filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [filtered]
  )
  const difference = totalIncome - totalExpenses

  const handleExport = () => {
    setExporting(true)
    const csv = toCSV(filtered, categories, bankAccounts, creditCards)
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `transacoes-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
    setExporting(false)
  }

  const accountOptions = React.useMemo(() => {
    const items: { id: string; label: string }[] = []
    bankAccounts.forEach((a) => items.push({ id: a.id, label: a.name || a.bank }))
    creditCards.forEach((c) => items.push({ id: c.id, label: c.name || c.bank }))
    return items
  }, [bankAccounts, creditCards])

  const expenseCategories = React.useMemo(
    () => categories.filter((c) => c.type === "expense"),
    [categories]
  )

  if (base.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/30 p-12">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <IconReceipt className="size-8 text-muted-foreground" />
        </div>
        <div className="space-y-1 text-center">
          <h3 className="font-semibold">Nenhuma transação registrada ainda</h3>
          <p className="text-sm text-muted-foreground">
            Adicione sua primeira transação para começar o controle.
          </p>
        </div>
        <Button className="gap-2" onClick={onAddFirst}>
          <IconPlus className="size-4" />
          Adicionar primeira transação
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Filtros */}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <div className="relative flex-1 sm:max-w-[200px]">
            <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={(v: "all" | "income" | "expense") => setTypeFilter(v)}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Receitas</SelectItem>
              <SelectItem value="expense">Despesas</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between sm:w-[180px]">
                {selectedCategoryIds.size === 0
                  ? "Categoria"
                  : `Categoria (${selectedCategoryIds.size})`}
                <IconChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[280px] overflow-y-auto sm:w-[200px]">
              {expenseCategories.map((c) => (
                <DropdownMenuCheckboxItem
                  key={c.id}
                  checked={selectedCategoryIds.has(c.id)}
                  onCheckedChange={(checked) =>
                    setSelectedCategoryIds((prev) => toggleSet(prev, c.id, !!checked))
                  }
                >
                  {c.name}
                </DropdownMenuCheckboxItem>
              ))}
              {expenseCategories.length === 0 && (
                <span className="px-2 py-3 text-sm text-muted-foreground">
                  Nenhuma categoria de despesa
                </span>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between sm:w-[180px]">
                {selectedAccountIds.size === 0
                  ? "Conta/Cartão"
                  : `Conta/Cartão (${selectedAccountIds.size})`}
                <IconChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[280px] overflow-y-auto sm:w-[220px]">
              {accountOptions.map((o) => (
                <DropdownMenuCheckboxItem
                  key={o.id}
                  checked={selectedAccountIds.has(o.id)}
                  onCheckedChange={(checked) =>
                    setSelectedAccountIds((prev) => toggleSet(prev, o.id, !!checked))
                  }
                >
                  {o.label}
                </DropdownMenuCheckboxItem>
              ))}
              {accountOptions.length === 0 && (
                <span className="px-2 py-3 text-sm text-muted-foreground">
                  Nenhuma conta ou cartão
                </span>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between sm:w-[160px]">
                {selectedMemberIds.size === 0
                  ? "Membros"
                  : `Membros (${selectedMemberIds.size})`}
                <IconChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[280px] overflow-y-auto sm:w-[200px]">
              {familyMembers.map((m) => (
                <DropdownMenuCheckboxItem
                  key={m.id}
                  checked={selectedMemberIds.has(m.id)}
                  onCheckedChange={(checked) =>
                    setSelectedMemberIds((prev) => toggleSet(prev, m.id, !!checked))
                  }
                >
                  {m.name}
                </DropdownMenuCheckboxItem>
              ))}
              {familyMembers.length === 0 && (
                <span className="px-2 py-3 text-sm text-muted-foreground">
                  Nenhum membro
                </span>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Select value={statusFilter} onValueChange={(v: "all" | "paid" | "pending") => setStatusFilter(v)}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="paid">Concluído</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            placeholder="Período"
            className="w-full sm:w-[240px]"
            numberOfMonths={2}
          />
        </div>

        {/* Resumo + Exportar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-muted/30 px-4 py-3">
          <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Receitas: <strong className="text-foreground">{formatCurrency(totalIncome)}</strong>
          </span>
          <span className="text-sm text-muted-foreground">
            Despesas: <strong className="text-foreground">{formatCurrency(totalExpenses)}</strong>
          </span>
          <span
            className={`text-sm font-semibold ${
              difference >= 0 ? "text-green-600 dark:text-green-400" : "text-destructive"
            }`}
          >
            Diferença: {difference >= 0 ? "+" : "-"}
            {formatCurrency(Math.abs(difference))}
          </span>
          <span className="text-sm text-muted-foreground">
            {filtered.length} transação(ões)
          </span>
          </div>
          <Button variant="outline" size="sm" disabled={exporting || filtered.length === 0} onClick={handleExport}>
            {exporting ? "Exportando…" : "Exportar CSV"}
          </Button>
        </div>

        {/* Tabela */}
        <div className="w-full">
          <TransactionsTable
            transactions={filtered}
            linesPerPage={10}
            hideFilters
            sortable
            className="w-full space-y-4"
          />
        </div>
      </div>
    </>
  )
}
