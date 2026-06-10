import { useState, useTransition } from 'react'
import { commentService } from '../../api/comments-service'
import type { Comment } from '../../api/schemas'
import { Button } from '../../components/ui/button'
import { cn } from '@/lib/cn'

type FeedbackActionsProps = {
  comment: Comment
  onChange: (comment: Comment) => void
  onOptimisticUpdate: (comment: Comment) => void
}

export function FeedbackActions({
  comment,
  onChange,
  onOptimisticUpdate,
}: FeedbackActionsProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  console.log(
    isPending
      ? `${comment.authorName} - Pendente`
      : `${comment.authorName} - Pronto`
  )

  async function runAction(action: 'resolve' | 'archive') {
    setError(null)

    startTransition(async () => {
      onOptimisticUpdate({
        ...comment,
        status: action === 'resolve' ? 'resolved' : 'archived',
      })

      try {
        const next =
          action === 'resolve'
            ? await commentService.resolveComment(comment.id)
            : await commentService.archiveComment(comment.id)

        startTransition(() => {
          onChange(next)
        })
      } catch (cause) {
        onOptimisticUpdate(comment)
        startTransition(() => {
          setError(
            cause instanceof Error ? cause.message : 'Não foi possível moderar.'
          )
        })
      }
    })
  }

  return (
    <div className={cn('space-y-2', comment.status !== 'open' && 'hidden')}>
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => runAction('resolve')}>
          Resolver
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => runAction('archive')}
        >
          Arquivar
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
