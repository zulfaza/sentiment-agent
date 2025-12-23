import { ChartBarIcon, CreditCardIcon, UserIcon } from '@phosphor-icons/react'
import { Link, useLocation } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Analytics', icon: ChartBarIcon },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCardIcon },
  { href: '/dashboard/account', label: 'Account', icon: UserIcon },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden h-full w-56 flex-col border-r bg-sidebar md:flex">
      <div className="border-b p-4">
        <h1 className="text-sm font-semibold">Sentiment Agent</h1>
        <p className="text-xs text-muted-foreground">Dashboard</p>
      </div>
      <nav className="flex-1 p-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                  )}
                >
                  <item.icon size={18} weight={isActive ? 'fill' : 'regular'} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
