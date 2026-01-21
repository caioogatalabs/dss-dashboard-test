"use client"

import * as React from "react"
import { Minus, Plus, Settings, User, CreditCard, Menu, X, Filter, SlidersHorizontal } from "lucide-react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DrawerPage() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Drawer</h1>
        <p className="text-muted-foreground">
          A panel that slides in from the edge of the screen. Built with Vaul for
          smooth touch gestures and animations.
        </p>
      </div>

      {/* Basic Drawer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Drawer</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple drawer that slides up from the bottom.
        </p>
        <div className="flex gap-4 mb-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
                <DrawerDescription>
                  This is a basic drawer with header, content, and footer sections.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  The drawer content goes here. You can add any content you need.
                </p>
              </div>
              <DrawerFooter>
                <Button>Save Changes</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">Content here</div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
          </pre>
        </div>
      </section>

      {/* Drawer Directions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Drawer Directions</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Drawers can slide in from any edge of the screen.
        </p>
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Bottom (default) */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Bottom Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides up from the bottom (default).
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <p className="text-sm text-muted-foreground">
                  Best for mobile actions and quick selections.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Top */}
          <Drawer direction="top">
            <DrawerTrigger asChild>
              <Button variant="outline">Top</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Top Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides down from the top.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <p className="text-sm text-muted-foreground">
                  Great for notifications or alerts.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Left */}
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="outline">Left</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Left Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides in from the left.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Typically used for navigation menus.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Right */}
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">Right</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Right Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides in from the right.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Often used for settings or details panels.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Top */}
<Drawer direction="top">...</Drawer>

{/* Left */}
<Drawer direction="left">...</Drawer>

{/* Right */}
<Drawer direction="right">...</Drawer>

{/* Bottom (default) */}
<Drawer>...</Drawer>`}
          </pre>
        </div>
      </section>

      {/* Interactive Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interactive Example</h2>
        <p className="text-sm text-muted-foreground mb-4">
          A more complex drawer with interactive content.
        </p>
        <div className="flex gap-4 mb-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Set Goal</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(-10)}
                      disabled={goal <= 200}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {goal}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                      disabled={goal >= 400}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* Form Drawer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Form Drawer</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Drawer containing a form with input fields.
        </p>
        <div className="flex gap-4 mb-4">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit Profile</DrawerTitle>
                <DrawerDescription>
                  Make changes to your profile here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@johndoe" />
                </div>
              </div>
              <DrawerFooter>
                <Button>Save changes</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* Navigation Drawer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Navigation Drawer</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Drawer used as a mobile navigation menu.
        </p>
        <div className="flex gap-4 mb-4">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="border-b">
                <DrawerTitle>Navigation</DrawerTitle>
              </DrawerHeader>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </Button>
                  </li>
                </ul>
              </nav>
              <DrawerFooter className="border-t">
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* Filter Drawer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Filter Drawer</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Mobile-friendly filter panel.
        </p>
        <div className="flex gap-4 mb-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Narrow down your search results.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input placeholder="All categories" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="Enter location" />
                </div>
              </div>
              <DrawerFooter>
                <Button>Apply Filters</Button>
                <Button variant="outline">Reset</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
                <td className="p-3 font-mono text-xs">Drawer</td>
                <td className="p-3 text-muted-foreground">Root component that manages state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DrawerTrigger</td>
                <td className="p-3 text-muted-foreground">Element that opens the drawer</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DrawerContent</td>
                <td className="p-3 text-muted-foreground">The sliding panel container</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DrawerHeader</td>
                <td className="p-3 text-muted-foreground">Container for title and description</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DrawerTitle</td>
                <td className="p-3 text-muted-foreground">The drawer title</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DrawerDescription</td>
                <td className="p-3 text-muted-foreground">Secondary text description</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DrawerFooter</td>
                <td className="p-3 text-muted-foreground">Container for action buttons</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">DrawerClose</td>
                <td className="p-3 text-muted-foreground">Closes the drawer when clicked</td>
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
                <td className="p-3 font-mono text-xs">direction</td>
                <td className="p-3 font-mono text-xs">"top" | "bottom" | "left" | "right"</td>
                <td className="p-3">"bottom"</td>
                <td className="p-3 text-muted-foreground">Direction the drawer slides from</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">open</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Controlled open state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">onOpenChange</td>
                <td className="p-3 font-mono text-xs">(open: boolean) =&gt; void</td>
                <td className="p-3">-</td>
                <td className="p-3 text-muted-foreground">Callback when open state changes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">shouldScaleBackground</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3 text-muted-foreground">Scale the background when open</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Focus is trapped within the drawer when open</li>
          <li>Escape key closes the drawer</li>
          <li>Click outside closes the drawer</li>
          <li>Touch gestures for mobile (swipe to dismiss)</li>
          <li>Proper ARIA attributes for dialog role</li>
          <li>Focus returns to trigger when closed</li>
        </ul>
      </section>
    </div>
  )
}
