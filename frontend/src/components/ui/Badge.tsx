import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center px-[10px] py-[4px] rounded-lg text-[11px] font-bold tracking-[0.03em] transition-colors duration-200',
  {
    variants: {
      variant: {
        success: 'bg-emerald-500/10 text-emerald-400',
        danger: 'bg-red-500/10 text-red-400',
        warning: 'bg-amber-500/10 text-amber-400',
        info: 'bg-blue-500/10 text-blue-400',
        neutral: 'bg-secondary text-zinc-400',
        buy: 'bg-emerald-500/10 text-emerald-400',
        sell: 'bg-red-500/10 text-red-400',
        hold: 'bg-amber-500/10 text-amber-400',
        high: 'bg-red-500/10 text-red-400',
        medium: 'bg-amber-500/10 text-amber-400',
        low: 'bg-blue-500/10 text-blue-400',
        premium: 'bg-indigo-500/10 text-indigo-400',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'neutral', className, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}

export function StatusDot({ up = true }: { up: boolean }) {
  return (
    <span
      className={cn('inline-block w-2 h-2 rounded-full', {
        'bg-emerald-400': up,
        'bg-red-400': !up,
      })}
    />
  )
}
