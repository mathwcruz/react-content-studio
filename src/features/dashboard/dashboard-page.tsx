import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'

import { contentService } from '@/api/content-service'
import { commentService } from '@/api/comments-service'
import type { Comment, Content } from '@/api/schemas'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ErrorState } from '@/components/error-state'
import { Skeleton } from '@/components/ui/skeleton'
import { ContentList } from './content-list'

export function DashboardPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    loadDashboard()

    return () => {
      isMounted = false
    }

    async function loadDashboard() {
      setIsLoading(true)
      setError(null)

      try {
        const [contentData, commentData] = await Promise.all([
          contentService.getContents(),
          commentService.getComments(),
        ])

        if (!isMounted) return

        setContents(contentData)
        setComments(commentData)
      } catch (cause) {
        if (!isMounted) return

        setError(
          cause instanceof Error
            ? cause.message
            : 'Não foi possível carregar o dashboard.'
        )
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
  }, [])

  function handleRetry() {
    setIsLoading(true)
    setError(null)

    Promise.all([contentService.getContents(), commentService.getComments()])
      .then(([contentData, commentData]) => {
        setContents(contentData)
        setComments(commentData)
      })
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : 'Não foi possível carregar o dashboard.'
        )
      )
      .finally(() => setIsLoading(false))
  }

  const priorityContents = useMemo(() => {
    return contents
      .filter(
        (content) => content.status === 'review' || content.status === 'draft'
      )
      .slice(0, 3)
  }, [contents])

  const publishedCount = contents.filter(
    (content) => content.status === 'published'
  ).length

  const reviewCount = contents.filter(
    (content) => content.status === 'review'
  ).length

  const draftCount = contents.filter(
    (content) => content.status === 'draft'
  ).length

  const openFeedbackCount = comments.filter(
    (comment) => comment.status === 'open'
  ).length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
            Dashboard
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Visão geral
          </h2>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <SummaryCard label="Em revisão" value={reviewCount} />
        <SummaryCard label="Feedbacks abertos" value={openFeedbackCount} />
        <SummaryCard label="Rascunhos" value={draftCount} />
        <SummaryCard label="Publicados" value={publishedCount} />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : priorityContents.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Prioridades</h3>

            <Button
              render={<Link to="/contents" />}
              nativeButton={false}
              variant="outline"
              size="sm"
            >
              Abrir biblioteca
            </Button>
          </div>

          <ContentList contents={priorityContents} />
        </section>
      ) : (
        <Card className="border-studio-border bg-studio-card/85">
          <CardContent className="p-4 text-sm text-studio-muted">
            Nenhuma prioridade editorial no momento.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <>
      <title>Content Studio - Dashboard</title>

      <Card className="border-studio-border bg-studio-card/85">
        <CardContent className="p-4">
          <p className="text-sm text-studio-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </CardContent>
      </Card>
    </>
  )
}
