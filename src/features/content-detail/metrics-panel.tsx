import { use } from 'react'

import { metricsService } from '@/api/metrics-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCompactNumber, formatPercentage } from '@/lib/format'

const cachedMetricsPromises = new Map<
  string,
  ReturnType<typeof metricsService.getMetrics>
>()

function getMetrics(contentId: string) {
  const cached = cachedMetricsPromises.get(contentId)
  if (cached) return cached

  const promise = metricsService.getMetrics(contentId)
  cachedMetricsPromises.set(contentId, promise)

  return promise
}

export function MetricsPanel({ contentId }: { contentId: string }) {
  const metrics = use(getMetrics(contentId))

  return (
    <Card className="border-studio-border bg-studio-card/85">
      <CardHeader>
        <CardTitle>Métricas</CardTitle>
      </CardHeader>

      <CardContent>
        {!metrics ? (
          <p className="rounded-xl border border-dashed border-studio-border p-4 text-sm text-studio-muted">
            Sem métricas disponíveis para este conteúdo.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric
              label="Leituras"
              value={formatCompactNumber(metrics.views)}
            />

            <Metric
              label="Conclusão"
              value={formatPercentage(metrics.completionRate)}
            />

            <Metric label="Feedbacks" value={String(metrics.feedbackCount)} />

            <Metric
              label="Tempo médio"
              value={`${metrics.averageReadTime} min`}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-studio-border p-3">
      <p className="text-xs text-studio-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  )
}
