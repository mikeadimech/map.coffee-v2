import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptTextArea } from './prompt-text-area'
import { useTheme } from 'next-themes'
import { EditorNavbar } from './editor-navbar'
import { GripVertical } from 'lucide-react'

const QuillEditor = lazy(() => import('./quill-editor'))

const initialMarkdown = '';

function debounce<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const generateAIText = async (prompt: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return `AI-generated text based on: "${prompt}"

# Main Topic
## Subtopic 1
- Point 1
- Point 2
## Subtopic 2
- Point 3
- Point 4`
}

interface MindmapEditorProps {
  markmapLoaded: boolean;
}

const markmapStyles = {
  svg: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
  },
};

export default function MindmapEditor({ markmapLoaded: initialMarkmapLoaded }: MindmapEditorProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [content, setContent] = useState({ html: '', markdown: initialMarkdown })
  const mindMapRef = useRef<HTMLDivElement>(null);
  const [markmapLoaded, setMarkmapLoaded] = useState(initialMarkmapLoaded);
  const { theme, setTheme } = useTheme()
  const quillRef = useRef<any>(null);
  const [key, setKey] = useState(0);
  const [activeTab, setActiveTab] = useState('editor');
  const [shouldUpdateMindMap, setShouldUpdateMindMap] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        setKey(prevKey => prevKey + 1);
        setShouldUpdateMindMap(true);
      }
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  useEffect(() => {
    setMarkmapLoaded(initialMarkmapLoaded);
  }, [initialMarkmapLoaded]);

  const handleContentChange = useCallback((html: string, markdown: string) => {
    const cleanedMarkdown = markdown.replace(/^\\(.)/gm, '$1');
    setContent({ html, markdown: cleanedMarkdown });
    setShouldUpdateMindMap(true);
  }, []);

  const updateMarkmap = useCallback(() => {
    if (content.markdown && mindMapRef.current && (window as any).markmap) {
      console.log("Updating markmap with content:", content.markdown);
    
      const contentElement = document.createElement('div');
      contentElement.textContent = content.markdown;
    
      while (mindMapRef.current.firstChild) {
        mindMapRef.current.removeChild(mindMapRef.current.firstChild);
      }
      mindMapRef.current.appendChild(contentElement);
    
      console.log("Rendering markmap");
      (window as any).markmap.autoLoader.renderAll();
      console.log("Markmap rendered");
      setShouldUpdateMindMap(false);
    }
  }, [content.markdown]);

  useEffect(() => {
    if (shouldUpdateMindMap && (!isMobile || (isMobile && activeTab === 'preview'))) {
      updateMarkmap();
    }
  }, [shouldUpdateMindMap, isMobile, activeTab, updateMarkmap]);

  const handleAIGenerate = async (prompt: string) => {
    const generatedText = await generateAIText(prompt);
    handleContentChange('', generatedText);
    if (quillRef.current) {
      quillRef.current.setText(generatedText);
    }
  };

  const handleSave = () => {
    console.log('Saving content:', content);
  };

  const renderPreview = useCallback(() => (
    <div className="h-full bg-background text-foreground">
      <div
        ref={mindMapRef}
        className="markmap h-full w-full overflow-auto"
      >
        {!markmapLoaded && <p className="p-4">Loading mind map...</p>}
      </div>
    </div>
  ), [markmapLoaded]);

  const renderEditor = () => (
    <div className="flex-grow overflow-auto p-4">
      <div className={isMobile ? "h-[calc(100vh-16rem)]" : "h-[calc(100vh-14rem)]"}>
        <Suspense fallback={<p>Loading editor...</p>}>
          <QuillEditor
            key={key}
            isMobile={isMobile}
            onContentChange={handleContentChange}
            content={content}
            quillRef={quillRef}
          />
        </Suspense>
      </div>
      <div className="mt-4">
        <PromptTextArea onGenerate={handleAIGenerate} />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-background text-foreground">
        <EditorNavbar isMobile={isMobile} onSave={handleSave} />
        <Tabs 
          defaultValue="editor" 
          className="flex-grow flex flex-col"
          onValueChange={(value) => {
            setActiveTab(value);
            if (value === 'preview') {
              setShouldUpdateMindMap(true);
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Mind Map</TabsTrigger>
          </TabsList>
          <div className="flex-grow overflow-hidden">
            <TabsContent value="editor" className="h-full flex flex-col bg-muted/30">
              {renderEditor()}
            </TabsContent>
            <TabsContent value="preview" className="h-full overflow-auto">
              {renderPreview()}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <EditorNavbar isMobile={isMobile} onSave={handleSave} />
      <ResizablePanelGroup 
        direction="horizontal" 
        className="flex-grow"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col bg-muted/30">
            {renderEditor()}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle>
          <div className="h-full w-2 bg-muted flex items-center justify-center">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </ResizableHandle>
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full overflow-auto">
            {renderPreview()}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <style>
        {`
          .markmap > svg {
            width: 100%;
            height: 100%;
            min-height: 300px;
          }
        `}
      </style>
    </div>
  )
}

