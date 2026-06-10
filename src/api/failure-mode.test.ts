import { describe, expect, it } from 'vitest'
import { contentService } from './content-service'
import {
  disableFailureMode,
  enableFailureMode,
  isFailureModeEnabled,
} from './failure-mode'

describe('failure mode', () => {
  it('toggles simulated API failures for services', async () => {
    localStorage.clear()
    expect(isFailureModeEnabled()).toBe(false)

    enableFailureMode()
    expect(isFailureModeEnabled()).toBe(true)
    await expect(contentService.getContents()).rejects.toThrow(
      'Operação simulada falhou'
    )

    disableFailureMode()
    await expect(contentService.getContents()).resolves.toBeInstanceOf(Array)
  })
})
