"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function CarouselPage() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Carousel</h1>
        <p className="text-muted-foreground">
          A carousel with motion and swipe gestures built with Embla Carousel.
          Supports horizontal and vertical orientations, autoplay, and custom layouts.
        </p>
      </div>

      {/* Basic Carousel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Carousel</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple carousel with navigation arrows.
        </p>
        <div className="px-12 mb-4">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
          </pre>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Item Sizes</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Control the size of carousel items with basis classes.
        </p>

        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium mb-3">33% width (3 items visible)</p>
            <div className="px-12">
              <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-2xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">50% width (2 items visible)</p>
            <div className="px-12">
              <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/2">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-6">
                            <span className="text-2xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4 mt-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* 3 items visible */}
<CarouselItem className="basis-1/3">...</CarouselItem>

{/* 2 items visible */}
<CarouselItem className="basis-1/2">...</CarouselItem>

{/* Responsive */}
<CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">...</CarouselItem>`}
          </pre>
        </div>
      </section>

      {/* With API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">With Carousel API</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Access the carousel API to track and control the current slide.
        </p>
        <div className="px-12 mb-4">
          <Carousel setApi={setApi} className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { type CarouselApi } from "@/components/ui/carousel"

const [api, setApi] = React.useState<CarouselApi>()
const [current, setCurrent] = React.useState(0)

React.useEffect(() => {
  if (!api) return
  setCurrent(api.selectedScrollSnap() + 1)
  api.on("select", () => {
    setCurrent(api.selectedScrollSnap() + 1)
  })
}, [api])

<Carousel setApi={setApi}>...</Carousel>
<p>Slide {current} of {count}</p>`}
          </pre>
        </div>
      </section>

      {/* Vertical */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Vertical Orientation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Carousel with vertical scrolling.
        </p>
        <div className="py-12 mb-4">
          <Carousel
            opts={{ align: "start" }}
            orientation="vertical"
            className="w-full max-w-xs mx-auto"
          >
            <CarouselContent className="-mt-1 h-[200px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pt-1 basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Carousel orientation="vertical">
  <CarouselContent className="h-[200px]">
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
          </pre>
        </div>
      </section>

      {/* Loop */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Infinite Loop</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Carousel that loops infinitely.
        </p>
        <div className="px-12 mb-4">
          <Carousel opts={{ loop: true }} className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Carousel opts={{ loop: true }}>
  ...
</Carousel>`}
          </pre>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Image Carousel</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Carousel displaying images.
        </p>
        <div className="px-12 mb-4">
          <Carousel className="w-full max-w-lg mx-auto">
            <CarouselContent>
              {[
                "bg-gradient-to-r from-pink-500 to-rose-500",
                "bg-gradient-to-r from-violet-500 to-purple-500",
                "bg-gradient-to-r from-cyan-500 to-blue-500",
                "bg-gradient-to-r from-emerald-500 to-green-500",
                "bg-gradient-to-r from-amber-500 to-orange-500",
              ].map((gradient, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className={`aspect-video rounded-lg ${gradient} flex items-center justify-center`}>
                      <span className="text-white text-2xl font-semibold">Image {index + 1}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
                <td className="p-3 font-mono text-xs">Carousel</td>
                <td className="p-3 text-muted-foreground">Root container with context provider</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CarouselContent</td>
                <td className="p-3 text-muted-foreground">Scrollable container for items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CarouselItem</td>
                <td className="p-3 text-muted-foreground">Individual slide item</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CarouselPrevious</td>
                <td className="p-3 text-muted-foreground">Previous slide button</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CarouselNext</td>
                <td className="p-3 text-muted-foreground">Next slide button</td>
              </tr>
            </tbody>
          </table>
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
                <td className="p-3 font-mono text-xs">orientation</td>
                <td className="p-3 font-mono text-xs">"horizontal" | "vertical"</td>
                <td className="p-3">"horizontal"</td>
                <td className="p-3 text-muted-foreground">Scroll direction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">opts</td>
                <td className="p-3 font-mono text-xs">EmblaOptionsType</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Embla carousel options</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">opts.loop</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 text-muted-foreground">Enable infinite loop</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">opts.align</td>
                <td className="p-3 font-mono text-xs">"start" | "center" | "end"</td>
                <td className="p-3">"center"</td>
                <td className="p-3 text-muted-foreground">Slide alignment</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">setApi</td>
                <td className="p-3 font-mono text-xs">(api: CarouselApi) =&gt; void</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Callback to get carousel API</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses role="region" with aria-roledescription="carousel"</li>
          <li>Each slide has role="group" with aria-roledescription="slide"</li>
          <li>Keyboard navigation with arrow keys</li>
          <li>Navigation buttons have sr-only labels</li>
          <li>Supports touch/swipe gestures on mobile</li>
        </ul>
      </section>
    </div>
  )
}
