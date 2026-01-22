"use client"

import { FinanceSidebar } from "@/components/finance-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <FinanceSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col bg-muted/0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
