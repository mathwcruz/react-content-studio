import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { contentService } from '@/api/content-service'
import { AppRoutes } from '@/app/router'

it('renders detail for a seeded content', async () => {
  localStorage.clear()
  render(
    <MemoryRouter initialEntries={['/contents/react-actions']}>
      <AppRoutes />
    </MemoryRouter>
  )

  expect(
    await screen.findByText('React 19: Actions na prática')
  ).toBeInTheDocument()
  expect(await screen.findByText('Comentários')).toBeInTheDocument()
  expect(await screen.findByText('Métricas')).toBeInTheDocument()
})

it('renders empty states for a new draft without comments or metrics', async () => {
  localStorage.clear()
  const draft = await contentService.createContent()

  render(
    <MemoryRouter initialEntries={[`/contents/${draft.id}`]}>
      <AppRoutes />
    </MemoryRouter>
  )

  expect(await screen.findByText('Rascunho sem título')).toBeInTheDocument()
  expect(
    await screen.findByText('Nenhum comentário ainda.')
  ).toBeInTheDocument()
  expect(
    await screen.findByText('Sem métricas disponíveis para este conteúdo.')
  ).toBeInTheDocument()
})
