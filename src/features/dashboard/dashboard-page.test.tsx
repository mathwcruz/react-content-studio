import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { DashboardPage } from './dashboard-page'

it('renders editorial overview without the full library search', async () => {
  localStorage.clear()
  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>
  )
  expect(await screen.findByText('Visão geral')).toBeInTheDocument()
  expect(await screen.findByText('Prioridades')).toBeInTheDocument()
  expect(screen.getAllByRole('button', { name: /biblioteca/i })).toHaveLength(1)
  expect(
    screen.queryByPlaceholderText('Buscar por titulo, resumo ou tag')
  ).not.toBeInTheDocument()
})
