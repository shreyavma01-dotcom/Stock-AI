import { Briefcase, TrendingUp, DollarSign, PieChart, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Portfolio() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Track your investments and performance</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          New Portfolio
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-600/10 to-transparent p-5">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium text-muted-foreground">Total Value</span>
          </div>
          <div className="text-2xl font-bold">$100,000.00</div>
          <div className="text-xs text-muted-foreground mt-1">Cash Balance: $100,000.00</div>
        </div>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-600/10 to-transparent p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-medium text-muted-foreground">Total P&L</span>
          </div>
          <div className="text-2xl font-bold text-success">+$0.00</div>
          <div className="text-xs text-muted-foreground mt-1">No open positions</div>
        </div>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-purple-600/10 to-transparent p-5">
          <div className="flex items-center gap-2 mb-3">
            <PieChart className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-medium text-muted-foreground">Portfolio Return</span>
          </div>
          <div className="text-2xl font-bold">0.00%</div>
          <div className="text-xs text-muted-foreground mt-1">Since inception</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-30" />
        <h3 className="text-lg font-semibold mb-1">No Holdings Yet</h3>
        <p className="text-sm text-muted-foreground mb-4">Start building your portfolio by searching and buying stocks</p>
        <Button>Browse Stocks</Button>
      </div>
    </div>
  )
}
