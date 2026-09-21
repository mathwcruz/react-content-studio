import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

export function ContentSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Salvando...' : 'Salvar'}
    </Button>
  )
}
