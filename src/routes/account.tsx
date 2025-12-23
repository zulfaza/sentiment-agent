import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account')({ component: AccountPage })

function AccountPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Account</h1>
        <p className="text-sm text-muted-foreground">Coming soon</p>
      </div>
    </div>
  )
}
