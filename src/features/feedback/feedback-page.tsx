import { useEffect, useMemo, useState } from 'react'

import { commentService } from '../../api/comments-service'
import type { Comment, CommentStatus } from '../../api/schemas'
import { Button } from '../../components/ui/button'
import { ErrorState } from '../../components/error-state'
import { Skeleton } from '../../components/ui/skeleton'
import { FeedbackList } from './feedback-list'

export function FeedbackPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<CommentStatus | 'all'>('all')

  useEffect(() => {
    let isMounted = true

    loadComments()

    return () => {
      isMounted = false
    }

    async function loadComments() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await commentService.getComments()

        if (!isMounted) return

        setComments(data)
      } catch (cause) {
        if (!isMounted) return

        setError(
          cause instanceof Error
            ? cause.message
            : 'Não foi possível carregar feedbacks.'
        )
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
  }, [])

  function handleRetry() {
    setIsLoading(true)
    setError(null)
    commentService
      .getComments()
      .then(setComments)
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : 'Não foi possível carregar feedbacks.'
        )
      )
      .finally(() => setIsLoading(false))
  }

  const filteredComments = useMemo(() => {
    return comments.filter(
      (comment) => status === 'all' || comment.status === status
    )
  }, [comments, status])

  function handleChange(next: Comment) {
    setComments((current) =>
      current.map((comment) => (comment.id === next.id ? next : comment))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
            Moderação
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Feedback
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {feedbackFilterOptions.map((option) => (
            <Button
              key={option}
              type="button"
              size="sm"
              variant={status === option ? 'default' : 'outline'}
              onClick={() => setStatus(option)}
            >
              {feedbackFilterLabels[option]}
            </Button>
          ))}
        </div>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <FeedbackList comments={filteredComments} onChange={handleChange} />
      )}
    </div>
  )
}

const feedbackFilterOptions = ['all', 'open', 'resolved', 'archived'] as const

const feedbackFilterLabels = {
  all: 'Todos',
  open: 'Abertos',
  resolved: 'Resolvidos',
  archived: 'Arquivados',
} as const
