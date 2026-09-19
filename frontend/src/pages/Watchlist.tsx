import { Star, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WatchlistPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Watchlist</h1>
          <p className="text-muted-foreground mt-1">Monitor your favorite stocks</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Stock
        </Button>
      </div>
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-30" />
        <h3 className="text-lg font-semibold mb-1">Your watchlist is empty</h3>
        <p className="text-sm text-muted-foreground">Search for stocks and add them to your watchlist</p>
      </div>
    </div>
  )
}
