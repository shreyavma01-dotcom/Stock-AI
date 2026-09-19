import { useState } from 'react'
import { api } from '@/services/api'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export function Screener() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleScreen = async () => {
    setLoading(true)
    try {
      const data = await api.screen()
      setResults(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Screener</h1>
          <p className="text-muted-foreground mt-1">Filter stocks by criteria</p>
        </div>
        <Button onClick={handleScreen} disabled={loading}>
          {loading ? 'Screening...' : 'Run Screener'}
        </Button>
      </div>

      {results && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Symbol</th>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-right p-3 font-medium">Price</th>
                <th className="text-right p-3 font-medium">Mkt Cap</th>
                <th className="text-right p-3 font-medium">P/E</th>
                <th className="text-right p-3 font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {results.results?.map((s: any) => (
                <tr key={s.symbol} className="border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors">
                  <td className="p-3 font-semibold">{s.symbol}</td>
                  <td className="p-3 text-muted-foreground max-w-[200px] truncate">{s.name}</td>
                  <td className="p-3 text-right font-medium">{formatCurrency(s.current_price)}</td>
                  <td className="p-3 text-right text-muted-foreground">{formatCurrency(s.market_cap)}</td>
                  <td className="p-3 text-right text-muted-foreground">{s.pe_ratio?.toFixed(2) || 'N/A'}</td>
                  <td className={`p-3 text-right font-medium ${(s.change_percent ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                    {(s.change_percent ?? 0) >= 0 ? '+' : ''}{s.change_percent?.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 text-xs text-muted-foreground border-t border-border">
            Showing {results.results?.length || 0} stocks
          </div>
        </div>
      )}

      {!results && (
        <div className="text-center py-12 text-muted-foreground">
          <Filter className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>Click "Run Screener" to filter stocks</p>
        </div>
      )}
    </div>
  )
}
