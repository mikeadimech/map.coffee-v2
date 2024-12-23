'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, List, Undo, Redo, IndentIcon, OutdentIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface QuillEditorProps {
  isMobile: boolean
  onContentChange: (html: string, markdown: string) => void
  content: { html: string, markdown: string }
  quillRef: React.RefObject<any>
}

export default function QuillEditor({ isMobile, onContentChange, content, quillRef }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isQuillReady, setIsQuillReady] = useState(false)
  const turndownRef = useRef<any>(null)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link')
      link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)

      return () => {
        document.head.removeChild(link)
      }
    }
  }, [])

  useEffect(() => {
    const setupQuill = async () => {
      if (typeof window !== 'undefined' && editorRef.current) {
        const Quill = (await import('quill')).default;
        const Turndown = (await import('turndown')).default;

        if (editorRef.current.querySelector('.ql-editor')) {
          console.log('Quill already initialized');
          return;
        }

        const quill = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: false,
            history: {
              delay: 2000,
              maxStack: 500,
              userOnly: true
            }
          },
          formats: ['bold', 'italic', 'list', 'indent'],
        });

        const turndown = new Turndown({
          emDelimiter: '*'
        });

        quill.on('text-change', () => {
          const html = quill.root.innerHTML;
          const markdown = turndown.turndown(html);
          onContentChange(html, markdown);
        });

        if (quillRef) quillRef.current = quill;
        turndownRef.current = turndown;

        // Set initial content
        if (content.html) {
          quill.root.innerHTML = content.html;
        }

        setIsQuillReady(true);
      }
    };

    setupQuill();
  }, [onContentChange, quillRef, content.html]);

  const handleFormat = (format: string) => {
    if (!quillRef.current) return

    quillRef.current.focus()
    
    if (format === 'list') {
      const isList = quillRef.current.getFormat().list === 'bullet'
      quillRef.current.format('list', isList ? false : 'bullet')
    } else if (format === 'indent' || format === 'outdent') {
      const currentIndent = quillRef.current.getFormat().indent || 0
      quillRef.current.format('indent', format === 'indent' ? currentIndent + 1 : Math.max(0, currentIndent - 1))
    } else {
      quillRef.current.format(format, !quillRef.current.getFormat()[format])
    }
  }

  const handleUndo = () => {
    if (quillRef.current) {
      quillRef.current.history.undo()
    }
  }

  const handleRedo = () => {
    if (quillRef.current) {
      quillRef.current.history.redo()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <ToggleGroup type="multiple" className="justify-start">
          <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => handleFormat('bold')}>
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => handleFormat('italic')}>
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="Toggle bullet list" onClick={() => handleFormat('list')}>
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="outdent" aria-label="Outdent" onClick={() => handleFormat('outdent')}>
            <OutdentIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="indent" aria-label="Indent" onClick={() => handleFormat('indent')}>
            <IndentIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleUndo}
            aria-label="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRedo}
            aria-label="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div ref={editorRef} className="flex-grow border rounded-md overflow-auto" />
    </div>
  )
}

