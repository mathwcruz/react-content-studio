import { useState, useTransition } from 'react'

import { cn } from '@/lib/cn'
import { commentService } from '@/api/comments-service'
import type { Comment } from '@/api/schemas'
import { Button } from '@/components/ui/button'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition()

  const [error, setError] = useState<string | null>(null)

  function runAction(action: 'resolve' | 'archive') {
    setError(null)

    startTransition(async () => {
      onOptimisticUpdate({
        ...comment,
        status: action === 'resolve' ? 'resolved' : 'archived',
      })

      try {
        const nextComment =
          action === 'resolve'
            ? await commentService.resolveComment(comment.id)
            : await commentService.archiveComment(comment.id)

        startTransition(() => {
          onChange(nextComment)
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
    <div className={cn('"space-y-2"', comment.status !== 'open' && 'hidden')}>
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
