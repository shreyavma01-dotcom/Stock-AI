import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface MarketCardProps {
  name: string
  value: string
  change: string
  up: boolean
  index?: number
}

function useSparklinePoints(up: boolean) {
  return useMemo(() => {
    const points = []
    for (let i = 0; i < 9; i++) {
      const x = (i / 8) * 200
      const y = up ? 4 + Math.random() * 16 : 10 + Math.random() * 18
      points.push(`${x},${y}`)
    }
    return points.join(' ')
  }, [up])
}

export function MarketCard({ name, value, change, up, index = 0 }: MarketCardProps) {
  const shouldReduce = useReducedMotion()
  const points = useSparklinePoints(up)

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-[18px] bg-card border border-border p-[18px] transition-all duration-180 hover:-translate-y-0.5 hover:border-[#34343A]"
    >
      <div className="flex items-center justify-between mb-[10px]">
        <span className="text-xs font-semibold text-zinc-500 tracking-[0.01em]">{name}</span>
        <span className={`flex items-center gap-1 text-[11px] font-semibold px-[7px] py-[2px] rounded-[6px] ${up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          <svg className="w-[9px] h-[9px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            {up ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
          </svg>
          {change}
        </span>
      </div>
      <div className="text-[19px] font-semibold text-white tabular-nums mb-[8px]">{value}</div>
      <svg className="w-full h-[32px]" viewBox="0 0 200 32" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={up ? '#22C55E' : '#EF4444'}
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  )
}

export function MarketOverview({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-white mb-4">Market Indices</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {children}
      </div>
    </div>
  )
}
