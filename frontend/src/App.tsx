import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { AppLayout } from '@/components/layout/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { StockDetail } from '@/pages/StockDetail'
import { MarketOverview } from '@/pages/MarketOverview'
import { Predictions } from '@/pages/Predictions'
import { Portfolio } from '@/pages/Portfolio'
import { WatchlistPage } from '@/pages/Watchlist'
import { Comparison } from '@/pages/Comparison'
import { NewsPage } from '@/pages/News'
import { Screener } from '@/pages/Screener'
import { SettingsPage } from '@/pages/Settings'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { TrendingUp } from 'lucide-react'

const queryClient = new QueryClient()

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function StockList() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stocks</h1>
        <p className="text-muted-foreground mt-1">Search and explore stocks</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p>Use the search bar to find stocks</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="stocks" element={<StockList />} />
                <Route path="stocks/:symbol" element={<StockDetail />} />
                <Route path="market" element={<MarketOverview />} />
                <Route path="predictions" element={<Predictions />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="watchlist" element={<WatchlistPage />} />
                <Route path="comparison" element={<Comparison />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="screener" element={<Screener />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="alerts" element={<div className="text-zinc-400 p-8 text-center">Alerts page coming soon</div>} />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
