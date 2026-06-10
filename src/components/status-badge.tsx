import { Badge } from './ui/badge'

const statusLabels = {
  draft: 'Rascunho',
  review: 'Revisão',
  published: 'Publicado',
  archived: 'Arquivado',
  open: 'Aberto',
  resolved: 'Resolvido',
} as const

const statusClassNames = {
  draft: 'bg-studio-accent text-studio-accent-fg',
  review: 'bg-amber-100 text-amber-800',
  published: 'bg-emerald-100 text-emerald-800',
  archived: 'bg-stone-100 text-stone-700',
  open: 'bg-orange-100 text-orange-800',
  resolved: 'bg-emerald-100 text-emerald-800',
} as const

type Status = keyof typeof statusLabels

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge className={statusClassNames[status]}>{statusLabels[status]}</Badge>
  )
}
