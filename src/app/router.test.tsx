import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AppRoutes } from './router'

it('renders the dashboard route', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>
  )
  expect(await screen.findByText('Visão geral')).toBeInTheDocument()
  expect(
    screen.queryByPlaceholderText('Buscar por título, resumo ou tag')
  ).not.toBeInTheDocument()
})

it('renders the content library route', async () => {
  render(
    <MemoryRouter initialEntries={['/contents']}>
      <AppRoutes />
    </MemoryRouter>
  )
  expect(await screen.findByText('Conteúdos')).toBeInTheDocument()
  expect(
    screen.getByPlaceholderText('Buscar por título, resumo ou tag')
  ).toBeInTheDocument()
})

it('marks only one sidebar item as current on dashboard', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>
  )

  await screen.findByText('Visão geral')
  const navigation = screen.getByRole('navigation')
  expect(
    within(navigation).getAllByRole('link', { current: 'page' })
  ).toHaveLength(1)
  expect(
    within(navigation).getByRole('link', { current: 'page' })
  ).toHaveTextContent('Dashboard')
})

it('renders the components preview route', async () => {
  render(
    <MemoryRouter initialEntries={['/components']}>
      <AppRoutes />
    </MemoryRouter>
  )
  expect(await screen.findByText('Componentes')).toBeInTheDocument()
})
