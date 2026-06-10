import type { ContentStatus } from '../../api/schemas'

export type LocalDraft = {
  title: string
  description: string
  body: string
  tags: string
  status: ContentStatus
  savedAt: string
}

export function getDraftKey(contentId: string) {
  return `content-studio:draft:${contentId}`
}

export function readLocalDraft(contentId: string) {
  const raw = localStorage.getItem(getDraftKey(contentId))
  if (!raw) return null
  try {
    return JSON.parse(raw) as LocalDraft
  } catch {
    localStorage.removeItem(getDraftKey(contentId))
    return null
  }
}

export function writeLocalDraft(contentId: string, draft: LocalDraft) {
  localStorage.setItem(getDraftKey(contentId), JSON.stringify(draft))
}

export function clearLocalDraft(contentId: string) {
  localStorage.removeItem(getDraftKey(contentId))
}
