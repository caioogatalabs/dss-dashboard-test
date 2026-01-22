"use client"

import * as React from "react"
import { IconX, IconUser } from "@tabler/icons-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Modal de Adicionar Membro da Família
 * 
 * Permite adicionar novos membros à família com informações básicas,
 * função/papel, avatar (URL ou upload) e renda mensal opcional.
 */
export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const { addFamilyMember } = useFinance()

  // Estados do formulário
  const [name, setName] = React.useState("")
  const [role, setRole] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState("")
  const [avatarTab, setAvatarTab] = React.useState<"url" | "upload">("url")
  const [monthlyIncome, setMonthlyIncome] = React.useState("")

  // Estados de erro
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Sugestões de função
  const roleSuggestions = [
    "Pai",
    "Mãe",
    "Filho",
    "Filha",
    "Avô",
    "Avó",
    "Tio",
    "Tia",
  ]

  // Reset quando o modal abre/fecha
  React.useEffect(() => {
    if (!open) {
      setName("")
      setRole("")
      setAvatarUrl("")
      setAvatarTab("url")
      setMonthlyIncome("")
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
      newErrors.name = "Por favor, insira um nome válido (mínimo 3 caracteres)"
    }

    // Função
    if (!role || role.trim().length === 0) {
      newErrors.role = "Por favor, informe a função na família"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Salva membro
   */
  const handleSave = () => {
    if (!validate()) {
      return
    }

    const incomeValue = monthlyIncome
      ? parseFloat(monthlyIncome.replace(/\D/g, "")) / 100
      : 0

    // Gera cor aleatória para o membro
    const colors = [
      "#5E33FF",
      "#7BC2D6",
      "#3AB208",
      "#E18650",
      "#E36756",
      "#820AD1",
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    addFamilyMember({
      name: name.trim(),
      email: `${name.trim().toLowerCase().replace(/\s+/g, ".")}@familia.com`, // Email temporário
      avatar: avatarUrl.trim() || "",
      color: randomColor,
    })

    toast.success("Membro adicionado com sucesso!")
    onOpenChange(false)
  }

  /**
   * Manipula upload de arquivo
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Valida tipo
    if (!file.type.match(/^image\/(jpg|jpeg|png)$/)) {
      toast.error("Apenas arquivos JPG e PNG são permitidos")
      return
    }

    // Valida tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo deve ter no máximo 5MB")
      return
    }

    // Converte para base64 (simulação - em produção, enviaria para servidor)
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setAvatarUrl(base64String)
      toast.info("Upload realizado com sucesso! (simulado)")
    }
    reader.readAsDataURL(file)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-[500px]">
        {/* Header */}
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-lg font-semibold">Adicionar Membro da Família</DrawerTitle>
              <DrawerDescription className="text-sm">
                Adicione um novo membro ao seu grupo familiar
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
          <div className="mx-auto max-w-full space-y-4">
            {/* Nome Completo */}
            <Field label="Nome Completo" required error={errors.name}>
              <Input
                placeholder="Ex: João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            {/* Função na Família */}
            <Field label="Função na Família" required error={errors.role}>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione ou digite uma função" />
                </SelectTrigger>
                <SelectContent>
                  {roleSuggestions.map((suggestion) => (
                    <SelectItem key={suggestion} value={suggestion}>
                      {suggestion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className="mt-2"
                placeholder="Ou digite uma função personalizada"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Field>

            {/* Avatar */}
            <Field label="Avatar">
              <Tabs value={avatarTab} onValueChange={(v) => setAvatarTab(v as "url" | "upload")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="mt-3">
                  <Input
                    placeholder="https://exemplo.com/avatar.jpg"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="upload" className="mt-3">
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileUpload}
                    />
                    <p className="text-xs text-muted-foreground">
                      Aceita JPG e PNG, máximo 5MB
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              {avatarUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-muted">
                    {avatarUrl.startsWith("data:") || avatarUrl.startsWith("http") ? (
                      <img src={avatarUrl} alt="Avatar preview" className="size-full object-cover" />
                    ) : (
                      <IconUser className="size-6 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Preview do avatar</p>
                </div>
              )}
            </Field>

            {/* Renda Mensal */}
            <Field label="Renda Mensal Estimada (opcional)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  R$
                </span>
                <Input
                  className="pl-8"
                  placeholder="0,00"
                  value={monthlyIncome}
                  onChange={(e) => {
                    const formatted = formatCurrency(e.target.value)
                    setMonthlyIncome(formatted)
                  }}
                />
              </div>
            </Field>
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
              Adicionar Membro
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
