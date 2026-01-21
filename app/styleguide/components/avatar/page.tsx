"use client"

import * as React from "react"
import { User, Users, Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AvatarPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Avatar</h1>
        <p className="text-muted-foreground">
          An image element with a fallback for representing the user. Avatars are used to
          show a thumbnail representation of an individual or business.
        </p>
      </div>

      {/* Basic Avatar */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Avatar</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple avatar with image and fallback text.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
            <AvatarFallback>NJ</AvatarFallback>
          </Avatar>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
          </pre>
        </div>
      </section>

      {/* Avatar Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Avatar Sizes</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Avatars can be customized to different sizes using className.
        </p>
        <div className="flex items-end gap-4 mb-4">
          <div className="text-center">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-xs">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">xs (24px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-xs">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">sm (32px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-sm">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">md (40px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">lg (48px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-lg">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">xl (64px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-xl">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">2xl (80px)</p>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Extra small */}
<Avatar className="size-6">...</Avatar>

{/* Small (default) */}
<Avatar className="size-8">...</Avatar>

{/* Medium */}
<Avatar className="size-10">...</Avatar>

{/* Large */}
<Avatar className="size-12">...</Avatar>

{/* Extra large */}
<Avatar className="size-16">...</Avatar>`}
          </pre>
        </div>
      </section>

      {/* Avatar Fallbacks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Avatar Fallbacks</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Fallback content shown when the image fails to load or is not provided.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <Avatar className="size-12">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Initials</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12">
              <AvatarFallback>
                <User className="size-6" />
              </AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Icon</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12">
              <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Custom Color</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12">
              <AvatarFallback className="bg-destructive text-destructive-foreground">!</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Destructive</p>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* With initials */}
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

{/* With icon */}
<Avatar>
  <AvatarFallback>
    <User className="size-6" />
  </AvatarFallback>
</Avatar>

{/* Custom color */}
<Avatar>
  <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
</Avatar>`}
          </pre>
        </div>
      </section>

      {/* Avatar Shapes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Avatar Shapes</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Avatars can have different shapes using border-radius classes.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <Avatar className="size-12 rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Circle</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Rounded</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12 rounded-md">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="rounded-md">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Medium</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12 rounded-none">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="rounded-none">CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground mt-2">Square</p>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Circle (default) */}
<Avatar className="rounded-full">...</Avatar>

{/* Rounded */}
<Avatar className="rounded-lg">...</Avatar>

{/* Square */}
<Avatar className="rounded-none">...</Avatar>`}
          </pre>
        </div>
      </section>

      {/* Avatar with Status */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Avatar with Status</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Combine avatars with status indicators using relative positioning.
        </p>
        <div className="flex items-center gap-6 mb-4">
          <div className="text-center">
            <div className="relative inline-block">
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-background" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Online</p>
          </div>
          <div className="text-center">
            <div className="relative inline-block">
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 size-3 rounded-full bg-yellow-500 border-2 border-background" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Away</p>
          </div>
          <div className="text-center">
            <div className="relative inline-block">
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
                <AvatarFallback>NJ</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 size-3 rounded-full bg-red-500 border-2 border-background" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Busy</p>
          </div>
          <div className="text-center">
            <div className="relative inline-block">
              <Avatar className="size-12">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 size-3 rounded-full bg-gray-400 border-2 border-background" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Offline</p>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`<div className="relative inline-block">
  <Avatar className="size-12">
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-background" />
</div>`}
          </pre>
        </div>
      </section>

      {/* Avatar Group */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Avatar Group</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Display multiple avatars in a stacked group layout.
        </p>
        <div className="space-y-6 mb-4">
          <div>
            <p className="text-sm font-medium mb-3">Stacked (overlapping)</p>
            <div className="flex -space-x-3">
              <Avatar className="size-10 border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="size-10 border-2 border-background">
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <Avatar className="size-10 border-2 border-background">
                <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
                <AvatarFallback>NJ</AvatarFallback>
              </Avatar>
              <Avatar className="size-10 border-2 border-background">
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">With add button</p>
            <div className="flex -space-x-3">
              <Avatar className="size-10 border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="size-10 border-2 border-background">
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <Avatar className="size-10 border-2 border-background cursor-pointer hover:bg-muted/80 transition-colors">
                <AvatarFallback className="bg-muted">
                  <Plus className="size-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Inline with text</p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <Avatar className="size-8 border-2 border-background">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="size-8 border-2 border-background">
                  <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <Avatar className="size-8 border-2 border-background">
                  <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
                  <AvatarFallback>NJ</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm text-muted-foreground">3 members</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`{/* Stacked group with negative spacing */}
<div className="flex -space-x-3">
  <Avatar className="size-10 border-2 border-background">
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar className="size-10 border-2 border-background">
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>VC</AvatarFallback>
  </Avatar>
  <Avatar className="size-10 border-2 border-background">
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>`}
          </pre>
        </div>
      </section>

      {/* Avatar in Context */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Avatar in Context</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Common usage patterns with other components.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-3">User list item</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Shadcn</p>
                  <p className="text-xs text-muted-foreground truncate">@shadcn</p>
                </div>
                <Badge variant="secondary">Admin</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Vercel</p>
                  <p className="text-xs text-muted-foreground truncate">@vercel</p>
                </div>
                <Badge variant="outline">Member</Badge>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-3">Comment</p>
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">Shadcn</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is a great example of how to use avatars in a comment section.
                </p>
              </div>
            </div>
          </div>
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
                <td className="p-3 font-mono text-xs">Avatar</td>
                <td className="p-3 text-muted-foreground">The main container component</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">AvatarImage</td>
                <td className="p-3 text-muted-foreground">The image element that displays the avatar</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">AvatarFallback</td>
                <td className="p-3 text-muted-foreground">Fallback content when image is unavailable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Always provide meaningful alt text for AvatarImage</li>
          <li>Fallback content should be descriptive (initials, icon)</li>
          <li>Use aria-label when avatar is interactive</li>
          <li>Ensure sufficient color contrast for fallback backgrounds</li>
          <li>Consider adding role="img" with aria-label for icon-only fallbacks</li>
        </ul>
      </section>
    </div>
  )
}
