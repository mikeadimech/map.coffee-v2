import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Share } from 'lucide-react'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  title: string;
  author: string;
}

export default function Page({ title = "Untitled Mind Map", author = "Anonymous" }: PageProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold">{title}</h1>
              <p className="text-sm text-muted-foreground">by {author}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          {/* Mind map will be rendered here */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}