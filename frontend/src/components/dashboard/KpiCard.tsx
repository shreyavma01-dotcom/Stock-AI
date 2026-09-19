import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  label: string
  value: string
  delta: string
  deltaLabel: string
  icon: React.ReactNode
  tone: 'neutral' | 'success' | 'danger'
  index?: number
}

const toneStyles = {
  neutral: { iconBg: 'bg-primary/10', iconColor: 'text-primary', deltaColor: 'text-primary' },
  success: { iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', deltaColor: 'text-emerald-400' },
  danger: { iconBg: 'bg-red-500/10', iconColor: 'text-red-400', deltaColor: 'text-red-400' },
}

export function KpiCard({ label, value, delta, deltaLabel, icon, tone, index = 0 }: KpiCardProps) {
  const shouldReduce = useReducedMotion()
  const isUp = !delta.startsWith('-')

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
      whileHover={shouldReduce ? {} : { y: -2 }}
      className="rounded-[18px] bg-card border border-border p-5 transition-all duration-180 hover:border-[#34343A] hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-start justify-between mb-[14px]">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
        <div className={cn('w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0', toneStyles[tone].iconBg)}>
          <span className={cn('w-4 h-4', toneStyles[tone].iconColor)}>{icon}</span>
        </div>
      </div>
      <div className="text-[24px] font-semibold text-white leading-none mb-[14px] tabular-nums tracking-tight">
        {value}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="flex items-center">
          <svg className={cn('w-[11px] h-[11px]', toneStyles[tone].deltaColor)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            {isUp ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
          </svg>
        </span>
        <span className={cn('text-xs font-medium tabular-nums', toneStyles[tone].deltaColor)}>{delta}</span>
        <span className="text-xs text-zinc-500 font-normal">{deltaLabel}</span>
      </div>
    </motion.div>
  )
}

export function KpiCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 auto-rows-fr">
      {children}
    </div>
  )
}
