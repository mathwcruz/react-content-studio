import { useEffect, useState } from 'react'
import { commentService } from '@/api/comments-service'
import type { Comment } from '@/api/schemas'
import { StatusBadge } from '@/components/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatRelativeDate } from '@/lib/date'

export function CommentsPanel({ contentId }: { contentId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    commentService.getComments(contentId).then((data) => {
      if (!isMounted) return
      setComments(data)
      setIsLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [contentId])

  return (
    <Card className="border-studio-border bg-studio-card/85">
      <CardHeader>
        <CardTitle>Comentários</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : comments.length === 0 ? (
          <p className="rounded-xl border border-dashed border-studio-border p-4 text-sm text-studio-muted">
            Nenhum comentário ainda.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-studio-border p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{comment.authorName}</p>
                <StatusBadge status={comment.status} />
              </div>
              <p className="mt-2 text-sm text-studio-muted">{comment.body}</p>
              <p className="mt-2 font-mono text-xs text-studio-muted">
                {formatRelativeDate(comment.createdAt)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
