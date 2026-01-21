"use client"

import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SonnerPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Sonner</h1>
        <p className="text-muted-foreground">
          Componente de notificações toast elegante e personalizável com suporte a diferentes tipos e ações.
        </p>
      </div>

      {/* Toast Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Toast Types</h2>
        <p className="text-sm text-muted-foreground mb-4">Diferentes tipos de notificações toast.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Default Toast</CardTitle>
              <CardDescription>Toast padrão sem tipo específico</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => toast("Event has been created")}
              >
                Show Toast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Success Toast</CardTitle>
              <CardDescription>Toast de sucesso</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => toast.success("Successfully saved!")}
              >
                Show Success
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Toast</CardTitle>
              <CardDescription>Toast de erro</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => toast.error("Something went wrong!")}
              >
                Show Error
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Warning Toast</CardTitle>
              <CardDescription>Toast de aviso</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => toast.warning("Please review your changes")}
              >
                Show Warning
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Info Toast</CardTitle>
              <CardDescription>Toast informativo</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => toast.info("New update available")}
              >
                Show Info
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading Toast</CardTitle>
              <CardDescription>Toast de carregamento</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  const id = toast.loading("Loading...")
                  setTimeout(() => {
                    toast.success("Done!", { id })
                  }, 2000)
                }}
              >
                Show Loading
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* With Description */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Description</h2>
        <p className="text-sm text-muted-foreground mb-4">Toasts com descrição adicional.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Default with Description</CardTitle>
              <CardDescription>Toast com título e descrição</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                  })
                }
              >
                Show Toast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Success with Description</CardTitle>
              <CardDescription>Toast de sucesso com detalhes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast.success("Profile updated", {
                    description: "Your changes have been saved successfully.",
                  })
                }
              >
                Show Success
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error with Description</CardTitle>
              <CardDescription>Toast de erro com detalhes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast.error("Failed to save", {
                    description: "Please check your internet connection and try again.",
                  })
                }
              >
                Show Error
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Info with Description</CardTitle>
              <CardDescription>Toast informativo com detalhes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast.info("New features available", {
                    description: "Check out the latest updates in the changelog.",
                  })
                }
              >
                Show Info
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* With Actions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Actions</h2>
        <p className="text-sm text-muted-foreground mb-4">Toasts com botões de ação.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>With Action Button</CardTitle>
              <CardDescription>Toast com botão de ação</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                      label: "Undo",
                      onClick: () => toast.success("Event deleted"),
                    },
                  })
                }
              >
                Show Toast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Cancel Button</CardTitle>
              <CardDescription>Toast com botão de cancelar</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast("Are you sure?", {
                    description: "This action cannot be undone.",
                    cancel: {
                      label: "Cancel",
                      onClick: () => toast.info("Cancelled"),
                    },
                  })
                }
              >
                Show Toast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Both Buttons</CardTitle>
              <CardDescription>Toast com ação e cancelar</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast("Delete file?", {
                    description: "This file will be permanently deleted.",
                    action: {
                      label: "Delete",
                      onClick: () => toast.success("File deleted"),
                    },
                    cancel: {
                      label: "Cancel",
                      onClick: () => toast.info("Cancelled"),
                    },
                  })
                }
              >
                Show Toast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promise Toast</CardTitle>
              <CardDescription>Toast que acompanha uma promise</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  const promise = new Promise((resolve) => setTimeout(resolve, 2000))
                  
                  toast.promise(promise, {
                    loading: "Saving...",
                    success: "Saved successfully!",
                    error: "Failed to save",
                  })
                }}
              >
                Save Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Options */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Advanced Options</h2>
        <p className="text-sm text-muted-foreground mb-4">Opções avançadas de customização.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Custom Duration</CardTitle>
              <CardDescription>Toast com duração customizada</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast("This will last 10 seconds", {
                    duration: 10000,
                  })
                }
              >
                Show Toast (10s)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Persistent Toast</CardTitle>
              <CardDescription>Toast que não desaparece automaticamente</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast("This will stay until dismissed", {
                    duration: Infinity,
                  })
                }
              >
                Show Persistent
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom ID</CardTitle>
              <CardDescription>Toast com ID para atualizar depois</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                onClick={() =>
                  toast("Initial message", {
                    id: "my-toast",
                  })
                }
              >
                Create
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.success("Updated message", {
                    id: "my-toast",
                  })
                }
              >
                Update
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dismiss Toasts</CardTitle>
              <CardDescription>Fechar toasts programaticamente</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                onClick={() => {
                  toast("Toast 1")
                  toast("Toast 2")
                  toast("Toast 3")
                }}
              >
                Show Multiple
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.dismiss()}
              >
                Dismiss All
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Documentation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Uso</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Setup</CardTitle>
            <CardDescription>Adicione o Toaster no seu layout root</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { toast } from "sonner"`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`// Simple toast
toast("Event has been created")

// With description
toast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM"
})

// Different types
toast.success("Success!")
toast.error("Error!")
toast.warning("Warning!")
toast.info("Info!")
toast.loading("Loading...")

// With action
toast("Event has been created", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo")
  }
})

// Promise toast
toast.promise(promise, {
  loading: "Loading...",
  success: "Success!",
  error: "Error!"
})`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Methods</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><code>toast(message, options)</code> - Toast padrão</li>
                  <li><code>toast.success(message, options)</code> - Toast de sucesso</li>
                  <li><code>toast.error(message, options)</code> - Toast de erro</li>
                  <li><code>toast.warning(message, options)</code> - Toast de aviso</li>
                  <li><code>toast.info(message, options)</code> - Toast informativo</li>
                  <li><code>toast.loading(message, options)</code> - Toast de loading</li>
                  <li><code>toast.promise(promise, options)</code> - Toast de promise</li>
                  <li><code>toast.dismiss(id?)</code> - Fechar toast(s)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Options</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><code>description</code> - Texto adicional</li>
                  <li><code>duration</code> - Duração em ms (padrão: 4000)</li>
                  <li><code>action</code> - Botão de ação</li>
                  <li><code>cancel</code> - Botão de cancelar</li>
                  <li><code>id</code> - ID único do toast</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acessibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Anúncios automáticos para screen readers</li>
              <li>Navegação por teclado (Tab, Esc)</li>
              <li>Suporte a cores semânticas para tipos diferentes</li>
              <li>Ícones visuais para melhor identificação</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
