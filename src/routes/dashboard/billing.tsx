import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/dashboard/billing')({
  component: BillingPage,
})

// Mock data
const usageData = {
  used: 8432,
  limit: 10000,
  resetDate: 'Jan 1, 2025',
}

const cardData = {
  brand: 'Visa',
  last4: '4242',
  expMonth: 12,
  expYear: 25,
}

const invoices = [
  {
    id: '1',
    date: 'Dec 1, 2024',
    amount: 29.0,
    status: 'paid' as 'paid' | 'unpaid',
  },
  {
    id: '2',
    date: 'Nov 1, 2024',
    amount: 29.0,
    status: 'paid' as 'paid' | 'unpaid',
  },
  {
    id: '3',
    date: 'Oct 1, 2024',
    amount: 29.0,
    status: 'paid' as 'paid' | 'unpaid',
  },
  {
    id: '4',
    date: 'Sep 1, 2024',
    amount: 29.0,
    status: 'paid' as 'paid' | 'unpaid',
  },
]

function BillingPage() {
  const usagePercent = Math.round((usageData.used / usageData.limit) * 100)

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b px-4 py-3 md:px-6">
        <h1 className="text-lg font-semibold">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payment details
        </p>
      </div>

      <div className="space-y-4 p-4 md:p-6">
        {/* Usage Section */}
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-semibold">
                {usageData.used.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                / {usageData.limit.toLocaleString()} mentions
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {usagePercent}% used · Resets {usageData.resetDate}
            </p>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded border bg-muted text-xs font-medium">
                {cardData.brand}
              </div>
              <div>
                <p className="text-sm font-medium">•••• {cardData.last4}</p>
                <p className="text-xs text-muted-foreground">
                  Expires {cardData.expMonth}/{cardData.expYear}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            {invoices.map((invoice, index) => (
              <div key={invoice.id}>
                {index > 0 && <Separator />}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm">{invoice.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      ${invoice.amount.toFixed(2)}
                    </span>
                    <Badge
                      variant={
                        invoice.status === 'paid' ? 'secondary' : 'destructive'
                      }
                    >
                      {invoice.status === 'paid' ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cancel Subscription */}
        <Card>
          <CardHeader>
            <CardTitle>Cancel Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Cancel your subscription. You'll still have access until the end
              of your billing period.
            </p>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
