import { Badge } from '@/components/ui/Badge'

const watchlistData = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: '$187.68', change: '+1.24%', up: true, prediction: 'BUY' as const },
  { ticker: 'MSFT', name: 'Microsoft', price: '$425.22', change: '+0.87%', up: true, prediction: 'BUY' as const },
  { ticker: 'GOOGL', name: 'Alphabet', price: '$176.34', change: '-0.45%', up: false, prediction: 'HOLD' as const },
  { ticker: 'TSLA', name: 'Tesla', price: '$248.50', change: '-2.34%', up: false, prediction: 'SELL' as const },
]

export function WatchlistWidget() {
  return (
    <div className="rounded-[18px] bg-card border border-border overflow-hidden">
      <table className="w-full" style={{tableLayout:'fixed'}}>
        <thead>
          <tr>
            <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.05em] px-5 py-[14px] border-b border-border" style={{width:'44%'}}>Stock</th>
            <th className="text-right text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.05em] px-5 py-[14px] border-b border-border" style={{width:'18%'}}>Price</th>
            <th className="text-right text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.05em] px-5 py-[14px] border-b border-border" style={{width:'16%'}}>Change</th>
            <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.05em] px-5 py-[14px] border-b border-border" style={{width:'12%'}}>Signal</th>
            <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.05em] px-5 py-[14px] border-b border-border" style={{width:'10%'}}>Trend</th>
          </tr>
        </thead>
        <tbody>
          {watchlistData.map((stock) => (
            <WatchlistRow key={stock.ticker} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WatchlistRow({ stock }: { stock: typeof watchlistData[number] }) {
  return (
    <tr className="transition-colors duration-150 hover:bg-white/[0.025] cursor-pointer">
      <td className="px-5 py-[14px] border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
            {stock.ticker.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">{stock.ticker}</div>
            <div className="text-xs text-zinc-500 mt-[1px]">{stock.name}</div>
          </div>
        </div>
      </td>
      <td className="text-right text-sm font-semibold text-white tabular-nums px-5 py-[14px] border-b border-border">{stock.price}</td>
      <td className={`text-right text-[13px] font-medium tabular-nums px-5 py-[14px] border-b border-border ${stock.up ? 'text-emerald-400' : 'text-red-400'}`}>{stock.change}</td>
      <td className="text-center px-5 py-[14px] border-b border-border">
        <Badge variant={stock.prediction.toLowerCase() as any}>{stock.prediction}</Badge>
      </td>
      <td className="px-5 py-[14px] border-b border-border">
        <svg className="w-[60px] h-[24px]" viewBox="0 0 60 24" preserveAspectRatio="none">
          <polyline
            points={stock.prediction === 'BUY' ? '0,18 10,15 20,17 30,10 40,13 50,6 60,4' : stock.prediction === 'SELL' ? '0,5 10,8 20,7 30,13 40,11 50,18 60,21' : '0,12 10,10 20,13 30,9 40,14 50,8 60,11'}
            fill="none"
            stroke={stock.up ? '#22C55E' : '#EF4444'}
            strokeWidth="2"
          />
        </svg>
      </td>
    </tr>
  )
}