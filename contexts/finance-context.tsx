"use client"

import React, { createContext, useState, useMemo, useCallback } from "react"
import type {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
  Category,
  FilterState,
  ExpenseByCategory,
  TransactionType,
} from "@/lib/types/finance"

// Tipos para o contexto
interface FinanceContextType {
  // Estado principal
  transactions: Transaction[]
  goals: Goal[]
  creditCards: CreditCard[]
  bankAccounts: BankAccount[]
  familyMembers: FamilyMember[]
  categories: Category[]

  // Filtros
  filters: FilterState

  // CRUD Transactions
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // CRUD Goals
  addGoal: (goal: Omit<Goal, "id">) => void
  updateGoal: (id: string, goal: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // CRUD Credit Cards
  addCreditCard: (card: Omit<CreditCard, "id">) => void
  updateCreditCard: (id: string, card: Partial<CreditCard>) => void
  deleteCreditCard: (id: string) => void

  // CRUD Bank Accounts
  addBankAccount: (account: Omit<BankAccount, "id">) => void
  updateBankAccount: (id: string, account: Partial<BankAccount>) => void
  deleteBankAccount: (id: string) => void

  // CRUD Family Members
  addFamilyMember: (member: Omit<FamilyMember, "id">) => void
  updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void
  deleteFamilyMember: (id: string) => void

  // Filtros
  setSelectedMember: (memberId: string | null) => void
  setDateRange: (startDate: Date, endDate: Date) => void
  setTransactionType: (type: "all" | TransactionType) => void
  setSearchText: (text: string) => void
  clearFilters: () => void

  // Cálculos derivados
  getFilteredTransactions: () => Transaction[]
  calculateTotalBalance: () => number
  calculateIncomeForPeriod: () => number
  calculateExpensesForPeriod: () => number
  calculateExpensesByCategory: () => ExpenseByCategory[]
  calculateCategoryPercentage: (categoryId: string) => number
  calculateSavingsRate: () => number
}

// Dados iniciais mock
const initialFamilyMembers: FamilyMember[] = [
  {
    id: "member-1",
    name: "Caio Silva",
    email: "caio@exemplo.com",
    avatar: "",
    color: "#5E33FF",
  },
  {
    id: "member-2",
    name: "Maria Silva",
    email: "maria@exemplo.com",
    avatar: "",
    color: "#E18650",
  },
  {
    id: "member-3",
    name: "João Silva",
    email: "joao@exemplo.com",
    avatar: "",
    color: "#7BC2D6",
  },
]

const initialCategories: Category[] = [
  { id: "cat-1", name: "Alimentação", type: "expense", color: "#E18650" },
  { id: "cat-2", name: "Transporte", type: "expense", color: "#E36756" },
  { id: "cat-3", name: "Moradia", type: "expense", color: "#7BC2D6" },
  { id: "cat-4", name: "Saúde", type: "expense", color: "#3AB208" },
  { id: "cat-5", name: "Educação", type: "expense", color: "#5E33FF" },
  { id: "cat-6", name: "Lazer", type: "expense", color: "#E18650" },
  { id: "cat-7", name: "Compras", type: "expense", color: "#7BC2D6" },
  { id: "cat-8", name: "Serviços", type: "expense", color: "#E36756" },
  { id: "cat-9", name: "Outros", type: "expense", color: "#999999" },
  { id: "cat-10", name: "Salário", type: "income", color: "#3AB208" },
  { id: "cat-11", name: "Freelance", type: "income", color: "#7BC2D6" },
  { id: "cat-12", name: "Investimentos", type: "income", color: "#5E33FF" },
]

const initialBankAccounts: BankAccount[] = [
  {
    id: "acc-1",
    name: "Conta Corrente Principal",
    bank: "Nubank",
    balance: 15420.50,
    accountNumber: "0001-12345",
    color: "#820AD1",
  },
  {
    id: "acc-2",
    name: "Conta Poupança",
    bank: "Banco do Brasil",
    balance: 8750.00,
    accountNumber: "1234-5",
    color: "#FFEB00",
  },
  {
    id: "acc-3",
    name: "Conta Investimentos",
    bank: "XP Investimentos",
    balance: 32100.00,
    accountNumber: "987654",
    color: "#000000",
  },
]

const initialCreditCards: CreditCard[] = [
  {
    id: "card-1",
    name: "Nubank Ultravioleta",
    bank: "Nubank",
    limit: 15000,
    currentBalance: 4235.80,
    closingDay: 15,
    dueDay: 25,
    lastDigits: "4521",
    color: "#820AD1",
  },
  {
    id: "card-2",
    name: "C6 Carbon",
    bank: "C6 Bank",
    limit: 10000,
    currentBalance: 2890.40,
    closingDay: 10,
    dueDay: 20,
    lastDigits: "8765",
    color: "#000000",
  },
  {
    id: "card-3",
    name: "XP Visa Infinite",
    bank: "XP",
    limit: 20000,
    currentBalance: 1560.20,
    closingDay: 5,
    dueDay: 15,
    lastDigits: "3344",
    color: "#E8B931",
  },
]

const initialGoals: Goal[] = [
  {
    id: "goal-1",
    name: "Viagem para Europa",
    targetAmount: 25000,
    currentAmount: 8500,
    deadline: new Date(2026, 6, 1),
    color: "#5E33FF",
  },
  {
    id: "goal-2",
    name: "Reserva de Emergência",
    targetAmount: 30000,
    currentAmount: 18200,
    deadline: new Date(2026, 11, 31),
    color: "#3AB208",
  },
  {
    id: "goal-3",
    name: "Entrada do Apartamento",
    targetAmount: 80000,
    currentAmount: 32400,
    deadline: new Date(2027, 5, 1),
    color: "#7BC2D6",
  },
  {
    id: "goal-4",
    name: "Curso de Inglês",
    targetAmount: 5000,
    currentAmount: 3200,
    deadline: new Date(2026, 3, 15),
    color: "#E18650",
  },
]

const initialTransactions: Transaction[] = [
  // Janeiro 2026
  {
    id: "tx-1",
    memberId: "member-1",
    date: new Date(2026, 0, 5),
    description: "Salário Janeiro",
    amount: 12000,
    type: "income",
    categoryId: "cat-10",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-2",
    memberId: "member-2",
    date: new Date(2026, 0, 5),
    description: "Salário Janeiro",
    amount: 9500,
    type: "income",
    categoryId: "cat-10",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-3",
    memberId: "member-1",
    date: new Date(2026, 0, 8),
    description: "Aluguel Janeiro",
    amount: 3500,
    type: "expense",
    categoryId: "cat-3",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-4",
    memberId: "member-1",
    date: new Date(2026, 0, 10),
    description: "Condomínio",
    amount: 850,
    type: "expense",
    categoryId: "cat-3",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-5",
    memberId: "member-2",
    date: new Date(2026, 0, 12),
    description: "Supermercado Extra",
    amount: 620.50,
    type: "expense",
    categoryId: "cat-1",
    creditCardId: "card-1",
    status: "paid",
  },
  {
    id: "tx-6",
    memberId: "member-1",
    date: new Date(2026, 0, 14),
    description: "Gasolina",
    amount: 280,
    type: "expense",
    categoryId: "cat-2",
    creditCardId: "card-2",
    status: "paid",
  },
  {
    id: "tx-7",
    memberId: "member-3",
    date: new Date(2026, 0, 15),
    description: "Mensalidade Escola",
    amount: 1200,
    type: "expense",
    categoryId: "cat-5",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-8",
    memberId: "member-2",
    date: new Date(2026, 0, 16),
    description: "Conta de Luz",
    amount: 185.40,
    type: "expense",
    categoryId: "cat-3",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-9",
    memberId: "member-1",
    date: new Date(2026, 0, 18),
    description: "Freelance - Design",
    amount: 3500,
    type: "income",
    categoryId: "cat-11",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-10",
    memberId: "member-2",
    date: new Date(2026, 0, 20),
    description: "Restaurante Outback",
    amount: 285.90,
    type: "expense",
    categoryId: "cat-6",
    creditCardId: "card-1",
    status: "paid",
  },
  // Dezembro 2025
  {
    id: "tx-11",
    memberId: "member-1",
    date: new Date(2025, 11, 5),
    description: "Salário Dezembro",
    amount: 12000,
    type: "income",
    categoryId: "cat-10",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-12",
    memberId: "member-2",
    date: new Date(2025, 11, 10),
    description: "Netflix",
    amount: 55.90,
    type: "expense",
    categoryId: "cat-6",
    creditCardId: "card-1",
    status: "paid",
  },
  {
    id: "tx-13",
    memberId: "member-1",
    date: new Date(2025, 11, 15),
    description: "Plano de Saúde",
    amount: 890,
    type: "expense",
    categoryId: "cat-4",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-14",
    memberId: "member-2",
    date: new Date(2025, 11, 18),
    description: "Farmácia",
    amount: 156.80,
    type: "expense",
    categoryId: "cat-4",
    creditCardId: "card-2",
    status: "paid",
  },
  {
    id: "tx-15",
    memberId: "member-1",
    date: new Date(2025, 11, 20),
    description: "Uber",
    amount: 45.30,
    type: "expense",
    categoryId: "cat-2",
    creditCardId: "card-3",
    status: "paid",
  },
  // Novembro 2025
  {
    id: "tx-16",
    memberId: "member-1",
    date: new Date(2025, 10, 5),
    description: "Salário Novembro",
    amount: 12000,
    type: "income",
    categoryId: "cat-10",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-17",
    memberId: "member-2",
    date: new Date(2025, 10, 8),
    description: "Academia - Smartfit",
    amount: 89.90,
    type: "expense",
    categoryId: "cat-4",
    creditCardId: "card-1",
    status: "paid",
  },
  {
    id: "tx-18",
    memberId: "member-1",
    date: new Date(2025, 10, 12),
    description: "iFood",
    amount: 68.50,
    type: "expense",
    categoryId: "cat-1",
    creditCardId: "card-2",
    status: "paid",
  },
  {
    id: "tx-19",
    memberId: "member-2",
    date: new Date(2025, 10, 15),
    description: "Presente Aniversário",
    amount: 320,
    type: "expense",
    categoryId: "cat-7",
    creditCardId: "card-1",
    installments: { current: 1, total: 3 },
    status: "paid",
  },
  {
    id: "tx-20",
    memberId: "member-1",
    date: new Date(2025, 10, 22),
    description: "Manutenção Carro",
    amount: 580,
    type: "expense",
    categoryId: "cat-2",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-21",
    memberId: "member-1",
    date: new Date(2025, 10, 25),
    description: "Freelance - Consultoria",
    amount: 2800,
    type: "income",
    categoryId: "cat-11",
    accountId: "acc-1",
    status: "paid",
  },
  {
    id: "tx-22",
    memberId: "member-2",
    date: new Date(2025, 10, 28),
    description: "Supermercado Carrefour",
    amount: 485.20,
    type: "expense",
    categoryId: "cat-1",
    creditCardId: "card-1",
    status: "paid",
  },
  {
    id: "tx-23",
    memberId: "member-3",
    date: new Date(2025, 10, 30),
    description: "Material Escolar",
    amount: 220,
    type: "expense",
    categoryId: "cat-5",
    creditCardId: "card-2",
    status: "paid",
  },
]

// Context
export const FinanceContext = createContext<FinanceContextType | undefined>(
  undefined
)

// Provider
export function FinanceProvider({ children }: { children: React.ReactNode }) {
  // Estados principais
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [creditCards, setCreditCards] = useState<CreditCard[]>(initialCreditCards)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(initialBankAccounts)
  const [familyMembers] = useState<FamilyMember[]>(initialFamilyMembers)
  const [categories] = useState<Category[]>(initialCategories)

  // Estado de filtros
  const [filters, setFilters] = useState<FilterState>({
    selectedMember: null,
    dateRange: {
      startDate: new Date(2025, 10, 1), // 1 Nov 2025
      endDate: new Date(2026, 0, 31), // 31 Jan 2026
    },
    transactionType: "all",
    searchText: "",
  })

  // ============ CRUD TRANSACTIONS ============
  const addTransaction = useCallback((transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}`,
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }, [])

  const updateTransaction = useCallback(
    (id: string, transaction: Partial<Transaction>) => {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === id ? { ...tx, ...transaction } : tx))
      )
    },
    []
  )

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id))
  }, [])

  // ============ CRUD GOALS ============
  const addGoal = useCallback((goal: Omit<Goal, "id">) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal-${Date.now()}`,
    }
    setGoals((prev) => [newGoal, ...prev])
  }, [])

  const updateGoal = useCallback((id: string, goal: Partial<Goal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...goal } : g)))
  }, [])

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }, [])

  // ============ CRUD CREDIT CARDS ============
  const addCreditCard = useCallback((card: Omit<CreditCard, "id">) => {
    const newCard: CreditCard = {
      ...card,
      id: `card-${Date.now()}`,
    }
    setCreditCards((prev) => [newCard, ...prev])
  }, [])

  const updateCreditCard = useCallback(
    (id: string, card: Partial<CreditCard>) => {
      setCreditCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...card } : c))
      )
    },
    []
  )

  const deleteCreditCard = useCallback((id: string) => {
    setCreditCards((prev) => prev.filter((c) => c.id !== id))
  }, [])

  // ============ CRUD BANK ACCOUNTS ============
  const addBankAccount = useCallback((account: Omit<BankAccount, "id">) => {
    const newAccount: BankAccount = {
      ...account,
      id: `acc-${Date.now()}`,
    }
    setBankAccounts((prev) => [newAccount, ...prev])
  }, [])

  const updateBankAccount = useCallback(
    (id: string, account: Partial<BankAccount>) => {
      setBankAccounts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...account } : a))
      )
    },
    []
  )

  const deleteBankAccount = useCallback((id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id))
  }, [])

  // ============ CRUD FAMILY MEMBERS ============
  const addFamilyMember = useCallback((member: Omit<FamilyMember, "id">) => {
    const newMember: FamilyMember = {
      ...member,
      id: `member-${Date.now()}`,
    }
    // Como familyMembers é const, aqui seria necessário torná-lo state
    // Para simplificar, não implementamos edição de membros no mock
  }, [])

  const updateFamilyMember = useCallback(
    (id: string, member: Partial<FamilyMember>) => {
      // Implementação futura
    },
    []
  )

  const deleteFamilyMember = useCallback((id: string) => {
    // Implementação futura
  }, [])

  // ============ FILTROS ============
  const setSelectedMember = useCallback((memberId: string | null) => {
    setFilters((prev) => ({ ...prev, selectedMember: memberId }))
  }, [])

  const setDateRange = useCallback((startDate: Date, endDate: Date) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { startDate, endDate },
    }))
  }, [])

  const setTransactionType = useCallback(
    (type: "all" | TransactionType) => {
      setFilters((prev) => ({ ...prev, transactionType: type }))
    },
    []
  )

  const setSearchText = useCallback((text: string) => {
    setFilters((prev) => ({ ...prev, searchText: text }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      selectedMember: null,
      dateRange: {
        startDate: new Date(2025, 10, 1),
        endDate: new Date(2026, 0, 31),
      },
      transactionType: "all",
      searchText: "",
    })
  }, [])

  // ============ CÁLCULOS DERIVADOS ============
  const getFilteredTransactions = useCallback(() => {
    return transactions.filter((tx) => {
      // Filtro por membro
      if (filters.selectedMember && tx.memberId !== filters.selectedMember) {
        return false
      }

      // Filtro por data
      if (
        tx.date < filters.dateRange.startDate ||
        tx.date > filters.dateRange.endDate
      ) {
        return false
      }

      // Filtro por tipo
      if (filters.transactionType !== "all" && tx.type !== filters.transactionType) {
        return false
      }

      // Filtro por texto (descrição e categoria)
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase()
        const category = categories.find((c) => c.id === tx.categoryId)
        const descriptionMatch = tx.description.toLowerCase().includes(searchLower)
        const categoryMatch = category?.name.toLowerCase().includes(searchLower) ?? false

        if (!descriptionMatch && !categoryMatch) {
          return false
        }
      }

      return true
    })
  }, [transactions, filters, categories])

  const calculateTotalBalance = useCallback(() => {
    const accountsTotal = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)
    const cardsDebt = creditCards.reduce(
      (sum, card) => sum + card.currentBalance,
      0
    )
    return accountsTotal - cardsDebt
  }, [bankAccounts, creditCards])

  const calculateIncomeForPeriod = useCallback(() => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesForPeriod = useCallback(() => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesByCategory = useCallback((): ExpenseByCategory[] => {
    const filtered = getFilteredTransactions().filter((tx) => tx.type === "expense")

    const categoryMap = new Map<string, number>()

    filtered.forEach((tx) => {
      const current = categoryMap.get(tx.categoryId) || 0
      categoryMap.set(tx.categoryId, current + tx.amount)
    })

    const totalExpenses = Array.from(categoryMap.values()).reduce(
      (sum, amount) => sum + amount,
      0
    )

    const result: ExpenseByCategory[] = Array.from(categoryMap.entries()).map(
      ([categoryId, amount]) => {
        const category = categories.find((c) => c.id === categoryId)
        return {
          categoryId,
          categoryName: category?.name || "Sem categoria",
          amount,
          percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
          color: category?.color || "#999999",
        }
      }
    )

    return result.sort((a, b) => b.amount - a.amount)
  }, [getFilteredTransactions, categories])

  const calculateCategoryPercentage = useCallback(
    (categoryId: string): number => {
      const totalIncome = calculateIncomeForPeriod()
      if (totalIncome === 0) return 0

      const categoryExpenses = getFilteredTransactions()
        .filter((tx) => tx.type === "expense" && tx.categoryId === categoryId)
        .reduce((sum, tx) => sum + tx.amount, 0)

      return (categoryExpenses / totalIncome) * 100
    },
    [getFilteredTransactions, calculateIncomeForPeriod]
  )

  const calculateSavingsRate = useCallback((): number => {
    const income = calculateIncomeForPeriod()
    const expenses = calculateExpensesForPeriod()

    if (income === 0) return 0

    return ((income - expenses) / income) * 100
  }, [calculateIncomeForPeriod, calculateExpensesForPeriod])

  // Valor do contexto
  const value = useMemo<FinanceContextType>(
    () => ({
      // Estado
      transactions,
      goals,
      creditCards,
      bankAccounts,
      familyMembers,
      categories,
      filters,

      // CRUD
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addGoal,
      updateGoal,
      deleteGoal,
      addCreditCard,
      updateCreditCard,
      deleteCreditCard,
      addBankAccount,
      updateBankAccount,
      deleteBankAccount,
      addFamilyMember,
      updateFamilyMember,
      deleteFamilyMember,

      // Filtros
      setSelectedMember,
      setDateRange,
      setTransactionType,
      setSearchText,
      clearFilters,

      // Cálculos
      getFilteredTransactions,
      calculateTotalBalance,
      calculateIncomeForPeriod,
      calculateExpensesForPeriod,
      calculateExpensesByCategory,
      calculateCategoryPercentage,
      calculateSavingsRate,
    }),
    [
      transactions,
      goals,
      creditCards,
      bankAccounts,
      familyMembers,
      categories,
      filters,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addGoal,
      updateGoal,
      deleteGoal,
      addCreditCard,
      updateCreditCard,
      deleteCreditCard,
      addBankAccount,
      updateBankAccount,
      deleteBankAccount,
      addFamilyMember,
      updateFamilyMember,
      deleteFamilyMember,
      setSelectedMember,
      setDateRange,
      setTransactionType,
      setSearchText,
      clearFilters,
      getFilteredTransactions,
      calculateTotalBalance,
      calculateIncomeForPeriod,
      calculateExpensesForPeriod,
      calculateExpensesByCategory,
      calculateCategoryPercentage,
      calculateSavingsRate,
    ]
  )

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  )
}
