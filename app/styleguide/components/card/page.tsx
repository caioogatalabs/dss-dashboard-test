"use client"

import * as React from "react"
import { Bell, CreditCard, Settings, User, Mail, Lock, ChevronRight, MoreHorizontal } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Card</h1>
        <p className="text-muted-foreground">
          A versatile container component for grouping related content and actions.
          Cards provide a consistent visual structure for displaying information.
        </p>
      </div>

      {/* Basic Card */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Card</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple card with header, content, and footer sections.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This is the main content area of the card. You can add any content here.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                You have 3 unread notifications. Click below to view them.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" className="flex-1">Dismiss</Button>
              <Button className="flex-1">View All</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Your monthly overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,543</div>
              <p className="text-sm text-muted-foreground">Total visits this month</p>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-muted-foreground">+12% from last month</span>
            </CardFooter>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
          </pre>
        </div>
      </section>

      {/* Card with Action */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Card with Action</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Cards can include an action button in the header using CardAction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and permissions</CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-muted-foreground">Member</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">New comment on your post</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Payment processed</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">New follower</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">
        <Settings className="h-4 w-4" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>`}
          </pre>
        </div>
      </section>

      {/* Card with Form */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Card with Form</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Cards are commonly used to contain forms and input fields.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="Enter your password" className="pl-10" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign In</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Get started with a free account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="Enter your email" />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full">Create Account</Button>
              <p className="text-xs text-muted-foreground text-center">
                By signing up, you agree to our Terms of Service
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Card Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Card Variants</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Custom styling can be applied using className for different visual variants.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Standard card style</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Default card with border and shadow.</p>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Primary Border</CardTitle>
              <CardDescription>Highlighted with primary color</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card with primary border color.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted border-0">
            <CardHeader>
              <CardTitle>Muted</CardTitle>
              <CardDescription>Subtle background style</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card with muted background.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Prominent shadow effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card with larger shadow.</p>
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Primary border */}
<Card className="border-primary">...</Card>

{/* Muted background */}
<Card className="bg-muted border-0">...</Card>

{/* Elevated shadow */}
<Card className="shadow-lg">...</Card>`}
          </pre>
        </div>
      </section>

      {/* Interactive Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interactive Cards</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Cards can be made interactive with hover effects and click handlers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4">Profile Settings</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4">Notifications</CardTitle>
              <CardDescription>Configure alert preferences</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4">Billing</CardTitle>
              <CardDescription>Manage payment methods</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
    <CardDescription>Click to navigate</CardDescription>
  </CardHeader>
</Card>`}
          </pre>
        </div>
      </section>

      {/* Card with Badge */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Card with Badge</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Combine cards with badges to show status or labels.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pro Plan</CardTitle>
                <Badge>Popular</Badge>
              </div>
              <CardDescription>Best for growing teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Unlimited projects</li>
                <li>Priority support</li>
                <li>Advanced analytics</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Task</CardTitle>
                <Badge variant="secondary">In Progress</Badge>
              </div>
              <CardDescription>Design system components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Create reusable UI components for the design system.</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Due: Jan 25, 2024
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Server Status</CardTitle>
                <Badge variant="outline" className="border-green-500 text-green-500">Online</Badge>
              </div>
              <CardDescription>Production environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime</span>
                  <span>99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response</span>
                  <span>42ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
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
                <td className="p-3 font-mono text-xs">Card</td>
                <td className="p-3 text-muted-foreground">The main container component</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CardHeader</td>
                <td className="p-3 text-muted-foreground">Contains the title, description, and optional action</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CardTitle</td>
                <td className="p-3 text-muted-foreground">The heading of the card</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CardDescription</td>
                <td className="p-3 text-muted-foreground">Secondary text below the title</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CardAction</td>
                <td className="p-3 text-muted-foreground">Action button positioned in the header</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CardContent</td>
                <td className="p-3 text-muted-foreground">The main body content area</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">CardFooter</td>
                <td className="p-3 text-muted-foreground">Bottom section for actions or metadata</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Cards use semantic HTML structure with proper heading hierarchy</li>
          <li>Interactive cards should have proper focus states and keyboard navigation</li>
          <li>Use appropriate ARIA labels when cards contain interactive elements</li>
          <li>Ensure sufficient color contrast for text content</li>
          <li>Consider using role="article" for standalone content cards</li>
        </ul>
      </section>
    </div>
  )
}
