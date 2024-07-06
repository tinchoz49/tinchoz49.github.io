// Set in src/web/head/initial-hash.astro
declare let window: Window & { firstVisibleSectionSlug?: string }

const getInitialHash = () => {
  if (window.location.hash) return window.location.hash

  return window.firstVisibleSectionSlug ? `#${window.firstVisibleSectionSlug}` : ''
}

const createHashState = () => {
  let hash = getInitialHash()

  const subscribers: Array<(hash: string) => void> = []

  const subscribe = (callback: (hash: string) => void) => {
    subscribers.push(callback)
  }

  const getHash = () => hash

  const updateHash = (value: string) => {
    const newHash = value.includes('#') ? value : `#${value}`

    if (newHash !== hash) {
      hash = newHash.includes('#') ? newHash : `#${newHash}`
      window.history.replaceState(null, '', `${window.location.pathname}${hash}`)
      subscribers.forEach(callback => callback(hash))
    }
  }

  return { getHash, subscribe, updateHash }
}

export default createHashState()
