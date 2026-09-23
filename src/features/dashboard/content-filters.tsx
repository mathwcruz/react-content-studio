import type { ContentStatus } from '@/api/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const statusOptions: Array<{ label: string; value: ContentStatus | 'all' }> = [
  { label: 'Todos', value: 'all' },
  { label: 'Rascunho', value: 'draft' },
  { label: 'Revisão', value: 'review' },
  { label: 'Publicado', value: 'published' },
]

type ContentFiltersProps = {
  search: string
  status: ContentStatus | 'all'
  onSearchChange: (value: string) => void
  onStatusChange: (value: ContentStatus | 'all') => void
}

export function ContentFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ContentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-studio-border bg-studio-card p-3 sm:flex-row sm:items-center sm:justify-between">
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por título, resumo ou tag"
        className="sm:max-w-sm"
      />
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant={status === option.value ? 'default' : 'outline'}
            onClick={() => onStatusChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
