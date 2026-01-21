"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { Field, FieldRow } from "@/components/ui/field"
import { Label } from "@/components/ui/label"

export default function DatePickerPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [birthDate, setBirthDate] = React.useState<Date | undefined>()
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [bookingRange, setBookingRange] = React.useState<DateRange | undefined>()

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Date Picker</h1>
        <p className="text-muted-foreground">
          A date picker component built by composing Calendar and Popover.
          Supports single date and date range selection.
        </p>
      </div>

      {/* Basic Date Picker */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Date Picker</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Select a single date with a popover calendar.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <DatePicker
            date={date}
            onDateChange={setDate}
          />
          {date && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(date, "PPP")}
            </p>
          )}
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { DatePicker } from "@/components/ui/date-picker"

const [date, setDate] = React.useState<Date | undefined>(new Date())

<DatePicker
  date={date}
  onDateChange={setDate}
/>`}
          </pre>
        </div>
      </section>

      {/* With Placeholder */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Placeholder</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Custom placeholder text when no date is selected.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <DatePicker
            date={birthDate}
            onDateChange={setBirthDate}
            placeholder="Select your birth date"
          />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<DatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Select your birth date"
/>`}
          </pre>
        </div>
      </section>

      {/* Date Range Picker */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Date Range Picker</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Select a range of dates with start and end.
        </p>
        <div className="max-w-lg space-y-4 mb-4">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          {dateRange?.from && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(dateRange.from, "LLL dd, y")}
              {dateRange.to && ` - ${format(dateRange.to, "LLL dd, y")}`}
            </p>
          )}
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { DateRangePicker } from "@/components/ui/date-picker"
import { DateRange } from "react-day-picker"

const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

<DateRangePicker
  dateRange={dateRange}
  onDateRangeChange={setDateRange}
/>`}
          </pre>
        </div>
      </section>

      {/* Single Month Range Picker */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Single Month Range</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Date range picker with a single month view for compact layouts.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <DateRangePicker
            dateRange={bookingRange}
            onDateRangeChange={setBookingRange}
            placeholder="Select booking dates"
            numberOfMonths={1}
          />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<DateRangePicker
  dateRange={dateRange}
  onDateRangeChange={setDateRange}
  numberOfMonths={1}
/>`}
          </pre>
        </div>
      </section>

      {/* Disabled State */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Disabled State</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Date pickers can be disabled to prevent interaction.
        </p>
        <div className="max-w-sm space-y-4 mb-4">
          <DatePicker
            date={new Date()}
            disabled
          />
          <DateRangePicker
            dateRange={{ from: new Date(), to: addDays(new Date(), 5) }}
            disabled
          />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<DatePicker date={date} disabled />
<DateRangePicker dateRange={range} disabled />`}
          </pre>
        </div>
      </section>

      {/* With Field Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Field Component</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Combine with Field for labeled form layouts.
        </p>
        <div className="max-w-2xl space-y-4 mb-4">
          <FieldRow columns={2}>
            <Field label="Start Date" htmlFor="start-date" required>
              <DatePicker
                date={date}
                onDateChange={setDate}
                placeholder="Select start date"
              />
            </Field>
            <Field label="End Date" htmlFor="end-date">
              <DatePicker
                placeholder="Select end date"
              />
            </Field>
          </FieldRow>

          <Field
            label="Vacation Period"
            htmlFor="vacation"
            description="Select the dates for your vacation request."
          >
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              placeholder="Select vacation dates"
            />
          </Field>
        </div>
      </section>

      {/* Form Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Form Example</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Complete form using date pickers.
        </p>
        <div className="max-w-lg rounded-lg border p-6 mb-4">
          <h3 className="text-lg font-semibold mb-4">Book a Stay</h3>
          <div className="space-y-4">
            <Field label="Check-in / Check-out" required>
              <DateRangePicker
                placeholder="Select your dates"
                numberOfMonths={2}
              />
            </Field>
            <FieldRow columns={2}>
              <Field label="Guests">
                <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </Field>
              <Field label="Room Type">
                <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option>Standard</option>
                  <option>Deluxe</option>
                  <option>Suite</option>
                </select>
              </Field>
            </FieldRow>
          </div>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Props</h2>

        <h3 className="text-lg font-semibold mb-2">DatePicker</h3>
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
                <td className="p-3 font-mono text-xs">date</td>
                <td className="p-3 font-mono text-xs">Date | undefined</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">The selected date</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">onDateChange</td>
                <td className="p-3 font-mono text-xs">(date: Date | undefined) =&gt; void</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Callback when date changes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">placeholder</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">"Pick a date"</td>
                <td className="p-3 text-muted-foreground">Placeholder text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">disabled</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Disable the picker</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mb-2">DateRangePicker</h3>
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
                <td className="p-3 font-mono text-xs">dateRange</td>
                <td className="p-3 font-mono text-xs">DateRange | undefined</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">The selected date range</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">onDateRangeChange</td>
                <td className="p-3 font-mono text-xs">(range: DateRange | undefined) =&gt; void</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Callback when range changes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">numberOfMonths</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3">2</td>
                <td className="p-3 text-muted-foreground">Number of months to display</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">placeholder</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3">"Pick a date range"</td>
                <td className="p-3 text-muted-foreground">Placeholder text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">disabled</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Disable the picker</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Keyboard navigation in calendar (arrow keys)</li>
          <li>Enter/Space to select dates</li>
          <li>Escape to close popover</li>
          <li>Focus is managed when popover opens/closes</li>
          <li>Screen reader announces selected dates</li>
          <li>Button trigger is properly labeled</li>
        </ul>
      </section>
    </div>
  )
}
