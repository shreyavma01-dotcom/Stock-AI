import { useState } from 'react'
import { api } from '@/services/api'
import { ArrowLeftRight, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export function Comparison() {
  const [symbols, setSymbols] = useState('AAPL,MSFT,GOOGL')
  const [data, setData] = useState<any>(null)

  const handleCompare = async () => {
    const list = symbols.split(',').map(s => s.trim()).filter(Boolean)
    if (list.length >= 2) {
      const result = await api.compare(list)
      setData(result)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stock Comparison</h1>
        <p className="text-muted-foreground mt-1">Compare fundamentals across companies</p>
      </div>
      <div className="flex gap-3 items-end">
        <div className="flex-1 max-w-md">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Symbols (comma separated)</label>
          <input
            type="text"
            value={symbols}
            onChange={(e) => setSymbols(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
            placeholder="AAPL,MSFT,GOOGL"
          />
        </div>
        <Button onClick={handleCompare}>Compare</Button>
      </div>
      {data?.comparison && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Metric</th>
                {data.comparison.map((s: any) => <th key={s.symbol} className="text-right p-4 font-semibold">{s.symbol}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Price', key: 'current_price', fmt: (v: any) => formatCurrency(v) },
                { label: 'Market Cap', key: 'market_cap', fmt: (v: any) => formatCurrency(v) },
                { label: 'P/E Ratio', key: 'pe_ratio', fmt: (v: any) => v?.toFixed(2) },
                { label: 'EPS', key: 'eps', fmt: (v: any) => v?.toFixed(2) },
                { label: 'Dividend Yield', key: 'dividend_yield', fmt: (v: any) => v ? `${(v * 100).toFixed(2)}%` : 'N/A' },
                { label: 'Profit Margins', key: 'profit_margins', fmt: (v: any) => v ? `${(v * 100).toFixed(2)}%` : 'N/A' },
                { label: 'Debt/Equity', key: 'debt_to_equity', fmt: (v: any) => v?.toFixed(2) },
                { label: 'Beta', key: 'beta', fmt: (v: any) => v?.toFixed(2) },
              ].map(({ label, key, fmt }) => (
                <tr key={label} className="border-b border-border/50 last:border-0">
                  <td className="p-4 font-medium text-muted-foreground">{label}</td>
                  {data.comparison.map((s: any) => (
                    <td key={s.symbol} className="p-4 text-right font-medium">{fmt(s[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
