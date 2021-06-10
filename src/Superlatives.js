export const generateSuperlatives = (ticks) => {
  if (ticks.length === 0) {
    return []
  }
  return [
    {
      displayName: 'Most Recent Tick',
      climb: mostRecent(ticks),
    },
    {
      displayName: 'First Tick',
      climb: first(ticks),
    },
  ]
}

const mostRecent = (ticks) => {
  return ticks[0]
}

const first = (ticks) => {
  return ticks[ticks.length - 1]
}
