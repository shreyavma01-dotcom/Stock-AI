import { useMarketOverview } from '@/hooks/useStockData'
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react'

const indexNames: Record<string, string> = {
  '^GSPC': 'S&P 500', '^DJI': 'Dow Jones', '^IXIC': 'NASDAQ', '^RUT': 'Russell 2000', '^VIX': 'VIX'
}

const backgroundColors: Record<string, string> = {
  '^GSPC': 'rgba(59,130,246,0.2)',
  '^DJI': 'rgba(168,85,247,0.2)',
  '^IXIC': 'rgba(52,211,153,0.2)',
  '^RUT': 'rgba(245,158,11,0.2)',
  '^VIX': 'rgba(239,68,68,0.2)',
}

const isGreen = (symbol: string, change: number) => {
  if (symbol === '^VIX') return change < 0
  return change >= 0
}

export function MarketOverview() {
  const { data, isLoading } = useMarketOverview()
  const indices = data ? Object.entries(data) : []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Market Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time performance of major market indices</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && [1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 animate-pulse">
            <div className="h-3 w-20 bg-muted rounded mb-3" />
            <div className="h-8 w-28 bg-muted rounded mb-2" />
            <div className="h-4 w-24 bg-muted rounded" />
          </div>
        ))}
        {indices.map(([symbol, idx]: any) => (
          <div
            key={symbol}
            className="rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${backgroundColors[symbol] || 'rgba(100,116,139,0.2)'}, transparent)`,
              backgroundColor: 'var(--color-card)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{indexNames[symbol]}</span>
                <p className="text-2xl font-bold tracking-tight">${idx.current_price?.toFixed(2) ?? 'N/A'}</p>
              </div>
              {symbol === '^VIX' ? <Activity className="h-6 w-6 text-muted-foreground" /> : <BarChart3 className="h-6 w-6 text-muted-foreground" />}
            </div>
            <div className={`flex items-center gap-1.5 text-sm font-medium ${isGreen(symbol, idx.change ?? 0) ? 'text-green-400' : 'text-red-400'}`}>
              {(idx.change ?? 0) >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{(idx.change ?? 0) >= 0 ? '+' : ''}{idx.change?.toFixed(2)} ({idx.change_percent?.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
        {!isLoading && indices.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>Start the backend to see market data</p>
          </div>
        )}
      </div>
    </div>
  )
}
