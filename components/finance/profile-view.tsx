"use client"

import * as React from "react"
import Link from "next/link"
import { IconLogout, IconMail, IconPencil, IconTrash } from "@tabler/icons-react"
import { useFinance } from "@/hooks/use-finance"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { AddMemberModal } from "@/components/finance/modals/add-member-modal"
import type { Category } from "@/lib/types/finance"

export function ProfileView() {
  const { familyMembers, categories, addCategory } = useFinance()
  const [addMemberOpen, setAddMemberOpen] = React.useState(false)
  const user = familyMembers[0] ?? null

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="info" className="flex-1">
            Informações
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6 space-y-6">
          <ProfileInfoTab
            user={user}
            familyMembers={familyMembers}
            onAddMember={() => setAddMemberOpen(true)}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <SettingsTab categories={categories} addCategory={addCategory} />
        </TabsContent>
      </Tabs>

      <AddMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
    </div>
  )
}

function ProfileInfoTab({
  user,
  familyMembers,
  onAddMember,
}: {
  user: { id: string; name: string; email: string; avatar: string; color: string } | null
  familyMembers: { id: string; name: string; email: string; avatar: string; color: string }[]
  onAddMember: () => void
}) {
  if (!user) return null

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Avatar className="size-[120px] shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback
                className="text-2xl"
                style={{ backgroundColor: user.color, color: "white" }}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground">Usuário principal</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconMail className="size-4 shrink-0" />
                <span className="text-sm">{user.email}</span>
              </div>
              <p className="text-sm text-muted-foreground">Renda: —</p>
              <Button variant="outline" size="sm" className="mt-2">
                Editar Perfil
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membros da Família</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {familyMembers.length <= 1 ? (
            <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Adicione outros membros para controlar finanças em conjunto.
              </p>
              <Button onClick={onAddMember}>Adicionar Membro da Família</Button>
            </div>
          ) : (
            <ul className="space-y-2">
              {familyMembers.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
                >
                  <Avatar className="size-12">
                    <AvatarImage src={m.avatar} />
                    <AvatarFallback
                      className="text-sm"
                      style={{ backgroundColor: m.color, color: "white" }}
                    >
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{m.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{m.email}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">—</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="pt-4">
        <Button variant="destructive" className="gap-2" asChild>
          <Link href="/">
            <IconLogout className="size-4" />
            Sair
          </Link>
        </Button>
      </div>
    </>
  )
}

function SettingsTab({
  categories,
  addCategory,
}: {
  categories: Category[]
  addCategory: (c: Omit<Category, "id">) => void
}) {
  const [darkMode, setDarkMode] = React.useState(false)
  const [notifVencimento, setNotifVencimento] = React.useState(true)
  const [notifLimite, setNotifLimite] = React.useState(true)
  const [notifResumo, setNotifResumo] = React.useState(false)
  const [notifObjetivos, setNotifObjetivos] = React.useState(true)
  const [newCatName, setNewCatName] = React.useState("")
  const [newCatType, setNewCatType] = React.useState<"income" | "expense">("expense")
  const [addCatOpen, setAddCatOpen] = React.useState(false)

  const incomeCats = categories.filter((c) => c.type === "income")
  const expenseCats = categories.filter((c) => c.type === "expense")

  const handleAddCategory = () => {
    if (!newCatName.trim() || newCatName.length < 2) {
      toast.error("Nome com pelo menos 2 caracteres")
      return
    }
    addCategory({ name: newCatName.trim(), type: newCatType, color: "#999999" })
    toast.success("Categoria adicionada")
    setNewCatName("")
    setAddCatOpen(false)
  }

  const openAddIncome = () => {
    setNewCatType("income")
    setNewCatName("")
    setAddCatOpen(true)
  }
  const openAddExpense = () => {
    setNewCatType("expense")
    setNewCatName("")
    setAddCatOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Exibição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode">Modo Escuro</Label>
              <Badge variant="secondary">Em breve</Badge>
            </div>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} disabled />
          </div>
          <div className="space-y-2">
            <Label>Moeda padrão</Label>
            <Select defaultValue="brl">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Formato de data</Label>
            <Select defaultValue="ddmmyyyy">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ddmmyyyy">DD/MM/AAAA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="n1">Lembrete de vencimento de contas</Label>
            <Switch id="n1" checked={notifVencimento} onCheckedChange={setNotifVencimento} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="n2">Alerta de aproximação do limite de cartão</Label>
            <Switch id="n2" checked={notifLimite} onCheckedChange={setNotifLimite} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="n3">Resumo mensal por email</Label>
            <Switch id="n3" checked={notifResumo} onCheckedChange={setNotifResumo} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="n4">Notificações de novos objetivos alcançados</Label>
            <Switch id="n4" checked={notifObjetivos} onCheckedChange={setNotifObjetivos} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Categorias de Receita</h4>
            <ul className="space-y-2 rounded-md border bg-muted/30 p-2">
              {incomeCats.map((c) => (
                <CategoryRow key={c.id} category={c} />
              ))}
            </ul>
            <Popover open={addCatOpen && newCatType === "income"} onOpenChange={(o) => { setAddCatOpen(o); if (!o) setNewCatName("") }}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2" onClick={openAddIncome}>
                  Adicionar Categoria
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <Input placeholder="Nome" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
                  <Button size="sm" onClick={handleAddCategory}>Confirmar</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Categorias de Despesa</h4>
            <ul className="space-y-2 rounded-md border bg-muted/30 p-2">
              {expenseCats.map((c) => (
                <CategoryRow key={c.id} category={c} />
              ))}
            </ul>
            <Popover open={addCatOpen && newCatType === "expense"} onOpenChange={(o) => { setAddCatOpen(o); if (!o) setNewCatName("") }}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2" onClick={openAddExpense}>
                  Adicionar Categoria
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <Input placeholder="Nome" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
                  <Button size="sm" onClick={handleAddCategory}>Confirmar</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados e Privacidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" onClick={() => toast.info("Exportação em breve")}>
            Exportar Todos os Dados
          </Button>
          <div>
            <Button
              variant="destructive"
              onClick={() => {
                if (typeof window !== "undefined" && window.confirm("Tem certeza? Todos os dados serão apagados. Esta ação não pode ser desfeita.")) {
                  toast.info("Limpeza de dados em breve.")
                }
              }}
            >
              Limpar Todos os Dados
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">Esta ação não pode ser desfeita.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sobre o mycash+</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">Versão v1.0.0</p>
          <p className="text-sm text-muted-foreground">Sistema de gestão financeira familiar.</p>
          <div className="flex gap-4 pt-2">
            <Button variant="link" className="h-auto p-0 text-primary" asChild>
              <Link href="#">Termos de Uso</Link>
            </Button>
            <Button variant="link" className="h-auto p-0 text-primary" asChild>
              <Link href="#">Política de Privacidade</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function CategoryRow({ category }: { category: Category }) {
  const [hover, setHover] = React.useState(false)

  return (
    <li
      className="flex items-center justify-between rounded px-2 py-1.5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: category.color }} />
        <span className="text-sm">{category.name}</span>
      </div>
      {hover && (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info("Em breve")}>
            <IconPencil className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info("Em breve")}>
            <IconTrash className="size-3.5" />
          </Button>
        </div>
      )}
    </li>
  )
}
