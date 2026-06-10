import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { commentService } from './comments-service'
import { contentService } from './content-service'
import { mockDb } from './mock-db'

describe('mock api', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('loads seeded contents', async () => {
    const promise = contentService.getContents()
    await vi.runAllTimersAsync()
    const contents = await promise
    expect(contents.length).toBeGreaterThan(0)
  })

  it('persists updated content', async () => {
    const contentsPromise = contentService.getContents()
    await vi.runAllTimersAsync()
    const [content] = await contentsPromise

    const updatePromise = contentService.updateContent({
      id: content.id,
      title: 'Título atualizado',
      description: content.description,
      body: content.body,
      status: content.status,
      tags: content.tags,
    })
    await vi.runAllTimersAsync()
    await updatePromise

    const reloadedPromise = contentService.getContent(content.id)
    await vi.runAllTimersAsync()
    await expect(reloadedPromise).resolves.toMatchObject({
      title: 'Título atualizado',
    })
  })

  it('resets data to seed', async () => {
    mockDb.reset()
    const contentsPromise = contentService.getContents()
    await vi.runAllTimersAsync()
    await expect(contentsPromise).resolves.toHaveLength(5)
  })

  it('creates a comment', async () => {
    const contentsPromise = contentService.getContents()
    await vi.runAllTimersAsync()
    const [content] = await contentsPromise

    const createPromise = commentService.createComment({
      contentId: content.id,
      authorName: 'Aluno Teste',
      body: 'Comentário de teste',
    })
    await vi.runAllTimersAsync()
    const comment = await createPromise
    expect(comment.status).toBe('open')
  })
})
