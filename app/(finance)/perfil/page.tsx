"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ProfileView } from "@/components/finance/profile-view"

export default function PerfilPage() {
  return (
    <>
      <header
        className="flex h-16 items-center gap-2 border-b px-4 lg:px-6 md:rounded-t-xl"
        style={{ backgroundColor: "oklab(0.290478 0.0000131577 0.00000579655 / 0.0)" }}
      >
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <h1 className="text-lg font-semibold">Perfil</h1>
      </header>
      <div
        className="flex flex-1 flex-col gap-6 p-4 lg:p-6"
        style={{ backgroundColor: "oklab(0.290478 0.0000131577 0.00000579655 / 0.0)" }}
      >
        <ProfileView />
      </div>
    </>
  )
}
