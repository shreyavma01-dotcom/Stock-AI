import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { RightPanel } from './RightPanel'

export function AppLayout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-6">
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>
            <div className="hidden xl:block">
              <RightPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
