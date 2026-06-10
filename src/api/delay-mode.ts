const REQUEST_DELAY_KEY = 'content-studio:request-delay'
const REQUEST_DELAYS = [0, 500, 1000, 2000] as const
const DEFAULT_REQUEST_DELAY = 500

export type RequestDelay = (typeof REQUEST_DELAYS)[number]

export function getRequestDelay() {
  const rawDelay = localStorage.getItem(REQUEST_DELAY_KEY)
  if (!rawDelay) return DEFAULT_REQUEST_DELAY

  const stored = Number(rawDelay)
  return isRequestDelay(stored) ? stored : DEFAULT_REQUEST_DELAY
}

export function setRequestDelay(delay: number) {
  if (!isRequestDelay(delay)) {
    localStorage.setItem(REQUEST_DELAY_KEY, String(DEFAULT_REQUEST_DELAY))
    return DEFAULT_REQUEST_DELAY
  }

  localStorage.setItem(REQUEST_DELAY_KEY, String(delay))
  return delay
}

export function cycleRequestDelay() {
  const currentDelay = getRequestDelay()
  const currentIndex = REQUEST_DELAYS.indexOf(currentDelay)
  const nextDelay = REQUEST_DELAYS[(currentIndex + 1) % REQUEST_DELAYS.length]
  return setRequestDelay(nextDelay)
}

export function formatRequestDelay(delay: number) {
  if (delay === 0) return '0s'
  if (delay === 1000) return '1s'
  if (delay === 2000) return '2s'
  return `${delay}ms`
}

function isRequestDelay(value: number): value is RequestDelay {
  return REQUEST_DELAYS.includes(value as RequestDelay)
}
