import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ComposedChart,
} from 'recharts'
import { cn } from '@/lib/utils'

const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const

const chartData = Array.from({ length: 200 }, (_, i) => {
  const base = 120000 + Math.sin(i * 0.05) * 15000 + i * 50 + Math.random() * 2000
  return {
    date: new Date(2024, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: Math.round(base),
    volume: Math.floor(Math.random() * 5000000 + 1000000),
  }
})

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg shadow-black/40">
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold text-white tabular-nums">
          {entry.name === 'value' ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export function PortfolioChart() {
  const [period, setPeriod] = useState<string>('1M')
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      className="rounded-2xl bg-card border border-border p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-base font-semibold text-white">Portfolio Growth</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xl font-bold text-white tabular-nums">$124,592.00</span>
            <span className="text-sm font-medium text-emerald-400 tabular-nums">+$2,892.00 (+2.37%)</span>
          </div>
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex gap-1 mb-6">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setPeriod(tf)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              period === tf
                ? 'bg-primary text-white'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-secondary'
            )}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={{ stroke: '#27272A' }} tickLine={false} minTickGap={40} />
            <YAxis yAxisId="left" tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#portfolioGradient)"
              animationDuration={shouldReduce ? 0 : 600}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Volume subplot */}
      <div className="h-[60px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
            <Bar dataKey="volume" fill="#27272A" opacity={0.6} animationDuration={shouldReduce ? 0 : 400} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
