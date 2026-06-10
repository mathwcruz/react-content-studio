import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { AppHeader } from './app-header'

it('toggles API failure simulation from the header', async () => {
  const user = userEvent.setup()
  localStorage.clear()
  render(<AppHeader />)

  const toggle = screen.getByRole('button', { name: /simular erro/i })
  expect(toggle).toHaveAttribute('aria-pressed', 'false')

  await user.click(toggle)

  expect(toggle).toHaveAttribute('aria-pressed', 'true')
})

it('cycles request delay from the header', async () => {
  const user = userEvent.setup()
  localStorage.clear()
  render(<AppHeader />)

  const delayButton = screen.getByRole('button', { name: 'Delay: 500ms' })

  await user.click(delayButton)
  expect(delayButton).toHaveTextContent('Delay: 1s')

  await user.click(delayButton)
  expect(delayButton).toHaveTextContent('Delay: 2s')

  await user.click(delayButton)
  expect(delayButton).toHaveTextContent('Delay: 0s')
})
