"use client"

import * as React from "react"
import { IconX, IconRepeat } from "@tabler/icons-react"
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
import { Label } from "@/components/ui/label"
import { Field, FieldRow } from "@/components/ui/field"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { TransactionType } from "@/lib/types/finance"

interface NewTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultAccountId?: string
  defaultCreditCardId?: string
}

/**
 * Modal de Nova Transação
 * 
 * Permite criar novas transações (receitas ou despesas) com validação completa,
 * campos condicionais e suporte a parcelamento e recorrência.
 */
export function NewTransactionModal({
  open,
  onOpenChange,
  defaultAccountId,
  defaultCreditCardId,
}: NewTransactionModalProps) {
  const { addTransaction, categories, familyMembers, bankAccounts, creditCards, addCategory } =
    useFinance()

  // Estados do formulário
  const [type, setType] = React.useState<TransactionType>("expense")
  const [amount, setAmount] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [categoryId, setCategoryId] = React.useState<string>("")
  const [memberId, setMemberId] = React.useState<string | null>(null)
  const [accountId, setAccountId] = React.useState<string | undefined>(
    defaultAccountId || defaultCreditCardId
  )
  const [creditCardId, setCreditCardId] = React.useState<string | undefined>(
    defaultCreditCardId
  )
  const [installments, setInstallments] = React.useState<number>(1)
  const [isRecurring, setIsRecurring] = React.useState(false)
  const [showNewCategory, setShowNewCategory] = React.useState(false)
  const [newCategoryName, setNewCategoryName] = React.useState("")

  // Estados de erro
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Determina se a conta selecionada é um cartão
  const selectedAccount = React.useMemo(() => {
    if (creditCardId) {
      return creditCards.find((c) => c.id === creditCardId)
    }
    if (accountId) {
      return bankAccounts.find((a) => a.id === accountId)
    }
    return null
  }, [accountId, creditCardId, bankAccounts, creditCards])

  const isCreditCard = Boolean(creditCardId)
  const showInstallments = isCreditCard && type === "expense"
  const showRecurring = type === "expense"

  // Filtra categorias por tipo
  const filteredCategories = React.useMemo(() => {
    return categories.filter((c) => c.type === type)
  }, [categories, type])

  // Reset quando o modal abre/fecha
  React.useEffect(() => {
    if (!open) {
      // Reset form
      setType("expense")
      setAmount("")
      setDescription("")
      setCategoryId("")
      setMemberId(null)
      setAccountId(defaultAccountId || defaultCreditCardId)
      setCreditCardId(defaultCreditCardId)
      setInstallments(1)
      setIsRecurring(false)
      setShowNewCategory(false)
      setNewCategoryName("")
      setErrors({})
    } else {
      // Pre-preenche conta se fornecida
      if (defaultCreditCardId) {
        setCreditCardId(defaultCreditCardId)
        setAccountId(undefined)
      } else if (defaultAccountId) {
        setAccountId(defaultAccountId)
        setCreditCardId(undefined)
      }
    }
  }, [open, defaultAccountId, defaultCreditCardId])

  // Quando recorrência é marcada, força parcelamento para 1x
  React.useEffect(() => {
    if (isRecurring && installments > 1) {
      setInstallments(1)
    }
  }, [isRecurring, installments])

  // Quando parcelamento > 1x, desabilita recorrência
  const canUseRecurring = installments === 1

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
   * Cria nova categoria
   */
  const handleCreateCategory = () => {
    if (!newCategoryName.trim() || newCategoryName.trim().length < 3) {
      toast.error("Nome da categoria deve ter pelo menos 3 caracteres")
      return
    }

    addCategory({
      name: newCategoryName.trim(),
      type,
      color: "#999999", // Cor padrão
    })

    toast.success("Categoria criada com sucesso!")
    setShowNewCategory(false)
    setNewCategoryName("")
  }

  /**
   * Valida formulário
   */
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Valor
    const amountValue = parseFloat(amount.replace(/\D/g, "")) / 100
    if (!amount || amountValue <= 0) {
      newErrors.amount = "Valor deve ser maior que zero"
    }

    // Descrição
    if (!description || description.trim().length < 3) {
      newErrors.description = "Descrição deve ter pelo menos 3 caracteres"
    }

    // Categoria
    if (!categoryId) {
      newErrors.categoryId = "Selecione uma categoria"
    }

    // Conta/Cartão
    if (!accountId && !creditCardId) {
      newErrors.account = "Selecione uma conta ou cartão"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Salva transação
   */
  const handleSave = () => {
    if (!validate()) {
      return
    }

    const amountValue = parseFloat(amount.replace(/\D/g, "")) / 100

    // Cria transação base
    const transaction: Omit<import("@/lib/types/finance").Transaction, "id"> = {
      memberId: memberId || familyMembers[0]?.id || "",
      date: new Date(),
      description: description.trim(),
      amount: amountValue,
      type,
      categoryId: categoryId!,
      accountId: accountId,
      creditCardId: creditCardId,
      status: "paid",
      installments:
        installments > 1
          ? {
              current: 1,
              total: installments,
            }
          : undefined,
    }

    // Se for recorrente, cria múltiplas transações
    if (isRecurring && type === "expense") {
      // Cria 12 ocorrências (1 ano)
      for (let i = 0; i < 12; i++) {
        const transactionDate = new Date()
        transactionDate.setMonth(transactionDate.getMonth() + i)

        addTransaction({
          ...transaction,
          date: transactionDate,
          status: i === 0 ? "paid" : "pending",
          installments: undefined, // Recorrente não tem parcelas
        })
      }
    } else if (installments > 1) {
      // Se for parcelada, cria múltiplas transações
      for (let i = 0; i < installments; i++) {
        const transactionDate = new Date()
        transactionDate.setMonth(transactionDate.getMonth() + i)

        addTransaction({
          ...transaction,
          date: transactionDate,
          description: `${transaction.description} (${i + 1}/${installments})`,
          installments: {
            current: i + 1,
            total: installments,
          },
          status: i === 0 ? "paid" : "pending",
        })
      }
    } else {
      // Transação única
      addTransaction(transaction)
    }

    toast.success("Transação registrada com sucesso!")
    onOpenChange(false)
  }

  /**
   * Manipula seleção de conta/cartão
   */
  const handleAccountChange = (value: string) => {
    // Verifica se é conta bancária ou cartão
    const isCard = creditCards.some((c) => c.id === value)
    const isAccount = bankAccounts.some((a) => a.id === value)

    if (isCard) {
      setCreditCardId(value)
      setAccountId(undefined)
    } else if (isAccount) {
      setAccountId(value)
      setCreditCardId(undefined)
    }
  }

  const selectedAccountValue = creditCardId || accountId || ""

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-[500px]">
        {/* Header */}
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-lg font-semibold">Nova Transação</DrawerTitle>
              <DrawerDescription className="text-sm">
                {type === "income"
                  ? "Registre uma nova receita"
                  : "Registre uma nova despesa"}
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
        <div className="flex-1 overflow-y-auto bg-muted/30 p-4">
          <div className="mx-auto max-w-full space-y-4">
            {/* Toggle de Tipo */}
            <div className="rounded-lg bg-muted p-1">
              <ButtonGroup className="w-full">
                <Button
                  type="button"
                  variant={type === "income" ? "default" : "ghost"}
                  className="flex-1"
                  onClick={() => setType("income")}
                >
                  Receita
                </Button>
                <Button
                  type="button"
                  variant={type === "expense" ? "default" : "ghost"}
                  className="flex-1"
                  onClick={() => setType("expense")}
                >
                  Despesa
                </Button>
              </ButtonGroup>
            </div>

            {/* Valor */}
            <Field label="Valor da Transação" required error={errors.amount}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  R$
                </span>
                <Input
                  className="pl-8"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => {
                    const formatted = formatCurrency(e.target.value)
                    setAmount(formatted)
                  }}
                />
              </div>
            </Field>

            {/* Descrição */}
            <Field label="Descrição" required error={errors.description}>
              <Input
                placeholder="Ex: Supermercado Semanal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>

            {/* Categoria */}
            <Field label="Categoria" required error={errors.categoryId}>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="__new__"
                    onSelect={(e) => {
                      e.preventDefault()
                      setShowNewCategory(true)
                    }}
                  >
                    + Nova Categoria
                  </SelectItem>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showNewCategory && (
                <div className="mt-2 flex gap-2">
                  <Input
                    className="flex-1"
                    placeholder="Nome da categoria"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCreateCategory}
                  >
                    Confirmar
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowNewCategory(false)
                      setNewCategoryName("")
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </Field>

            {/* Grid: Membro e Conta/Cartão */}
            <FieldRow columns={2}>
              <Field label="Membro" htmlFor="member">
                <Select
                  value={memberId || "family"}
                  onValueChange={(value) =>
                    setMemberId(value === "family" ? null : value)
                  }
                >
                  <SelectTrigger id="member" className="w-full">
                    <SelectValue placeholder="Selecione um membro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">Família (Geral)</SelectItem>
                    {familyMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Conta / Cartão" required error={errors.account}>
                <Select value={selectedAccountValue} onValueChange={handleAccountChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma conta ou cartão" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Contas Bancárias
                    </div>
                    {bankAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name || account.bank}
                      </SelectItem>
                    ))}
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Cartões de Crédito
                    </div>
                    {creditCards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name || card.bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldRow>

            {/* Parcelamento (condicional) */}
            {showInstallments && (
              <Field
                label="Parcelamento"
                description={
                  isRecurring
                    ? "Parcelamento desabilitado para despesas recorrentes"
                    : undefined
                }
              >
                <Select
                  value={installments.toString()}
                  onValueChange={(value) => setInstallments(Number(value))}
                  disabled={isRecurring}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num === 1 ? "À vista (1x)" : `${num}x`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}

            {/* Despesa Recorrente (condicional) */}
            {showRecurring && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="recurring"
                    checked={isRecurring}
                    onCheckedChange={(checked) => setIsRecurring(checked === true)}
                    disabled={!canUseRecurring}
                  />
                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="recurring"
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <IconRepeat className="size-3.5" />
                      Despesa Recorrente
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {!canUseRecurring
                        ? "Não disponível para compras parceladas"
                        : "Esta despesa será criada automaticamente todo mês"}
                    </p>
                  </div>
                </div>
              </div>
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
              Salvar Transação
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
