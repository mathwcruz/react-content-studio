import { BarChart3, Boxes, FileText, Inbox } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '../lib/cn'

const navItems = [
  { to: '/', label: 'Dashboard', icon: BarChart3, end: true },
  { to: '/contents', label: 'Biblioteca', icon: FileText },
  { to: '/feedback', label: 'Feedback', icon: Inbox },
  { to: '/components', label: 'UI Kit', icon: Boxes },
]

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-studio-border bg-studio-card/75 px-4 py-5 lg:block">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
          Workspace
        </p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          Rocketseat Academy
        </h1>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={`${item.label}-${item.to}`}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-studio-muted transition hover:bg-studio-accent hover:text-studio-accent-fg',
                isActive && 'bg-studio-accent text-studio-accent-fg'
              )
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
