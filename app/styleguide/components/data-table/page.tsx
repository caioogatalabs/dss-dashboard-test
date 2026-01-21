"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample data types
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  createdAt: string
}

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "moderator"
  status: "active" | "inactive"
}

// Sample payment data
const payments: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com", createdAt: "2024-01-15" },
  { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com", createdAt: "2024-01-14" },
  { id: "573f2e91", amount: 250, status: "success", email: "john@company.com", createdAt: "2024-01-13" },
  { id: "a1b2c3d4", amount: 75, status: "failed", email: "jane@example.org", createdAt: "2024-01-12" },
  { id: "e5f6g7h8", amount: 350, status: "success", email: "bob@test.com", createdAt: "2024-01-11" },
  { id: "i9j0k1l2", amount: 200, status: "pending", email: "alice@demo.com", createdAt: "2024-01-10" },
  { id: "m3n4o5p6", amount: 150, status: "processing", email: "charlie@mail.com", createdAt: "2024-01-09" },
  { id: "q7r8s9t0", amount: 500, status: "success", email: "diana@work.com", createdAt: "2024-01-08" },
  { id: "u1v2w3x4", amount: 80, status: "failed", email: "eve@sample.com", createdAt: "2024-01-07" },
  { id: "y5z6a7b8", amount: 175, status: "success", email: "frank@inbox.com", createdAt: "2024-01-06" },
  { id: "c9d0e1f2", amount: 225, status: "pending", email: "grace@email.com", createdAt: "2024-01-05" },
  { id: "g3h4i5j6", amount: 300, status: "success", email: "henry@domain.com", createdAt: "2024-01-04" },
]

// Sample user data
const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "moderator", status: "inactive" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "user", status: "active" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com", role: "user", status: "active" },
]

// Payment columns with all features
const paymentColumns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = {
        pending: "secondary",
        processing: "outline",
        success: "default",
        failed: "destructive",
      }[status] as "secondary" | "outline" | "default" | "destructive"

      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>View customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Simple user columns
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return <Badge variant="outline">{role}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
]

export default function DataTablePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Data Table</h1>
        <p className="text-muted-foreground">
          Powerful data tables built with TanStack Table. Includes sorting, filtering,
          pagination, row selection, and column visibility controls.
        </p>
      </div>

      {/* Full Featured Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Full Featured Table</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Complete data table with sorting, filtering, pagination, row selection, and actions menu.
        </p>
        <div className="rounded-lg border p-6 bg-card mb-4">
          <DataTable
            columns={paymentColumns}
            data={payments}
            searchKey="email"
            searchPlaceholder="Filter emails..."
          />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  // ... more columns
]

<DataTable
  columns={columns}
  data={payments}
  searchKey="email"
  searchPlaceholder="Filter emails..."
/>`}
          </pre>
        </div>
      </section>

      {/* Simple Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Simple Table</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Basic table without search or pagination controls.
        </p>
        <div className="rounded-lg border p-6 bg-card mb-4">
          <DataTable
            columns={userColumns}
            data={users}
            showColumnToggle={false}
            showPagination={false}
          />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<DataTable
  columns={userColumns}
  data={users}
  showColumnToggle={false}
  showPagination={false}
/>`}
          </pre>
        </div>
      </section>

      {/* With Pagination Only */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Pagination</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Table with pagination controls and custom page size.
        </p>
        <div className="rounded-lg border p-6 bg-card mb-4">
          <DataTable
            columns={userColumns}
            data={users}
            showColumnToggle={false}
            pageSize={3}
          />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<DataTable
  columns={userColumns}
  data={users}
  showColumnToggle={false}
  pageSize={3}
/>`}
          </pre>
        </div>
      </section>

      {/* Column Definitions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Column Definitions</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Examples of different column configurations.
        </p>

        <div className="grid gap-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium mb-2">Basic Column:</p>
            <pre className="text-xs overflow-x-auto">
{`{
  accessorKey: "email",
  header: "Email",
}`}
            </pre>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium mb-2">Sortable Column:</p>
            <pre className="text-xs overflow-x-auto">
{`{
  accessorKey: "amount",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Amount" />
  ),
}`}
            </pre>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium mb-2">Custom Cell Render:</p>
            <pre className="text-xs overflow-x-auto">
{`{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status") as string
    return <Badge variant="default">{status}</Badge>
  },
}`}
            </pre>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium mb-2">Selection Column:</p>
            <pre className="text-xs overflow-x-auto">
{`{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
}`}
            </pre>
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
                <td className="p-3 font-mono text-xs">columns</td>
                <td className="p-3 font-mono text-xs">ColumnDef[]</td>
                <td className="p-3">Required</td>
                <td className="p-3 text-muted-foreground">Column definitions for the table</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">data</td>
                <td className="p-3 font-mono text-xs">TData[]</td>
                <td className="p-3">Required</td>
                <td className="p-3 text-muted-foreground">Array of data to display</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">searchKey</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Column key to enable search filtering</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">searchPlaceholder</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">"Search..."</td>
                <td className="p-3 text-muted-foreground">Placeholder text for search input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">showColumnToggle</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3 text-muted-foreground">Show/hide column visibility dropdown</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">showPagination</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3 text-muted-foreground">Show/hide pagination controls</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">pageSize</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3">10</td>
                <td className="p-3 text-muted-foreground">Initial number of rows per page</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses semantic table elements (table, thead, tbody, th, td)</li>
          <li>Checkboxes include aria-label for screen readers</li>
          <li>Sort buttons are keyboard accessible</li>
          <li>Pagination buttons include sr-only text descriptions</li>
          <li>Focus states are visible for all interactive elements</li>
        </ul>
      </section>
    </div>
  )
}
