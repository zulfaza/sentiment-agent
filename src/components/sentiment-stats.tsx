import type { SentimentSummary, SentimentTrend } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SentimentStatsProps {
  summary: SentimentSummary | null
  trends: Array<SentimentTrend>
  isAnalyzing?: boolean
}

function getTrend(
  current: number,
  previous: number,
): { direction: 'up' | 'down' | 'flat'; diff: number } {
  const diff = current - previous
  if (diff > 0) return { direction: 'up', diff }
  if (diff < 0) return { direction: 'down', diff: Math.abs(diff) }
  return { direction: 'flat', diff: 0 }
}

export function SentimentStats({
  summary,
  trends,
  isAnalyzing = false,
}: SentimentStatsProps) {
  const previousDay = trends.length >= 2 ? trends[trends.length - 2] : null

  const positiveTrend =
    previousDay && summary
      ? getTrend(summary.positive, previousDay.positive)
      : null
  const neutralTrend =
    previousDay && summary
      ? getTrend(summary.neutral, previousDay.neutral)
      : null
  const negativeTrend =
    previousDay && summary
      ? getTrend(summary.negative, previousDay.negative)
      : null

  if (isAnalyzing || !summary) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {['Positive', 'Neutral', 'Negative'].map((label) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-0 bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Positive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">
              {summary.positive}%
            </span>
            {positiveTrend && positiveTrend.direction !== 'flat' && (
              <span
                className={`text-xs ${
                  positiveTrend.direction === 'up'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {positiveTrend.direction === 'up' ? '↑' : '↓'}{' '}
                {positiveTrend.diff}%
              </span>
            )}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-green-600 transition-all"
              style={{ width: `${summary.positive}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Neutral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-muted-foreground">
              {summary.neutral}%
            </span>
            {neutralTrend && neutralTrend.direction !== 'flat' && (
              <span className="text-xs text-muted-foreground">
                {neutralTrend.direction === 'up' ? '↑' : '↓'}{' '}
                {neutralTrend.diff}%
              </span>
            )}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gray-400 transition-all"
              style={{ width: `${summary.neutral}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Negative
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-600">
              {summary.negative}%
            </span>
            {negativeTrend && negativeTrend.direction !== 'flat' && (
              <span
                className={`text-xs ${
                  negativeTrend.direction === 'up'
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                {negativeTrend.direction === 'up' ? '↑' : '↓'}{' '}
                {negativeTrend.diff}%
              </span>
            )}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-red-600 transition-all"
              style={{ width: `${summary.negative}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
