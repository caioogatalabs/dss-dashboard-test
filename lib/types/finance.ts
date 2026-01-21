// Tipos base do sistema financeiro

export type TransactionType = "income" | "expense"
export type TransactionStatus = "paid" | "pending" | "overdue"

export interface FamilyMember {
  id: string
  name: string
  email: string
  avatar: string
  color: string
}

export interface Category {
  id: string
  name: string
  type: TransactionType
  color: string
  icon?: string
}

export interface BankAccount {
  id: string
  name: string
  bank: string
  balance: number
  accountNumber: string
  color: string
}

export interface CreditCard {
  id: string
  name: string
  bank: string
  limit: number
  currentBalance: number
  closingDay: number
  dueDay: number
  lastDigits: string
  color: string
}

export interface Transaction {
  id: string
  memberId: string
  date: Date
  description: string
  amount: number
  type: TransactionType
  categoryId: string
  accountId?: string
  creditCardId?: string
  installments?: {
    current: number
    total: number
  }
  status: TransactionStatus
  notes?: string
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: Date
  color: string
  icon?: string
}

export interface DateRange {
  startDate: Date
  endDate: Date
}

export interface FilterState {
  selectedMember: string | null
  dateRange: DateRange
  transactionType: "all" | TransactionType
  searchText: string
}

export interface ExpenseByCategory {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
  color: string
}
