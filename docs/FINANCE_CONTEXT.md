# Finance Context - Documentação do Sistema de Estado Global

## 📋 Visão Geral

O Finance Context é o coração do sistema de gerenciamento financeiro. Ele centraliza todo o estado da aplicação e fornece funções para manipulação e cálculos derivados.

**⚠️ IMPORTANTE**: Este sistema **NÃO** utiliza localStorage ou sessionStorage. Todo o estado é mantido **exclusivamente em memória** via React state. Os dados são temporários e existem apenas durante a sessão do navegador.

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────┐
│  app/layout.tsx                                     │
│  └─ FinanceProvider (Provider Global)               │
│     ├─ Estado: transactions, goals, cards, etc      │
│     ├─ Filtros: member, date, type, search          │
│     └─ Funções: CRUD + Cálculos derivados           │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│  useFinance() Hook                                  │
│  └─ Encapsula useContext + validação                │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│  Componentes da Aplicação                           │
│  └─ Consomem estado e funções via useFinance()      │
└─────────────────────────────────────────────────────┘
```

## 📦 Estrutura de Arquivos

```
lib/types/finance.ts           # Tipos TypeScript
contexts/finance-context.tsx   # Provider e Context
hooks/use-finance.ts           # Hook customizado
app/layout.tsx                 # Configuração do Provider
```

## 🎯 Entidades Principais

### 1. Transactions (Transações)
```typescript
interface Transaction {
  id: string
  memberId: string           // ID do membro da família
  date: Date
  description: string
  amount: number
  type: "income" | "expense"
  categoryId: string
  accountId?: string         // Conta bancária (opcional)
  creditCardId?: string      // Cartão de crédito (opcional)
  installments?: {
    current: number
    total: number
  }
  status: "paid" | "pending" | "overdue"
  notes?: string
}
```

### 2. Goals (Objetivos)
```typescript
interface Goal {
  id: string
  name: string
  targetAmount: number       // Meta em R$
  currentAmount: number      // Valor atual
  deadline: Date
  color: string
  icon?: string
}
```

### 3. Credit Cards (Cartões de Crédito)
```typescript
interface CreditCard {
  id: string
  name: string
  bank: string
  limit: number
  currentBalance: number     // Fatura atual
  closingDay: number         // Dia de fechamento
  dueDay: number            // Dia de vencimento
  lastDigits: string
  color: string
}
```

### 4. Bank Accounts (Contas Bancárias)
```typescript
interface BankAccount {
  id: string
  name: string
  bank: string
  balance: number
  accountNumber: string
  color: string
}
```

### 5. Family Members (Membros da Família)
```typescript
interface FamilyMember {
  id: string
  name: string
  email: string
  avatar: string
  color: string
}
```

## 🔧 Como Usar

### 1. Importar o Hook
```typescript
"use client"

import { useFinance } from "@/hooks/use-finance"

export default function MeuComponente() {
  const finance = useFinance()
  
  // Agora você tem acesso a todo o sistema!
}
```

### 2. Acessar o Estado
```typescript
const {
  transactions,      // Array de transações
  goals,            // Array de objetivos
  creditCards,      // Array de cartões
  bankAccounts,     // Array de contas
  familyMembers,    // Array de membros
  categories,       // Array de categorias
  filters,          // Estado dos filtros
} = useFinance()
```

### 3. Operações CRUD

#### Transactions
```typescript
const { addTransaction, updateTransaction, deleteTransaction } = useFinance()

// Adicionar
addTransaction({
  memberId: "member-1",
  date: new Date(),
  description: "Supermercado",
  amount: 250.50,
  type: "expense",
  categoryId: "cat-1",
  creditCardId: "card-1",
  status: "paid"
})

// Atualizar
updateTransaction("tx-1", { amount: 300 })

// Deletar
deleteTransaction("tx-1")
```

#### Goals
```typescript
const { addGoal, updateGoal, deleteGoal } = useFinance()

addGoal({
  name: "Viagem",
  targetAmount: 15000,
  currentAmount: 5000,
  deadline: new Date(2026, 6, 1),
  color: "#5E33FF"
})
```

#### Credit Cards & Bank Accounts
```typescript
const { 
  addCreditCard, updateCreditCard, deleteCreditCard,
  addBankAccount, updateBankAccount, deleteBankAccount 
} = useFinance()

// Mesma lógica de CRUD
```

### 4. Filtros

```typescript
const { 
  setSelectedMember,
  setDateRange,
  setTransactionType,
  setSearchText,
  clearFilters 
} = useFinance()

// Filtrar por membro
setSelectedMember("member-1")

// Filtrar por período
setDateRange(
  new Date(2026, 0, 1),  // 1 Jan 2026
  new Date(2026, 0, 31)  // 31 Jan 2026
)

// Filtrar por tipo
setTransactionType("expense")  // "all" | "income" | "expense"

// Busca textual
setSearchText("supermercado")

// Limpar todos os filtros
clearFilters()
```

### 5. Cálculos Derivados

Todas as funções de cálculo **aplicam automaticamente os filtros ativos**:

```typescript
const {
  getFilteredTransactions,
  calculateTotalBalance,
  calculateIncomeForPeriod,
  calculateExpensesForPeriod,
  calculateExpensesByCategory,
  calculateCategoryPercentage,
  calculateSavingsRate
} = useFinance()

// Transações filtradas
const transactions = getFilteredTransactions()

// Saldo total (contas - cartões)
const balance = calculateTotalBalance()

// Receitas do período filtrado
const income = calculateIncomeForPeriod()

// Despesas do período filtrado
const expenses = calculateExpensesForPeriod()

// Despesas por categoria (ordenado por valor)
const byCategory = calculateExpensesByCategory()
// Retorna: Array<{ categoryId, categoryName, amount, percentage, color }>

// Percentual de uma categoria específica
const percentage = calculateCategoryPercentage("cat-1")

// Taxa de economia (%)
const savings = calculateSavingsRate()
// Fórmula: (receitas - despesas) / receitas × 100
```

## 💡 Exemplos Práticos

### Dashboard - Cards de Resumo
```typescript
"use client"

import { useFinance } from "@/hooks/use-finance"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardSummary() {
  const {
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateSavingsRate
  } = useFinance()

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value)

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Saldo Total</CardTitle>
          <div className="text-3xl font-bold">
            {formatCurrency(calculateTotalBalance())}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Receitas</CardTitle>
          <div className="text-3xl font-bold text-green-600">
            {formatCurrency(calculateIncomeForPeriod())}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Despesas</CardTitle>
          <div className="text-3xl font-bold text-red-600">
            {formatCurrency(calculateExpensesForPeriod())}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Taxa de Economia</CardTitle>
          <div className="text-3xl font-bold">
            {calculateSavingsRate().toFixed(1)}%
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
```

### Lista de Transações com Filtros
```typescript
"use client"

import { useFinance } from "@/hooks/use-finance"
import { Button } from "@/components/ui/button"

export function TransactionsList() {
  const {
    getFilteredTransactions,
    familyMembers,
    categories,
    filters,
    setSelectedMember,
    setTransactionType
  } = useFinance()

  const transactions = getFilteredTransactions()

  return (
    <div>
      {/* Filtros */}
      <div className="mb-4 space-x-2">
        <Button
          variant={filters.selectedMember === null ? "default" : "outline"}
          onClick={() => setSelectedMember(null)}
        >
          Todos
        </Button>
        {familyMembers.map(member => (
          <Button
            key={member.id}
            variant={filters.selectedMember === member.id ? "default" : "outline"}
            onClick={() => setSelectedMember(member.id)}
          >
            {member.name}
          </Button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {transactions.map(tx => {
          const category = categories.find(c => c.id === tx.categoryId)
          return (
            <div key={tx.id} className="flex items-center justify-between p-4 border rounded">
              <div>
                <div className="font-medium">{tx.description}</div>
                <div className="text-sm text-muted-foreground">
                  {category?.name} • {tx.date.toLocaleDateString("pt-BR")}
                </div>
              </div>
              <div className={tx.type === "income" ? "text-green-600" : "text-red-600"}>
                {tx.type === "income" ? "+" : "-"}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(tx.amount)}
              </div>
            </div>
          )
        })}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhuma transação encontrada
        </div>
      )}
    </div>
  )
}
```

### Gráfico de Despesas por Categoria
```typescript
"use client"

import { useFinance } from "@/hooks/use-finance"

export function ExpensesByCategoryChart() {
  const { calculateExpensesByCategory } = useFinance()
  
  const expenses = calculateExpensesByCategory()

  return (
    <div className="space-y-4">
      {expenses.map(cat => (
        <div key={cat.categoryId} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.categoryName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(cat.amount)}
              </span>
              <span className="text-sm text-muted-foreground">
                {cat.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${cat.percentage}%`,
                backgroundColor: cat.color 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 🧪 Página de Teste

Acesse `/finance-test` para ver uma demonstração completa de todas as funcionalidades:

- ✅ Resumo financeiro com todos os cálculos
- ✅ Filtros interativos
- ✅ Despesas por categoria
- ✅ Estatísticas de contas, cartões e objetivos
- ✅ Debug do estado do sistema

## ⚡ Performance

O sistema utiliza:
- **useMemo** para otimizar cálculos derivados
- **useCallback** para memoizar funções
- **Re-renders inteligentes** apenas quando o estado relevante muda

## 🔒 Regras Importantes

1. **NÃO use localStorage/sessionStorage** - Todo estado é em memória
2. **Use apenas `useFinance()`** para acessar o contexto
3. **Todos os componentes devem ser "use client"** quando usarem o hook
4. **IDs são gerados automaticamente** nas funções de adicionar
5. **Datas devem ser objetos Date**, não strings

## 🚀 Próximos Passos (Integração Supabase)

Quando integrarmos com Supabase:
1. Substituir useState por queries do Supabase
2. Implementar sincronização em tempo real
3. Adicionar autenticação
4. Persistir dados no banco PostgreSQL

Mas até lá, o sistema funciona perfeitamente em memória! 🎉
