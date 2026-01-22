"use client"

import * as React from "react"
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import {
  IconCalendar,
  IconSearch,
  IconSettings2,
  IconPlus,
} from "@tabler/icons-react"

import { useFinance } from "@/hooks/use-finance"
import { NewTransactionModal } from "@/components/finance/modals/new-transaction-modal"
import { AddMemberModal } from "@/components/finance/modals/add-member-modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export function DashboardHeader() {
  const {
    familyMembers,
    filters,
    setSearchText,
    setTransactionType,
    setDateRange,
    setSelectedMember,
  } = useFinance()

  const [searchValue, setSearchValue] = React.useState(filters.searchText)
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false)
  const [showNewTransactionModal, setShowNewTransactionModal] = React.useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = React.useState(false)
  const [localDateRange, setLocalDateRange] = React.useState<DateRange | undefined>({
    from: filters.dateRange.startDate,
    to: filters.dateRange.endDate,
  })

  // Debounce para busca
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchValue)
    }, 150)

    return () => clearTimeout(timer)
  }, [searchValue, setSearchText])

  // Sincronizar dateRange do contexto
  React.useEffect(() => {
    setLocalDateRange({
      from: filters.dateRange.startDate,
      to: filters.dateRange.endDate,
    })
  }, [filters.dateRange])

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "dd MMM", { locale: ptBR })} - ${format(end, "dd MMM, yyyy", { locale: ptBR })}`
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDateRange(range.from, range.to)
      setIsDatePickerOpen(false)
    } else if (range?.from) {
      setLocalDateRange(range)
    }
  }

  const handleQuickDateRange = (type: "thisMonth" | "lastMonth" | "last3Months" | "thisYear") => {
    const now = new Date()
    let start: Date
    let end: Date

    switch (type) {
      case "thisMonth":
        start = startOfMonth(now)
        end = endOfMonth(now)
        break
      case "lastMonth":
        const lastMonth = subMonths(now, 1)
        start = startOfMonth(lastMonth)
        end = endOfMonth(lastMonth)
        break
      case "last3Months":
        start = startOfMonth(subMonths(now, 2))
        end = endOfMonth(now)
        break
      case "thisYear":
        start = startOfYear(now)
        end = endOfYear(now)
        break
    }

    setDateRange(start, end)
    setIsDatePickerOpen(false)
  }

  const handleMemberClick = (memberId: string) => {
    if (filters.selectedMember === memberId) {
      setSelectedMember(null)
    } else {
      setSelectedMember(memberId)
    }
  }

  return (
    <header 
      className="flex h-16 items-center gap-2 border-b px-4 lg:px-6 md:rounded-t-xl"
      style={{ backgroundColor: "oklab(0.290478 0.0000131577 0.00000579655 / 0.0)" }}
    >
      {/* Sidebar Trigger */}
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mx-2 data-[orientation=vertical]:h-4"
      />

      <div className="flex flex-1 items-center gap-3">
        {/* Search */}
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-40 pl-9 md:w-48"
          />
        </div>

        {/* Transaction Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <IconSettings2 className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Tipo de Transação</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.transactionType}
              onValueChange={(value) =>
                setTransactionType(value as "all" | "income" | "expense")
              }
            >
              <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="income">Receitas</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="expense">Despesas</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Range Picker */}
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <IconCalendar className="size-4" />
              <span className="hidden sm:inline">
                {formatDateRange(filters.dateRange.startDate, filters.dateRange.endDate)}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              {/* Quick Date Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickDateRange("thisMonth")}
                  className="text-xs"
                >
                  Este mês
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickDateRange("lastMonth")}
                  className="text-xs"
                >
                  Mês passado
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickDateRange("last3Months")}
                  className="text-xs"
                >
                  Últimos 3 meses
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickDateRange("thisYear")}
                  className="text-xs"
                >
                  Este ano
                </Button>
              </div>

              {/* Calendar */}
              <Calendar
                mode="range"
                defaultMonth={localDateRange?.from}
                selected={localDateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                initialFocus
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* User Avatars */}
        <div className="flex -space-x-2">
          {familyMembers.map((member) => {
            const isSelected = filters.selectedMember === member.id
            return (
              <button
                key={member.id}
                onClick={() => handleMemberClick(member.id)}
                className={`transition-all ${isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                style={{
                  borderRadius: "50%",
                }}
                title={member.name}
              >
                <Avatar
                  className={`size-9 border-2 transition-all ${
                    isSelected ? "border-primary" : "border-background"
                  }`}
                >
                  <AvatarFallback
                    className="text-xs font-medium"
                    style={{
                      backgroundColor: isSelected ? member.color : undefined,
                      color: isSelected ? "white" : undefined,
                    }}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </button>
            )
          })}
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-full"
            onClick={() => setShowAddMemberModal(true)}
          >
            <IconPlus className="size-4" />
          </Button>
        </div>
      </div>

      {/* New Transaction Button */}
      <Button className="gap-2" onClick={() => setShowNewTransactionModal(true)}>
        <IconPlus className="size-4" />
        <span className="hidden sm:inline">Nova transação</span>
      </Button>

      <NewTransactionModal
        open={showNewTransactionModal}
        onOpenChange={setShowNewTransactionModal}
      />
      <AddMemberModal open={showAddMemberModal} onOpenChange={setShowAddMemberModal} />
    </header>
  )
}
