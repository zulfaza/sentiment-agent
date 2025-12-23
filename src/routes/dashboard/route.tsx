import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/components/app-layout'
import { AuthProvider } from '@/lib/auth'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AuthProvider>
  )
}
