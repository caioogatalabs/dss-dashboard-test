"use client"

import * as React from "react"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { TransactionsView } from "@/components/finance/transactions-view"
import { NewTransactionModal } from "@/components/finance/modals/new-transaction-modal"

export default function TransacoesPage() {
  const [newTxOpen, setNewTxOpen] = React.useState(false)

  return (
    <>
      <header
        className="flex h-16 items-center gap-2 border-b px-4 lg:px-6 md:rounded-t-xl"
        style={{ backgroundColor: "oklab(0.290478 0.0000131577 0.00000579655 / 0.0)" }}
      >
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <h1 className="text-lg font-semibold">Transações</h1>
        <div className="flex-1" />
        <Button className="gap-2" onClick={() => setNewTxOpen(true)}>
          <IconPlus className="size-4" />
          Nova Transação
        </Button>
      </header>
      <div
        className="flex flex-1 flex-col gap-6 p-4 lg:p-6"
        style={{ backgroundColor: "oklab(0.290478 0.0000131577 0.00000579655 / 0.0)" }}
      >
        <TransactionsView onAddFirst={() => setNewTxOpen(true)} />
      </div>
      <NewTransactionModal open={newTxOpen} onOpenChange={setNewTxOpen} />
    </>
  )
}
