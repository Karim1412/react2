/**
 * Format a number to a compact human-readable string.
 * e.g. 1_400_000 → "1.4M", 23_400 → "23.4K"
 */
export const fmt = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

/**
 * Express `value` as a percentage of `total`, fixed to one decimal.
 */
export const pct = (value: number, total: number): string =>
  `${((value / total) * 100).toFixed(1)}%`

/**
 * Clamp a number between min and max.
 */
export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max)

/**
 * Generate a random integer in [min, max].
 */
export const randInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Delay for `ms` milliseconds — useful in mock API calls.
 */
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))
