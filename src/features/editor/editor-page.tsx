import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { contentService } from '../../api/content-service'
import type { Content } from '../../api/schemas'
import { Skeleton } from '../../components/ui/skeleton'
import { ContentForm } from './content-form'

export function EditorPage() {
  const { contentId } = useParams()
  const [content, setContent] = useState<Content | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!contentId) return
    let isMounted = true
    contentService.getContent(contentId).then((data) => {
      if (!isMounted) return
      setContent(data)
      setIsLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [contentId])

  if (isLoading) return <Skeleton className="h-96 w-full" />
  if (!content) return <p>Conteúdo não encontrado.</p>

  return (
    <>
      <title>Content Studio - Editor</title>

      <div className="space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
            Editor
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            {content.title}
          </h2>
        </div>
        <ContentForm key={content.id} content={content} onSave={setContent} />
      </div>
    </>
  )
}
