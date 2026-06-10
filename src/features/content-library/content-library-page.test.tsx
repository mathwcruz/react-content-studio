import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ContentLibraryPage } from './content-library-page'

it('renders seeded content list in the library', async () => {
  localStorage.clear()
  render(
    <MemoryRouter>
      <ContentLibraryPage />
    </MemoryRouter>
  )
  expect(
    await screen.findByText('React 19: Actions na prática')
  ).toBeInTheDocument()
})

it('creates a new draft when clicking Nova pauta', async () => {
  const user = userEvent.setup()
  localStorage.clear()
  render(
    <MemoryRouter>
      <ContentLibraryPage />
    </MemoryRouter>
  )

  await user.click(await screen.findByRole('button', { name: /nova pauta/i }))

  expect(await screen.findByText('Rascunho sem título')).toBeInTheDocument()
})

it('renders a retryable error when the library request fails', async () => {
  localStorage.clear()
  localStorage.setItem('content-studio:simulate-failure', 'true')

  render(
    <MemoryRouter>
      <ContentLibraryPage />
    </MemoryRouter>
  )

  expect(
    await screen.findByText('Operação simulada falhou. Tente novamente.')
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /tentar novamente/i })
  ).toBeInTheDocument()
})
