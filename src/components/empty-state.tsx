import type { ReactNode } from 'react'
import { Card, CardContent } from './ui/card'

type EmptyStateProps = {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-studio-border bg-studio-card/70">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="max-w-md text-sm text-studio-muted">{description}</p>
        {action}
      </CardContent>
    </Card>
  )
}
