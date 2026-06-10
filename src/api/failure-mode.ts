const FAILURE_MODE_KEY = 'content-studio:simulate-failure'

export function isFailureModeEnabled() {
  return localStorage.getItem(FAILURE_MODE_KEY) === 'true'
}

export function enableFailureMode() {
  localStorage.setItem(FAILURE_MODE_KEY, 'true')
}

export function disableFailureMode() {
  localStorage.removeItem(FAILURE_MODE_KEY)
}

export function toggleFailureMode() {
  if (isFailureModeEnabled()) {
    disableFailureMode()
    return false
  }

  enableFailureMode()
  return true
}

export function shouldSimulateFailure(flag?: boolean) {
  return flag || isFailureModeEnabled()
}
