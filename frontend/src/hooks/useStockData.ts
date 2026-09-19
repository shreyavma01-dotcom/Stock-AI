import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useStockSearch(query: string) {
  return useQuery({
    queryKey: ['stockSearch', query],
    queryFn: () => api.searchStocks(query),
    enabled: query.length >= 1,
  })
}

export function useStockDetail(symbol: string) {
  return useQuery({
    queryKey: ['stock', symbol],
    queryFn: () => api.getStock(symbol),
    enabled: !!symbol,
  })
}

export function useStockHistory(symbol: string, period = '1y', interval = '1d') {
  return useQuery({
    queryKey: ['stockHistory', symbol, period, interval],
    queryFn: () => api.getHistory(symbol, period, interval),
    enabled: !!symbol,
  })
}

export function usePrediction(symbol: string, horizon = 'tomorrow', model = 'ensemble') {
  return useQuery({
    queryKey: ['prediction', symbol, horizon, model],
    queryFn: () => api.predict(symbol, horizon, model),
    enabled: !!symbol,
  })
}

export function useIndicator(symbol: string, indicator: string, params?: Record<string, any>) {
  return useQuery({
    queryKey: ['indicator', symbol, indicator, params],
    queryFn: () => api.getIndicator(symbol, indicator, params),
    enabled: !!symbol,
  })
}

export function useNewsSentiment(symbol: string) {
  return useQuery({
    queryKey: ['newsSentiment', symbol],
    queryFn: () => api.getNewsSentiment(symbol),
    enabled: !!symbol,
  })
}

export function useMarketOverview() {
  return useQuery({
    queryKey: ['marketOverview'],
    queryFn: () => api.getMarketOverview(),
  })
}
