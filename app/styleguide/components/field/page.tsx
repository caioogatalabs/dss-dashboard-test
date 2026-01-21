"use client"

import * as React from "react"

import { Field, FieldGroup, FieldRow } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function FieldPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Field</h1>
        <p className="text-muted-foreground">
          A wrapper component for form fields that provides consistent layout for labels,
          inputs, descriptions, and error messages.
        </p>
      </div>

      {/* Basic Field */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Field</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple field with label and input.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <Field label="Email" htmlFor="email-basic">
            <Input id="email-basic" type="email" placeholder="Enter your email" />
          </Field>
          <Field label="Password" htmlFor="password-basic">
            <Input id="password-basic" type="password" placeholder="Enter your password" />
          </Field>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field label="Email" htmlFor="email">
  <Input id="email" type="email" placeholder="Enter your email" />
</Field>`}
          </pre>
        </div>
      </section>

      {/* Field with Description */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Field with Description</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add helper text to provide additional context.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <Field
            label="Username"
            htmlFor="username"
            description="This will be your public display name."
          >
            <Input id="username" placeholder="Enter username" />
          </Field>
          <Field
            label="Website"
            htmlFor="website"
            description="Include the full URL with https://"
          >
            <Input id="website" type="url" placeholder="https://example.com" />
          </Field>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Field
  label="Username"
  htmlFor="username"
  description="This will be your public display name."
>
  <Input id="username" placeholder="Enter username" />
</Field>`}
          </pre>
        </div>
      </section>

      {/* Field with Error */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Field with Error</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Display validation errors below the input.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <Field
            label="Email"
            htmlFor="email-error"
            error="Please enter a valid email address."
          >
            <Input
              id="email-error"
              type="email"
              placeholder="Enter your email"
              defaultValue="invalid-email"
              aria-invalid="true"
            />
          </Field>
          <Field
            label="Password"
            htmlFor="password-error"
            error="Password must be at least 8 characters."
          >
            <Input
              id="password-error"
              type="password"
              defaultValue="123"
              aria-invalid="true"
            />
          </Field>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Field
  label="Email"
  htmlFor="email"
  error="Please enter a valid email address."
>
  <Input
    id="email"
    type="email"
    aria-invalid="true"
  />
</Field>`}
          </pre>
        </div>
      </section>

      {/* Required Field */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Required Field</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Mark fields as required with an asterisk.
        </p>
        <div className="max-w-md space-y-4 mb-4">
          <Field label="Full Name" htmlFor="name" required>
            <Input id="name" placeholder="Enter your full name" required />
          </Field>
          <Field label="Phone Number" htmlFor="phone" required description="We'll only use this for account recovery.">
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
          </Field>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Field label="Full Name" htmlFor="name" required>
  <Input id="name" placeholder="Enter your full name" required />
</Field>`}
          </pre>
        </div>
      </section>

      {/* Field Group */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Field Group</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Group multiple fields with consistent spacing.
        </p>
        <div className="max-w-md mb-4">
          <FieldGroup>
            <Field label="First Name" htmlFor="first-name">
              <Input id="first-name" placeholder="John" />
            </Field>
            <Field label="Last Name" htmlFor="last-name">
              <Input id="last-name" placeholder="Doe" />
            </Field>
            <Field label="Email" htmlFor="email-group" required>
              <Input id="email-group" type="email" placeholder="john@example.com" />
            </Field>
          </FieldGroup>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { Field, FieldGroup } from "@/components/ui/field"

<FieldGroup>
  <Field label="First Name" htmlFor="first-name">
    <Input id="first-name" />
  </Field>
  <Field label="Last Name" htmlFor="last-name">
    <Input id="last-name" />
  </Field>
</FieldGroup>`}
          </pre>
        </div>
      </section>

      {/* Field Row */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Field Row</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Arrange fields in responsive grid columns.
        </p>
        <div className="space-y-6 mb-4">
          <div>
            <p className="text-sm font-medium mb-3">2 Columns</p>
            <FieldRow columns={2}>
              <Field label="First Name" htmlFor="fn-2col">
                <Input id="fn-2col" placeholder="John" />
              </Field>
              <Field label="Last Name" htmlFor="ln-2col">
                <Input id="ln-2col" placeholder="Doe" />
              </Field>
            </FieldRow>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">3 Columns</p>
            <FieldRow columns={3}>
              <Field label="City" htmlFor="city">
                <Input id="city" placeholder="New York" />
              </Field>
              <Field label="State" htmlFor="state">
                <Input id="state" placeholder="NY" />
              </Field>
              <Field label="Zip Code" htmlFor="zip">
                <Input id="zip" placeholder="10001" />
              </Field>
            </FieldRow>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">4 Columns</p>
            <FieldRow columns={4}>
              <Field label="Q1" htmlFor="q1">
                <Input id="q1" placeholder="$0.00" />
              </Field>
              <Field label="Q2" htmlFor="q2">
                <Input id="q2" placeholder="$0.00" />
              </Field>
              <Field label="Q3" htmlFor="q3">
                <Input id="q3" placeholder="$0.00" />
              </Field>
              <Field label="Q4" htmlFor="q4">
                <Input id="q4" placeholder="$0.00" />
              </Field>
            </FieldRow>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { Field, FieldRow } from "@/components/ui/field"

<FieldRow columns={2}>
  <Field label="First Name" htmlFor="first-name">
    <Input id="first-name" />
  </Field>
  <Field label="Last Name" htmlFor="last-name">
    <Input id="last-name" />
  </Field>
</FieldRow>`}
          </pre>
        </div>
      </section>

      {/* Complete Form Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Complete Form Example</h2>
        <p className="text-sm text-muted-foreground mb-4">
          A realistic form using Field components.
        </p>
        <div className="max-w-2xl rounded-lg border p-6 mb-4">
          <h3 className="text-lg font-semibold mb-4">Create Account</h3>
          <FieldGroup>
            <FieldRow columns={2}>
              <Field label="First Name" htmlFor="form-fn" required>
                <Input id="form-fn" placeholder="John" />
              </Field>
              <Field label="Last Name" htmlFor="form-ln" required>
                <Input id="form-ln" placeholder="Doe" />
              </Field>
            </FieldRow>
            <Field
              label="Email"
              htmlFor="form-email"
              required
              description="We'll send a verification link to this email."
            >
              <Input id="form-email" type="email" placeholder="john@example.com" />
            </Field>
            <Field
              label="Password"
              htmlFor="form-password"
              required
              description="Must be at least 8 characters with one uppercase letter."
            >
              <Input id="form-password" type="password" />
            </Field>
            <Field
              label="Confirm Password"
              htmlFor="form-confirm"
              required
            >
              <Input id="form-confirm" type="password" />
            </Field>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the terms and conditions
              </Label>
            </div>
            <Button className="w-full md:w-auto">Create Account</Button>
          </FieldGroup>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Props</h2>

        <h3 className="text-lg font-semibold mb-2">Field</h3>
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
                <td className="p-3 font-mono text-xs">label</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">The label text for the field</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">htmlFor</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">ID of the input element (for label association)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">description</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Helper text shown below the input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">error</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Error message (replaces description when set)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">required</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Show required indicator (*)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mb-2">FieldRow</h3>
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
                <td className="p-3 font-mono text-xs">columns</td>
                <td className="p-3 font-mono text-xs">1 | 2 | 3 | 4</td>
                <td className="p-3">2</td>
                <td className="p-3 text-muted-foreground">Number of columns (responsive)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Labels are properly associated with inputs via htmlFor/id</li>
          <li>Error messages should be linked to inputs with aria-describedby</li>
          <li>Required fields show visual indicator and should have required attribute</li>
          <li>Use aria-invalid="true" on inputs with errors</li>
          <li>Description text provides additional context for screen readers</li>
        </ul>
      </section>
    </div>
  )
}
