import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral'
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider',
        {
          'bg-emerald-500/10 text-emerald-400': variant === 'success',
          'bg-red-500/10 text-red-400': variant === 'danger',
          'bg-amber-500/10 text-amber-400': variant === 'warning',
          'bg-blue-500/10 text-blue-400': variant === 'info',
          'bg-secondary text-zinc-400': variant === 'neutral',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
