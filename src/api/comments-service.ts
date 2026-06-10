import { delay, shouldFail } from './latency'
import { shouldSimulateFailure } from './failure-mode'
import { mockDb } from './mock-db'
import {
  commentSchema,
  createCommentInputSchema,
  type CommentStatus,
  type CreateCommentInput,
} from './schemas'

function updateCommentStatus(id: string, status: CommentStatus) {
  const state = mockDb.getState()
  const nextComments = state.comments.map((comment) =>
    comment.id === id ? { ...comment, status } : comment
  )
  mockDb.setState({ ...state, comments: nextComments })
  const comment = nextComments.find((item) => item.id === id)
  if (!comment) throw new Error('Comentário não encontrado.')
  return commentSchema.parse(comment)
}

export const commentService = {
  async getComments(contentId?: string, options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    const comments = mockDb.getState().comments
    return comments
      .filter((comment) => !contentId || comment.contentId === contentId)
      .map((comment) => commentSchema.parse(comment))
  },

  async createComment(input: CreateCommentInput, options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    const parsed = createCommentInputSchema.parse(input)
    const state = mockDb.getState()
    const comment = commentSchema.parse({
      id: crypto.randomUUID(),
      ...parsed,
      status: 'open',
      createdAt: new Date().toISOString(),
    })
    mockDb.setState({ ...state, comments: [comment, ...state.comments] })
    return comment
  },

  async resolveComment(id: string, options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    return updateCommentStatus(id, 'resolved')
  },

  async archiveComment(id: string, options?: { fail?: boolean }) {
    await delay()
    shouldFail(shouldSimulateFailure(options?.fail))
    return updateCommentStatus(id, 'archived')
  },
}
