import { delay, shouldFail } from './latency'
import { shouldSimulateFailure } from './failure-mode'
import { mockDb } from './mock-db'
import { metricsSchema } from './schemas'

export const metricsService = {
  async getMetrics(contentId: string, options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    const metrics = mockDb
      .getState()
      .metrics.find((item) => item.contentId === contentId)
    if (!metrics) return null
    return metricsSchema.parse(metrics)
  },
}
