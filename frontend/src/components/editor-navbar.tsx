import React from 'react'
import { Button } from "@/components/ui/button"
import { Save } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { BrandLogo } from './brand-logo'

interface EditorNavbarProps {
  isMobile: boolean
  onSave: () => void
}

export function EditorNavbar({ isMobile, onSave }: EditorNavbarProps) {
  return (
    <div className={`flex items-center justify-between p-2 bg-background ${!isMobile ? 'border-b' : ''}`}>
      <BrandLogo />
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button onClick={onSave} size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  )
}

