import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border transition-all duration-200',
          {
            'bg-card border-border shadow-sm': variant === 'default',
            'bg-card/80 backdrop-blur-xl border-border/50 shadow-xl': variant === 'glass',
            'bg-gradient-to-br from-indigo-600/5 via-purple-600/5 to-pink-600/5 border-indigo-500/10 shadow-xl': variant === 'gradient',
            'bg-card border-border/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5': variant === 'elevated',
          },
          className
        )}
        {...props}
      />
    )
  }
)
