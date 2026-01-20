# Design System

Sistema de Design criado com React, TypeScript, Tailwind CSS e Shadcn/UI.

## Stack Tecnológica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Componentes:** Shadcn/UI
- **MCPs configurados:**
  - Shadcn MCP (interação com componentes)
  - Figma MCP (integração com designs)

## Estrutura do Projeto

```
design-system/
├── app/                 # App Router do Next.js
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página inicial
│   └── globals.css     # Estilos globais + variáveis CSS
├── components/         # Componentes do Design System
│   └── ui/            # Componentes Shadcn/UI
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

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

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
3. Comece a adicionar componentes ao Design System
4. Crie a documentação dos componentes
5. Configure Storybook (opcional)

## Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/UI](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)
