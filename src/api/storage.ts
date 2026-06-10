import { mockDbStateSchema, type MockDbState } from './schemas'

const STORAGE_KEY = 'content-studio:mock-db'

export function readStorage() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  return mockDbStateSchema.parse(JSON.parse(raw))
}

export function writeStorage(state: MockDbState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY)
}
