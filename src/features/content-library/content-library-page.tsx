import { useDeferredValue, useEffect, useMemo, useState } from 'react'

import { contentService } from '@/api/content-service'
import type { Content, ContentStatus } from '@/api/schemas'
import { EmptyState } from '@/components/empty-state'
import { ErrorState } from '@/components/error-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ContentFilters } from '../dashboard/content-filters'
import { ContentList } from '../dashboard/content-list'

export function ContentLibraryPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ContentStatus | 'all'>('all')

  const deferredSearch = useDeferredValue(search, '')
  const isSearchStale = deferredSearch !== search

  useEffect(() => {
    let isMounted = true

    loadContents()

    return () => {
      isMounted = false
    }

    async function loadContents() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await contentService.getContents()

        if (!isMounted) return

        setContents(data)
      } catch (cause) {
        if (!isMounted) return

        setError(
          cause instanceof Error
            ? cause.message
            : 'Não foi possível carregar os conteúdos.'
        )
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
  }, [])

  function handleRetry() {
    setIsLoading(true)
    setError(null)
    contentService
      .getContents()
      .then(setContents)
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : 'Não foi possível carregar os conteúdos.'
        )
      )
      .finally(() => setIsLoading(false))
  }

  const filteredContents = useMemo(() => {
    return contents.filter((content) => {
      const matchesStatus = status === 'all' || content.status === status
      const haystack =
        `${content.title} ${content.description} ${content.tags.join(' ')}`.toLowerCase()

      return matchesStatus && haystack.includes(deferredSearch.toLowerCase())
    })
  }, [contents, deferredSearch, status])

  const publishedCount = contents.filter(
    (content) => content.status === 'published'
  ).length

  const reviewCount = contents.filter(
    (content) => content.status === 'review'
  ).length

  async function handleCreateDraft() {
    const draft = await contentService.createContent()

    setContents((current) => [draft, ...current])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
            Biblioteca
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Conteúdos
          </h2>
        </div>
        <Button type="button" onClick={handleCreateDraft}>
          Nova pauta
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <SummaryCard label="Total" value={contents.length} />
        <SummaryCard label="Em revisão" value={reviewCount} />
        <SummaryCard label="Publicados" value={publishedCount} />
      </div>

      <ContentFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : filteredContents.length > 0 ? (
        <div className={isSearchStale ? 'pointer-events-none opacity-60' : ''}>
          <ContentList contents={filteredContents} />
        </div>
      ) : (
        <EmptyState
          title="Nenhum conteúdo encontrado"
          description="Ajuste os filtros para voltar a ver a biblioteca."
        />
      )}
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <>
      <title>Content Studio - Biblioteca</title>

      <Card className="border-studio-border bg-studio-card/85">
        <CardContent className="p-4">
          <p className="text-sm text-studio-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </CardContent>
      </Card>
    </>
  )
}
