const reYdsRating = /\.(\d*)(.*)/

export const generateNotableClimbs = (ticks) => {
  if (ticks.length === 0) {
    return []
  }

  convertRatingsToLinearScale(ticks)
  const ticksGroupedByRoute = groupTicksByRoute(ticks)
  const routesByRating = sortRoutesByRating(Object.values(ticksGroupedByRoute))

  return [
    {
      displayName: 'Most Recent Tick',
      climb: mostRecent(ticks),
    },
    {
      displayName: 'First Tick',
      climb: first(ticks),
    },
    {
      displayName: 'Hardest Send (Rock)',
      climb: hardestRockSend(routesByRating),
    },
    {
      displayName: 'Easiest Send (Rock)',
      climb: easiestRockSend(routesByRating),
    },
    {
      displayName: 'Hardest Attempt (Rock)',
      climb: hardestRockAttempt(routesByRating),
    },
  ]
}

const mostRecent = (ticks) => {
  return ticks[0]
}

const first = (ticks) => {
  return ticks[ticks.length - 1]
}

const hardestRockSend = (routesByRating) => {
  const sends = routesByRating.filter((route) => {
    return (
      route.ticks.findIndex(
        (tick) => tick.Style === 'Lead' && tick['Lead Style'] !== 'Fell/Hung'
      ) !== -1
    )
  })
  return sends[sends.length - 1]
}

const hardestRockAttempt = (routesByRating) => {
  const flails = routesByRating.filter((route) => {
    return (
      route.ticks.findIndex(
        (tick) => tick.Style === 'Lead' && tick['Lead Style'] === 'Fell/Hung'
      ) !== -1
    )
  })
  return flails[flails.length - 1]
}

const easiestRockSend = (routesByRating) => {
  return routesByRating[0]
}

const convertRatingsToLinearScale = (ticks) => {
  ticks.forEach((tick, idx, arr) => {
    const rating = tick.Rating
    const linearRating = convertToLinearRating(rating)
    arr[idx].linearRating = linearRating
  })
}

const convertToLinearRating = (ydsRating) => {
  const match = ydsRating.match(reYdsRating)

  if (match) {
    const baseRating = match[1]
    const modifier = match.length > 2 ? match[2] : null

    let rating = 0

    if (baseRating <= 9) {
      rating = baseRating
    } else if (baseRating > 9) {
      rating = 9 + (baseRating - 10) * 4
    }

    return {
      rating,
      modifier,
    }
  } else {
    return null
  }
}

const sortRoutesByRating = (ticks) => {
  return ticks
    .filter((tick) => tick.linearRating)
    .sort((a, b) => {
      if (a.linearRating.rating < b.linearRating.rating) {
        return -1
      }
      if (a.linearRating.rating > b.linearRating.rating) {
        return 1
      }
      if (a.linearRating.modifier && !b.linearRating.modifier) {
        return 1
      }
      if (!a.linearRating.modifier && b.linearRating.modifier) {
        return -1
      }
      if (a.linearRating.modifier && b.linearRating.modifier) {
        let modifierComparison = compareModifiers(
          a.linearRating.modifier,
          b.linearRating.modifier
        )
        if (modifierComparison > 1) {
          return 1
        }
        if (modifierComparison < 1) {
          return -1
        }
      }
      return 0
    })
}

const orderOfModifierDifficulties = [
  'minus',
  'a',
  'a/b',
  'b',
  'b/c',
  'c',
  'c/d',
  'd',
  'plus',
]

const compareModifiers = (modifierA, modifierB) => {
  const modA = orderOfModifierDifficulties.findIndex(
    (elem) => elem === modifierA
  )
  const modB = orderOfModifierDifficulties.findIndex(
    (elem) => elem === modifierB
  )

  if (modA !== -1 && modB !== -1) {
    return modA - modB
  } else {
    return 0
  }
}

const groupTicksByRoute = (ticks) => {
  const ticksByClimb = ticks.reduce((acc, tick) => {
    if (!acc[tick.URL]) {
      acc[tick.URL] = {
        'Avg Stars': tick['Avg Stars'],
        Length: tick.Length,
        Location: tick.Location,
        Notes: tick.Notes,
        Rating: tick.Rating,
        'Rating Code': tick['Rating Code'],
        Route: tick.Route,
        'Route Type': tick['Route Type'],
        URL: tick.URL,
        linearRating: tick.linearRating,
        ticks: [],
      }
    }

    acc[tick.URL].ticks.push({
      'Lead Style': tick['Lead Style'],
      Pitches: tick.Pitches,
      Style: tick.Style,
    })

    return acc
  }, {})
  return ticksByClimb
}
