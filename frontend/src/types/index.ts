export interface Stock {
  symbol: string
  name?: string
  sector?: string
  industry?: string
  exchange?: string
  currency?: string
  market_cap?: number
  pe_ratio?: number
  eps?: number
  dividend_yield?: number
  fifty_two_week_high?: number
  fifty_two_week_low?: number
  avg_volume?: number
  beta?: number
  description?: string
  current_price?: number
  previous_close?: number
  day_high?: number
  day_low?: number
  volume?: number
  change?: number
  change_percent?: number
}

export interface HistoricalDataPoint {
  date: string
  open: number
  high: number
  low: number
  close: number
  adj_close: number
  volume: number
}

export interface Prediction {
  symbol: string
  model_name: string
  horizon: string
  predicted_price: number
  confidence: number
  expected_return: number
  trend: string
  current_price: number
  prediction_date: string
  target_date: string
}

export interface TechnicalIndicator {
  indicator: string
  values: any[]
  metadata: Record<string, any>
}

export interface SentimentData {
  symbol: string
  overall_sentiment: string
  sentiment_score: number
  confidence: number
  impact: string
  recommendation: string
  article_count: number
  recent_articles: any[]
}

export interface Portfolio {
  id: string
  name: string
  cash_balance: number
  holdings: any[]
  transactions: any[]
}

export interface Watchlist {
  id: string
  name: string
  items: any[]
}

export interface User {
  id: string
  email: string
  username: string
  full_name: string | null
  role: string
  is_active: boolean
  is_verified: boolean
  created_at: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: User
}
