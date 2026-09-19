import { useRef, useState } from 'react'
import { Search, Bell, Sun, Moon, Sparkles } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useNavigate } from 'react-router-dom'

const tickers = [
  { name: 'S&P 500', value: '5,234.18', change: '+0.42%', up: true },
  { name: 'NASDAQ', value: '16,742.39', change: '+0.68%', up: true },
  { name: 'DOW', value: '39,875.42', change: '-0.12%', up: false },
  { name: 'Nifty 50', value: '22,456.80', change: '+0.35%', up: true },
  { name: 'Bank Nifty', value: '48,234.15', change: '+0.51%', up: true },
  { name: 'Bitcoin', value: '67,234', change: '+2.14%', up: true },
  { name: 'Ethereum', value: '3,456', change: '-0.87%', up: false },
]

export function Header() {
  const { user } = useAuth()
  const { isDark, toggle } = useTheme()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  return (
    <header className="h-[72px] min-h-[72px] bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="relative flex-1 max-w-[280px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search stocks, news, or ask AI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim()) {
              navigate(`/stocks?q=${encodeURIComponent(query.trim())}`)
            }
          }}
          className="w-full h-9 pl-9 pr-3 rounded-[10px] bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
        />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-x-auto flex items-center mask-fade-r" style={{maskImage:'linear-gradient(to right, black calc(100% - 40px), transparent)', WebkitMaskImage:'linear-gradient(to right, black calc(100% - 40px), transparent)'}}>
        <div className="flex items-center gap-4 min-w-max">
          {tickers.map((t) => (
            <div key={t.name} className="flex items-center gap-2 px-2 py-1 rounded-lg bg-secondary/40 flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground tabular-nums">{t.name}</span>
              <span className="text-xs font-medium text-foreground tabular-nums">{t.value}</span>
              <span className={`text-xs font-medium tabular-nums flex items-center gap-1 ${t.up ? 'text-success' : 'text-danger'}`}>
                {t.up ? <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8h16z"/></svg> : <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l8-8H4z"/></svg>}
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button className="p-2 rounded-[10px] hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" aria-label="AI Assistant">
          <Sparkles size={16} />
        </button>
        <button className="relative p-2 rounded-[10px] hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" aria-label="Notifications">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger ring-2 ring-background" />
        </button>
        <button
          onClick={toggle}
          className="p-2 rounded-[10px] hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 flex h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 items-center justify-center text-white text-xs font-bold">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  )
}