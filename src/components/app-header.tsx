import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import {
  cycleRequestDelay,
  formatRequestDelay,
  getRequestDelay,
} from '../api/delay-mode'
import { isFailureModeEnabled, toggleFailureMode } from '../api/failure-mode'
import { mockDb } from '../api/mock-db'
import { Button } from './ui/button'

export function AppHeader() {
  const [isFailureEnabled, setIsFailureEnabled] = useState(isFailureModeEnabled)
  const [requestDelay, setRequestDelay] = useState(getRequestDelay)

  function handleReset() {
    mockDb.reset()
    window.location.assign('/')
  }

  function handleToggleFailure() {
    setIsFailureEnabled(toggleFailureMode())
  }

  function handleCycleDelay() {
    setRequestDelay(cycleRequestDelay())
  }

  return (
    <header className="sticky top-0 z-10 border-b border-studio-border bg-studio-bg/85 px-4 py-4 backdrop-blur sm:px-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-studio-muted">
            Content Studio
          </p>
          <p className="text-sm text-studio-muted">Ana Creator</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={isFailureEnabled ? 'destructive' : 'outline'}
            size="sm"
            aria-pressed={isFailureEnabled}
            onClick={handleToggleFailure}
          >
            Simular erro
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCycleDelay}
          >
            Delay: {formatRequestDelay(requestDelay)}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="size-4" />
            Resetar dados
          </Button>
        </div>
      </div>
    </header>
  )
}
