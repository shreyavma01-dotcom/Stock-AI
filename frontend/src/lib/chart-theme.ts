export const chartTheme = {
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
    tickLine: { stroke: '#27272A' },
  },
}
