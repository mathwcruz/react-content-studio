import { EmptyState } from '@/components/empty-state'
import { StatusBadge } from '@/components/status-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

export function ComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
          Design system
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Componentes
        </h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Botões e formulários</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button>Publicar</Button>
              <Button variant="outline">Salvar</Button>
              <Button variant="ghost">Cancelar</Button>
            </div>
            <Input placeholder="Título do conteúdo" />
            <Textarea placeholder="Resumo editorial" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status e métricas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="draft" />
              <StatusBadge status="review" />
              <StatusBadge status="published" />
              <Badge variant="outline">Checkpoint</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-studio-border p-3">
                <p className="text-xs text-studio-muted">Leituras</p>
                <p className="text-2xl font-semibold">12,4k</p>
              </div>
              <div className="rounded-xl border border-studio-border p-3">
                <p className="text-xs text-studio-muted">Conclusão</p>
                <p className="text-2xl font-semibold">84%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carregamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
            <div className="rounded-xl border border-studio-border bg-studio-accent p-3 text-sm text-studio-accent-fg">
              Alterações salvas localmente.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <h3 className="font-medium">React 19: Actions na prática</h3>
            <p className="text-sm text-studio-muted">
              Atualizado há poucos minutos por Ana Creator
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="review" />
            <Button variant="outline" size="sm">
              Abrir
            </Button>
          </div>
        </CardContent>
      </Card>

      <EmptyState
        title="Nada selecionado"
        description="Use este estado quando filtros ou feedback não trouxerem resultados."
        action={<Button variant="outline">Limpar filtros</Button>}
      />
    </div>
  )
}
