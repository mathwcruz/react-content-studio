import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

type ErrorStateProps = {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="border-destructive/25 bg-destructive/5">
      <CardContent className="flex h-full flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex h-full items-center gap-3 text-sm text-destructive">
          <AlertTriangle className="size-4" />
          <span>{message}</span>
        </div>
        {onRetry && (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
