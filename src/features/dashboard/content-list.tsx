import { Link } from 'react-router'
import type { Content } from '../../api/schemas'
import { StatusBadge } from '../../components/status-badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { formatRelativeDate } from '../../lib/date'

export function ContentList({ contents }: { contents: Content[] }) {
  return (
    <Card className="overflow-hidden border-studio-border bg-studio-card/90">
      <CardContent className="p-0">
        {contents.map((content) => (
          <div
            key={content.id}
            className="flex flex-col gap-3 border-b border-studio-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <Link
                to={`/contents/${content.id}`}
                className="font-medium tracking-tight hover:text-studio-primary"
              >
                {content.title}
              </Link>
              <p className="mt-1 line-clamp-1 text-sm text-studio-muted">
                {content.description}
              </p>
              <p className="mt-2 font-mono text-xs text-studio-muted">
                {formatRelativeDate(content.updatedAt)} ·{' '}
                {content.tags.join(', ')}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
              <StatusBadge status={content.status} />
              <Button
                render={<Link to={`/contents/${content.id}/edit`} />}
                nativeButton={false}
                variant="outline"
                size="sm"
              >
                Editar
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
