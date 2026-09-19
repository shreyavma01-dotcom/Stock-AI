import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Bell, FileText } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function HeroSection() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const hours = new Date().getHours()
  const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/8 via-purple-600/8 to-pink-600/8 border border-indigo-500/15 p-6 lg:p-8"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-48 h-48 bg-purple-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        <div className="space-y-3">
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {greeting}, {user?.email?.split('@')[0] || 'Trader'}
            <span className="inline-block ml-2 text-zinc-500 font-normal text-lg lg:text-2xl">👋</span>
          </h1>
          <p className="text-sm text-zinc-400 flex items-center gap-2">
            <Sparkles size={14} className="text-indigo-400" />
            AI-powered investment decisions
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="text-emerald-400">Markets Open</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400 tabular-nums">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="gap-1.5" onClick={() => navigate('/predictions')}>
            <TrendingUp size={14} />
            Quick Analysis
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => navigate('/alerts')}>
            <Bell size={14} />
            New Alert
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => navigate('/stocks')}>
            <FileText size={14} />
            View Report
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
