import { Skeleton } from '@/components/ui/skeleton'
import { metricsService } from '../../api/metrics-service'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { formatCompactNumber, formatPercentage } from '../../lib/format'
import { useEffect, useState } from 'react'
import type { Metrics } from '@/api/schemas'

export function MetricsPanel({ contentId }: { contentId: string }) {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    metricsService.getMetrics(contentId).then((data) => {
      if (!isMounted) return
      setMetrics(data)
      setIsLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [contentId])

  return (
    <Card className="border-studio-border bg-studio-card/85">
      <CardHeader>
        <CardTitle>Métricas</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-28 w-full" />
        ) : !metrics ? (
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
