import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'avatar' | 'chart'
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-secondary/50 rounded-xl',
        {
          'h-4 w-full': variant === 'text',
          'h-full w-full': variant === 'card',
          'h-10 w-10 rounded-full': variant === 'avatar',
          'h-[200px] w-full': variant === 'chart',
        },
        className
      )}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className={`h-4 ${i % 2 === 0 ? 'w-24' : 'w-32'}`} />
            <Skeleton className={`h-3 ${i % 2 === 0 ? 'w-16' : 'w-20'}`} />
          </div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  )
}
