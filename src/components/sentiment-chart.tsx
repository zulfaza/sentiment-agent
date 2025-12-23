import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { SentimentTrend } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SentimentChartProps {
  trends: Array<SentimentTrend>
  isAnalyzing?: boolean
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function SentimentChart({
  trends,
  isAnalyzing = false,
}: SentimentChartProps) {
  const formattedTrends = trends.map((t) => ({
    ...t,
    date: formatDate(t.date),
  }))

  if (isAnalyzing || trends.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Historical Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Analyzing sentiment data...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Historical Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto w-full">
          <div className="h-[300px] min-w-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedTrends}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                  axisLine={{ stroke: 'var(--border)' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                  axisLine={{ stroke: 'var(--border)' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '2px solid var(--border)',
                    fontFamily: 'inherit',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={false}
                  name="Positive"
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={false}
                  name="Neutral"
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  dot={false}
                  name="Negative"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
