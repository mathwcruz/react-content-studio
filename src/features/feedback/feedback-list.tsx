import { useOptimistic } from 'react'
import type { Comment } from '../../api/schemas'
import { StatusBadge } from '../../components/status-badge'
import { Card, CardContent } from '../../components/ui/card'
import { formatRelativeDate } from '../../lib/date'
import { FeedbackActions } from './feedback-actions'

type FeedbackListProps = {
  comments: Comment[]
  onChange: (comment: Comment) => void
}

export function FeedbackList({ comments, onChange }: FeedbackListProps) {
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    Comment[],
    Comment
  >(comments, (currentComments, updatedComment) => {
    return currentComments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    )
  })

  function handleOptimisticUpdate(comment: Comment) {
    addOptimisticComment(comment)
  }

  return (
    <Card className="border-studio-border bg-studio-card/90">
      <CardContent className="p-0">
        {optimisticComments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col gap-4 border-b border-studio-border p-4 last:border-b-0 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{comment.authorName}</p>
                <StatusBadge status={comment.status} />
              </div>
              <p className="mt-2 text-sm text-studio-muted">{comment.body}</p>
              <p className="mt-2 font-mono text-xs text-studio-muted">
                Conteúdo: {comment.contentId} ·{' '}
                {formatRelativeDate(comment.createdAt)}
              </p>
            </div>
            <FeedbackActions
              comment={comment}
              onChange={onChange}
              onOptimisticUpdate={handleOptimisticUpdate}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
