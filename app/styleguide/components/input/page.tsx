"use client"

import * as React from "react"
import { Search, Mail, Lock, Eye, EyeOff, User, Phone, CreditCard, Calendar, Link2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function InputPage() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Input</h1>
        <p className="text-muted-foreground">
          A basic input field for capturing text, numbers, and other data.
          Supports all native HTML input types and states.
        </p>
      </div>

      {/* Basic Input */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Input</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple text input with default styling.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <Input placeholder="Enter text..." />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { Input } from "@/components/ui/input"

<Input placeholder="Enter text..." />`}
          </pre>
        </div>
      </section>

      {/* Input Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Input Types</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Different input types for various data formats.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input id="text" type="text" placeholder="Enter text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="number">Number</Label>
            <Input id="number" type="number" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tel">Telephone</Label>
            <Input id="tel" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" type="url" placeholder="https://example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" type="search" placeholder="Search..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Input type="text" />
<Input type="email" />
<Input type="password" />
<Input type="number" />
<Input type="tel" />
<Input type="url" />
<Input type="search" />
<Input type="date" />
<Input type="time" />`}
          </pre>
        </div>
      </section>

      {/* File Input */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">File Input</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Input for file selection with styled button.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="file">Upload file</Label>
            <Input id="file" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="files">Multiple files</Label>
            <Input id="files" type="file" multiple />
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images only</Label>
            <Input id="images" type="file" accept="image/*" />
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Input type="file" />
<Input type="file" multiple />
<Input type="file" accept="image/*" />`}
          </pre>
        </div>
      </section>

      {/* Input States */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Input States</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Different states for inputs: default, disabled, and invalid.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="default">Default</Label>
            <Input id="default" placeholder="Default state" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="with-value">With value</Label>
            <Input id="with-value" defaultValue="Input with value" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled" className="text-muted-foreground">Disabled</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled-value" className="text-muted-foreground">Disabled with value</Label>
            <Input id="disabled-value" defaultValue="Cannot be edited" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invalid" className="text-destructive">Invalid</Label>
            <Input id="invalid" defaultValue="invalid-email" aria-invalid="true" />
            <p className="text-sm text-destructive">Please enter a valid email address.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="readonly">Read only</Label>
            <Input id="readonly" defaultValue="Read only value" readOnly />
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Default */}
<Input placeholder="Default" />

{/* Disabled */}
<Input disabled placeholder="Disabled" />

{/* Invalid */}
<Input aria-invalid="true" />

{/* Read only */}
<Input readOnly defaultValue="Read only" />`}
          </pre>
        </div>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Icons</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Inputs with leading or trailing icons using relative positioning.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" placeholder="Email address" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Password with toggle</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="url" placeholder="https://example.com" className="pl-10" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>`}
          </pre>
        </div>
      </section>

      {/* With Addons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Addons</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Inputs with prefix or suffix text/elements.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Price</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                $
              </span>
              <Input type="number" placeholder="0.00" className="rounded-l-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                https://
              </span>
              <Input placeholder="example.com" className="rounded-l-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="flex">
              <Input placeholder="username" className="rounded-r-none" />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                @company.com
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>With button</Label>
            <div className="flex gap-2">
              <Input placeholder="Enter email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Prefix */}
<div className="flex">
  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
    $
  </span>
  <Input className="rounded-l-none" />
</div>

{/* With button */}
<div className="flex gap-2">
  <Input placeholder="Enter email" />
  <Button>Subscribe</Button>
</div>`}
          </pre>
        </div>
      </section>

      {/* With Label */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Label Component</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Proper input/label association for accessibility.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="johndoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-required">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input id="email-required" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="with-helper">Phone number</Label>
            <Input id="with-helper" type="tel" placeholder="+1 (555) 000-0000" />
            <p className="text-sm text-muted-foreground">Include country code.</p>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>`}
          </pre>
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
                <td className="p-3 font-mono text-xs">type</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">"text"</td>
                <td className="p-3 text-muted-foreground">HTML input type</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">placeholder</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Placeholder text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">disabled</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Disable the input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">required</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Make field required</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">readOnly</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Make field read-only</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">aria-invalid</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Show invalid state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Always use Label with htmlFor matching input id</li>
          <li>Use aria-invalid for error states</li>
          <li>Use aria-describedby to link error messages</li>
          <li>Ensure sufficient color contrast for placeholder text</li>
          <li>Disabled inputs are not focusable</li>
          <li>Support keyboard navigation (Tab to focus)</li>
        </ul>
      </section>
    </div>
  )
}
