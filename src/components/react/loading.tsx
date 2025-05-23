import { useEffect, useState } from "react"

export function Loading() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    document.addEventListener("astro:before-swap", handleStart)
    document.addEventListener("astro:after-swap", handleStop)

    return () => {
      document.removeEventListener("astro:before-swap", handleStart)
      document.removeEventListener("astro:after-swap", handleStop)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="flex flex-col items-center">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <div className="absolute inset-4 animate-pulse rounded-full bg-primary/30"></div>
        </div>
        <p className="mt-4 animate-pulse text-sm font-medium text-gray-600 dark:text-gray-300">
          加载中...
        </p>
      </div>
    </div>
  )
} 