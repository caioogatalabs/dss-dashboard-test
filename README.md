# Design System

Teste implementando primeiro DSS com shadCN, depois telas da aplicação.

Sistema de Design criado com React, TypeScript, Tailwind CSS e Shadcn/UI.

## Stack Tecnológica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Componentes:** Shadcn/UI
- **Fonte:** Inter (Google Fonts)
- **MCPs configurados:**
  - Shadcn MCP (interação com componentes)
  - Figma MCP (integração com designs)

## Design Tokens

O sistema inclui uma paleta completa de cores:
- **Primary:** #5E33FF (Purple-Blue)
- **Accent:** #7BC2D6 (Light Blue)
- **Success:** #3AB208 (Green)
- **Warning:** #E18650 (Orange)
- **Destructive:** #E36756 (Red)

Cada cor possui uma escala completa (50-900) para máxima flexibilidade.

## Estrutura do Projeto

```
design-system/
├── app/                 # App Router do Next.js
│   ├── layout.tsx      # Layout principal com Inter font
│   ├── page.tsx        # Página inicial
│   ├── globals.css     # Estilos globais + design tokens
│   └── styleguide/     # Styleguide do Design System
│       ├── layout.tsx  # Layout com sidebar
│       ├── navigation.ts # Configuração de navegação
│       └── page.tsx    # Página de tokens
├── components/         # Componentes do Design System
│   └── ui/            # Componentes Shadcn/UI
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── alert.tsx
│       ├── radio-group.tsx
│       └── label.tsx
├── lib/               # Utilitários
│   └── utils.ts       # Funções auxiliares (cn, etc)
├── components.json    # Configuração do Shadcn/UI
└── mcp-config.json    # Configuração dos MCPs
```

## Começando

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

**Styleguide:** [http://localhost:3000/styleguide](http://localhost:3000/styleguide)

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Styleguide

O Design System inclui um styleguide completo acessível em `/styleguide` com:

- **Color Palette** - Todas as cores com valores HEX e HSL
- **Color Scales** - Escalas completas (50-900) para Primary, Light Blue, Green, Orange, Red e Neutral
- **Typography** - Estilos de texto incluindo Labels
- **Border Radius** - Sistema de 7 tamanhos (sm a 4xl)
- **Shadows** - Exemplos de sombras
- **Components** - Demonstrações de todos os componentes
- **Dark Mode** - Toggle para visualizar em modo escuro

## Adicionar Componentes Shadcn/UI

Para adicionar componentes do Shadcn:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

Ou use o MCP do Shadcn através do Claude para adicionar componentes automaticamente.

## Configuração dos MCPs

Consulte [MCP-SETUP.md](./MCP-SETUP.md) para instruções detalhadas sobre como configurar os MCPs do Shadcn e Figma.

## Próximos Passos

1. Configure os MCPs seguindo [MCP-SETUP.md](./MCP-SETUP.md)
2. Obtenha seu token do Figma (se necessário)
3. Explore o styleguide em `/styleguide`
4. Comece a adicionar componentes ao Design System
5. Crie páginas da aplicação usando os tokens e componentes

## Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/UI](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)
- [Inter Font](https://fonts.google.com/specimen/Inter)
