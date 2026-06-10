import { useState } from 'react'
import { commentService } from '../../api/comments-service'
import type { Comment } from '../../api/schemas'
import { Button } from '../../components/ui/button'

type FeedbackActionsProps = {
  comment: Comment
  onChange: (comment: Comment) => void
}

export function FeedbackActions({ comment, onChange }: FeedbackActionsProps) {
  const [pendingAction, setPendingAction] = useState<
    'resolve' | 'archive' | null
  >(null)
  const [error, setError] = useState<string | null>(null)

  async function runAction(action: 'resolve' | 'archive') {
    setPendingAction(action)
    setError(null)
    try {
      const next =
        action === 'resolve'
          ? await commentService.resolveComment(comment.id)
          : await commentService.archiveComment(comment.id)
      onChange(next)
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'Não foi possível moderar.'
      )
    } finally {
      setPendingAction(null)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => runAction('resolve')}
          disabled={pendingAction !== null || comment.status === 'resolved'}
        >
          {pendingAction === 'resolve' ? 'Resolvendo...' : 'Resolver'}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => runAction('archive')}
          disabled={pendingAction !== null || comment.status === 'archived'}
        >
          {pendingAction === 'archive' ? 'Arquivando...' : 'Arquivar'}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
