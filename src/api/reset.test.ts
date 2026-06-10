import { describe, expect, it } from 'vitest'
import { contentService } from './content-service'
import { mockDb } from './mock-db'

describe('reset data', () => {
  it('restores seed after mutation', async () => {
    localStorage.clear()
    const [content] = await contentService.getContents()

    await contentService.updateContent({
      id: content.id,
      title: 'Mutacao local',
      description: content.description,
      body: content.body,
      status: content.status,
      tags: content.tags,
    })

    mockDb.reset()

    await expect(contentService.getContent(content.id)).resolves.toMatchObject({
      title: 'React 19: Actions na prática',
    })
  })
})
