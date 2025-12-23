import type { Mention, Platform, Sentiment } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const platformIcons: Record<Platform, string> = {
  'x.com': '𝕏',
  instagram: '📸',
  reddit: '🔴',
  tiktok: '♪',
}

const sentimentConfig: Record<Sentiment, { bg: string; icon: string }> = {
  positive: { bg: 'bg-green-50 dark:bg-green-950/30', icon: '😊' },
  neutral: { bg: 'bg-gray-50 dark:bg-gray-900/30', icon: '😐' },
  negative: { bg: 'bg-red-50 dark:bg-red-950/30', icon: '😞' },
}

interface RecentMentionsProps {
  mentions: Array<Mention>
  isAnalyzing?: boolean
}

export function RecentMentions({
  mentions,
  isAnalyzing = false,
}: RecentMentionsProps) {
  const displayMentions = mentions.slice(0, 10)

  if (isAnalyzing || mentions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent Mentions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Collecting mentions...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Recent Mentions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {displayMentions.map((mention) => (
          <div
            key={mention.id}
            className={cn(
              'rounded-lg p-3',
              sentimentConfig[mention.sentiment].bg,
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm" title={mention.platform}>
                  {platformIcons[mention.platform]}
                </span>
                <span className="text-xs font-medium">{mention.user}</span>
                <Badge variant="outline" className="text-[10px] capitalize">
                  {mention.sentiment}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {mention.timestamp}
                </span>
                <span>{sentimentConfig[mention.sentiment].icon}</span>
              </div>
            </div>
            <p className="text-xs text-foreground/80">{mention.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
