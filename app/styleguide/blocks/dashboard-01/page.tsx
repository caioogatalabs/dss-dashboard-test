"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Dashboard01Page() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dashboard 01</h1>
        <p className="text-muted-foreground mt-2">
          A complete dashboard block with sidebar navigation, charts, data tables, and metric cards.
        </p>
      </div>

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground">
                This block creates a full-featured dashboard layout with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Collapsible sidebar navigation with user menu</li>
                <li>Responsive header with breadcrumbs</li>
                <li>Metric cards with trend indicators</li>
                <li>Interactive area chart with time range selector</li>
                <li>Data table with sorting, filtering, and pagination</li>
              </ul>
              <div className="mt-4">
                <Link href="/" target="_blank">
                  <Button>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Dashboard Preview
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Components Included */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Components Included</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sidebar</CardTitle>
              <CardDescription>
                Collapsible sidebar with navigation, documents section, and user menu
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Section Cards</CardTitle>
              <CardDescription>
                Metric cards showing KPIs with trend badges and descriptions
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chart Area Interactive</CardTitle>
              <CardDescription>
                Area chart with time range toggle and responsive design
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Table</CardTitle>
              <CardDescription>
                Full-featured table with sorting, filtering, row selection, and pagination
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Site Header</CardTitle>
              <CardDescription>
                Header with sidebar trigger, breadcrumbs, and search
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nav Components</CardTitle>
              <CardDescription>
                NavMain, NavDocuments, NavSecondary, NavUser for sidebar sections
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* File Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">File Structure</h2>
        <Card>
          <CardContent className="p-6">
            <pre className="text-sm overflow-x-auto">
{`app/
├── page.tsx              # Main dashboard page (root)
└── finance-data.json     # Sample data for dashboard

components/
├── ui/
│   ├── sidebar.tsx       # Sidebar primitives
│   └── toggle-group.tsx  # Toggle group component
├── app-sidebar.tsx       # Application sidebar
├── chart-area-interactive.tsx
├── data-table.tsx        # Dashboard data table
├── nav-documents.tsx     # Documents navigation
├── nav-main.tsx          # Main navigation
├── nav-secondary.tsx     # Secondary navigation
├── nav-user.tsx          # User navigation/menu
├── section-cards.tsx     # Metric cards
└── site-header.tsx       # Site header`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Usage</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              The dashboard block can be used as a starting point for building admin panels,
              analytics dashboards, or any data-heavy application.
            </p>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <SectionCards />
          <ChartAreaInteractive />
          <DataTable data={data} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Dependencies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Dependencies</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">NPM Packages</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li><code className="bg-muted px-1 rounded">@tabler/icons-react</code> - Icon library</li>
                  <li><code className="bg-muted px-1 rounded">recharts</code> - Chart library</li>
                  <li><code className="bg-muted px-1 rounded">@tanstack/react-table</code> - Data table</li>
                  <li><code className="bg-muted px-1 rounded">@radix-ui/react-slot</code> - Slot primitive</li>
                  <li><code className="bg-muted px-1 rounded">@radix-ui/react-toggle-group</code> - Toggle group</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">UI Components Used</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Button, Card, Badge, Avatar</li>
                  <li>Select, Checkbox, Input</li>
                  <li>DropdownMenu, Sheet, Tooltip</li>
                  <li>Table, Tabs, Skeleton</li>
                  <li>Separator, Breadcrumb</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Customization */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Customization</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                All components are fully customizable. Common customization points:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Sidebar Navigation:</strong> Edit <code className="bg-muted px-1 rounded">components/app-sidebar.tsx</code> to
                  change menu items, branding, and user data
                </li>
                <li>
                  <strong>Metric Cards:</strong> Edit <code className="bg-muted px-1 rounded">components/section-cards.tsx</code> to
                  change KPIs, values, and trend indicators
                </li>
                <li>
                  <strong>Chart:</strong> Edit <code className="bg-muted px-1 rounded">components/chart-area-interactive.tsx</code> to
                  change chart type, data, and time ranges
                </li>
                <li>
                  <strong>Data Table:</strong> Edit <code className="bg-muted px-1 rounded">components/data-table.tsx</code> to
                  change columns, filtering, and row actions
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toggle Sidebar</span>
                <kbd className="bg-muted px-2 py-1 rounded text-xs">⌘ + B</kbd>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
