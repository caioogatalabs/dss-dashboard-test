"use client"

import * as React from "react"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Share,
  Download,
  FileText,
  Image,
  Video,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)
  const [position, setPosition] = React.useState("bottom")

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dropdown Menu</h1>
        <p className="text-muted-foreground">
          A menu that appears when triggered by a button or other element.
          Supports items, groups, checkboxes, radio buttons, and submenus.
        </p>
      </div>

      {/* Basic Dropdown */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Dropdown Menu</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple dropdown with menu items and keyboard shortcuts.
        </p>
        <div className="flex gap-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Keyboard className="mr-2 h-4 w-4" />
                  <span>Keyboard shortcuts</span>
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          </pre>
        </div>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Icons and Groups</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Organize items into logical groups with icons.
        </p>
        <div className="flex gap-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Create New</DropdownMenuLabel>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Document</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Image className="mr-2 h-4 w-4" />
                  <span>Image</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Video className="mr-2 h-4 w-4" />
                  <span>Video</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Import</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>From URL</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Cloud className="mr-2 h-4 w-4" />
                  <span>From Cloud</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Checkbox Items */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Checkbox Items</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Toggle options on/off with checkbox items.
        </p>
        <div className="flex gap-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">View Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="text-sm text-muted-foreground">
            <p>Status Bar: {showStatusBar ? "Visible" : "Hidden"}</p>
            <p>Activity Bar: {showActivityBar ? "Visible" : "Hidden"}</p>
            <p>Panel: {showPanel ? "Visible" : "Hidden"}</p>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`const [checked, setChecked] = React.useState(true)

<DropdownMenuCheckboxItem
  checked={checked}
  onCheckedChange={setChecked}
>
  Show Status Bar
</DropdownMenuCheckboxItem>`}
          </pre>
        </div>
      </section>

      {/* Radio Items */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Radio Items</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Select one option from a group with radio items.
        </p>
        <div className="flex gap-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Panel Position</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm text-muted-foreground">Selected: {position}</span>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`const [position, setPosition] = React.useState("bottom")

<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
          </pre>
        </div>
      </section>

      {/* Submenus */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Submenus</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Nested menus for hierarchical navigation.
        </p>
        <div className="flex gap-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Full Example</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Team</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<DropdownMenuSub>
  <DropdownMenuSubTrigger>
    <UserPlus className="mr-2 h-4 w-4" />
    <span>Invite users</span>
  </DropdownMenuSubTrigger>
  <DropdownMenuPortal>
    <DropdownMenuSubContent>
      <DropdownMenuItem>Email</DropdownMenuItem>
      <DropdownMenuItem>Message</DropdownMenuItem>
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</DropdownMenuSub>`}
          </pre>
        </div>
      </section>

      {/* Destructive Items */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Destructive Items</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Highlight dangerous actions with the destructive variant.
        </p>
        <div className="flex gap-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<DropdownMenuItem variant="destructive">
  <Trash2 className="mr-2 h-4 w-4" />
  Delete
</DropdownMenuItem>`}
          </pre>
        </div>
      </section>

      {/* Context Menu Style */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Patterns</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Typical dropdown menu patterns in applications.
        </p>
        <div className="flex flex-wrap gap-4 mb-4">
          {/* User Avatar Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">shadcn</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    m@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Component Parts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Component Parts</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Component</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenu</td>
                <td className="p-3 text-muted-foreground">Root component that manages state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuTrigger</td>
                <td className="p-3 text-muted-foreground">Element that opens the menu</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuContent</td>
                <td className="p-3 text-muted-foreground">Container for menu items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuItem</td>
                <td className="p-3 text-muted-foreground">Basic clickable menu item</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuCheckboxItem</td>
                <td className="p-3 text-muted-foreground">Item with checkbox state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuRadioGroup</td>
                <td className="p-3 text-muted-foreground">Group for radio items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuRadioItem</td>
                <td className="p-3 text-muted-foreground">Radio selection item</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuLabel</td>
                <td className="p-3 text-muted-foreground">Non-interactive label</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuSeparator</td>
                <td className="p-3 text-muted-foreground">Visual divider between items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuShortcut</td>
                <td className="p-3 text-muted-foreground">Keyboard shortcut hint</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuSub</td>
                <td className="p-3 text-muted-foreground">Submenu container</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuSubTrigger</td>
                <td className="p-3 text-muted-foreground">Opens a submenu</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DropdownMenuSubContent</td>
                <td className="p-3 text-muted-foreground">Submenu content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Full keyboard navigation (Arrow keys, Enter, Escape)</li>
          <li>Focus is trapped within the menu when open</li>
          <li>Escape closes the menu and returns focus to trigger</li>
          <li>Proper ARIA attributes for menu role</li>
          <li>Disabled items are not focusable</li>
          <li>Type-ahead support for quick item selection</li>
        </ul>
      </section>
    </div>
  )
}
