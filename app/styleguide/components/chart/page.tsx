"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

const barChartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const lineChartData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 2000, expenses: 9800 },
  { month: "Apr", revenue: 2780, expenses: 3908 },
  { month: "May", revenue: 1890, expenses: 4800 },
  { month: "Jun", revenue: 2390, expenses: 3800 },
]

const areaChartData = [
  { month: "Jan", visitors: 2400 },
  { month: "Feb", visitors: 1398 },
  { month: "Mar", visitors: 9800 },
  { month: "Apr", visitors: 3908 },
  { month: "May", visitors: 4800 },
  { month: "Jun", visitors: 3800 },
]

const pieChartData = [
  { name: "Chrome", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "Safari", value: 300, fill: "hsl(var(--chart-2))" },
  { name: "Firefox", value: 300, fill: "hsl(var(--chart-3))" },
  { name: "Edge", value: 200, fill: "hsl(var(--chart-4))" },
]

const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const lineChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const areaChartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const pieChartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export default function ChartPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Chart</h1>
        <p className="text-muted-foreground">
          Componente de visualização de dados usando Recharts com suporte a múltiplos tipos de gráficos.
        </p>
      </div>

      {/* Bar Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Bar Chart</h2>
        <p className="text-sm text-muted-foreground mb-4">Gráfico de barras vertical com múltiplas séries de dados.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart - Basic</CardTitle>
              <CardDescription>Gráfico básico sem eixos</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={barChartData}>
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bar Chart - With Axes</CardTitle>
              <CardDescription>Gráfico com eixos e grid</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={barChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Bar Chart - Complete</CardTitle>
              <CardDescription>Gráfico completo com tooltip e legenda</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={barChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Line Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Line Chart</h2>
        <p className="text-sm text-muted-foreground mb-4">Gráfico de linhas para visualizar tendências ao longo do tempo.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Line Chart - Basic</CardTitle>
              <CardDescription>Gráfico de linhas simples</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
                <LineChart accessibilityLayer data={lineChartData}>
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-expenses)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Chart - With Grid</CardTitle>
              <CardDescription>Gráfico com grid e eixos</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
                <LineChart accessibilityLayer data={lineChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-expenses)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Line Chart - Complete</CardTitle>
              <CardDescription>Gráfico completo com tooltip e legenda</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
                <LineChart accessibilityLayer data={lineChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-expenses)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Area Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Area Chart</h2>
        <p className="text-sm text-muted-foreground mb-4">Gráfico de área para visualizar volumes ao longo do tempo.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Area Chart - Basic</CardTitle>
              <CardDescription>Gráfico de área simples</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={areaChartConfig} className="h-[300px] w-full">
                <AreaChart accessibilityLayer data={areaChartData}>
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    fill="var(--color-visitors)"
                    fillOpacity={0.4}
                    stroke="var(--color-visitors)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Area Chart - With Grid</CardTitle>
              <CardDescription>Gráfico com grid e eixos</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={areaChartConfig} className="h-[300px] w-full">
                <AreaChart accessibilityLayer data={areaChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    fill="var(--color-visitors)"
                    fillOpacity={0.4}
                    stroke="var(--color-visitors)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Area Chart - Complete</CardTitle>
              <CardDescription>Gráfico completo com tooltip</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={areaChartConfig} className="h-[300px] w-full">
                <AreaChart accessibilityLayer data={areaChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    fill="var(--color-visitors)"
                    fillOpacity={0.4}
                    stroke="var(--color-visitors)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pie Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Pie Chart</h2>
        <p className="text-sm text-muted-foreground mb-4">Gráfico de pizza para visualizar proporções.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pie Chart - Basic</CardTitle>
              <CardDescription>Gráfico de pizza simples</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ChartContainer config={pieChartConfig} className="h-[300px] w-[300px]">
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pie Chart - With Tooltip</CardTitle>
              <CardDescription>Gráfico com tooltip interativo</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ChartContainer config={pieChartConfig} className="h-[300px] w-[300px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={pieChartData} dataKey="value" nameKey="name" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Documentation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Uso</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Import</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  // ... more data
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-[300px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">ChartContainer</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><code>config</code> - Configuração das séries de dados (obrigatório)</li>
                  <li><code>className</code> - Classes CSS adicionais</li>
                  <li><code>children</code> - Componentes Recharts</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ChartConfig</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><code>label</code> - Label da série</li>
                  <li><code>color</code> - Cor usando CSS variables</li>
                  <li><code>icon</code> - Ícone opcional para legenda</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipos de Gráficos Suportados</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Bar Chart - Gráficos de barras verticais e horizontais</li>
              <li>Line Chart - Gráficos de linha para tendências</li>
              <li>Area Chart - Gráficos de área para volumes</li>
              <li>Pie Chart - Gráficos de pizza para proporções</li>
              <li>Radar Chart - Gráficos radar para comparações multidimensionais</li>
              <li>Radial Chart - Gráficos radiais circulares</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acessibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Use <code>accessibilityLayer</code> prop nos componentes Recharts</li>
              <li>Cores acessíveis através de CSS variables</li>
              <li>Tooltips interativos com teclado</li>
              <li>Labels descritivos para leitores de tela</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
