import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/billing')({ component: BillingPage })

function BillingPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Billing</h1>
        <p className="text-sm text-muted-foreground">Coming soon</p>
      </div>
    </div>
  )
}
