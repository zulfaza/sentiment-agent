import type { AgentWithData, Platform } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const platformIcons: Record<Platform, string> = {
  'x.com': '𝕏',
  instagram: '📸',
  reddit: '🔴',
  tiktok: '♪',
}

interface AgentListProps {
  agents: Array<AgentWithData>
  selectedId: string | null
  onSelect: (id: string) => void
}

export function AgentList({ agents, selectedId, onSelect }: AgentListProps) {
  return (
    <div className="flex h-full w-full flex-col bg-sidebar md:w-72 md:border-r">
      <div className="border-b p-4">
        <h2 className="text-sm font-semibold">Tracking Agents</h2>
        <p className="text-xs text-muted-foreground">{agents.length} active</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-2">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              size="sm"
              className={cn(
                'cursor-pointer transition-colors hover:bg-muted/50',
                selectedId === agent.id && 'ring-2 ring-primary',
              )}
              onClick={() => onSelect(agent.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{agent.name}</CardTitle>
                  <Badge variant="outline" className="text-[10px]">
                    {agent.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-1">
                  {agent.platforms.map((platform) => (
                    <span key={platform} className="text-xs" title={platform}>
                      {platformIcons[platform]}
                    </span>
                  ))}
                </div>
                {agent.status === 'analyzing' ? (
                  <span className="text-[10px] text-muted-foreground">
                    Analyzing...
                  </span>
                ) : agent.sentimentSummary ? (
                  <div className="flex gap-2 text-[10px]">
                    <span className="text-green-600">
                      +{agent.sentimentSummary.positive}%
                    </span>
                    <span className="text-muted-foreground">
                      {agent.sentimentSummary.neutral}%
                    </span>
                    <span className="text-red-600">
                      -{agent.sentimentSummary.negative}%
                    </span>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
