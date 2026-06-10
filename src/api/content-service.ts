import { delay, shouldFail } from './latency'
import { shouldSimulateFailure } from './failure-mode'
import { mockDb } from './mock-db'
import {
  contentSchema,
  createContentInputSchema,
  updateContentInputSchema,
  type CreateContentInput,
  type UpdateContentInput,
} from './schemas'

export const contentService = {
  async getContents(options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    return mockDb
      .getState()
      .contents.map((content) => contentSchema.parse(content))
  },

  async getContent(id: string, options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    const content = mockDb.getState().contents.find((item) => item.id === id)
    if (!content) throw new Error('Conteúdo não encontrado.')
    return contentSchema.parse(content)
  },

  async updateContent(input: UpdateContentInput, options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    const parsed = updateContentInputSchema.parse(input)
    const state = mockDb.getState()
    const nextContents = state.contents.map((content) =>
      content.id === parsed.id
        ? { ...content, ...parsed, updatedAt: new Date().toISOString() }
        : content
    )

    mockDb.setState({ ...state, contents: nextContents })
    return contentSchema.parse(
      nextContents.find((content) => content.id === parsed.id)
    )
  },

  async createContent(
    input: CreateContentInput = {},
    options?: { fail?: boolean }
  ) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    const parsed = createContentInputSchema.parse(input)
    const state = mockDb.getState()
    const content = contentSchema.parse({
      id: crypto.randomUUID(),
      title: parsed.title ?? 'Rascunho sem título',
      description: parsed.description ?? 'Descreva a promessa deste conteúdo.',
      body: parsed.body ?? 'Comece a escrever o conteúdo aqui.',
      status: 'draft',
      tags: parsed.tags ?? ['Rascunho'],
      authorId: 'ana',
      updatedAt: new Date().toISOString(),
    })

    mockDb.setState({ ...state, contents: [content, ...state.contents] })
    return content
  },
}
