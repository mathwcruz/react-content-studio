import { getRequestDelay } from './delay-mode'

export async function delay(ms = getRequestDelay()) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export function shouldFail(flag?: boolean) {
  if (flag) throw new Error('Operação simulada falhou. Tente novamente.')
}
