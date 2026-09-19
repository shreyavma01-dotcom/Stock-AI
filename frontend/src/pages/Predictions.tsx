import { useState } from 'react'
import { usePrediction } from '@/hooks/useStockData'
import { Brain, TrendingUp, TrendingDown, Minus, Target } from 'lucide-react'

export function Predictions() {
  const [symbol, setSymbol] = useState('AAPL')
  const [horizon, setHorizon] = useState('tomorrow')
  const { data: prediction, isLoading, error } = usePrediction(symbol, horizon)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Predictions</h1>
        <p className="text-muted-foreground mt-1">Machine learning powered price forecasts</p>
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="h-10 px-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 w-28"
            placeholder="AAPL"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Horizon</label>
          <select
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
            className="h-10 px-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
          >
            <option value="tomorrow">Tomorrow</option>
            <option value="next_week">Next Week</option>
            <option value="next_month">Next Month</option>
          </select>
        </div>
      </div>

      {prediction && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-600/10 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium text-muted-foreground">Predicted Price</span>
            </div>
            <div className="text-2xl font-bold">${prediction.predicted_price?.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1">Current: ${prediction.current_price?.toFixed(2)}</div>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-purple-600/10 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-medium text-muted-foreground">Confidence</span>
            </div>
            <div className="text-2xl font-bold">{(prediction.confidence * 100).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">Model: {prediction.model_name}</div>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-600/10 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-medium text-muted-foreground">Expected Return</span>
            </div>
            <div className={`text-2xl font-bold ${prediction.expected_return >= 0 ? 'text-success' : 'text-danger'}`}>
              {prediction.expected_return >= 0 ? '+' : ''}{prediction.expected_return?.toFixed(2)}%
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-amber-600/10 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3">
              {prediction.trend === 'bullish' ? <TrendingUp className="h-4 w-4 text-emerald-400" /> : prediction.trend === 'bearish' ? <TrendingDown className="h-4 w-4 text-red-400" /> : <Minus className="h-4 w-4 text-amber-400" />}
              <span className="text-xs font-medium text-muted-foreground">Trend</span>
            </div>
            <div className={`text-2xl font-bold capitalize ${prediction.trend === 'bullish' ? 'text-success' : prediction.trend === 'bearish' ? 'text-danger' : 'text-warning'}`}>
              {prediction.trend}
            </div>
          </div>
        </div>
      )}

      {!prediction && !isLoading && !error && (
        <div className="text-center py-12 text-muted-foreground">
          <Brain className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>Enter a symbol and select a horizon to see predictions</p>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 animate-pulse">
              <div className="h-3 w-20 bg-muted rounded mb-3" />
              <div className="h-7 w-24 bg-muted rounded mb-2" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-400">
          {(error as Error).message}
        </div>
      )}
    </div>
  )
}
