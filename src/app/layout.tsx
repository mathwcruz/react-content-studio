import { Outlet } from 'react-router'
import { AppHeader } from '../components/app-header'
import { AppSidebar } from '../components/app-sidebar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-studio-bg text-studio-fg">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <AppHeader />
          <main className="px-4 py-5 sm:px-7 sm:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
