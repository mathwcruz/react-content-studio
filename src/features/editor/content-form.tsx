import {
  useActionState,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react'

import type { Content, ContentStatus } from '@/api/schemas'
import { contentService } from '@/api/content-service'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorPreviewPanel } from './editor-preview-panel'
import {
  clearLocalDraft,
  readLocalDraft,
  writeLocalDraft,
  type LocalDraft,
} from './local-draft'
import { ContentSubmitButton } from './content-submit-button'

type ContentFormProps = {
  content: Content
  onSave: (content: Content) => void
}

const statusOptions: { value: ContentStatus; label: string }[] = [
  { value: 'draft', label: 'Rascunho' },
  { value: 'review', label: 'Revisão' },
  { value: 'published', label: 'Publicado' },
  { value: 'archived', label: 'Arquivado' },
]

const layoutOptions = [
  { value: 'form', label: 'Só form' },
  { value: 'split', label: 'Dividido' },
  { value: 'preview', label: 'Só preview' },
] as const

function normalizeDraft(draft: Omit<LocalDraft, 'savedAt'>) {
  return JSON.stringify({
    title: draft.title.trim(),
    description: draft.description.trim(),
    body: draft.body.trim(),
    tags: draft.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .join(', '),
    status: draft.status,
  })
}

type ContentPublishState = {
  message: string | null
  error: string | null
}

export function ContentForm({ content, onSave }: ContentFormProps) {
  const [formState, formAction] = useActionState<ContentPublishState>(
    publishContentAction,
    {
      message: null,
      error: null,
    }
  )

  const [layoutMode, setLayoutMode] = useState<'form' | 'split' | 'preview'>(
    'split'
  )
  const [title, setTitle] = useState(content.title)
  const [description, setDescription] = useState(content.description)
  const [body, setBody] = useState(content.body)
  const [tags, setTags] = useState(content.tags.join(', '))
  const [status, setStatus] = useState<ContentStatus>(content.status)

  const originalDraftSnapshot = useMemo(
    () =>
      normalizeDraft({
        title: content.title,
        description: content.description,
        body: content.body,
        tags: content.tags.join(', '),
        status: content.status,
      }),
    [
      content.body,
      content.description,
      content.status,
      content.tags,
      content.title,
    ]
  )
  const [draftToRestore, setDraftToRestore] = useState<LocalDraft | null>(
    () => {
      const draft = readLocalDraft(content.id)

      if (!draft || normalizeDraft(draft) === originalDraftSnapshot) return null
      return draft
    }
  )
  const [savedAt, setSavedAt] = useState<string | null>(null)

  const draftValue = useMemo(
    () => ({ title, description, body, tags, status }),
    [title, description, body, tags, status]
  )

  const preview = {
    title,
    description,
    body,
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
  }

  const saveDraft = useEffectEvent(() => {
    const normalizedDraft = normalizeDraft(draftValue)

    if (normalizedDraft === originalDraftSnapshot) {
      if (!draftToRestore) {
        clearLocalDraft(content.id)
        setSavedAt(null)
      }
      return
    }

    const storedDraft = readLocalDraft(content.id)

    if (storedDraft && normalizeDraft(storedDraft) === normalizedDraft) {
      return
    }

    const draft = { ...draftValue, savedAt: new Date().toISOString() }

    writeLocalDraft(content.id, draft)
    setDraftToRestore(null)

    setSavedAt(
      new Date(draft.savedAt).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    )
  })

  useEffect(() => {
    const interval = window.setInterval(saveDraft, 3000)

    return () => window.clearInterval(interval)
  }, [content.id])

  function handleRestoreDraft() {
    if (!draftToRestore) return

    setTitle(draftToRestore.title)
    setDescription(draftToRestore.description)
    setBody(draftToRestore.body)
    setTags(draftToRestore.tags)
    setStatus(draftToRestore.status)
    setDraftToRestore(null)
  }

  function handleDiscardDraft() {
    clearLocalDraft(content.id)
    setDraftToRestore(null)
  }

  async function publishContentAction() {
    try {
      const updated = await contentService.updateContent({
        id: content.id,
        title,
        description,
        body,
        status,
        tags: preview.tags,
      })

      onSave(updated)

      return {
        message: 'Conteúdo salvo com sucesso.',
        error: null,
      }
    } catch (cause) {
      return {
        message: null,
        error:
          cause instanceof Error ? cause.message : 'Não foi possível salvar.',
      }
    }
  }

  return (
    <div className="space-y-4">
      <fieldset className="flex flex-wrap gap-2 rounded-2xl border border-studio-border bg-studio-card p-2">
        <legend className="sr-only">Modo de layout</legend>
        {layoutOptions.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-studio-muted has-checked:bg-studio-accent has-checked:text-studio-accent-fg"
          >
            <input
              type="radio"
              name="editor-layout"
              value={option.value}
              checked={layoutMode === option.value}
              onChange={() => setLayoutMode(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <div
        className={
          layoutMode === 'split'
            ? 'grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]'
            : 'grid gap-5'
        }
      >
        {(layoutMode === 'form' || layoutMode === 'split') && (
          <Card className="border-studio-border bg-studio-card/90">
            <CardHeader>
              <CardTitle>Editar conteúdo</CardTitle>
              <p className="font-mono text-xs text-studio-muted">
                {savedAt
                  ? `Rascunho salvo às ${savedAt}`
                  : 'Autosave local ativo'}
              </p>
            </CardHeader>

            <CardContent>
              {draftToRestore && (
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-studio-border bg-studio-accent p-3 text-sm text-studio-accent-fg">
                  <span>Há um rascunho local salvo para este conteúdo.</span>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleRestoreDraft}
                    >
                      Restaurar
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleDiscardDraft}
                    >
                      Descartar
                    </Button>
                  </div>
                </div>
              )}

              <form className="space-y-4" action={formAction}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Título</span>

                  <Input
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium">Resumo</span>

                  <Input
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium">Corpo</span>

                  <Textarea
                    name="body"
                    rows={10}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium">Tags</span>

                    <Input
                      name="tags"
                      value={tags}
                      onChange={(event) => setTags(event.target.value)}
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium">Status</span>

                    <Select
                      name="status"
                      value={status}
                      items={statusOptions}
                      onValueChange={(value) => {
                        if (value) setStatus(value)
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>

                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </label>
                </div>

                <div
                  data-testid="editor-form-feedback"
                  className="flex min-h-8 flex-wrap items-center justify-between gap-3 pt-1"
                >
                  <p className="text-sm" aria-live="polite">
                    {formState?.error && (
                      <span className="text-destructive">
                        {formState.error}
                      </span>
                    )}

                    {formState?.message && (
                      <span className="text-emerald-700">
                        {formState.message}
                      </span>
                    )}
                  </p>

                  <ContentSubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {(layoutMode === 'preview' || layoutMode === 'split') && (
          <EditorPreviewPanel content={preview} />
        )}
      </div>
    </div>
  )
}
