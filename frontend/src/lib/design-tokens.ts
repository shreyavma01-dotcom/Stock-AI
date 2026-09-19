export const colors = {
  background: '#09090B',
  sidebar: '#111827',
  sidebarHover: '#1F2937',
  card: '#18181B',
  cardForeground: '#FAFAFA',
  border: '#27272A',
  primary: '#6366F1',
  foreground: '#FAFAFA',
  secondary: '#27272A',
  secondaryForeground: '#FAFAFA',
  muted: '#27272A',
  mutedForeground: '#A1A1AA',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#60A5FA',
  purple: '#8B5CF6',
  emerald: '#10B981',
} as const;

export const typeScale = {
  display: '36px',
  h1: '28px',
  h2: '22px',
  h3: '18px',
  body: '16px',
  bodySmall: '14px',
  caption: '12px',
  micro: '10px',
} as const;

export const spacing = {
  xxs: '8px',
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  xxl: '64px',
} as const;

export const radius = {
  inner: '10px',
  card: '18px',
  pill: '9999px',
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(0,0,0,0.3)',
  md: '0 4px 12px rgba(0,0,0,0.4)',
  lg: '0 8px 24px rgba(0,0,0,0.5)',
  xl: '0 16px 48px rgba(0,0,0,0.6)',
} as const;
