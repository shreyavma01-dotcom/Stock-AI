import { useEffect, useState, useRef } from 'react'

export function useCountUp(end: number, duration = 800, enabled = true) {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setValue(end)
      return
    }

    startTime.current = null

    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      setValue(end * progress)

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    raf.current = requestAnimationFrame(animate)

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [end, duration, enabled])

  return value
}

export function formatCountUp(value: number, prefix = '$', decimals = 2) {
  if (value >= 1e12) return `${prefix}${(value / 1e12).toFixed(decimals)}T`
  if (value >= 1e9) return `${prefix}${(value / 1e9).toFixed(decimals)}B`
  if (value >= 1e6) return `${prefix}${(value / 1e6).toFixed(decimals)}M`
  if (value >= 1e3) return `${prefix}${(value / 1e3).toFixed(decimals)}K`
  return `${prefix}${value.toFixed(decimals)}`
}
