# Configuração dos MCPs (Model Context Protocol)

Este projeto está configurado para usar os seguintes MCPs no VS Code.

## Configuração Automática (Recomendado)

O arquivo [.vscode/mcp.json](.vscode/mcp.json) já está configurado com ambos os servidores MCP:

```json
{
  "inputs": [],
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    },
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"],
      "type": "stdio"
    }
  }
}
```

### Como Usar no VS Code

1. **Certifique-se de que o GitHub Copilot está instalado** no VS Code
2. **Abra o arquivo** [.vscode/mcp.json](.vscode/mcp.json) no VS Code
3. **Clique em "Start"** ao lado de cada servidor MCP para ativá-los
4. **Use prompts com o Copilot** para interagir com os MCPs:
   - "Show me the shadcn components available"
   - "Add a button component from shadcn"
   - "Fetch design tokens from Figma"

---

## 1. MCP do Shadcn/UI

O MCP do Shadcn permite interação direta com os componentes do Shadcn/UI.

### Configuração Manual (Opcional)

Se preferir configurar manualmente, execute:

```bash
npx shadcn@latest mcp init --client vscode
```

### Testando a Conexão

Use o seguinte comando para testar:

```bash
npx shadcn@latest mcp
```

---

## 2. MCP do Figma

O MCP do Figma permite acesso aos designs e tokens do Figma via HTTP.

### Servidor Remoto

O servidor está configurado para usar o endpoint oficial do Figma:
- **URL:** `https://mcp.figma.com/mcp`
- **Tipo:** HTTP

### Autenticação

Para acessar arquivos privados do Figma, você precisará configurar autenticação. Consulte a [documentação oficial do Figma MCP](https://developers.figma.com/docs/figma-mcp-server/) para mais detalhes.

---

## Configuração para Claude Desktop (Alternativa)

Se você estiver usando Claude Desktop em vez de VS Code, configure em:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

---

## Verificação

Após configurar os MCPs:

1. **Reinicie o VS Code** ou o Claude Desktop
2. **Verifique se os servidores estão ativos** no painel de MCPs
3. **Teste com prompts** como:
   - "List available shadcn components"
   - "Add shadcn button component"
   - "Fetch Figma design information"

---

## Recursos Adicionais

- [Documentação MCP Shadcn](https://ui.shadcn.com/docs/mcp)
- [Documentação MCP Figma](https://developers.figma.com/docs/figma-mcp-server/)
- [Shadcn/UI Docs](https://ui.shadcn.com)
- [Model Context Protocol](https://modelcontextprotocol.io/)
