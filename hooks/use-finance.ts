import { useContext } from "react"
import { FinanceContext } from "@/contexts/finance-context"

export function useFinance() {
  const context = useContext(FinanceContext)

  if (context === undefined) {
    throw new Error("useFinance deve ser usado dentro de um FinanceProvider")
  }

  return context
}
