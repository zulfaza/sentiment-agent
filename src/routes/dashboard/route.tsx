import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/app-layout'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
