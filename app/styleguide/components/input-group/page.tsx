"use client"

import * as React from "react"
import { Search, Mail, AtSign, Globe, Copy, Eye, EyeOff, Check, Percent, DollarSign, Hash } from "lucide-react"

import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  getInputGroupInputClass,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function InputGroupPage() {
  const [copied, setCopied] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Input Group</h1>
        <p className="text-muted-foreground">
          Combine inputs with text, icons, or buttons to create compound input fields.
          Useful for prefixes, suffixes, and action buttons.
        </p>
      </div>

      {/* Basic Text Addon */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Text Addons</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add text labels before or after the input.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Username</Label>
            <InputGroup>
              <InputGroupText position="left">@</InputGroupText>
              <Input
                placeholder="username"
                className={getInputGroupInputClass({ hasLeftAddon: true })}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Website</Label>
            <InputGroup>
              <InputGroupText position="left">https://</InputGroupText>
              <Input
                placeholder="example.com"
                className={getInputGroupInputClass({ hasLeftAddon: true })}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <InputGroup>
              <Input
                placeholder="username"
                className={getInputGroupInputClass({ hasRightAddon: true })}
              />
              <InputGroupText position="right">@company.com</InputGroupText>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <InputGroup>
              <InputGroupText position="left">$</InputGroupText>
              <Input
                type="number"
                placeholder="0.00"
                className={getInputGroupInputClass({ hasLeftAddon: true, hasRightAddon: true })}
              />
              <InputGroupText position="right">USD</InputGroupText>
            </InputGroup>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import {
  InputGroup,
  InputGroupText,
  getInputGroupInputClass,
} from "@/components/ui/input-group"

<InputGroup>
  <InputGroupText position="left">@</InputGroupText>
  <Input
    placeholder="username"
    className={getInputGroupInputClass({ hasLeftAddon: true })}
  />
</InputGroup>`}
          </pre>
        </div>
      </section>

      {/* Icon Addons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Icon Addons</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use icons as visual indicators in input groups.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Search</Label>
            <InputGroup>
              <InputGroupText position="left">
                <Search className="h-4 w-4" />
              </InputGroupText>
              <Input
                type="search"
                placeholder="Search..."
                className={getInputGroupInputClass({ hasLeftAddon: true })}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <InputGroup>
              <InputGroupText position="left">
                <Mail className="h-4 w-4" />
              </InputGroupText>
              <Input
                type="email"
                placeholder="Enter email"
                className={getInputGroupInputClass({ hasLeftAddon: true })}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Social Handle</Label>
            <InputGroup>
              <InputGroupText position="left">
                <AtSign className="h-4 w-4" />
              </InputGroupText>
              <Input
                placeholder="twitter_handle"
                className={getInputGroupInputClass({ hasLeftAddon: true })}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Website URL</Label>
            <InputGroup>
              <InputGroupText position="left">
                <Globe className="h-4 w-4" />
              </InputGroupText>
              <Input
                type="url"
                placeholder="www.example.com"
                className={getInputGroupInputClass({ hasLeftAddon: true })}
              />
            </InputGroup>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<InputGroup>
  <InputGroupText position="left">
    <Search className="h-4 w-4" />
  </InputGroupText>
  <Input className={getInputGroupInputClass({ hasLeftAddon: true })} />
</InputGroup>`}
          </pre>
        </div>
      </section>

      {/* Button Addons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Button Addons</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Attach action buttons to inputs.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Search</Label>
            <InputGroup>
              <Input
                type="search"
                placeholder="Search..."
                className={getInputGroupInputClass({ hasRightAddon: true })}
              />
              <InputGroupAddon position="right">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Copy to clipboard</Label>
            <InputGroup>
              <Input
                readOnly
                defaultValue="https://example.com/share/abc123"
                className={getInputGroupInputClass({ hasRightAddon: true })}
              />
              <InputGroupAddon position="right">
                <Button variant="secondary" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={getInputGroupInputClass({ hasRightAddon: true })}
              />
              <InputGroupAddon position="right">
                <Button
                  variant="outline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Newsletter</Label>
            <InputGroup>
              <InputGroupText position="left">
                <Mail className="h-4 w-4" />
              </InputGroupText>
              <Input
                type="email"
                placeholder="Enter email"
                className={getInputGroupInputClass({ hasLeftAddon: true, hasRightAddon: true })}
              />
              <InputGroupAddon position="right">
                <Button>Subscribe</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { InputGroupAddon } from "@/components/ui/input-group"

<InputGroup>
  <Input className={getInputGroupInputClass({ hasRightAddon: true })} />
  <InputGroupAddon position="right">
    <Button>Search</Button>
  </InputGroupAddon>
</InputGroup>`}
          </pre>
        </div>
      </section>

      {/* Combined Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Combined Examples</h2>
        <p className="text-sm text-muted-foreground mb-4">
          More complex input groups with multiple addons.
        </p>
        <div className="max-w-lg space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Discount</Label>
            <InputGroup>
              <InputGroupText position="left">
                <Percent className="h-4 w-4" />
              </InputGroupText>
              <Input
                type="number"
                placeholder="0"
                className={getInputGroupInputClass({ hasLeftAddon: true, hasRightAddon: true })}
              />
              <InputGroupAddon position="right">
                <Button variant="secondary">Apply</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <InputGroup>
              <InputGroupAddon position="left">
                <Button variant="outline" size="icon">
                  <DollarSign className="h-4 w-4" />
                </Button>
              </InputGroupAddon>
              <Input
                type="number"
                placeholder="0.00"
                className={getInputGroupInputClass({ hasLeftAddon: true, hasRightAddon: true })}
              />
              <InputGroupText position="right">.00</InputGroupText>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Product ID</Label>
            <InputGroup>
              <InputGroupText position="left">
                <Hash className="h-4 w-4" />
              </InputGroupText>
              <InputGroupText position="left">PRD-</InputGroupText>
              <Input
                placeholder="00000"
                className={getInputGroupInputClass({ hasLeftAddon: true, hasRightAddon: true })}
              />
              <InputGroupAddon position="right">
                <Button variant="outline">Lookup</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Different Sizes</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Input groups adapt to different input sizes.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Small</Label>
            <InputGroup>
              <InputGroupText position="left" className="text-xs px-2">$</InputGroupText>
              <Input
                placeholder="0.00"
                className={getInputGroupInputClass({ hasLeftAddon: true }) + " h-8 text-xs"}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Default</Label>
            <InputGroup>
              <InputGroupText position="left">$</InputGroupText>
              <Input
                placeholder="0.00"
                className={getInputGroupInputClass({ hasLeftAddon: true })}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label>Large</Label>
            <InputGroup>
              <InputGroupText position="left" className="text-base px-4">$</InputGroupText>
              <Input
                placeholder="0.00"
                className={getInputGroupInputClass({ hasLeftAddon: true }) + " h-12 text-base"}
              />
            </InputGroup>
          </div>
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
                <td className="p-3 font-mono text-xs">InputGroup</td>
                <td className="p-3 text-muted-foreground">Container that holds input and addons</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">InputGroupText</td>
                <td className="p-3 text-muted-foreground">Text or icon addon (non-interactive)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">InputGroupAddon</td>
                <td className="p-3 text-muted-foreground">Button addon container</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">getInputGroupInputClass</td>
                <td className="p-3 text-muted-foreground">Utility to get proper border-radius classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Props</h2>

        <h3 className="text-lg font-semibold mb-2">InputGroupText</h3>
        <div className="rounded-lg border overflow-hidden mb-6">
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
                <td className="p-3 font-mono text-xs">position</td>
                <td className="p-3 font-mono text-xs">"left" | "right"</td>
                <td className="p-3">"left"</td>
                <td className="p-3 text-muted-foreground">Position relative to input</td>
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

        <h3 className="text-lg font-semibold mb-2">InputGroupAddon</h3>
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
                <td className="p-3 font-mono text-xs">position</td>
                <td className="p-3 font-mono text-xs">"left" | "right"</td>
                <td className="p-3">"left"</td>
                <td className="p-3 text-muted-foreground">Position relative to input</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Input remains focusable and accessible</li>
          <li>Addons are decorative and don't interfere with input</li>
          <li>Button addons are keyboard accessible</li>
          <li>Use aria-label on icon-only buttons</li>
          <li>Ensure proper Label association with input</li>
        </ul>
      </section>
    </div>
  )
}
