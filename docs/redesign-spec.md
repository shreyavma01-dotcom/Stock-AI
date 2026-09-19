# StockSense AI Pro — Redesign Specification

> Deliverables 1–10 for the Premium UI/UX Redesign

---

## 1. Design System Spec

### Color Tokens

All defined in `src/index.css` via Tailwind v4 `@theme`:

| Token | Hex | Usage |
|---|---|---|
| `--color-background` | `#09090B` | App base |
| `--color-foreground` | `#FAFAFA` | Primary text |
| `--color-card` | `#18181B` | Content surfaces |
| `--color-card-foreground` | `#FAFAFA` | Text on cards |
| `--color-primary` | `#6366F1` | Buttons, links, active states |
| `--color-secondary` | `#27272A` | Secondary surfaces |
| `--color-muted` | `#27272A` | Subtle backgrounds |
| `--color-muted-foreground` | `#A1A1AA` | De-emphasized text |
| `--color-border` | `#27272A` | Dividers, outlines |
| `--color-sidebar` | `#111827` | Navigation surface |
| `--color-sidebar-hover` | `#1F2937` | Nav item hover |
| `--color-success` | `#22C55E` | Gains, buy signals |
| `--color-danger` | `#EF4444` | Losses, sell signals |
| `--color-warning` | `#F59E0B` | Alerts, caution |
| `--color-info` | `#3B82F6` | Informational |
| `--color-purple` | `#8B5CF6` | AI/ML highlights |
| `--color-emerald` | `#10B981` | Secondary success |

**Rules:** No bright/saturated fills. Gradients are subtle (5–10% opacity). Glassmorphism only on elevated surfaces (modals, command palette, hero overlays).

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| Display | 36px | 700 | 44px | Page titles |
| Heading 1 | 28px | 700 | 36px | Section headers |
| Heading 2 | 22px | 600 | 28px | Card titles |
| Heading 3 | 18px | 600 | 24px | Sub-section titles |
| Body | 16px | 400 | 24px | Body text |
| Body Small | 14px | 400 | 20px | Secondary text |
| Caption | 12px | 500 | 16px | Labels, badges |
| Micro | 10px | 600 | 14px | Overlines, tags |

Font: Inter (300–800 weights). Loaded via Google Fonts in `index.css`.

### Spacing Scale

4px base unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.

- Component padding: 20–24px
- Card padding: 24px
- Section gap: 32px
- Grid gap: 20–24px
- Stack gap: 16px (vertical), 12px (horizontal)

### Elevation / Shadow Scale

| Level | Shadow | Usage |
|---|---|---|
| 0 | none | Flat surfaces |
| 1 | `0 1px 2px rgba(0,0,0,0.3)` | Cards resting |
| 2 | `0 4px 12px rgba(0,0,0,0.4)` | Cards hovered |
| 3 | `0 8px 24px rgba(0,0,0,0.5)` | Modals, dropdowns |
| 4 | `0 16px 48px rgba(0,0,0,0.6)` | Command palette |

Glow variants (for primary/accent elements):
- `0 0 12px rgba(99,102,241,0.3)` — button hover
- `0 0 24px rgba(99,102,241,0.15)` — active nav item

### Radius Scale

| Token | Value | Usage |
|---|---|---|
| `rounded-lg` | 8px | Buttons, inputs |
| `rounded-xl` | 12px | Small cards |
| `rounded-2xl` | 16px | Standard cards |
| `rounded-3xl` | 24px | Hero sections, modals |

### Motion Tokens

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | 150ms | Hover states |
| `duration-normal` | 300ms | Transitions |
| `duration-slow` | 500ms | Page entries |
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard |
| `ease-spring` | Spring( stiffness: 300, damping: 25 ) | Cards, modals |

---

## 2. Information Architecture

### Sitemap

```
/ (Dashboard)
├── /markets          → MarketOverview page
├── /stocks           → Stock list / search
├── /stocks/:symbol   → StockDetail page
├── /predictions      → Predictions page
├── /portfolio        → Portfolio page
├── /watchlist        → WatchlistPage
├── /news             → NewsPage
├── /screener         → Screener page
├── /comparison       → Comparison page
├── /alerts           → Alerts page
└── /settings         → SettingsPage

Auth (outside shell):
├── /login            → Login page
└── /register         → Register page
```

### Navigation Model

**Primary nav (Sidebar):** Dashboard, Markets, Stocks, Watchlist, Portfolio, Predictions, Technical Analysis, News, Compare, Screener, Backtesting, Alerts, Settings — grouped into logical sections with dividers.

**Secondary nav (Top Nav):** Global search, AI assistant trigger, notifications, live market ticker, user profile.

**Contextual nav (Right Panel):** AI Assistant, latest alerts, economic calendar, upcoming earnings — visible on xl+ screens.

**Hierarchy:**
1. Sidebar = primary navigation (persistent)
2. Top Nav = utilities + global state
3. Right Panel = context-aware side content
4. Content area = page content with nested tabs

---

## 3. Folder Structure (Proposed)

```
frontend/src/
├── components/
│   ├── layout/         # Shell components
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── RightPanel.tsx
│   ├── ui/             # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── (badge, tabs, dialog, select, etc.)
│   ├── charts/         # Recharts wrappers
│   │   ├── Sparkline.tsx
│   │   ├── AreaChart.tsx
│   │   ├── Candlestick.tsx
│   │   └── Gauge.tsx
│   ├── dashboard/      # Dashboard-specific
│   │   ├── HeroSection.tsx
│   │   ├── KpiCard.tsx
│   │   ├── MarketIndices.tsx
│   │   ├── WatchlistWidget.tsx
│   │   ├── AiPredictions.tsx
│   │   ├── NewsFeed.tsx
│   │   ├── PortfolioSummary.tsx
│   │   └── Heatmap.tsx
│   ├── stocks/         # Stock pages shared
│   │   ├── StockHeader.tsx
│   │   ├── StockChart.tsx
│   │   ├── StockInfo.tsx
│   │   └── StockTable.tsx
│   └── shared/         # Reusable across pages
│       ├── Skeleton.tsx
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       ├── Badge.tsx
│       └── StatusDot.tsx
├── pages/              # Route-level components
│   ├── Dashboard.tsx
│   ├── StockDetail.tsx
│   ├── MarketOverview.tsx
│   ├── Predictions.tsx
│   ├── Portfolio.tsx
│   ├── Watchlist.tsx
│   ├── Comparison.tsx
│   ├── News.tsx
│   ├── Screener.tsx
│   ├── Alerts.tsx
│   ├── Settings.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── context/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/
│   ├── useStockData.ts
│   └── (useMarketData, usePortfolio, etc.)
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 4. Component Hierarchy

### Core Primitives (shadcn/ui adapted)

| Component | File | Status |
|---|---|---|
| `Button` | `ui/button.tsx` | Exists — needs color token update |
| `Card` | `ui/card.tsx` | Exists — needs radius update to 18px |
| `Input` | `ui/input.tsx` | Exists — focus ring to indigo |
| `Badge` | `shared/Badge.tsx` | New |
| `Skeleton` | `shared/Skeleton.tsx` | New |
| `EmptyState` | `shared/EmptyState.tsx` | New |
| `ErrorState` | `shared/ErrorState.tsx` | New |
| `StatusDot` | `shared/StatusDot.tsx` | New |

### Composed Components

| Component | Depends On | Status |
|---|---|---|
| `Sidebar` | NavLink, Lucide icons | Redesign in progress |
| `Header` | Input, Badge, Lucide icons | Redesign in progress |
| `RightPanel` | Card, Badge, Lucide icons | Exists — refine |
| `HeroSection` | motion.div, Lucide icons | New |
| `KpiCard` | Card, motion.div, Lucide icons | Refactor from inline |
| `MarketIndices` | Card, StatusDot, Sparkline | New |
| `Sparkline` | Recharts AreaChart | New |
| `WatchlistWidget` | Card, StatusDot, Star | New |
| `AiPredictions` | Card, motion.div, Gauge | New |
| `NewsFeed` | Card, Badge, Image | New |
| `PortfolioSummary` | Card, Recharts PieChart | New |
| `Heatmap` | Card, motion.div | New |
| `StockHeader` | Card, Badge, Button | New |
| `StockChart` | Card, Recharts, Button group | New |
| `StockTable` | Table, Skeleton | New |

### Page Templates

```
Shell (AppLayout)
├── Sidebar
├── Header
├── <main>
│   ├── Dashboard
│   │   ├── HeroSection
│   │   ├── KpiCard[] (6)
│   │   ├── MarketIndices
│   │   └── 12-col grid:
│   │       ├── Chart (8) + Watchlist (4)
│   │       ├── Heatmap (6) + News (6)
│   │       └── AiPredictions (6) + PortfolioSummary (6)
│   └── (other pages follow similar composition)
└── RightPanel (xl+)
```

---

## 5. Page-by-Page Layout Breakdown

### Dashboard

**Grid:** 12 columns, gap 24px.

```
Row 1 (full width):
┌──────────────────────────────────────────────────────────────┐
│ HeroSection — greeting, portfolio value, market status,      │
│               quick actions (col-span-12)                    │
├──────────────────────────────────────────────────────────────┤
Row 2 (KPI cards):
│ KPI[1] │ KPI[2] │ KPI[3] │ KPI[4] │ KPI[5] │ KPI[6]       │
│ (2)    │ (2)    │ (2)    │ (2)    │ (2)    │ (2)           │
├──────────────────────────────────────────────────────────────┤
Row 3 (Market Indices):
│ Index cards: col-span-12, 5 per row on lg, 3 on md, 2 on sm│
├──────────────────────────────────────────────────────────────┤
Row 4:
│ Chart (col-span-8)          │ Watchlist (col-span-4)         │
├──────────────────────────────────────────────────────────────┤
Row 5:
│ Heatmap (col-span-6)        │ News (col-span-6)              │
├──────────────────────────────────────────────────────────────┤
Row 6:
│ AI Predictions (col-span-6) │ Portfolio (col-span-6)         │
└──────────────────────────────────────────────────────────────┘
```

**Responsive:**
- `xl+`: Full 12-column grid + Right Panel visible
- `lg`: 12-column grid, Right Panel hidden
- `md`: 6-column grid (cards stack 2-wide)
- `sm`: Single column, sidebar collapses to icon-only or off-canvas

### Stock Detail

```
Row 1: StockHeader — logo, price, change, key stats, action buttons
Row 2: Tabs — Overview | Charts | Financials | Indicators | Predictions | News | Analyst Ratings
Row 3: Tab content fills available space
```

### Predictions

```
Left (7 cols):   Confidence gauge, trend arrow, probability graph
Right (5 cols):  Target price, stop loss, take profit, risk meter, AI explanation, feature importance, model selector
Bottom:          Historical accuracy chart, comparison table
```

### Compare

```
Top: Symbol inputs (multi-select)
Row 1: Radar chart (6 cols) + Performance overlay (6 cols)
Row 2: Comparison table with sticky header, best-value highlighting
Bottom: AI recommendation card
```

### Screener

```
Left sidebar: Filter panel — market cap, P/E, sector, industry, dividend, volume, market, country, price range, 52w high/low, growth, margin, debt, ROE
Main: Results table with column sorting, row hover, pagination
```

### Portfolio

```
Row 1: Overview cards — Total Value, Today's P&L, Total Return, Risk Score
Row 2: Allocation pie (6 cols) + Performance chart (6 cols)
Row 3: Holdings table (12 cols)
Bottom: AI Suggestions, Dividend History
```

### News

```
Top: Large featured story card (12 cols)
Below: 3-column grid of story cards with image, headline, source, sentiment, time
Right sidebar: Filters — sentiment, source, date range
Infinite scroll
```

### Settings

```
Left nav: Profile | Security | Notifications | Theme | API Keys | Brokers | Preferences
Right content panel with form sections
```

---

## 6. Framer Motion Animation Spec

| Element | Trigger | Animation | Duration | Easing | Respect Reduced Motion? |
|---|---|---|---|---|---|
| Cards (mount) | Page enter | fade + y: 20→0 + scale: 0.98→1 | 400ms | easeOut | Yes (fade only) |
| Cards (hover) | hover | y: 0→-4, shadow: level 1→2 | 200ms | easeOut | No animation |
| Buttons (hover) | hover | scale: 1→1.02, glow | 150ms | easeOut | No animation |
| Sidebar items | hover | bg transition, icon subtle scale | 150ms | easeOut | No animation |
| Page transitions | route change | fade + y: 20→0 | 300ms | easeInOut | Yes (fade only) |
| Numbers | visibility | count-up from 0 | 800ms | easeOut | Yes (no animation) |
| Charts | mount | animate path length 0→1 | 600ms | easeInOut | Yes (instant) |
| Search bar | focus | width expand 1.0→1.1x | 200ms | easeOut | No animation |
| Modals | open | scale 0.95→1 + opacity 0→1 + backdrop fade | 250ms | spring | Yes (opacity only) |
| Tooltips | hover | opacity 0→1 + y: 4→0 | 150ms | easeOut | No animation |
| List items (stagger) | mount | fade + x: -10→0, stagger 50ms | 300ms | easeOut | Yes (fade only) |
| Skeleton | mount | shimmer opacity pulse | 1.5s loop | linear | Yes (static) |

**Implementation pattern:**
```tsx
// Page wrapper
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {/* content */}
</motion.div>

// Card with hover
<motion.div
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {/* card content */}
</motion.div>
```

**Reduced motion:** Use `useReducedMotion()` from Framer Motion:
```tsx
const shouldReduceMotion = useReducedMotion()
const variants = shouldReduceMotion
  ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
  : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
```

---

## 7. Recharts Styling Approach

### Global Theme Object

Create a shared Recharts theme in `lib/chart-theme.ts`:

```ts
export const chartTheme = {
  dark: true,
  colors: {
    primary: '#6366F1',
    success: '#22C55E',
    danger: '#EF4444',
    warning: '#F59E0B',
    grid: '#27272A',
    text: '#A1A1AA',
    tooltip: {
      bg: '#18181B',
      border: '#27272A',
      text: '#FAFAFA',
    },
  },
  tooltip: {
    contentStyle: {
      backgroundColor: '#18181B',
      border: '1px solid #27272A',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    },
    itemStyle: { color: '#FAFAFA' },
    labelStyle: { color: '#A1A1AA' },
  },
  cartesianGrid: {
    strokeDasharray: '3 3',
    stroke: '#27272A',
    vertical: false,
  },
  axis: {
    tick: { fill: '#A1A1AA', fontSize: 11 },
    line: { stroke: '#27272A' },
  },
}
```

### Wrapper Components

Create `components/charts/` wrappers that apply the theme:

- `Sparkline` — Tiny area chart for market indices
- `AreaChart` — Portfolio growth, historical prices
- `Candlestick` — OHLC chart (if implementing)
- `Gauge` — Probability meter for AI predictions
- `PieChart` — Sector allocation

**Pattern:**
```tsx
// components/charts/Sparkline.tsx
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

interface SparklineProps {
  data: { value: number }[]
  color?: string
  height?: number
}

export function Sparkline({ data, color = '#6366F1', height = 40 }: SparklineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#gradient-${color.replace('#', '')})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
```

---

## 8. Tailwind Utility Strategy

### Token-to-Utility Mapping

| CSS Variable | Tailwind Utility | Usage |
|---|---|---|
| `--color-background` | `bg-background` | Page background |
| `--color-card` | `bg-card` | Card surfaces |
| `--color-secondary` | `bg-secondary` | Secondary fills |
| `--color-border` | `border-border` | Borders |
| `--color-primary` | `text-primary`, `bg-primary`, `border-primary` | Brand elements |
| `--color-muted-foreground` | `text-muted-foreground` | Secondary text |
| `--color-success` | `text-success`, `bg-success/10` | Green states |
| `--color-danger` | `text-danger`, `bg-danger/10` | Red states |
| `--color-warning` | `text-warning`, `bg-warning/10` | Amber states |

### Rules

1. **No magic numbers** — Every value maps to a token or standard Tailwind scale.
2. **Use `@theme` for all custom tokens** — Never hardcode hex values in components.
3. **Opacity variants** — Use `/10`, `/20`, `/50` suffixes for backgrounds, `/5` for subtle fills.
4. **Spacing** — Use `p-6` (24px), `gap-6` (24px), `space-y-4` (16px) — never `p-[22px]`.
5. **Border radius** — Use `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-3xl` (24px).
6. **Shadows** — Use `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl` from the elevation scale.
7. **Gradients** — Use `bg-gradient-to-br from-X/10 to-Y/10` pattern — always with 10% opacity.
8. **Hover states** — Always include `transition-all duration-200`.

### Example Component Tokens

```tsx
// Good
<div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">

// Bad
<div className="bg-[#18181B] border border-[#27272A] rounded-[18px] p-[24px]">
```

### Typography Utilities

```tsx
<h1 className="text-[36px] font-bold text-foreground leading-[44px]">
<h2 className="text-[22px] font-semibold text-foreground">
<p className="text-sm text-muted-foreground">
<span className="text-xs font-medium text-success">
```

---

## 9. Implementation-Ready Code

See the following files for the complete implementation:

- `frontend/src/index.css` — Design tokens, animations, base styles
- `frontend/src/components/layout/AppLayout.tsx` — Shell layout
- `frontend/src/components/layout/Sidebar.tsx` — Premium sidebar
- `frontend/src/components/layout/Header.tsx` — Top navbar with search + live indices
- `frontend/src/components/layout/RightPanel.tsx` — Contextual right panel
- `frontend/src/pages/Dashboard.tsx` — Full dashboard with all sections
- `frontend/src/components/ui/button.tsx` — Updated button with new tokens
- `frontend/src/components/ui/card.tsx` — Updated card with new tokens
- `frontend/src/lib/chart-theme.ts` — Recharts shared theme
- `frontend/src/components/charts/Sparkline.tsx` — Reusable sparkline component
- `frontend/src/components/shared/Skeleton.tsx` — Skeleton loading state
- `frontend/src/components/shared/EmptyState.tsx` — Empty state component
- `frontend/src/components/shared/ErrorState.tsx` — Error state component
- `frontend/src/components/shared/Badge.tsx` — Premium badge component

---

## 10. Follow-Up Punch List

### Micro-Interactions

- [ ] **Sidebar collapse** — Animate width from 280px to 64px (icon-only mode) with smooth transition
- [ ] **Number count-up** — Animate metric values on mount using `useSpring` from Framer Motion
- [ ] **Search command palette** — Cmd+K opens floating search with recent searches, keyboard navigation
- [ ] **Notification dot pulse** — Subtle pulse animation on unread notification indicator
- [ ] **Chart hover crosshair** — Vertical line + tooltip following cursor on all charts
- [ ] **Row stagger** — Table rows animate in sequentially on page load
- [ ] **Skeleton shimmer** — Animated gradient shimmer for loading states
- [ ] **Button ripple** — Subtle click ripple effect on primary buttons
- [ ] **Sidebar active indicator** — Animated left border highlight on active nav item (not just glow dot)
- [ ] **Scroll progress** — Thin progress bar at top of content area showing scroll position

### Loading States

- [ ] **Skeleton components** for every card type — match exact layout dimensions
- [ ] **Skeleton dashboard** — 6 KPI skeleton cards in row, chart skeleton, watchlist skeleton rows
- [ ] **Skeleton table** — 5 rows with alternating column widths
- [ ] **Page transition shimmer** — Brief skeleton flash on route change (200ms min)

### Empty States

- [ ] **Watchlist empty** — Illustrated empty state with "Add your first stock" CTA
- [ ] **Portfolio empty** — "Create your first portfolio" with quick-start button
- [ ] **No search results** — "No stocks found" with suggestions
- [ ] **No news** — "No news available for this symbol"
- [ ] **No predictions** — "Select a stock to see AI predictions"
- [ ] **No alerts** — "No alerts configured. Create your first alert."
- [ ] **No transactions** — "No transactions yet. Start trading."

### Error States

- [ ] **API error banner** — Dismissible error banner with retry button, not raw error dump
- [ ] **Network offline** — Persistent banner "Connection lost. Reconnecting..."
- [ ] **Rate limited** — "Too many requests. Please wait..." with countdown
- [ ] **Session expired** — Modal with "Your session has expired. Please log in again."
- [ ] **Server error** — "Something went wrong. Our team has been notified." with retry
- [ ] **Not found (404)** — "This page doesn't exist." with link to dashboard
- [ ] **Forbidden (403)** — "You don't have access to this resource."

### Keyboard Shortcuts

- [ ] `k` — Open command palette
- [ ] `g + d` — Go to Dashboard
- [ ] `g + s` — Go to Stocks
- [ ] `g + p` — Go to Portfolio
- [ ] `g + w` — Go to Watchlist
- [ ] `g + n` — Go to News
- [ ] `g + ,` — Go to Settings
- [ ] `/` — Focus search bar
- [ ] `r` — Refresh current page data
- [ ] `Esc` — Close modal / command palette
- [ ] `?` — Show keyboard shortcuts help modal

### Accessibility

- [ ] All interactive elements have visible focus rings (`focus-visible:ring-2`)
- [ ] All icons have `aria-hidden` or `aria-label`
- [ ] Color combinations pass WCAG AA contrast
- [ ] All form inputs have associated labels
- [ ] Loading states announced by screen readers (`aria-live="polite"`)
- [ ] Reduced motion respected via `prefers-reduced-motion` media query
- [ ] Keyboard navigation follows logical tab order
- [ ] Skip-to-content link for keyboard users

### Polish

- [ ] Add subtle noise texture overlay to hero section background
- [ ] Card hover effect: subtle border color shift + y-offset + shadow increase
- [ ] Gradient border on primary cards (uses `border-image` or pseudo-element)
- [ ] Avatar initials with consistent color assignment based on username hash
- [ ] Status dots with breathing animation for live indicators
- [ ] Time-relative formatting ("2m ago", "3h ago", "Yesterday")
- [ ] Abbreviated large numbers ("$1.2B" not "$1,200,000,000")
- [ ] Smooth tab transitions with indicator animation
- [ ] Animated progress bars for loading states
- [ ] Toast notifications for actions (added to watchlist, alert created, etc.)
- [ ] Confetti animation on portfolio milestone achievements

---

*End of redesign specification.*
