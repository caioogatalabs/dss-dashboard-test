"use client"

import * as React from "react"
import { IconX } from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
import { toast } from "sonner"
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
import { Input } from "@/components/ui/input"
import { Field, FieldRow } from "@/components/ui/field"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type AccountType = "bank" | "credit"

/**
 * Modal de Adicionar Conta/Cartão
 * 
 * Permite adicionar contas bancárias ou cartões de crédito com campos
 * condicionais baseados no tipo selecionado.
 */
export function AddAccountModal({ open, onOpenChange }: AddAccountModalProps) {
  const { addBankAccount, addCreditCard, familyMembers } = useFinance()

  // Estados do formulário
  const [type, setType] = React.useState<AccountType>("bank")
  const [name, setName] = React.useState("")
  const [holderId, setHolderId] = React.useState<string>("")
  const [initialBalance, setInitialBalance] = React.useState("")
  const [closingDay, setClosingDay] = React.useState("")
  const [dueDay, setDueDay] = React.useState("")
  const [limit, setLimit] = React.useState("")
  const [lastDigits, setLastDigits] = React.useState("")
  const [theme, setTheme] = React.useState<"black" | "lime" | "white">("black")

  // Estados de erro
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Reset quando o modal abre/fecha
  React.useEffect(() => {
    if (!open) {
      setType("bank")
      setName("")
      setHolderId("")
      setInitialBalance("")
      setClosingDay("")
      setDueDay("")
      setLimit("")
      setLastDigits("")
      setTheme("black")
      setErrors({})
    }
  }, [open])

  /**
   * Formata valor monetário
   */
  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, "")
    if (!numericValue) return ""
    const number = Number(numericValue) / 100
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(number)
  }

  /**
   * Valida formulário
   */
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Nome
    if (!name || name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres"
    }

    // Titular
    if (!holderId) {
      newErrors.holderId = "Selecione um titular"
    }

    // Campos específicos de conta bancária
    if (type === "bank") {
      if (!initialBalance) {
        newErrors.initialBalance = "Saldo inicial é obrigatório"
      }
    }

    // Campos específicos de cartão
    if (type === "credit") {
      const closing = parseInt(closingDay)
      const due = parseInt(dueDay)
      const limitValue = parseFloat(limit.replace(/\D/g, "")) / 100

      if (!closingDay || closing < 1 || closing > 31) {
        newErrors.closingDay = "Dia de fechamento deve ser entre 1 e 31"
      }

      if (!dueDay || due < 1 || due > 31) {
        newErrors.dueDay = "Dia de vencimento deve ser entre 1 e 31"
      }

      if (!limit || limitValue <= 0) {
        newErrors.limit = "Limite deve ser maior que zero"
      }

      if (lastDigits && lastDigits.length !== 4) {
        newErrors.lastDigits = "Últimos 4 dígitos devem ter exatamente 4 dígitos"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Salva conta/cartão
   */
  const handleSave = () => {
    if (!validate()) {
      return
    }

    const holder = familyMembers.find((m) => m.id === holderId)
    if (!holder) {
      toast.error("Titular não encontrado")
      return
    }

    if (type === "bank") {
      const balanceValue = parseFloat(initialBalance.replace(/\D/g, "")) / 100

      addBankAccount({
        name: name.trim(),
        bank: name.trim().split(" ")[0] || "Banco",
        balance: balanceValue,
        accountNumber: "",
        color: "#5E33FF",
      })

      toast.success("Conta adicionada com sucesso!")
    } else {
      const limitValue = parseFloat(limit.replace(/\D/g, "")) / 100
      const closing = parseInt(closingDay)
      const due = parseInt(dueDay)

      addCreditCard({
        name: name.trim(),
        bank: name.trim().split(" ")[0] || "Banco",
        limit: limitValue,
        currentBalance: 0,
        closingDay: closing,
        dueDay: due,
        lastDigits: lastDigits || "0000",
        color:
          theme === "black"
            ? "#000000"
            : theme === "lime"
              ? "#BFFF00"
              : "#FFFFFF",
      })

      toast.success("Cartão adicionado com sucesso!")
    }

    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-dvh w-full max-sm:max-w-none sm:w-[600px] sm:max-w-[600px]">
        {/* Header */}
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-lg font-semibold">Adicionar Conta/Cartão</DrawerTitle>
              <DrawerDescription className="text-sm">
                Adicione uma nova conta bancária ou cartão de crédito
              </DrawerDescription>
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
          <div className="mx-auto max-w-full space-y-[1.2rem]">
            {/* Toggle de Tipo */}
            <Tabs value={type} onValueChange={(v) => setType(v as AccountType)}>
              <TabsList>
                <TabsTrigger value="bank">Conta Bancária</TabsTrigger>
                <TabsTrigger value="credit">Cartão de Crédito</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Nome */}
            <Field
              label={type === "bank" ? "Nome da Conta" : "Nome do Cartão"}
              required
              error={errors.name}
            >
              <Input
                placeholder={
                  type === "bank" ? "Ex: Nubank Conta" : "Ex: Nubank Mastercard"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            {/* Titular */}
            <Field label="Titular" required error={errors.holderId}>
              <Select value={holderId} onValueChange={setHolderId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o titular" />
                </SelectTrigger>
                <SelectContent>
                  {familyMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Campos condicionais para Conta Bancária */}
            {type === "bank" && (
              <Field label="Saldo Inicial" required error={errors.initialBalance}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    R$
                  </span>
                  <Input
                    className="pl-8"
                    placeholder="0,00"
                    value={initialBalance}
                    onChange={(e) => {
                      const formatted = formatCurrency(e.target.value)
                      setInitialBalance(formatted)
                    }}
                  />
                </div>
              </Field>
            )}

            {/* Campos condicionais para Cartão de Crédito */}
            {type === "credit" && (
              <>
                <FieldRow columns={2} className="gap-[1.2rem]">
                  <Field label="Dia de Fechamento" required error={errors.closingDay}>
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="1 a 31"
                      value={closingDay}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        if (val >= 1 && val <= 31) {
                          setClosingDay(e.target.value)
                        } else if (e.target.value === "") {
                          setClosingDay("")
                        }
                      }}
                    />
                  </Field>

                  <Field label="Dia de Vencimento" required error={errors.dueDay}>
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="1 a 31"
                      value={dueDay}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        if (val >= 1 && val <= 31) {
                          setDueDay(e.target.value)
                        } else if (e.target.value === "") {
                          setDueDay("")
                        }
                      }}
                    />
                  </Field>
                </FieldRow>

                <Field label="Limite Total" required error={errors.limit}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      R$
                    </span>
                    <Input
                      className="pl-8"
                      placeholder="0,00"
                      value={limit}
                      onChange={(e) => {
                        const formatted = formatCurrency(e.target.value)
                        setLimit(formatted)
                      }}
                    />
                  </div>
                </Field>

                <Field label="Últimos 4 Dígitos (opcional)" error={errors.lastDigits}>
                  <Input
                    placeholder="1234"
                    maxLength={4}
                    value={lastDigits}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "")
                      if (val.length <= 4) {
                        setLastDigits(val)
                      }
                    }}
                  />
                </Field>

                <Field label="Tema Visual" required>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setTheme("black")}
                      className={`flex h-14 items-center justify-center rounded-lg border-2 text-xs font-semibold transition-all ${
                        theme === "black"
                          ? "border-primary bg-black text-white"
                          : "border-border bg-black text-white"
                      }`}
                    >
                      Black
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("lime")}
                      className={`flex h-14 items-center justify-center rounded-lg border-2 text-xs font-semibold transition-all ${
                        theme === "lime"
                          ? "border-primary bg-[#BFFF00] text-foreground"
                          : "border-border bg-[#BFFF00] text-foreground"
                      }`}
                    >
                      Lime
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("white")}
                      className={`flex h-14 items-center justify-center rounded-lg border-2 text-xs font-semibold transition-all ${
                        theme === "white"
                          ? "border-primary bg-background"
                          : "border-border bg-background"
                      }`}
                    >
                      White
                    </button>
                  </div>
                </Field>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t">
          <div className="flex justify-end gap-2">
            <DrawerClose asChild>
              <Button variant="outline" size="sm">
                Cancelar
              </Button>
            </DrawerClose>
            <Button onClick={handleSave} size="sm">
              Adicionar
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
