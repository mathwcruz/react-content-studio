import { describe, expect, it } from 'vitest'
import {
  cycleRequestDelay,
  getRequestDelay,
  setRequestDelay,
} from './delay-mode'

describe('delay mode', () => {
  it('cycles through the available request delays', () => {
    localStorage.clear()

    expect(getRequestDelay()).toBe(500)
    expect(cycleRequestDelay()).toBe(1000)
    expect(cycleRequestDelay()).toBe(2000)
    expect(cycleRequestDelay()).toBe(0)
    expect(cycleRequestDelay()).toBe(500)
  })

  it('stores only supported delay values', () => {
    localStorage.clear()

    setRequestDelay(2000)
    expect(getRequestDelay()).toBe(2000)

    setRequestDelay(123)
    expect(getRequestDelay()).toBe(500)
  })
})
