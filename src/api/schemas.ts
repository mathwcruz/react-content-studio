import { z } from 'zod'

export const contentStatusSchema = z.enum([
  'draft',
  'review',
  'published',
  'archived',
])
export const commentStatusSchema = z.enum(['open', 'resolved', 'archived'])

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatarUrl: z.string().optional(),
})

export const contentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  status: contentStatusSchema,
  tags: z.array(z.string()),
  authorId: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
})

export const commentSchema = z.object({
  id: z.string(),
  contentId: z.string(),
  authorName: z.string(),
  body: z.string(),
  status: commentStatusSchema,
  createdAt: z.string(),
})

export const metricsSchema = z.object({
  contentId: z.string(),
  views: z.number(),
  completionRate: z.number(),
  feedbackCount: z.number(),
  averageReadTime: z.number(),
})

export const mockDbStateSchema = z.object({
  users: z.array(userSchema),
  contents: z.array(contentSchema),
  comments: z.array(commentSchema),
  metrics: z.array(metricsSchema),
})

export const updateContentInputSchema = contentSchema.pick({
  id: true,
  title: true,
  description: true,
  body: true,
  status: true,
  tags: true,
})

export const createContentInputSchema = contentSchema
  .pick({
    title: true,
    description: true,
    body: true,
    tags: true,
  })
  .partial()

export const createCommentInputSchema = commentSchema.pick({
  contentId: true,
  authorName: true,
  body: true,
})

export type ContentStatus = z.infer<typeof contentStatusSchema>
export type CommentStatus = z.infer<typeof commentStatusSchema>
export type User = z.infer<typeof userSchema>
export type Content = z.infer<typeof contentSchema>
export type Comment = z.infer<typeof commentSchema>
export type Metrics = z.infer<typeof metricsSchema>
export type MockDbState = z.infer<typeof mockDbStateSchema>
export type UpdateContentInput = z.infer<typeof updateContentInputSchema>
export type CreateContentInput = z.infer<typeof createContentInputSchema>
export type CreateCommentInput = z.infer<typeof createCommentInputSchema>
