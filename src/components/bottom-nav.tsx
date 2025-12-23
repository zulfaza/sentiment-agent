import { Link, useLocation } from '@tanstack/react-router'
import { ChartBarIcon, CreditCardIcon, UserIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Analytics', icon: ChartBarIcon },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCardIcon },
  { href: '/dashboard/account', label: 'Account', icon: UserIcon },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background pb-safe md:hidden">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <li key={item.href} className="flex-1">
              <Link
                to={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 text-xs transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <item.icon size={20} weight={isActive ? 'fill' : 'regular'} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
