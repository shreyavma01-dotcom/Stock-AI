# StockSense AI Pro

> Enterprise-grade AI-powered stock market analysis platform
>
> Inspired by Bloomberg Terminal, TradingView, Zerodha Kite & Apple Design

A premium production-ready stock analysis platform featuring real-time market data, AI-driven predictions, portfolio management, technical indicators, and a dark-themed dashboard engineered to compete with professional trading terminals.

---

## Features

**Real-Time Market Data** — Live stock prices, historical data, global market indices (S&P 500, NASDAQ, Dow, Nifty 50, Bank Nifty, BTC, ETH, Gold, Silver), WebSocket streaming.

**AI-Powered Predictions** — BUY/SELL/HOLD signals with confidence percentages. Ensemble models (Linear Regression, Random Forest, XGBoost, LSTM). Expected return, risk assessment, target price, stop loss.

**Technical Analysis** — RSI, MACD, SMA, EMA, Bollinger Bands, VWAP, ATR, ADX, Stochastic, Ichimoku, Fibonacci. Interactive charts with timeframe selection.

**Portfolio Management** — Holdings tracking, P&L, sector allocation, risk scoring, AI-generated suggestions.

**News & Sentiment** — NLP-powered sentiment analysis with positive/negative badges, source filtering.

**Stock Screener** — Filter by market cap, P/E, sector, industry, dividend, volume, price range, 52-week high/low, growth, margin, ROE.

**Backtesting** — Test trading strategies against historical data.

## Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4, CSS variables |
| Components | shadcn/ui primitives (adapted) |
| Charts | Recharts, custom theme |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Routing | React Router v7 |
| Data Fetching | TanStack Query v5 |
| State | React Context |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Python 3.13 |
| Framework | FastAPI |
| ORM | SQLAlchemy 2.0 |
| Task Queue | Celery + Redis |
| Real-Time | WebSockets |
| ML | Scikit-learn, XGBoost, Prophet, TensorFlow/Keras |

### Infrastructure
Docker, Docker Compose, PostgreSQL (prod), SQLite (dev), Redis

## Design System

| Token | Value | Usage |
|---|---|---|
| `--background` | `#09090B` | App base |
| `--sidebar` | `#111827` | Navigation |
| `--card` | `#18181B` | Content surfaces |
| `--border` | `#27272A` | Dividers |
| `--primary` | `#6366F1` | Buttons, links, active |
| `--success` | `#22C55E` | Gains, buy signals |
| `--danger` | `#EF4444` | Losses, sell signals |
| Radius (outer) | 18px | Cards, containers |
| Radius (inner) | 10px | Buttons, inputs, badges |
| Font | Inter | All text |

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│ Header (72px) — search, ticker strip, notifications         │
├──────────────┬──────────────────────────────┬───────────────┤
│ Sidebar      │ Main Content (12-col grid)    │ Right Rail    │
│ 280px / 72px │                               │ 360px         │
│ collapsible  │ Dashboard / Markets / Stocks  │ AI Assistant  │
│ grouped nav  │ Predictions / Portfolio / etc │ Alerts        │
│              │                               │ Calendar      │
│              │                               │ Earnings      │
└──────────────┴──────────────────────────────┴───────────────┘
```

## Project Structure

```
stocksense-ai/
├── backend/
│   ├── app/
│   │   ├── api/         # Routes
│   │   ├── core/        # Config
│   │   ├── models/      # SQLAlchemy
│   │   ├── services/    # Business logic
│   │   └── ml/          # ML models
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/    # AppLayout, Sidebar, Header, RightPanel
│   │   │   ├── dashboard/ # HeroSection, KpiCard, MarketCard, PortfolioChart, WatchlistWidget
│   │   │   ├── charts/    # Sparkline (Recharts wrapper)
│   │   │   ├── shared/    # Skeleton, EmptyState, ErrorState
│   │   │   └── ui/        # button, card, input, Badge
│   │   ├── pages/         # Dashboard, StockDetail, Predictions, etc.
│   │   ├── context/       # AuthContext, ThemeContext
│   │   ├── hooks/         # useStockData, useCountUp
│   │   ├── services/      # API client
│   │   ├── lib/           # utils, design-tokens, chart-theme
│   │   └── types/         # TypeScript interfaces
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Python 3.13+
- Node.js 20+
- Docker & Docker Compose (optional)

### Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Seed Data
```bash
cd backend
python -m app.seed
# Creates: admin / admin123 (Admin), user / user123 (User)
```

### Docker
```bash
docker-compose up --build
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Register |
| POST | `/api/v1/auth/login` | Login |
| GET | `/api/v1/stocks/search?q=AAPL` | Search stocks |
| GET | `/api/v1/stocks/{symbol}` | Stock details |
| GET | `/api/v1/stocks/{symbol}/history` | Historical prices |
| GET | `/api/v1/stocks/market/overview` | Market indices |
| GET | `/api/v1/indicators/{symbol}/{indicator}` | Technical indicators |
| GET | `/api/v1/predictions/{symbol}` | AI predictions |
| GET | `/api/v1/news/{symbol}` | News sentiment |
| GET | `/api/v1/compare?symbols=AAPL,MSFT` | Compare stocks |
| GET | `/api/v1/screener` | Stock screener |
| POST | `/api/v1/backtest/run` | Backtest strategy |
| POST | `/api/v1/portfolio` | Create portfolio |
| POST | `/api/v1/portfolio/{id}/buy` | Buy stock |
| POST | `/api/v1/portfolio/{id}/sell` | Sell stock |
| POST | `/api/v1/watchlist` | Create watchlist |
| POST | `/api/v1/alerts` | Create alert |
| WS | `/ws/{channel}` | WebSocket stream |

## License

MIT
