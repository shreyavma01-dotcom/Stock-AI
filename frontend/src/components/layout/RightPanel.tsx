import { Bell, Calendar, Brain, TrendingUp, Trophy, Loader2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

const alerts = [
  { type: 'BUY', title: 'AAPL — strong buy signal detected', time: '2 min ago' },
  { type: 'SELL', title: 'TSLA — resistance level broken', time: '15 min ago' },
]

const calendar = [
  { event: 'Fed interest rate decision', date: 'Jul 31', impact: 'HIGH' as const },
  { event: 'Consumer confidence', date: 'Jul 30', impact: 'MED' as const },
]

type CardShellProps = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function CardShell({ title, icon, children }: CardShellProps) {
  return (
    <div className="rounded-[18px] bg-card border border-border p-[18px]">
      <div className="flex items-center gap-2 mb-[14px]">
        {icon}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function ErrorCard({ title }: { title: string }) {
  return (
    <div className="rounded-[18px] bg-card border border-border p-[18px]">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="text-xs text-zinc-500 mt-2">Unable to load this widget.</div>
    </div>
  )
}

export function RightPanel() {
  const [assistantInput, setAssistantInput] = useState('')
  const [assistantStatus, setAssistantStatus] = useState<'idle' | 'loading'>('idle')

  const assistantMessage = useMemo(() => {
    return 'I’m seeing strong momentum in AAPL. Consider waiting for a pullback before entering.'
  }, [])

  const onAsk = async () => {
    if (!assistantInput.trim()) return
    setAssistantStatus('loading')
    // Development stub: simulate latency without changing layout.
    await new Promise((r) => setTimeout(r, 600))
    setAssistantStatus('idle')
    setAssistantInput('')
  }

  return (
    <div className="w-[360px] min-w-[360px] h-full overflow-y-auto pr-1 scrollbar-thin">
      <div className="grid grid-cols-1 gap-4">
        {/* AI Assistant */}
        {/** Keeping it inline here because this repo snapshot has no dedicated card components. */}
        <div className="rounded-[18px] bg-card border border-border p-[18px]">
          <div className="flex items-center justify-between gap-3 mb-[14px]">
            <div className="flex items-center gap-2">
              <Brain size={15} className="text-zinc-500" />
              <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
            </div>
            <span className="text-[10px] font-bold px-[8px] py-[3px] rounded-[999px] tracking-[0.03em] bg-primary/10 text-primary">
              Live
            </span>
          </div>

          <div className="rounded-xl bg-secondary/40 border border-border p-3 mb-3">
            <div className="text-[12px] text-zinc-200 font-medium mb-[6px]">Latest insight</div>
            <div className="text-[12px] text-zinc-500 leading-relaxed">{assistantMessage}</div>
          </div>

          <div className="flex gap-2 mb-3">
            <button className="flex-1 text-xs px-3 py-[8px] rounded-lg bg-secondary hover:bg-secondary/70 border border-border text-zinc-200 transition-colors">
              What should I buy?
            </button>
            <button className="flex-1 text-xs px-3 py-[8px] rounded-lg bg-secondary hover:bg-secondary/70 border border-border text-zinc-200 transition-colors">
              Risk check
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <input
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              placeholder="Ask AI about stocks..."
              className="flex-1 h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
            />
            <button
              onClick={onAsk}
              disabled={assistantStatus === 'loading'}
              className={cn(
                'w-10 h-9 rounded-lg flex items-center justify-center border transition-colors',
                assistantStatus === 'loading'
                  ? 'bg-secondary/60 border-border text-zinc-500 cursor-not-allowed'
                  : 'bg-primary border-primary/30 text-white hover:bg-primary/90'
              )}
              aria-label="Ask AI"
            >
              {assistantStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <TrendingUp size={16} />}
            </button>
          </div>
        </div>

        {/* Latest Alerts */}
        <ErrorBoundary fallback={() => <ErrorCard title="Latest alerts" />}>
          <CardShell
            title="Latest alerts"
            icon={<Bell size={15} className="text-zinc-500" />}
          >
            <div className="space-y-0">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-[10px] py-[10px] border-b border-border last:border-none first:pt-0 last:pb-0">
                  <span
                    className={
                      `text-[10px] font-bold px-[8px] py-[3px] rounded-[6px] tracking-[0.03em] flex-shrink-0 ` +
                      (alert.type === 'BUY'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400')
                    }
                  >
                    {alert.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-zinc-200 mb-[2px]">{alert.title}</div>
                    <div className="text-[11px] text-zinc-500">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardShell>
        </ErrorBoundary>

        {/* Economic Calendar */}
        <ErrorBoundary fallback={() => <ErrorCard title="Economic calendar" />}>
          <CardShell title="Economic calendar" icon={<Calendar size={15} className="text-zinc-500" />}>
            <div className="space-y-0">
              {calendar.map((event, i) => (
                <div key={i} className="flex items-start gap-[10px] py-[10px] border-b border-border last:border-none first:pt-0 last:pb-0">
                  <span
                    className={
                      `text-[10px] font-bold px-[8px] py-[3px] rounded-[6px] tracking-[0.03em] flex-shrink-0 ` +
                      (event.impact === 'HIGH'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-amber-500/10 text-amber-400')
                    }
                  >
                    {event.impact}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-zinc-200 mb-[2px]">{event.event}</div>
                    <div className="text-[11px] text-zinc-500">{event.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardShell>
        </ErrorBoundary>

        {/* Earnings */}
        <ErrorBoundary fallback={() => <ErrorCard title="Earnings" />}>
          <CardShell title="Earnings" icon={<Trophy size={15} className="text-zinc-500" />}>
            <div className="space-y-0">
              {[
                { ticker: 'AAPL', date: 'Aug 1', impact: 'High' as const, est: '+3.2%' },
                { ticker: 'MSFT', date: 'Aug 3', impact: 'Med' as const, est: '+1.1%' },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-start gap-[10px] py-[10px] border-b border-border last:border-none first:pt-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-[10px] bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {row.ticker.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-[2px]">
                      <div className="text-[13px] font-medium text-zinc-200">{row.ticker} Earnings</div>
                      <span
                        className={
                          'text-[10px] font-bold px-[8px] py-[3px] rounded-[6px] tracking-[0.03em] ' +
                          (row.impact === 'High'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400')
                        }
                      >
                        {row.impact}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {row.date} · Est. {row.est}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardShell>
        </ErrorBoundary>
      </div>
    </div>
  )
}

// Local class-based error boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: (() => React.ReactNode) | React.ReactNode }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return typeof this.props.fallback === 'function' ? this.props.fallback() : this.props.fallback
    }
    return this.props.children
  }
}


