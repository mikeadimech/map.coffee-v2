import React, { useState, useEffect, lazy, Suspense } from 'react'

const MindmapEditor = lazy(() => import('@/components/mindmap-editor'))

export default function EditorPage() {
  const [markmapLoaded, setMarkmapLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/npm/markmap-autoloader@0.16"
    script.async = true
    script.onload = () => {
      console.log('Markmap script loaded')
      setMarkmapLoaded(true)
    }
    script.onerror = () => {
      console.error('Failed to load Markmap script')
      setMarkmapLoaded(false)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    document.title = "AI-Assisted Quill Editor with Mind Map"
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Suspense fallback={<p>Loading editor...</p>}>
        <MindmapEditor markmapLoaded={markmapLoaded} />
      </Suspense>
    </div>
  )
}

