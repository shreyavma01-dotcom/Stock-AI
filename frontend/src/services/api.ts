const API_BASE = '/api/v1'

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('access_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options?.headers },
    })

    if (res.status === 401 && !endpoint.startsWith('/auth')) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
      throw new Error('Session expired')
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: res.statusText }))
      throw new Error(error.detail || `HTTP ${res.status}`)
    }

    return res.json()
  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error('Backend server not reachable')
    }
    throw err
  }
}

export const api = {
  login: (data: { username: string; password: string }) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async r => {
      if (!r.ok) throw new Error('Invalid credentials')
      return r.json()
    }),

  register: (data: { email: string; username: string; password: string; full_name?: string }) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async r => {
      if (!r.ok) throw new Error('Registration failed')
      return r.json()
    }),

  getMe: () => apiRequest('/auth/me'),

  searchStocks: (q: string) => apiRequest(`/stocks/search?q=${q}`),
  getStock: (symbol: string) => apiRequest(`/stocks/${symbol}`),
  getHistory: (symbol: string, period = '1y', interval = '1d') =>
    apiRequest(`/stocks/${symbol}/history?period=${period}&interval=${interval}`),
  getCompanyInfo: (symbol: string) => apiRequest(`/stocks/${symbol}/company`),
  getStockNews: (symbol: string, max = 10) => apiRequest(`/stocks/${symbol}/news?max=${max}`),
  getRecommendations: (symbol: string) => apiRequest(`/stocks/${symbol}/recommendations`),
  getMarketOverview: () => apiRequest('/stocks/market/overview'),

  getIndicator: (symbol: string, indicator: string, params?: Record<string, any>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return apiRequest(`/indicators/${symbol}/${indicator}${query}`)
  },

  predict: (symbol: string, horizon = 'tomorrow', model = 'ensemble') =>
    apiRequest(`/predictions/${symbol}?horizon=${horizon}&model=${model}`),

  getNewsSentiment: (symbol: string, max = 20) =>
    apiRequest(`/news/${symbol}?max_articles=${max}`),

  compare: (symbols: string[]) =>
    apiRequest(`/compare?symbols=${symbols.join(',')}`),

  screen: (params?: Record<string, any>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return apiRequest(`/screener${query}`)
  },

  runBacktest: (data: any) =>
    apiRequest('/backtest/run', { method: 'POST', body: JSON.stringify(data) }),

  getPortfolios: () => apiRequest('/portfolio'),
  createPortfolio: (data: any) =>
    apiRequest('/portfolio', { method: 'POST', body: JSON.stringify(data) }),
  buyStock: (portfolioId: string, data: any) =>
    apiRequest(`/portfolio/${portfolioId}/buy`, { method: 'POST', body: JSON.stringify(data) }),
  sellStock: (portfolioId: string, data: any) =>
    apiRequest(`/portfolio/${portfolioId}/sell`, { method: 'POST', body: JSON.stringify(data) }),

  getWatchlists: () => apiRequest('/watchlist'),
  createWatchlist: (data: any) =>
    apiRequest('/watchlist', { method: 'POST', body: JSON.stringify(data) }),
  addToWatchlist: (watchlistId: string, data: any) =>
    apiRequest(`/watchlist/${watchlistId}/items`, { method: 'POST', body: JSON.stringify(data) }),
  removeFromWatchlist: (watchlistId: string, itemId: string) =>
    apiRequest(`/watchlist/${watchlistId}/items/${itemId}`, { method: 'DELETE' }),

  getAlerts: () => apiRequest('/alerts'),
  createAlert: (data: any) =>
    apiRequest('/alerts', { method: 'POST', body: JSON.stringify(data) }),
}
