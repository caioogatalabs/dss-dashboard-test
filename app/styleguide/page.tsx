"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Info, Moon, Sun } from "lucide-react"

export default function StyleguidePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  const colorPalette = [
    { name: "Primary", var: "--primary", value: "hsl(251 100% 60%)", hex: "#5E33FF" },
    { name: "Accent", var: "--accent", value: "hsl(192 54% 66%)", hex: "#7BC2D6" },
    { name: "Success", var: "--success", value: "hsl(100 73% 36%)", hex: "#3AB208" },
    { name: "Warning", var: "--warning", value: "hsl(23 60% 61%)", hex: "#E18650" },
    { name: "Destructive", var: "--destructive", value: "hsl(4 69% 60%)", hex: "#E36756" },
  ]

  const primaryScale = [
    { name: "50", var: "--primary-50", value: "hsl(251 100% 97%)" },
    { name: "100", var: "--primary-100", value: "hsl(251 100% 93%)" },
    { name: "200", var: "--primary-200", value: "hsl(251 100% 86%)" },
    { name: "300", var: "--primary-300", value: "hsl(251 100% 77%)" },
    { name: "400", var: "--primary-400", value: "hsl(251 100% 68%)" },
    { name: "500", var: "--primary-500", value: "hsl(251 100% 60%)" },
    { name: "600", var: "--primary-600", value: "hsl(251 85% 50%)" },
    { name: "700", var: "--primary-700", value: "hsl(251 75% 40%)" },
    { name: "800", var: "--primary-800", value: "hsl(251 65% 30%)" },
    { name: "900", var: "--primary-900", value: "hsl(251 55% 20%)" },
  ]

  const neutralScale = [
    { name: "50", var: "--neutral-50", value: "hsl(0 0% 98%)" },
    { name: "100", var: "--neutral-100", value: "hsl(0 0% 96%)" },
    { name: "200", var: "--neutral-200", value: "hsl(0 0% 91%)" },
    { name: "300", var: "--neutral-300", value: "hsl(0 0% 85%)" },
    { name: "400", var: "--neutral-400", value: "hsl(0 0% 65%)" },
    { name: "500", var: "--neutral-500", value: "hsl(0 0% 45%)" },
    { name: "600", var: "--neutral-600", value: "hsl(0 0% 35%)" },
    { name: "700", var: "--neutral-700", value: "hsl(0 0% 25%)" },
    { name: "800", var: "--neutral-800", value: "hsl(0 0% 15%)" },
    { name: "900", var: "--neutral-900", value: "hsl(0 0% 9%)" },
  ]

  const lightBlueScale = [
    { name: "50", var: "--light-blue-50", value: "hsl(192 65% 97%)" },
    { name: "100", var: "--light-blue-100", value: "hsl(192 62% 92%)" },
    { name: "200", var: "--light-blue-200", value: "hsl(192 60% 84%)" },
    { name: "300", var: "--light-blue-300", value: "hsl(192 58% 75%)" },
    { name: "400", var: "--light-blue-400", value: "hsl(192 54% 66%)" },
    { name: "500", var: "--light-blue-500", value: "hsl(192 50% 57%)" },
    { name: "600", var: "--light-blue-600", value: "hsl(192 48% 47%)" },
    { name: "700", var: "--light-blue-700", value: "hsl(192 46% 37%)" },
    { name: "800", var: "--light-blue-800", value: "hsl(192 44% 27%)" },
    { name: "900", var: "--light-blue-900", value: "hsl(192 42% 17%)" },
  ]

  const greenScale = [
    { name: "50", var: "--green-50", value: "hsl(100 85% 95%)" },
    { name: "100", var: "--green-100", value: "hsl(100 82% 88%)" },
    { name: "200", var: "--green-200", value: "hsl(100 78% 76%)" },
    { name: "300", var: "--green-300", value: "hsl(100 75% 64%)" },
    { name: "400", var: "--green-400", value: "hsl(100 73% 50%)" },
    { name: "500", var: "--green-500", value: "hsl(100 73% 36%)" },
    { name: "600", var: "--green-600", value: "hsl(100 70% 30%)" },
    { name: "700", var: "--green-700", value: "hsl(100 68% 24%)" },
    { name: "800", var: "--green-800", value: "hsl(100 65% 18%)" },
    { name: "900", var: "--green-900", value: "hsl(100 62% 12%)" },
  ]

  const orangeScale = [
    { name: "50", var: "--orange-50", value: "hsl(23 72% 96%)" },
    { name: "100", var: "--orange-100", value: "hsl(23 70% 90%)" },
    { name: "200", var: "--orange-200", value: "hsl(23 68% 80%)" },
    { name: "300", var: "--orange-300", value: "hsl(23 65% 70%)" },
    { name: "400", var: "--orange-400", value: "hsl(23 60% 61%)" },
    { name: "500", var: "--orange-500", value: "hsl(23 58% 52%)" },
    { name: "600", var: "--orange-600", value: "hsl(23 56% 44%)" },
    { name: "700", var: "--orange-700", value: "hsl(23 54% 36%)" },
    { name: "800", var: "--orange-800", value: "hsl(23 52% 28%)" },
    { name: "900", var: "--orange-900", value: "hsl(23 50% 20%)" },
  ]

  const redScale = [
    { name: "50", var: "--red-50", value: "hsl(4 75% 97%)" },
    { name: "100", var: "--red-100", value: "hsl(4 72% 92%)" },
    { name: "200", var: "--red-200", value: "hsl(4 70% 84%)" },
    { name: "300", var: "--red-300", value: "hsl(4 69% 74%)" },
    { name: "400", var: "--red-400", value: "hsl(4 69% 60%)" },
    { name: "500", var: "--red-500", value: "hsl(4 68% 54%)" },
    { name: "600", var: "--red-600", value: "hsl(4 66% 46%)" },
    { name: "700", var: "--red-700", value: "hsl(4 64% 38%)" },
    { name: "800", var: "--red-800", value: "hsl(4 62% 30%)" },
    { name: "900", var: "--red-900", value: "hsl(4 60% 22%)" },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Design Tokens</h1>
          <p className="text-muted-foreground">
            Complete visual language and component foundation
          </p>
        </div>
        <Button onClick={toggleTheme} variant="outline" size="icon">
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {colorPalette.map((color) => (
            <Card key={color.name}>
              <CardContent className="p-4">
                <div
                  className="w-full h-24 rounded-lg mb-3"
                  style={{ backgroundColor: color.value }}
                />
                <h3 className="font-semibold mb-1">{color.name}</h3>
                <code className="text-xs text-muted-foreground block">{color.hex}</code>
                <code className="text-xs text-muted-foreground block">{color.var}</code>
                <code className="text-xs text-muted-foreground block mt-1">{color.value}</code>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Primary Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Primary Scale</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {primaryScale.map((shade) => (
            <div key={shade.name}>
              <div
                className="w-full h-20 rounded-lg mb-2"
                style={{ backgroundColor: shade.value }}
              />
              <p className="text-sm font-medium">{shade.name}</p>
              <code className="text-xs text-muted-foreground">{shade.var}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Neutral Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Neutral Scale</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {neutralScale.map((shade) => (
            <div key={shade.name}>
              <div
                className="w-full h-20 rounded-lg mb-2 border"
                style={{ backgroundColor: shade.value }}
              />
              <p className="text-sm font-medium">{shade.name}</p>
              <code className="text-xs text-muted-foreground">{shade.var}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Light Blue Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Light Blue Scale (K2)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {lightBlueScale.map((shade) => (
            <div key={shade.name}>
              <div
                className="w-full h-20 rounded-lg mb-2"
                style={{ backgroundColor: shade.value }}
              />
              <p className="text-sm font-medium">{shade.name}</p>
              <code className="text-xs text-muted-foreground">{shade.var}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Green Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Green Scale (K3)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {greenScale.map((shade) => (
            <div key={shade.name}>
              <div
                className="w-full h-20 rounded-lg mb-2"
                style={{ backgroundColor: shade.value }}
              />
              <p className="text-sm font-medium">{shade.name}</p>
              <code className="text-xs text-muted-foreground">{shade.var}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Orange Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Orange Scale (K4)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {orangeScale.map((shade) => (
            <div key={shade.name}>
              <div
                className="w-full h-20 rounded-lg mb-2"
                style={{ backgroundColor: shade.value }}
              />
              <p className="text-sm font-medium">{shade.name}</p>
              <code className="text-xs text-muted-foreground">{shade.var}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Red Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Red Scale (K5)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {redScale.map((shade) => (
            <div key={shade.name}>
              <div
                className="w-full h-20 rounded-lg mb-2"
                style={{ backgroundColor: shade.value }}
              />
              <p className="text-sm font-medium">{shade.name}</p>
              <code className="text-xs text-muted-foreground">{shade.var}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h1 className="text-4xl font-bold mb-1">Heading 1</h1>
              <code className="text-xs text-muted-foreground">text-4xl font-bold</code>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1">Heading 2</h2>
              <code className="text-xs text-muted-foreground">text-3xl font-bold</code>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Heading 3</h3>
              <code className="text-xs text-muted-foreground">text-2xl font-bold</code>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-1">Heading 4</h4>
              <code className="text-xs text-muted-foreground">text-xl font-semibold</code>
            </div>
            <div>
              <p className="text-base mb-1">Body text - The quick brown fox jumps over the lazy dog</p>
              <code className="text-xs text-muted-foreground">text-base</code>
            </div>
            <div>
              <p className="text-sm mb-1">Small text - The quick brown fox jumps over the lazy dog</p>
              <code className="text-xs text-muted-foreground">text-sm</code>
            </div>
            <div>
              <p className="text-xs mb-1">Extra small text - The quick brown fox jumps over the lazy dog</p>
              <code className="text-xs text-muted-foreground">text-xs</code>
            </div>
            <div className="border-t pt-4 mt-4">
              <h4 className="text-lg font-semibold mb-4">Label Styles</h4>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Default Label</Label>
                  <code className="text-xs text-muted-foreground block mt-1">text-sm font-medium</code>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Semibold Label</Label>
                  <code className="text-xs text-muted-foreground block mt-1">text-sm font-semibold</code>
                </div>
                <div>
                  <Label className="text-xs font-medium">Small Label</Label>
                  <code className="text-xs text-muted-foreground block mt-1">text-xs font-medium</code>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Muted Label</Label>
                  <code className="text-xs text-muted-foreground block mt-1">text-sm font-medium text-muted-foreground</code>
                </div>
                <div>
                  <Label className="text-sm font-medium" htmlFor="example">
                    Label for Input
                  </Label>
                  <code className="text-xs text-muted-foreground block mt-1">with htmlFor attribute</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Border Radius */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Border Radius</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { name: "Small", value: "0.375rem", class: "rounded-sm" },
            { name: "Medium", value: "0.5rem", class: "rounded-md" },
            { name: "Large", value: "0.75rem", class: "rounded-lg" },
            { name: "XL", value: "1.5rem", class: "rounded-xl" },
            { name: "2XL", value: "2rem", class: "rounded-2xl" },
            { name: "3XL", value: "2.5rem", class: "rounded-3xl" },
            { name: "4XL", value: "3rem", class: "rounded-[3rem]" },
          ].map((radius) => (
            <Card key={radius.name}>
              <CardContent className="p-4">
                <div className={`w-full h-24 bg-primary ${radius.class} mb-3`} />
                <h3 className="font-semibold mb-1">{radius.name}</h3>
                <code className="text-xs text-muted-foreground">{radius.value}</code>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Shadows</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Small", class: "shadow-sm" },
            { name: "Medium", class: "shadow-md" },
            { name: "Large", class: "shadow-lg" },
          ].map((shadow) => (
            <Card key={shadow.name} className={shadow.class}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">{shadow.name}</h3>
                <code className="text-xs text-muted-foreground">{shadow.class}</code>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Components Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Components</h2>

        {/* Buttons */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">This is a sample card with content.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Cards are versatile containers.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Third Card</CardTitle>
                <CardDescription>Example description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Use cards to group related content.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Alerts</h3>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                This is an informational alert message.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is a destructive alert message indicating an error.
              </AlertDescription>
            </Alert>
            <Alert className="border-success text-success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                This is a success alert message.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Radio Group */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Radio Group</h3>
          <RadioGroup defaultValue="option-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-1" id="option-1" />
              <Label htmlFor="option-1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-2" id="option-2" />
              <Label htmlFor="option-2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-3" id="option-3" />
              <Label htmlFor="option-3">Option 3</Label>
            </div>
          </RadioGroup>
        </div>
      </section>
    </div>
  )
}
