"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserIcon, SettingsIcon, BellIcon, CreditCardIcon } from "lucide-react"

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tabs</h1>
        <p className="text-muted-foreground">
          Componente de abas para organizar conteúdo relacionado em diferentes painéis.
        </p>
      </div>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Tabs</h2>
        <p className="text-sm text-muted-foreground mb-4">Exemplos básicos de tabs.</p>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Simple Tabs</CardTitle>
              <CardDescription>Tabs básicas sem conteúdo adicional</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <p className="text-sm text-muted-foreground">Content for Tab 1</p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                </TabsContent>
                <TabsContent value="tab3">
                  <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Tabs com ícones para melhor identificação</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile">
                <TabsList>
                  <TabsTrigger value="profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <BellIcon className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <p className="text-sm text-muted-foreground">Profile settings and information</p>
                </TabsContent>
                <TabsContent value="settings">
                  <p className="text-sm text-muted-foreground">Application settings</p>
                </TabsContent>
                <TabsContent value="notifications">
                  <p className="text-sm text-muted-foreground">Notification preferences</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* With Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Card Content</h2>
        <p className="text-sm text-muted-foreground mb-4">Tabs com conteúdo estruturado em cards.</p>

        <Card>
          <CardHeader>
            <CardTitle>Settings Panel</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="@peduarte" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>
                      Update your billing information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card">Card number</Label>
                      <Input id="card" placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update billing</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Controlled Tabs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Controlled Tabs</h2>
        <p className="text-sm text-muted-foreground mb-4">Tabs com controle de estado externo.</p>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Tabs</CardTitle>
            <CardDescription>Current tab: {activeTab}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    Dashboard overview with key metrics and statistics.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed analytics and data visualization.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate and view reports.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    View all notifications and alerts.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveTab("overview")}>
                Go to Overview
              </Button>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("analytics")}>
                Go to Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Different Layouts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Different Layouts</h2>
        <p className="text-sm text-muted-foreground mb-4">Diferentes estilos e layouts de tabs.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Compact Tabs</CardTitle>
              <CardDescription>Tabs compactas para espaços pequenos</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="one">
                <TabsList>
                  <TabsTrigger value="one">1</TabsTrigger>
                  <TabsTrigger value="two">2</TabsTrigger>
                  <TabsTrigger value="three">3</TabsTrigger>
                  <TabsTrigger value="four">4</TabsTrigger>
                </TabsList>
                <TabsContent value="one">
                  <p className="text-sm text-muted-foreground">Step 1</p>
                </TabsContent>
                <TabsContent value="two">
                  <p className="text-sm text-muted-foreground">Step 2</p>
                </TabsContent>
                <TabsContent value="three">
                  <p className="text-sm text-muted-foreground">Step 3</p>
                </TabsContent>
                <TabsContent value="four">
                  <p className="text-sm text-muted-foreground">Step 4</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Full Width Tabs</CardTitle>
              <CardDescription>Tabs ocupando largura completa</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                  <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <p className="text-sm text-muted-foreground">All items</p>
                </TabsContent>
                <TabsContent value="active">
                  <p className="text-sm text-muted-foreground">Active items</p>
                </TabsContent>
                <TabsContent value="archived">
                  <p className="text-sm text-muted-foreground">Archived items</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Documentation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Uso</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Import</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for Tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for Tab 2
  </TabsContent>
  <TabsContent value="tab3">
    Content for Tab 3
  </TabsContent>
</Tabs>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Controlled Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`const [activeTab, setActiveTab] = useState("overview")

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
  <TabsContent value="analytics">
    Analytics content
  </TabsContent>
</Tabs>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Tabs</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><code>defaultValue</code> - Tab inicial (não controlado)</li>
                  <li><code>value</code> - Tab ativa (controlado)</li>
                  <li><code>onValueChange</code> - Callback quando tab muda</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">TabsTrigger</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><code>value</code> - Identificador único da tab (obrigatório)</li>
                  <li><code>disabled</code> - Desabilita a tab</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">TabsContent</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><code>value</code> - Deve corresponder ao value do trigger (obrigatório)</li>
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
              <li>Navegação completa por teclado (Tab, Arrow keys, Home, End)</li>
              <li>Baseado em Radix UI com suporte a ARIA</li>
              <li>Suporte a screen readers com labels apropriados</li>
              <li>Focus management automático</li>
              <li>Anúncios de mudança de estado</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Use labels descritivos nos triggers</li>
              <li>Mantenha conteúdo relacionado em tabs adjacentes</li>
              <li>Evite muitas tabs (considere dropdown ou agrupamento)</li>
              <li>Considere adicionar ícones para melhor identificação</li>
              <li>Use estado controlado quando precisar reagir a mudanças</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
