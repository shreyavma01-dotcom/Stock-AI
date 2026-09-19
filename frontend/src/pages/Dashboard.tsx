import { Wallet, TrendingUp, BarChart3, Brain, Activity, Shield } from 'lucide-react'
import { HeroSection } from '@/components/dashboard/HeroSection'
import { KpiCard, KpiCardGrid } from '@/components/dashboard/KpiCard'
import { MarketCard, MarketOverview } from '@/components/dashboard/MarketCard'
import { PortfolioChart } from '@/components/dashboard/PortfolioChart'
import { WatchlistWidget } from '@/components/dashboard/WatchlistWidget'
import { Badge } from '@/components/ui/Badge'

const kpis = [
  { label: 'Portfolio value', value: '$124.6K', delta: '+2.4%', deltaLabel: 'vs last month', icon: <Wallet size={16} />, tone: 'neutral' as const },
  { label: "Today's P&L", value: '+$1,892', delta: '+1.54%', deltaLabel: 'vs yesterday', icon: <TrendingUp size={16} />, tone: 'success' as const },
  { label: 'Total return', value: '+18.7%', delta: '+3.2%', deltaLabel: 'vs last month', icon: <BarChart3 size={16} />, tone: 'neutral' as const },
  { label: 'AI confidence', value: '87.3%', delta: '+2.1%', deltaLabel: 'vs last month', icon: <Brain size={16} />, tone: 'neutral' as const },
  { label: 'Win rate', value: '72.4%', delta: '+5.8%', deltaLabel: 'vs last month', icon: <Activity size={16} />, tone: 'success' as const },
  { label: 'Risk score', value: '34.2', delta: '-2.1%', deltaLabel: 'vs last month', icon: <Shield size={16} />, tone: 'danger' as const },
]

const marketIndices = [
  { name: 'S&P 500', value: '5,234.18', change: '+0.42%', up: true },
  { name: 'NASDAQ', value: '16,742.39', change: '+0.68%', up: true },
  { name: 'Dow Jones', value: '39,875.42', change: '-0.12%', up: false },
  { name: 'Russell 2000', value: '2,045.67', change: '+0.28%', up: true },
  { name: 'Nifty 50', value: '22,456.80', change: '+0.35%', up: true },
  { name: 'Bank Nifty', value: '48,234.15', change: '+0.51%', up: true },
  { name: 'Gold', value: '2,345.60', change: '+0.18%', up: true },
  { name: 'Silver', value: '28.45', change: '-0.32%', up: false },
  { name: 'Bitcoin', value: '67,234', change: '+2.14%', up: true },
  { name: 'Ethereum', value: '3,456', change: '-0.87%', up: false },
]

const newsData = [
  { title: 'Fed Signals Potential Rate Cut in September', source: 'Reuters', time: '2h ago', sentiment: 'positive' as const, summary: 'Federal Reserve Chair Jerome Powell indicated...' },
  { title: 'NVIDIA Surpasses $3T Market Cap', source: 'Bloomberg', time: '3h ago', sentiment: 'positive' as const, summary: 'AI chipmaker continues record rally as demand surges...' },
  { title: 'Oil Prices Drop Amid Supply Concerns', source: 'CNBC', time: '4h ago', sentiment: 'negative' as const, summary: 'Crude oil futures fell sharply...' },
  { title: 'Tech Stocks Rally on AI Optimism', source: 'Financial Times', time: '5h ago', sentiment: 'positive' as const, summary: 'Technology sector leads market gains as AI adoption accelerates...' },
]

const aiPrediction = {
  buy: 87,
  sell: 12,
  hold: 1,
  expectedReturn: '+12.4%',
  risk: 'Moderate',
  targetPrice: '$195.00',
  stopLoss: '$142.50',
}

const portfolioHolding = [
  { name: 'AAPL', value: '$18,234', gain: '+21.6%', sector: 'Technology', allocation: '15%' },
  { name: 'MSFT', value: '$14,567', gain: '+21.4%', sector: 'Technology', allocation: '12%' },
  { name: 'GOOGL', value: '$11,234', gain: '+12.3%', sector: 'Technology', allocation: '10%' },
  { name: 'AMZN', value: '$9,876', gain: '+23.5%', sector: 'Consumer', allocation: '8%' },
  { name: 'TSLA', value: '$4,234', gain: '-15.3%', sector: 'Automotive', allocation: '5%' },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <HeroSection />

      {/* KPI Cards */}
      <KpiCardGrid>
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </KpiCardGrid>

      {/* Market Overview */}
      <MarketOverview>
        {marketIndices.map((index, i) => (
          <MarketCard key={index.name} {...index} index={i} />
        ))}
      </MarketOverview>

      {/* Main 12-col grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Portfolio Chart - 8 cols */}
        <div className="col-span-12 lg:col-span-8">
          <PortfolioChart />
        </div>

        {/* Watchlist - 4 cols */}
        <div className="col-span-12 lg:col-span-4">
          <WatchlistWidget />
        </div>

        {/* Heatmap - 6 cols */}
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-2xl bg-card border border-border p-5">
            <h2 className="text-base font-semibold text-white mb-4">Market Heatmap</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { sector: 'Technology', change: '+2.4%', up: true },
                { sector: 'Healthcare', change: '+1.2%', up: true },
                { sector: 'Finance', change: '-0.8%', up: false },
                { sector: 'Energy', change: '+0.5%', up: true },
                { sector: 'Consumer', change: '-1.2%', up: false },
                { sector: 'Utilities', change: '+0.3%', up: true },
              ].map((s) => (
                <div
                  key={s.sector}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    s.up
                      ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10'
                      : 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10'
                  }`}
                >
                  <p className="text-xs font-medium text-zinc-400 mb-1">{s.sector}</p>
                  <p className={`text-base font-bold tabular-nums ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News - 6 cols */}
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Market News</h2>
              <span className="text-xs text-zinc-500">View all →</span>
            </div>
            <div className="space-y-2">
              {newsData.map((news, i) => (
                <div key={i} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={news.sentiment === 'positive' ? 'success' : 'danger'}>
                      {news.sentiment}
                    </Badge>
                    <span className="text-xs text-zinc-500">{news.source}</span>
                    <span className="text-[10px] text-zinc-600">·</span>
                    <span className="text-[10px] text-zinc-500">{news.time}</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-200">{news.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{news.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Predictions - 6 cols */}
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">AI Predictions</h2>
              <Brain size={15} className="text-primary" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                <p className="text-xs font-bold text-emerald-400 mb-1">BUY</p>
                <p className="text-2xl font-bold text-white tabular-nums">{aiPrediction.buy}%</p>
              </div>
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center">
                <p className="text-xs font-bold text-red-400 mb-1">SELL</p>
                <p className="text-2xl font-bold text-white tabular-nums">{aiPrediction.sell}%</p>
              </div>
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 text-center">
                <p className="text-xs font-bold text-amber-400 mb-1">HOLD</p>
                <p className="text-2xl font-bold text-white tabular-nums">{aiPrediction.hold}%</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Expected Return', value: aiPrediction.expectedReturn, color: 'text-emerald-400' },
                { label: 'Risk Level', value: aiPrediction.risk, color: 'text-amber-400' },
                { label: 'Target Price', value: aiPrediction.targetPrice, color: 'text-white' },
                { label: 'Stop Loss', value: aiPrediction.stopLoss, color: 'text-red-400' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs text-zinc-500">{row.label}</span>
                  <span className={`text-xs font-semibold tabular-nums ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Holdings - 6 cols */}
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Portfolio Holdings</h2>
              <span className="text-xs text-zinc-500">View all →</span>
            </div>
            <div className="space-y-1">
              {portfolioHolding.map((stock) => (
                <div key={stock.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-bold text-zinc-300">
                      {stock.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{stock.name}</p>
                      <p className="text-[10px] text-zinc-500">{stock.sector} · {stock.allocation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white tabular-nums">{stock.value}</p>
                    <p className={`text-[11px] font-semibold tabular-nums ${stock.gain.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{stock.gain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}