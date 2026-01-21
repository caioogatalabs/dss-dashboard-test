"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function MenubarPage() {
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [showFullUrls, setShowFullUrls] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState("benoit")

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Menubar</h1>
        <p className="text-muted-foreground">
          Barra de menu horizontal com suporte a submenus, atalhos, checkboxes e radio groups.
        </p>
      </div>

      {/* Complete Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Complete Example</h2>
        <p className="text-sm text-muted-foreground mb-4">Menu bar completo com todas as funcionalidades.</p>

        <Card>
          <CardHeader>
            <CardTitle>Application Menu</CardTitle>
            <CardDescription>Menu bar similar ao de aplicações desktop</CardDescription>
          </CardHeader>
          <CardContent>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    New Window <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem disabled>New Incognito Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Share</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Email link</MenubarItem>
                      <MenubarItem>Messages</MenubarItem>
                      <MenubarItem>Notes</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    Print... <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Find</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Search the web</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Find...</MenubarItem>
                      <MenubarItem>Find Next</MenubarItem>
                      <MenubarItem>Find Previous</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>Cut</MenubarItem>
                  <MenubarItem>Copy</MenubarItem>
                  <MenubarItem>Paste</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarCheckboxItem
                    checked={showBookmarks}
                    onCheckedChange={setShowBookmarks}
                  >
                    Always Show Bookmarks Bar
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem
                    checked={showFullUrls}
                    onCheckedChange={setShowFullUrls}
                  >
                    Always Show Full URLs
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarItem inset>
                    Reload <MenubarShortcut>⌘R</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem disabled inset>
                    Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem inset>Hide Sidebar</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Profiles</MenubarTrigger>
                <MenubarContent>
                  <MenubarRadioGroup value={selectedProfile} onValueChange={setSelectedProfile}>
                    <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                    <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                    <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarItem inset>Edit...</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem inset>Add Profile...</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </CardContent>
        </Card>
      </section>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Examples</h2>
        <p className="text-sm text-muted-foreground mb-4">Exemplos de uso básico do menubar.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Simple Menu</CardTitle>
              <CardDescription>Menu simples com itens básicos</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Actions</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>New Item</MenubarItem>
                    <MenubarItem>Edit Item</MenubarItem>
                    <MenubarItem>Delete Item</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Settings</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Preferences</MenubarItem>
                    <MenubarItem>Account</MenubarItem>
                    <MenubarItem>Logout</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Shortcuts</CardTitle>
              <CardDescription>Menu com atalhos de teclado</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Document</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Save <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Export <MenubarShortcut>⌘E</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Submenu</CardTitle>
              <CardDescription>Menu com submenus aninhados</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Export</MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>Export as Image</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>PNG</MenubarItem>
                        <MenubarItem>JPG</MenubarItem>
                        <MenubarItem>SVG</MenubarItem>
                        <MenubarItem>WebP</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                      <MenubarSubTrigger>Export as Document</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>PDF</MenubarItem>
                        <MenubarItem>Word</MenubarItem>
                        <MenubarItem>Markdown</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Disabled Items</CardTitle>
              <CardDescription>Menu com itens desabilitados</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Options</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Enabled Action</MenubarItem>
                    <MenubarItem disabled>Disabled Action</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Another Action</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checkbox & Radio Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Checkbox & Radio</h2>
        <p className="text-sm text-muted-foreground mb-4">Menu com checkboxes e radio groups.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Checkbox Items</CardTitle>
              <CardDescription>Itens com seleção múltipla</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Display</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem checked>Show Toolbar</MenubarCheckboxItem>
                    <MenubarCheckboxItem>Show Sidebar</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>Show Status Bar</MenubarCheckboxItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radio Items</CardTitle>
              <CardDescription>Itens com seleção única</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Theme</MenubarTrigger>
                  <MenubarContent>
                    <MenubarRadioGroup value="light">
                      <MenubarRadioItem value="light">Light</MenubarRadioItem>
                      <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                      <MenubarRadioItem value="system">System</MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
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
              <code>{`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar"`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print...</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Componentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Menubar</h3>
                <p className="text-sm text-muted-foreground">Container principal da barra de menu.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">MenubarMenu</h3>
                <p className="text-sm text-muted-foreground">Cada menu individual na barra.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">MenubarTrigger</h3>
                <p className="text-sm text-muted-foreground">Botão que abre o menu.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">MenubarContent</h3>
                <p className="text-sm text-muted-foreground">Conteúdo do menu dropdown.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">MenubarItem</h3>
                <p className="text-sm text-muted-foreground">Item individual do menu. Suporta prop <code>inset</code> e <code>variant="destructive"</code>.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">MenubarCheckboxItem</h3>
                <p className="text-sm text-muted-foreground">Item com checkbox para seleção múltipla.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">MenubarRadioGroup & MenubarRadioItem</h3>
                <p className="text-sm text-muted-foreground">Grupo de items com seleção única.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">MenubarSub</h3>
                <p className="text-sm text-muted-foreground">Container para submenu. Use com MenubarSubTrigger e MenubarSubContent.</p>
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
              <li>Navegação completa por teclado (Tab, Arrow keys, Enter, Esc)</li>
              <li>Baseado em Radix UI com suporte a ARIA</li>
              <li>Focus management automático</li>
              <li>Suporte a screen readers</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
