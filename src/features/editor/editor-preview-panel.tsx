import { useState } from 'react'
import type { Content } from '@/api/schemas'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type PreviewContent = Pick<Content, 'title' | 'description' | 'body' | 'tags'>

export function EditorPreviewPanel({ content }: { content: PreviewContent }) {
  const [updatedAt, setUpdatedAt] = useState(() =>
    new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  )
  const [previousContent, setPreviousContent] = useState<PreviewContent | null>(
    null
  )

  if (JSON.stringify(previousContent) !== JSON.stringify(content)) {
    setPreviousContent(content)
    setUpdatedAt(
      new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    )
  }

  return (
    <Card className="border-studio-border bg-studio-card/85">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>Atualizado em {updatedAt}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
            Conteúdo
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            {content.title || 'Sem título'}
          </h3>
          <p className="mt-2 text-sm text-studio-muted">
            {content.description || 'Sem resumo'}
          </p>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-7">
          {content.body || 'O corpo do conteúdo aparece aqui.'}
        </p>
        <p className="text-xs text-studio-muted">
          Tags: {content.tags.join(', ') || 'nenhuma'}
        </p>
      </CardContent>
    </Card>
  )
}
