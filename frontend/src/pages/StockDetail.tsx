import { useParams } from 'react-router-dom'
import { useStockDetail, useStockHistory } from '@/hooks/useStockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react'

export function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>()
  const { data: stock, isLoading } = useStockDetail(symbol!)
  const { data: history } = useStockHistory(symbol!, '1mo', '1d')

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 animate-pulse">
              <div className="h-3 w-20 bg-muted rounded mb-3" />
              <div className="h-7 w-24 bg-muted rounded mb-2" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!stock) {
    return <div className="text-center py-20 text-muted-foreground">Stock not found</div>;
  }

  const isPositive = (stock.change ?? 0) >= 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{stock.symbol?.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{stock.name}</h1>
              <p className="text-sm text-muted-foreground">{stock.symbol} &middot; {stock.exchange}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="text-3xl font-bold tracking-tight">${stock.current_price?.toFixed(2) ?? 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Change</div>
              <div className={`flex items-center gap-1.5 font-bold text-lg ${isPositive ? 'text-success' : 'text-danger'}`}>
                {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                <span>{stock.change?.toFixed(2)} ({stock.change_percent?.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Day High', value: stock.day_high },
          { label: 'Day Low', value: stock.day_low },
          { label: 'Prev Close', value: stock.previous_close },
          { label: 'Volume', value: stock.volume && stock.volume.toLocaleString() },
          { label: 'Mkt Cap', value: formatCurrency(stock.market_cap) },
          { label: 'P/E Ratio', value: stock.pe_ratio?.toFixed(2) },
          { label: "52W High", value: stock.fifty_two_week_high?.toFixed(2) },
          { label: "52W Low", value: stock.fifty_two_week_low?.toFixed(2) },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs font-medium text-muted-foreground mb-1">{label}</div>
            <div className="text-lg font-semibold">{value || 'N/A'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
