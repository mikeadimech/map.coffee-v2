"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from 'lucide-react'

export function PromptBox() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResponse("")

    // This is a mock API call. In a real application, you would call your AI service here.
    try {
      const res = await new Promise((resolve) => 
        setTimeout(() => resolve(`AI response to: "${prompt}"`), 1000)
      )
      setResponse(res as string)
    } catch (error) {
      console.error("Error fetching AI response:", error)
      setResponse("Sorry, there was an error processing your request.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
    adjustTextareaHeight()
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [prompt])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col w-full items-center space-y-2">
        <div className="relative w-full">
          <Textarea
            ref={textareaRef}
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={handleTextareaChange}
            disabled={isLoading}
            className="pr-36 py-2 resize-none overflow-y-auto"
            style={{
              minHeight: '30px',
              maxHeight: '200px',
            }}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !prompt.trim()} 
            className="absolute right-2 top-3"
          >
            {isLoading ? "Processing..." : (
              <>
                Generate
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
      {response && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Response:</h3>
          <p className="text-sm">{response}</p>
        </div>
      )}
    </div>
  )
}

