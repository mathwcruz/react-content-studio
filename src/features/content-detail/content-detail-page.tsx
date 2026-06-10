import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { contentService } from '../../api/content-service'
import type { Content } from '../../api/schemas'
import { Button } from '../../components/ui/button'
import { Skeleton } from '../../components/ui/skeleton'
import { CommentsPanel } from './comments-panel'
import { RichPreview } from './rich-preview'
import { ErrorBoundary, getErrorMessage } from 'react-error-boundary'
import { ErrorState } from '@/components/error-state'

const MetricsPanel = lazy(() =>
  import('./metrics-panel').then((module) => ({ default: module.MetricsPanel }))
)

export function ContentDetailPage() {
  const { contentId } = useParams()
  const [content, setContent] = useState<Content | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!contentId) return
    let isMounted = true
    contentService.getContent(contentId).then((data) => {
      if (!isMounted) return
      setContent(data)
      setIsLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [contentId])

  if (isLoading) return <Skeleton className="h-96 w-full" />
  if (!content) return <p>Conteúdo não encontrado.</p>

  return (
    <>
      <title>{`Content Studio - ${content.title}`}</title>

      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
              Detalhe
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Central editorial
            </h1>
          </div>
          <Button
            render={<Link to={`/contents/${content.id}/edit`} />}
            nativeButton={false}
            variant="outline"
          >
            Editar
          </Button>
        </div>

        <RichPreview content={content} />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)]">
          <CommentsPanel contentId={content.id} />

          <ErrorBoundary
            fallbackRender={({ error }) => (
              <ErrorState message={getErrorMessage(error)} />
            )}
          >
            <Suspense fallback={<Skeleton className="h-46 w-full" />}>
              <MetricsPanel contentId={content.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}
