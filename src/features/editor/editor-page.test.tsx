import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AppRoutes } from '../../app/router'

it('renders the editor for a seeded content', async () => {
  localStorage.clear()
  render(
    <MemoryRouter initialEntries={['/contents/react-actions/edit']}>
      <AppRoutes />
    </MemoryRouter>
  )

  expect(await screen.findByLabelText('Título')).toBeInTheDocument()
  expect(
    await screen.findByRole('button', { name: /salvar/i })
  ).toBeInTheDocument()
  expect(screen.getByTestId('editor-form-feedback')).toBeInTheDocument()
  expect(screen.queryByText(/autosave/i)).not.toBeInTheDocument()
})
