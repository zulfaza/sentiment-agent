import { ArrowLeftIcon } from '@phosphor-icons/react'
import type { AgentWithData, Platform } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface AgentHeaderProps {
  agent: AgentWithData
  onNewAgent?: () => void
  onBack?: () => void
}

export function AgentHeader({ agent, onNewAgent, onBack }: AgentHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-4 md:p-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onBack}
            >
              <ArrowLeftIcon size={18} />
            </Button>
          )}
          <h1 className="text-lg font-semibold md:text-xl">{agent.name}</h1>
          <Badge variant="secondary" className="capitalize">
            {agent.type}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:gap-4">
          <span>Created {agent.createdAt}</span>
          <div className="flex gap-1">
            {agent.platforms.map((platform) => (
              <Badge
                key={platform}
                variant="outline"
                className="text-[10px] capitalize"
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={onNewAgent} className="hidden md:inline-flex">
        + New Agent
      </Button>
    </div>
  )
}
