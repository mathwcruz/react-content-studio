import { render, screen } from '@testing-library/react'
import { FeedbackPage } from './feedback-page'

it('renders seeded feedback and moderation actions', async () => {
  localStorage.clear()
  render(<FeedbackPage />)

  expect(await screen.findByText('Feedback')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Abertos' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Resolvidos' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Arquivados' })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'open' })).not.toBeInTheDocument()
  expect(
    await screen.findByRole('button', { name: /resolver/i })
  ).toBeInTheDocument()
  expect(
    await screen.findByRole('button', { name: /arquivar/i })
  ).toBeInTheDocument()
})
