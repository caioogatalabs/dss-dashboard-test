"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [multiDates, setMultiDates] = React.useState<Date[] | undefined>([
    new Date(),
    addDays(new Date(), 2),
    addDays(new Date(), 5),
  ])
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Calendar</h1>
        <p className="text-muted-foreground">
          A date picker component with support for single, multiple, and range selection.
          Built with react-day-picker.
        </p>
      </div>

      {/* Basic Calendar */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Calendar</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple calendar for selecting a single date.
        </p>
        <div className="flex flex-wrap gap-6 mb-4">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </CardContent>
          </Card>
          <div className="flex items-center">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium mb-1">Selected date:</p>
              <p className="text-lg font-semibold">
                {date ? format(date, "PPP") : "No date selected"}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`}
          </pre>
        </div>
      </section>

      {/* Multiple Selection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Multiple Selection</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Allow selecting multiple dates.
        </p>
        <div className="flex flex-wrap gap-6 mb-4">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="multiple"
                selected={multiDates}
                onSelect={setMultiDates}
              />
            </CardContent>
          </Card>
          <div className="flex items-start">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium mb-2">Selected dates:</p>
              {multiDates && multiDates.length > 0 ? (
                <ul className="space-y-1">
                  {multiDates.map((d, i) => (
                    <li key={i} className="text-sm">{format(d, "PPP")}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No dates selected</p>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`const [dates, setDates] = React.useState<Date[] | undefined>([])

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>`}
          </pre>
        </div>
      </section>

      {/* Date Range */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Date Range</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Select a range of dates with start and end.
        </p>
        <div className="flex flex-wrap gap-6 mb-4">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </CardContent>
          </Card>
          <div className="flex items-start">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium mb-2">Selected range:</p>
              {dateRange?.from ? (
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">From:</span> {format(dateRange.from, "PPP")}</p>
                  {dateRange.to && (
                    <p><span className="text-muted-foreground">To:</span> {format(dateRange.to, "PPP")}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a date range</p>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { DateRange } from "react-day-picker"

const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
/>`}
          </pre>
        </div>
      </section>

      {/* With Dropdown Navigation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Dropdown Navigation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use dropdowns for quick month and year selection.
        </p>
        <div className="flex flex-wrap gap-6 mb-4">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                fromYear={2020}
                toYear={2030}
              />
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Calendar
  mode="single"
  captionLayout="dropdown"
  fromYear={2020}
  toYear={2030}
/>`}
          </pre>
        </div>
      </section>

      {/* Disabled Dates */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Disabled Dates</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Disable specific dates or date ranges.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Disable past dates</CardTitle>
              <CardDescription>Cannot select dates before today</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Calendar
                mode="single"
                disabled={{ before: new Date() }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Disable future dates</CardTitle>
              <CardDescription>Cannot select dates after today</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Calendar
                mode="single"
                disabled={{ after: new Date() }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Disable weekends</CardTitle>
              <CardDescription>Cannot select Saturday or Sunday</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Calendar
                mode="single"
                disabled={{ dayOfWeek: [0, 6] }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Disable past dates */}
<Calendar disabled={{ before: new Date() }} />

{/* Disable future dates */}
<Calendar disabled={{ after: new Date() }} />

{/* Disable weekends */}
<Calendar disabled={{ dayOfWeek: [0, 6] }} />

{/* Disable specific dates */}
<Calendar disabled={[new Date(2024, 0, 1), new Date(2024, 11, 25)]} />`}
          </pre>
        </div>
      </section>

      {/* With Week Numbers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Week Numbers</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Display week numbers alongside the calendar.
        </p>
        <div className="flex flex-wrap gap-6 mb-4">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                showWeekNumber
              />
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Calendar
  mode="single"
  showWeekNumber
/>`}
          </pre>
        </div>
      </section>

      {/* Multiple Months */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Multiple Months</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Display multiple months at once.
        </p>
        <div className="mb-4">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                numberOfMonths={3}
              />
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Calendar
  mode="single"
  numberOfMonths={3}
/>`}
          </pre>
        </div>
      </section>

      {/* Hide Outside Days */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Outside Days</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Control visibility of days from adjacent months.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Show outside days (default)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Calendar
                mode="single"
                showOutsideDays={true}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Hide outside days</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Calendar
                mode="single"
                showOutsideDays={false}
              />
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Show outside days (default) */}
<Calendar showOutsideDays={true} />

{/* Hide outside days */}
<Calendar showOutsideDays={false} />`}
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
                <td className="p-3 font-mono text-xs">mode</td>
                <td className="p-3 font-mono text-xs">"single" | "multiple" | "range"</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Selection mode for the calendar</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">selected</td>
                <td className="p-3 font-mono text-xs">Date | Date[] | DateRange</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">The selected date(s)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">onSelect</td>
                <td className="p-3 font-mono text-xs">function</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Callback when date selection changes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">disabled</td>
                <td className="p-3 font-mono text-xs">Matcher | Matcher[]</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Dates to disable</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">numberOfMonths</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3">1</td>
                <td className="p-3 text-muted-foreground">Number of months to display</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">showOutsideDays</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3 text-muted-foreground">Show days from adjacent months</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">showWeekNumber</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Display week numbers</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">captionLayout</td>
                <td className="p-3 font-mono text-xs">"label" | "dropdown"</td>
                <td className="p-3">"label"</td>
                <td className="p-3 text-muted-foreground">Navigation style for month/year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Full keyboard navigation support (arrow keys, Enter, Space)</li>
          <li>Proper ARIA labels for navigation buttons</li>
          <li>Screen reader announces selected dates</li>
          <li>Focus management when navigating months</li>
          <li>Disabled dates are properly announced</li>
          <li>Uses semantic table structure for the calendar grid</li>
        </ul>
      </section>
    </div>
  )
}
