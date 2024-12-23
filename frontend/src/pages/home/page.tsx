import Navbar from "@/components/Navbar"
import { PromptBox } from "@/components/PromptBox"
import { Hero } from "@/components/Hero"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto pt-16 p-10 space-y-12">
        <Hero />
        <PromptBox />
      </main>
    </div>
  )
}

