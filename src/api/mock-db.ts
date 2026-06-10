import { clearStorage, readStorage, writeStorage } from './storage'
import type { MockDbState } from './schemas'

const now = new Date('2026-05-20T12:00:00.000Z').toISOString()

export const seedState: MockDbState = {
  users: [{ id: 'ana', name: 'Ana Creator', role: 'Instrutora' }],
  contents: [
    {
      id: 'react-actions',
      title: 'React 19: Actions na prática',
      description: 'Refatore formulários para Actions com feedback de envio.',
      body: 'Actions simplificam fluxos de envio, validação e atualização de estado em formulários React.',
      status: 'review',
      tags: ['React 19', 'Actions'],
      authorId: 'ana',
      updatedAt: now,
    },
    {
      id: 'optimistic-ui',
      title: 'UI otimista para moderação',
      description: 'Aplique useOptimistic em ações de feedback.',
      body: 'Experiências otimistas deixam a interface responsiva mesmo antes da persistência terminar.',
      status: 'draft',
      tags: ['useOptimistic', 'UX'],
      authorId: 'ana',
      updatedAt: now,
    },
    {
      id: 'suspense-lazy-use',
      title: 'Suspense, lazy e use',
      description: 'Carregue painéis sob demanda com limites locais.',
      body: 'Suspense permite desenhar estados de carregamento como parte da árvore de componentes.',
      status: 'published',
      tags: ['Suspense', 'lazy'],
      authorId: 'ana',
      updatedAt: now,
      publishedAt: now,
    },
    {
      id: 'effect-event-autosave',
      title: 'Autosave com useEffectEvent',
      description: 'Separe sincronização reativa de eventos não reativos.',
      body: 'useEffectEvent ajuda a evitar dependências falsas sem esconder sincronizações reais.',
      status: 'draft',
      tags: ['useEffectEvent', 'Effects'],
      authorId: 'ana',
      updatedAt: now,
    },
    {
      id: 'activity-compiler',
      title: 'Activity e React Compiler',
      description: 'Preserve estado quando isso melhora a experiência.',
      body: 'Activity e Compiler pedem escolhas explícitas sobre preservação de estado e memoização.',
      status: 'archived',
      tags: ['Activity', 'Compiler'],
      authorId: 'ana',
      updatedAt: now,
    },
  ],
  comments: [
    {
      id: 'comment-1',
      contentId: 'react-actions',
      authorName: 'Aluno Teste',
      body: 'Onde entra a validação do formulário?',
      status: 'open',
      createdAt: now,
    },
    {
      id: 'comment-2',
      contentId: 'optimistic-ui',
      authorName: 'Marina Dev',
      body: 'Gostei do exemplo de rollback.',
      status: 'resolved',
      createdAt: now,
    },
  ],
  metrics: [
    {
      contentId: 'react-actions',
      views: 12400,
      completionRate: 0.84,
      feedbackCount: 12,
      averageReadTime: 9,
    },
    {
      contentId: 'optimistic-ui',
      views: 8600,
      completionRate: 0.78,
      feedbackCount: 8,
      averageReadTime: 7,
    },
    {
      contentId: 'suspense-lazy-use',
      views: 14300,
      completionRate: 0.81,
      feedbackCount: 15,
      averageReadTime: 11,
    },
    {
      contentId: 'effect-event-autosave',
      views: 5200,
      completionRate: 0.69,
      feedbackCount: 6,
      averageReadTime: 8,
    },
    {
      contentId: 'activity-compiler',
      views: 4100,
      completionRate: 0.64,
      feedbackCount: 4,
      averageReadTime: 10,
    },
  ],
}

function cloneState(state: MockDbState): MockDbState {
  return structuredClone(state)
}

export const mockDb = {
  getState() {
    const stored = readStorage()
    if (stored) return stored

    const seeded = cloneState(seedState)
    writeStorage(seeded)
    return seeded
  },
  setState(next: MockDbState) {
    writeStorage(next)
  },
  reset() {
    clearStorage()
    const seeded = cloneState(seedState)
    writeStorage(seeded)
    return seeded
  },
}
