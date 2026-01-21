# Especificação Técnica - Painel Financeiro

> Documento de referência para desenvolvimento de aplicação utilizando o Design System existente.

---

## 1. Visão Geral

### 1.1 Objetivo
Desenvolver um **Painel Financeiro** web utilizando o Design System já implementado neste projeto. Todo desenvolvimento deve seguir rigorosamente os padrões, componentes e tokens já definidos.

### 1.2 Stack Tecnológica
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.1.4 | Framework React |
| React | 19.2.3 | UI Library |
| TypeScript | ^5 | Tipagem |
| Tailwind CSS | ^4 | Estilização |
| shadcn/ui | - | Componentes base |
| Recharts | ^2.15.4 | Gráficos |
| TanStack Table | ^8.21.3 | Tabelas de dados |
| date-fns | ^4.1.0 | Manipulação de datas |
| Zod | ^4.3.5 | Validação de schemas |

### 1.3 Princípio Fundamental

> **NUNCA modifique componentes existentes do Design System.**
> O conteúdo e a aplicação devem se adaptar aos componentes, não o contrário.

---

## 2. Estrutura de Diretórios

```
design-system/
├── app/
│   ├── globals.css              # CSS Variables (Design Tokens) - NÃO MODIFICAR
│   ├── layout.tsx               # Layout raiz
│   ├── dashboard/               # [BLOCK] Dashboard existente
│   ├── styleguide/              # Documentação do Design System
│   └── financeiro/              # [NOVA] Aplicação do Painel Financeiro
│       ├── layout.tsx
│       ├── page.tsx
│       └── [subpages]/
│
├── components/
│   ├── ui/                      # Componentes base shadcn - NÃO MODIFICAR
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── data-table.tsx
│   │   └── ... (34 componentes)
│   │
│   ├── app-sidebar.tsx          # [BLOCK] Sidebar do dashboard
│   ├── chart-area-interactive.tsx
│   ├── data-table.tsx           # DataTable do dashboard
│   ├── section-cards.tsx        # Cards de métricas
│   ├── site-header.tsx          # Header do dashboard
│   └── nav-*.tsx                # Componentes de navegação
│
├── hooks/
│   └── use-mobile.ts            # Hook para detecção mobile
│
└── lib/
    └── utils.ts                 # Utilitário cn() para classes
```

---

## 3. Design Tokens

Os tokens estão definidos em `app/globals.css`. Use sempre as classes Tailwind correspondentes.

### 3.1 Cores Semânticas

| Token | Classe Tailwind | Uso |
|-------|-----------------|-----|
| `--primary` | `bg-primary`, `text-primary` | Cor principal da marca (#5E33FF) |
| `--secondary` | `bg-secondary`, `text-secondary` | Elementos secundários |
| `--muted` | `bg-muted`, `text-muted-foreground` | Textos e fundos sutis |
| `--accent` | `bg-accent`, `text-accent` | Destaques (#7BC2D6) |
| `--destructive` | `bg-destructive`, `text-destructive` | Erros e ações perigosas |
| `--success` | `bg-success`, `text-success` | Sucesso, positivo |
| `--warning` | `bg-warning`, `text-warning` | Alertas, atenção |
| `--info` | `bg-info`, `text-info` | Informações |

### 3.2 Cores para Gráficos

| Token | Classe | Cor |
|-------|--------|-----|
| `--chart-1` | `text-chart-1` | Primary (roxo) |
| `--chart-2` | `text-chart-2` | Accent (azul claro) |
| `--chart-3` | `text-chart-3` | Verde |
| `--chart-4` | `text-chart-4` | Laranja |
| `--chart-5` | `text-chart-5` | Vermelho |

### 3.3 Escalas de Cores

Disponíveis escalas completas (50-900) para:
- `--primary-*` (roxo)
- `--neutral-*` (cinzas)
- `--light-blue-*` (azul claro)
- `--green-*`
- `--orange-*`
- `--red-*`

**Exemplo de uso:**
```tsx
<div className="bg-primary-100 text-primary-900">...</div>
<div className="bg-green-500 text-green-50">...</div>
```

### 3.4 Border Radius

| Token | Classe |
|-------|--------|
| `--radius-sm` | `rounded-sm` |
| `--radius-md` | `rounded-md` |
| `--radius-lg` | `rounded-lg` |
| `--radius-xl` | `rounded-xl` |

---

## 4. Componentes Disponíveis

### 4.1 Componentes UI Base (`/components/ui/`)

> **Regra:** Importe sempre de `@/components/ui/[componente]`

#### Layout & Containers
| Componente | Import | Descrição |
|------------|--------|-----------|
| Card | `@/components/ui/card` | Container com header, content, footer |
| Separator | `@/components/ui/separator` | Linha divisória |
| Tabs | `@/components/ui/tabs` | Navegação em abas |
| Sidebar | `@/components/ui/sidebar` | Sidebar colapsável |

#### Formulários
| Componente | Import | Descrição |
|------------|--------|-----------|
| Button | `@/components/ui/button` | Botões com variantes |
| Input | `@/components/ui/input` | Campo de texto |
| Select | `@/components/ui/select` | Dropdown de seleção |
| Checkbox | `@/components/ui/checkbox` | Caixa de seleção |
| Switch | `@/components/ui/switch` | Toggle on/off |
| Calendar | `@/components/ui/calendar` | Seletor de data |
| DatePicker | `@/components/ui/date-picker` | Input com calendário |
| Field | `@/components/ui/field` | Label + Input + Error |
| InputGroup | `@/components/ui/input-group` | Input com prefix/suffix |
| RadioGroup | `@/components/ui/radio-group` | Grupo de radio buttons |

#### Feedback
| Componente | Import | Descrição |
|------------|--------|-----------|
| Alert | `@/components/ui/alert` | Mensagens de alerta |
| Badge | `@/components/ui/badge` | Tags e status |
| Skeleton | `@/components/ui/skeleton` | Loading placeholder |
| Sonner | `@/components/ui/sonner` | Toast notifications |

#### Overlay
| Componente | Import | Descrição |
|------------|--------|-----------|
| Drawer | `@/components/ui/drawer` | Painel lateral |
| DropdownMenu | `@/components/ui/dropdown-menu` | Menu dropdown |
| Popover | `@/components/ui/popover` | Popover flutuante |
| Tooltip | `@/components/ui/tooltip` | Dica flutuante |
| Sheet | `@/components/ui/sheet` | Modal lateral |

#### Dados
| Componente | Import | Descrição |
|------------|--------|-----------|
| Table | `@/components/ui/table` | Tabela básica |
| DataTable | `@/components/ui/data-table` | Tabela com sort/filter/pagination |
| Chart | `@/components/ui/chart` | Wrapper para Recharts |

#### Navegação
| Componente | Import | Descrição |
|------------|--------|-----------|
| Breadcrumb | `@/components/ui/breadcrumb` | Trilha de navegação |
| Menubar | `@/components/ui/menubar` | Barra de menu |

### 4.2 Componentes de Bloco (`/components/`)

> Componentes compostos do Dashboard-01, prontos para reutilização.

| Componente | Import | Descrição |
|------------|--------|-----------|
| AppSidebar | `@/components/app-sidebar` | Sidebar completa com navegação |
| SiteHeader | `@/components/site-header` | Header com breadcrumb e controles |
| SectionCards | `@/components/section-cards` | Grid de cards de métricas |
| ChartAreaInteractive | `@/components/chart-area-interactive` | Gráfico de área com filtros |
| DataTable | `@/components/data-table` | Tabela do dashboard |
| NavMain | `@/components/nav-main` | Navegação principal do sidebar |
| NavUser | `@/components/nav-user` | Menu do usuário |

---

## 5. Padrões de Desenvolvimento

### 5.1 Estrutura de Página

Todas as páginas da aplicação devem seguir este padrão:

```tsx
// app/financeiro/[page]/page.tsx
import { ComponenteA } from "@/components/ui/componente-a"
import { ComponenteB } from "@/components/ui/componente-b"

export default function NomeDaPagina() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header da página */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Título da Página</h1>
        <p className="text-muted-foreground mt-2">
          Descrição da página
        </p>
      </div>

      {/* Seções de conteúdo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Seção</h2>
        {/* Conteúdo */}
      </section>
    </div>
  )
}
```

### 5.2 Layout com Sidebar

Para páginas que precisam do layout de dashboard:

```tsx
// app/financeiro/layout.tsx
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function FinanceiroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### 5.3 Uso do Utilitário `cn()`

Sempre use `cn()` para combinar classes condicionais:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)}>
```

### 5.4 Tipagem de Props

Sempre estenda as props do componente base:

```tsx
import { Button } from "@/components/ui/button"

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  customProp?: string
}

export function CustomButton({ customProp, ...props }: CustomButtonProps) {
  return <Button {...props} />
}
```

### 5.5 Gráficos com Chart

Use sempre o componente Chart do Design System:

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
  receitas: {
    label: "Receitas",
    color: "var(--chart-3)", // Verde
  },
  despesas: {
    label: "Despesas",
    color: "var(--chart-5)", // Vermelho
  },
} satisfies ChartConfig

export function MeuGrafico({ data }) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey="receitas" fill="var(--color-receitas)" />
        <Area dataKey="despesas" fill="var(--color-despesas)" />
      </AreaChart>
    </ChartContainer>
  )
}
```

### 5.6 Tabelas de Dados

Use o DataTable para tabelas complexas:

```tsx
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
    },
  },
]

<DataTable
  columns={columns}
  data={transactions}
  searchKey="description"
  searchPlaceholder="Buscar transações..."
  showPagination
  pageSize={10}
/>
```

### 5.7 Formulários

Combine Field com outros componentes de formulário:

```tsx
import { Field, FieldGroup, FieldRow } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

<form>
  <FieldGroup>
    <FieldRow>
      <Field label="Valor" htmlFor="valor" required>
        <Input id="valor" type="number" placeholder="0,00" />
      </Field>
      <Field label="Categoria" htmlFor="categoria">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="receita">Receita</SelectItem>
            <SelectItem value="despesa">Despesa</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </FieldRow>
    <Button type="submit">Salvar</Button>
  </FieldGroup>
</form>
```

---

## 6. Regras e Restrições

### 6.1 O que NÃO fazer

| Proibido | Motivo |
|----------|--------|
| Modificar arquivos em `/components/ui/` | Componentes do Design System são imutáveis |
| Modificar `globals.css` | Tokens de design são definidos centralmente |
| Criar componentes duplicados | Use os existentes ou componha-os |
| Usar cores hardcoded | Use sempre variáveis CSS via Tailwind |
| Ignorar responsividade | Todos os componentes devem ser responsivos |
| Criar estilos inline complexos | Use classes Tailwind |

### 6.2 O que FAZER

| Obrigatório | Como |
|-------------|------|
| Usar componentes existentes | Importe de `@/components/ui/` |
| Caso neceessário alterar algum componente na raiz, deve-se perdir permissão e detalhar o ajuste |
| Seguir padrão de layout | `p-8 max-w-7xl mx-auto` |
| Usar tokens de cor | `bg-primary`, `text-muted-foreground`, etc. |
| Tipar todas as props | Use TypeScript |
| Usar `cn()` para classes | Importe de `@/lib/utils` |
| Manter acessibilidade | Labels, ARIA, keyboard navigation |

### 6.3 Checklist de Desenvolvimento

Antes de considerar uma feature completa:

- [ ] Usa apenas componentes do Design System
- [ ] Segue o padrão de layout das páginas
- [ ] Usa tokens de cor (não hex/rgb hardcoded)
- [ ] Funciona em light e dark mode
- [ ] É responsivo (mobile, tablet, desktop)
- [ ] Tem tipagem TypeScript completa
- [ ] Não modifica nenhum arquivo do Design System

---

## 7. Criação de Novos Componentes

Se um componente necessário **não existir** no Design System, siga este workflow para adicioná-lo corretamente.

### Workflow de Criação de Componentes

#### Passo 1: Verificar se existe no shadcn

Use o shadcn MCP para buscar:
- `search_items_in_registries` com query "[nome do componente]"
- Se encontrado, use `view_items_in_registries` para ver detalhes
- Use `get_item_examples_from_registries` para exemplos

**Componentes comuns do shadcn:**
- **Layout:** Card, Separator, Tabs, Accordion, Collapsible
- **Forms:** Button, Input, Select, Checkbox, Radio, Switch, Textarea, Label, Form
- **Feedback:** Alert, Toast, Progress, Skeleton, Badge
- **Overlay:** Dialog, Drawer, Popover, Tooltip, Dropdown Menu, Context Menu, Alert Dialog
- **Navigation:** Navigation Menu, Breadcrumb, Pagination, Command
- **Data:** Table, Data Table, Calendar, Chart

#### Passo 2: Instalar componente shadcn (se existir)

```bash
npx shadcn@latest add [component-name]
```

Isso adiciona o componente em `/components/ui/` configurado com CSS variables.

#### Passo 3: Customizar (se necessário)

Se precisar de variantes adicionais, crie um wrapper em `/components/`:

```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  intent?: 'default' | 'success' | 'warning' | 'info'
}

export function CustomButton({
  intent = 'default',
  className,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(
        intent === 'success' && 'bg-success text-success-foreground hover:bg-success/90',
        intent === 'warning' && 'bg-warning text-warning-foreground hover:bg-warning/90',
        intent === 'info' && 'bg-info text-info-foreground hover:bg-info/90',
        className
      )}
      {...props}
    />
  )
}
```

#### Passo 4: Construir componente custom (se não existir no shadcn)

Use primitivos shadcn + CSS variables + padrões consistentes:

```tsx
import { cn } from "@/lib/utils"

interface CustomWidgetProps {
  variant?: 'default' | 'primary' | 'muted'
  children: React.ReactNode
  className?: string
}

export function CustomWidget({
  variant = 'default',
  children,
  className
}: CustomWidgetProps) {
  return (
    <div className={cn(
      "rounded-lg border p-4",
      variant === 'default' && 'bg-card text-card-foreground border-border',
      variant === 'primary' && 'bg-primary text-primary-foreground border-primary',
      variant === 'muted' && 'bg-muted text-muted-foreground border-border',
      className
    )}>
      {children}
    </div>
  )
}
```

#### Passo 5: Criar página de showcase

Adicione em `/app/styleguide/components/[component-name]/page.tsx`:
- Todas as variantes
- Todos os estados (default, hover, focus, disabled)
- Exemplos de código
- Notas de acessibilidade

#### Passo 6: Atualizar navegação

Adicione em `/app/styleguide/navigation.ts`:

```ts
{
  title: "Components",
  items: [
    // ... existentes (ordem alfabética)
    { name: "[Nome do Componente]", href: "/styleguide/components/[component-name]" },
  ]
}
```

---

## 8. Referência Rápida

### 8.1 Imports Comuns

```tsx
// Componentes UI
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from "@/components/ui/data-table"

// Charts
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts"

// Sidebar/Layout
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

// Utilitários
import { cn } from "@/lib/utils"
```

### 8.2 Classes Tailwind Frequentes

```tsx
// Containers
"p-8 max-w-7xl mx-auto"           // Container de página
"mb-12"                            // Espaço entre seções
"mb-8"                             // Espaço após header

// Textos
"text-4xl font-bold"               // Título de página
"text-2xl font-bold mb-4"          // Título de seção
"text-muted-foreground"            // Texto secundário

// Grids
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"  // Grid responsivo
"flex flex-col gap-4"              // Stack vertical
"flex items-center gap-2"          // Inline items

// Estados
"hover:bg-muted"                   // Hover
"focus:ring-2 focus:ring-ring"     // Focus
"disabled:opacity-50"              // Disabled
```

### 8.3 Formatação de Valores

```tsx
// Moeda BRL
new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(value)

// Porcentagem
new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 1,
}).format(value / 100)

// Data
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
```

---

## 9. Exemplo Completo

### Página de Visão Geral Financeira

```tsx
// app/financeiro/page.tsx
"use client"

import * as React from "react"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { DataTable } from "@/components/ui/data-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ColumnDef } from "@tanstack/react-table"

// Dados de exemplo
const chartData = [
  { month: "Jan", receitas: 4500, despesas: 3200 },
  { month: "Fev", receitas: 5200, despesas: 3800 },
  { month: "Mar", receitas: 4800, despesas: 3500 },
]

const chartConfig = {
  receitas: { label: "Receitas", color: "var(--chart-3)" },
  despesas: { label: "Despesas", color: "var(--chart-5)" },
} satisfies ChartConfig

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "receita" | "despesa"
}

const transactions: Transaction[] = [
  { id: "1", date: "2024-01-15", description: "Salário", amount: 5000, type: "receita" },
  { id: "2", date: "2024-01-16", description: "Aluguel", amount: -1500, type: "despesa" },
]

const columns: ColumnDef<Transaction>[] = [
  { accessorKey: "date", header: "Data" },
  { accessorKey: "description", header: "Descrição" },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number
      return (
        <span className={amount >= 0 ? "text-green-600" : "text-red-600"}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Math.abs(amount))}
        </span>
      )
    },
  },
]

export default function FinanceiroPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Visão Geral</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe suas finanças em tempo real
        </p>
      </div>

      {/* Cards de Métricas */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Saldo Atual</CardDescription>
              <CardTitle className="text-2xl">R$ 12.450,00</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Receitas (Mês)</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                R$ 5.200,00
              </CardTitle>
              <Badge variant="outline" className="w-fit">
                <IconTrendingUp className="size-3 mr-1" />
                +12%
              </Badge>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Despesas (Mês)</CardDescription>
              <CardTitle className="text-2xl text-red-600">
                R$ 3.800,00
              </CardTitle>
              <Badge variant="outline" className="w-fit">
                <IconTrendingDown className="size-3 mr-1" />
                -5%
              </Badge>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Economia</CardDescription>
              <CardTitle className="text-2xl">R$ 1.400,00</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Gráfico */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Fluxo de Caixa</h2>
        <Card>
          <CardContent className="pt-6">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="receitas"
                  type="natural"
                  fill="var(--color-receitas)"
                  fillOpacity={0.4}
                  stroke="var(--color-receitas)"
                />
                <Area
                  dataKey="despesas"
                  type="natural"
                  fill="var(--color-despesas)"
                  fillOpacity={0.4}
                  stroke="var(--color-despesas)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Tabela de Transações */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Últimas Transações</h2>
        <DataTable
          columns={columns}
          data={transactions}
          searchKey="description"
          searchPlaceholder="Buscar transações..."
          showPagination
          pageSize={10}
        />
      </section>
    </div>
  )
}
```

---

## 10. Contato e Suporte

Para dúvidas sobre o Design System, consulte:
- Styleguide: `/styleguide`
- Design Tokens: `/styleguide` (página inicial)
- Componentes: `/styleguide/components/[nome]`
- Blocos: `/styleguide/blocks/[nome]`

---

*Documento gerado para orientar agentes de AI no desenvolvimento do Painel Financeiro.*
