"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchPage() {
  const [airplaneMode, setAirplaneMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Switch</h1>
        <p className="text-muted-foreground">
          Componente toggle para ativar/desativar opções booleanas com animação suave.
        </p>
      </div>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Switch</h2>
        <p className="text-sm text-muted-foreground mb-4">Exemplos básicos de switch.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Simple Switch</CardTitle>
              <CardDescription>Switch básico sem label</CardDescription>
            </CardHeader>
            <CardContent>
              <Switch />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Label</CardTitle>
              <CardDescription>Switch com label associado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checked by Default</CardTitle>
              <CardDescription>Switch inicialmente ativado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch id="notifications-default" defaultChecked />
                <Label htmlFor="notifications-default">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disabled</CardTitle>
              <CardDescription>Switch desabilitado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch id="disabled-off" disabled />
                <Label htmlFor="disabled-off">Disabled (off)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-on" disabled defaultChecked />
                <Label htmlFor="disabled-on">Disabled (on)</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Controlled Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Controlled Switch</h2>
        <p className="text-sm text-muted-foreground mb-4">Switches controlados com estado.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Controlled State</CardTitle>
              <CardDescription>Switch com controle de estado externo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="airplane-controlled">Airplane Mode</Label>
                  <Switch
                    id="airplane-controlled"
                    checked={airplaneMode}
                    onCheckedChange={setAirplaneMode}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Status: {airplaneMode ? "Enabled" : "Disabled"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multiple Controlled</CardTitle>
              <CardDescription>Múltiplos switches com estado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications-controlled">Notifications</Label>
                  <Switch
                    id="notifications-controlled"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing-controlled">Marketing emails</Label>
                  <Switch
                    id="marketing-controlled"
                    checked={marketing}
                    onCheckedChange={setMarketing}
                  />
                </div>
                <div className="pt-2 text-sm text-muted-foreground">
                  <p>Notifications: {notifications ? "On" : "Off"}</p>
                  <p>Marketing: {marketing ? "On" : "Off"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Patterns */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Patterns</h2>
        <p className="text-sm text-muted-foreground mb-4">Padrões comuns de uso de switches.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Settings List</CardTitle>
              <CardDescription>Lista de configurações com switches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications
                    </p>
                  </div>
                  <Switch id="push-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive text messages
                    </p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Configurações de privacidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-profile">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make profile visible to everyone
                    </p>
                  </div>
                  <Switch id="public-profile" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-email">Show Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Display email on profile
                    </p>
                  </div>
                  <Switch id="show-email" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Share usage data
                    </p>
                  </div>
                  <Switch id="analytics" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>Ativar/desativar funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="beta-features">Beta Features</Label>
                  <Switch id="beta-features" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto Save</Label>
                  <Switch id="auto-save" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compact Layout</CardTitle>
              <CardDescription>Layout compacto para espaços pequenos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="wifi" defaultChecked />
                  <Label htmlFor="wifi">Wi-Fi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="bluetooth" />
                  <Label htmlFor="bluetooth">Bluetooth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="location" defaultChecked />
                  <Label htmlFor="location">Location</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="nfc" />
                  <Label htmlFor="nfc">NFC</Label>
                </div>
              </div>
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
              <code>{`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Controlled Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`const [enabled, setEnabled] = useState(false)

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
/>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><code>checked</code> - Estado do switch (controlado)</li>
                <li><code>defaultChecked</code> - Estado inicial (não controlado)</li>
                <li><code>onCheckedChange</code> - Callback quando estado muda</li>
                <li><code>disabled</code> - Desabilita o switch</li>
                <li><code>id</code> - ID para associar com label</li>
                <li><code>className</code> - Classes CSS adicionais</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Label and Description</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<div className="flex items-center justify-between">
  <div className="space-y-0.5">
    <Label htmlFor="notifications">Notifications</Label>
    <p className="text-sm text-muted-foreground">
      Receive push notifications
    </p>
  </div>
  <Switch id="notifications" />
</div>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acessibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Use <code>Label</code> associado com <code>htmlFor</code> para melhor acessibilidade</li>
              <li>Navegação por teclado (Space, Enter)</li>
              <li>Baseado em Radix UI com suporte a ARIA</li>
              <li>Estados visuais claros para on/off</li>
              <li>Suporte a screen readers</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Use para opções on/off, não para múltiplas escolhas</li>
              <li>Forneça labels descritivos</li>
              <li>Considere adicionar descrições para maior clareza</li>
              <li>Agrupe switches relacionados em seções</li>
              <li>Use estado controlado quando precisar reagir a mudanças</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
