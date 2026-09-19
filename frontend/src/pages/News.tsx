import { useState } from 'react'
import { useNewsSentiment } from '@/hooks/useStockData'
import { Newspaper, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function NewsPage() {
  const [symbol, setSymbol] = useState('AAPL')
  const { data: sentiment, isLoading } = useNewsSentiment(symbol)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Market News</h1>
        <p className="text-muted-foreground mt-1">News with AI-powered sentiment analysis</p>
      </div>
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
      {sentiment && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-600/10 to-transparent p-5">
              <span className="text-xs font-medium text-muted-foreground">Overall Sentiment</span>
              <div className={`text-2xl font-bold capitalize mt-1 ${
                sentiment.overall_sentiment === 'positive' ? 'text-success' :
                sentiment.overall_sentiment === 'negative' ? 'text-danger' : 'text-warning'
              }`}>
                {sentiment.overall_sentiment}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-purple-600/10 to-transparent p-5">
              <span className="text-xs font-medium text-muted-foreground">Sentiment Score</span>
              <div className="text-2xl font-bold mt-1">{sentiment.sentiment_score?.toFixed(4)}</div>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-600/10 to-transparent p-5">
              <span className="text-xs font-medium text-muted-foreground">Confidence</span>
              <div className="text-2xl font-bold mt-1">{(sentiment.confidence * 100).toFixed(1)}%</div>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-amber-600/10 to-transparent p-5">
              <span className="text-xs font-medium text-muted-foreground">Recommendation</span>
              <div className="text-2xl font-bold mt-1 capitalize">{sentiment.recommendation}</div>
            </div>
          </div>
          <div className="space-y-3">
            {sentiment.recent_articles?.map((article: any, i: number) => (
              <a key={i} href={article.url} target="_blank" rel="noopener noreferrer"
                className="block rounded-2xl border border-border bg-card p-4 hover:bg-accent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{article.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{article.source}</span>
                      {article.sentiment_label && (
                        <span className={`flex items-center gap-1 ${
                          article.sentiment_label === 'positive' ? 'text-success' :
                          article.sentiment_label === 'negative' ? 'text-danger' : 'text-warning'
                        }`}>
                          {article.sentiment_label === 'positive' ? <TrendingUp className="h-3 w-3" /> :
                           article.sentiment_label === 'negative' ? <TrendingDown className="h-3 w-3" /> :
                           <Minus className="h-3 w-3" />}
                          {article.sentiment_label}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                </div>
              </a>
            ))}
          </div>
        </>
      )}
      {!sentiment && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>Enter a symbol to see news and sentiment</p>
        </div>
      )}
    </div>
  )
}
