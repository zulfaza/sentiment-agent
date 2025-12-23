import { useState } from 'react'
import { SpinnerIcon } from '@phosphor-icons/react'

import type { AgentType, CreateAgentInput } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

const PLATFORMS = [
  { id: 'x.com', label: 'X (Twitter)' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'threads', label: 'Threads' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'others', label: 'Others' },
] as const

interface NewAgentFormData {
  name: string
  type: AgentType
  platforms: Array<string>
  customInstruction: string
  dateFrom: string
  dateTo: string
}

interface NewAgentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateAgentInput) => void
  isPending?: boolean
}

export function NewAgentModal({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
}: NewAgentModalProps) {
  const [formData, setFormData] = useState<NewAgentFormData>({
    name: '',
    type: 'brand',
    platforms: [],
    customInstruction: '',
    dateFrom: '',
    dateTo: '',
  })

  const handlePlatformToggle = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({
      name: formData.name,
      type: formData.type,
      platforms: formData.platforms,
    })
    setFormData({
      name: '',
      type: 'brand',
      platforms: [],
      customInstruction: '',
      dateFrom: '',
      dateTo: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Set up a new sentiment tracking agent for a brand or person.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Apple Inc., Elon Musk"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Type *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value as AgentType }))
              }
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="brand" id="type-brand" />
                <Label
                  htmlFor="type-brand"
                  className="font-normal cursor-pointer"
                >
                  Brand
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="person" id="type-person" />
                <Label
                  htmlFor="type-person"
                  className="font-normal cursor-pointer"
                >
                  Person
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <Label>Platforms *</Label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((platform) => (
                <div key={platform.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`platform-${platform.id}`}
                    checked={formData.platforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <Label
                    htmlFor={`platform-${platform.id}`}
                    className="font-normal cursor-pointer"
                  >
                    {platform.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Instruction */}
          <div className="space-y-2">
            <Label htmlFor="instruction">Custom Instruction (optional)</Label>
            <Textarea
              id="instruction"
              placeholder="Additional instructions for the AI agent..."
              value={formData.customInstruction}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customInstruction: e.target.value,
                }))
              }
              className="min-h-20"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range (optional)</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="date"
                value={formData.dateFrom}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dateFrom: e.target.value }))
                }
                className="flex-1"
              />
              <span className="text-muted-foreground text-xs">to</span>
              <Input
                type="date"
                value={formData.dateTo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dateTo: e.target.value }))
                }
                className="flex-1"
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isPending || !formData.name || formData.platforms.length === 0
              }
            >
              {isPending && (
                <SpinnerIcon className="mr-2 size-4 animate-spin" />
              )}
              {isPending ? 'Creating...' : 'Create Agent'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
