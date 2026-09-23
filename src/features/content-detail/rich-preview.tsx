import type { Content } from '@/api/schemas'
import { StatusBadge } from '@/components/status-badge'
import { Card, CardContent } from '@/components/ui/card'

export function RichPreview({ content }: { content: Content }) {
  return (
    <Card className="border-studio-border bg-studio-card/90">
      <CardContent className="space-y-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
              Preview
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              {content.title}
            </h2>
            <p className="mt-3 max-w-2xl text-studio-muted">
              {content.description}
            </p>
          </div>
          <StatusBadge status={content.status} />
        </div>
        <article className="prose prose-stone max-w-none whitespace-pre-wrap text-sm leading-7">
          {content.body}
        </article>
      </CardContent>
    </Card>
  )
}
