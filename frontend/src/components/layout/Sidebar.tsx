import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, TrendingUp, BarChart3, Brain, Briefcase,
  Star, Newspaper, Search, GitCompare, Bell, Settings,
  ChevronLeft, LogOut, Menu,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/context/AuthContext'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/', icon: LayoutDashboard, title: 'Dashboard' },
      { to: '/stocks', icon: TrendingUp, title: 'Stocks' },
      { to: '/market', icon: BarChart3, title: 'Markets' },
    ],
  },
  {
    label: 'Analysis',
    items: [
      { to: '/predictions', icon: Brain, title: 'AI Predictions' },
      { to: '/screener', icon: Search, title: 'Screener' },
      { to: '/comparison', icon: GitCompare, title: 'Compare' },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { to: '/portfolio', icon: Briefcase, title: 'Portfolio' },
      { to: '/watchlist', icon: Star, title: 'Watchlist' },
      { to: '/alerts', icon: Bell, title: 'Alerts' },
    ],
  },
  {
    label: 'Other',
    items: [
      { to: '/news', icon: Newspaper, title: 'News' },
      { to: '/settings', icon: Settings, title: 'Settings' },
    ],
  },
]

export function Sidebar() {
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-screen bg-sidebar border-r border-border flex flex-col overflow-hidden min-w-0"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="logo-small"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto"
            >
              <BarChart3 className="w-4 h-4 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground dark:text-white tracking-tight">StockSense</h1>
                <p className="text-[10px] text-muted-foreground font-medium uppercase">AI Platform</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-hover text-muted-foreground hover:text-foreground transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft size={16} className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${isActive
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-hover'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <motion.div
                      initial={false}
                      whileHover={collapsed ? {} : { x: 2 }}
                      className="flex items-center gap-3 w-full"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeBar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-primary h-6"
                        />
                      )}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}>
                        <item.icon size={18} />
                      </div>
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="text-sm font-medium truncate"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && !collapsed && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot flex-shrink-0" />
                      )}
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-sidebar-hover/50">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-medium text-foreground dark:text-zinc-200 truncate">{user?.email || 'User'}</p>
              <Badge variant="premium">Premium Plan</Badge>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
