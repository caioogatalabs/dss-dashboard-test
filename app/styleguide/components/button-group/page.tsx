"use client"

import * as React from "react"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  LayoutGrid,
  Plus,
  Minus,
  Copy,
  Clipboard,
  Trash2,
} from "lucide-react"

import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

export default function ButtonGroupPage() {
  const [alignment, setAlignment] = React.useState("left")
  const [view, setView] = React.useState("grid")
  const [count, setCount] = React.useState(5)

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Button Group</h1>
        <p className="text-muted-foreground">
          A component for grouping related buttons together. Button groups provide a way to
          organize multiple actions in a visually connected manner.
        </p>
      </div>

      {/* Basic Button Group */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Button Group</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple button group with attached buttons sharing borders.
        </p>
        <div className="space-y-4 mb-4">
          <ButtonGroup>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`}
          </pre>
        </div>
      </section>

      {/* Button Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Button Variants</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Button groups work with all button variants.
        </p>
        <div className="space-y-4 mb-4">
          <div>
            <p className="text-sm font-medium mb-2">Default</p>
            <ButtonGroup>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Outline</p>
            <ButtonGroup>
              <Button variant="outline">One</Button>
              <Button variant="outline">Two</Button>
              <Button variant="outline">Three</Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Secondary</p>
            <ButtonGroup>
              <Button variant="secondary">One</Button>
              <Button variant="secondary">Two</Button>
              <Button variant="secondary">Three</Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Ghost</p>
            <ButtonGroup>
              <Button variant="ghost">One</Button>
              <Button variant="ghost">Two</Button>
              <Button variant="ghost">Three</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Icon Button Groups</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Groups of icon-only buttons for toolbars and actions.
        </p>
        <div className="space-y-4 mb-4">
          <div>
            <p className="text-sm font-medium mb-2">Text alignment</p>
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <AlignJustify className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Text formatting</p>
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Underline className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Strikethrough className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Clipboard actions</p>
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Clipboard className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<ButtonGroup>
  <Button variant="outline" size="icon">
    <AlignLeft className="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon">
    <AlignCenter className="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon">
    <AlignRight className="h-4 w-4" />
  </Button>
</ButtonGroup>`}
          </pre>
        </div>
      </section>

      {/* Vertical Orientation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Vertical Orientation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Button groups can be oriented vertically.
        </p>
        <div className="flex gap-8 mb-4">
          <div>
            <p className="text-sm font-medium mb-2">Text buttons</p>
            <ButtonGroup orientation="vertical">
              <Button variant="outline">Top</Button>
              <Button variant="outline">Middle</Button>
              <Button variant="outline">Bottom</Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Icon buttons</p>
            <ButtonGroup orientation="vertical">
              <Button variant="outline" size="icon">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`}
          </pre>
        </div>
      </section>

      {/* Detached Buttons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Detached Buttons</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Buttons can be spaced apart while still grouped semantically.
        </p>
        <div className="space-y-4 mb-4">
          <div>
            <p className="text-sm font-medium mb-2">Horizontal detached</p>
            <ButtonGroup attached={false}>
              <Button variant="outline">Save</Button>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Vertical detached</p>
            <ButtonGroup orientation="vertical" attached={false}>
              <Button variant="outline" className="w-32">Option A</Button>
              <Button variant="outline" className="w-32">Option B</Button>
              <Button variant="outline" className="w-32">Option C</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<ButtonGroup attached={false}>
  <Button variant="outline">Save</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="destructive">Delete</Button>
</ButtonGroup>`}
          </pre>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Button Sizes</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Button groups work with all button sizes.
        </p>
        <div className="space-y-4 mb-4">
          <div>
            <p className="text-sm font-medium mb-2">Small</p>
            <ButtonGroup>
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="sm">Buttons</Button>
              <Button variant="outline" size="sm">Group</Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Default</p>
            <ButtonGroup>
              <Button variant="outline">Default</Button>
              <Button variant="outline">Buttons</Button>
              <Button variant="outline">Group</Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Large</p>
            <ButtonGroup>
              <Button variant="outline" size="lg">Large</Button>
              <Button variant="outline" size="lg">Buttons</Button>
              <Button variant="outline" size="lg">Group</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interactive Examples</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Common interactive patterns using button groups.
        </p>
        <div className="space-y-6 mb-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-3">Toggle selection</p>
            <ButtonGroup>
              <Button
                variant={alignment === "left" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlignment("left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={alignment === "center" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlignment("center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={alignment === "right" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlignment("right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </ButtonGroup>
            <p className="text-sm text-muted-foreground mt-2">Selected: {alignment}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-3">View switcher</p>
            <ButtonGroup>
              <Button
                variant={view === "grid" ? "default" : "outline"}
                onClick={() => setView("grid")}
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </ButtonGroup>
            <p className="text-sm text-muted-foreground mt-2">Current view: {view}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-3">Counter</p>
            <div className="flex items-center gap-4">
              <ButtonGroup>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCount(Math.max(0, count - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-16 pointer-events-none">
                  {count}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCount(count + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-3">Pagination</p>
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline">1</Button>
              <Button variant="default">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">...</Button>
              <Button variant="outline">10</Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Props</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-mono text-xs">orientation</td>
                <td className="p-3 font-mono text-xs">"horizontal" | "vertical"</td>
                <td className="p-3">"horizontal"</td>
                <td className="p-3 text-muted-foreground">Direction of button arrangement</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">attached</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3 text-muted-foreground">Whether buttons share borders</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3 font-mono text-xs">React.ReactNode</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Button elements to group</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses role="group" to indicate related buttons</li>
          <li>Each button maintains individual focus states</li>
          <li>Keyboard navigation works naturally between buttons</li>
          <li>Consider adding aria-label to describe the group purpose</li>
          <li>For toggle groups, use aria-pressed on active buttons</li>
        </ul>
      </section>
    </div>
  )
}
