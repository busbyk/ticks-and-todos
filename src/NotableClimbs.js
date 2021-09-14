const reYdsRating = /\.(\d*)(.*)/

export const generateNotableClimbs = (ticks) => {
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
    {
      displayName: 'Hardest Tick (Rock)',
      climb: hardestRock(ticks),
    },
    {
      displayName: 'Easiest Tick (Rock)',
      climb: easiestRock(ticks),
    },
  ]
}

const mostRecent = (ticks) => {
  return ticks[0]
}

const first = (ticks) => {
  return ticks[ticks.length - 1]
}

const hardestRock = (ticks) => {
  convertRatingsToLinearScale(ticks)
  const ticksByRating = sortTicksByRating(ticks)
  const hardestTick = ticksByRating[ticksByRating.length - 1]
  return hardestTick
}

const easiestRock = (ticks) => {
  convertRatingsToLinearScale(ticks)
  const ticksByRating = sortTicksByRating(ticks)
  const hardestTick = ticksByRating[0]
  return hardestTick
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

const sortTicksByRating = (ticks) => {
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
        console.log(
          'comparing ' +
            JSON.stringify(a.linearRating) +
            ' with ' +
            JSON.stringify(b.linearRating)
        )
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
  // .sort((a, b) => {
  //   console.log('comparing ' + a.linearRating + ' and ' + b.linearRating)
  //   if (a.linearRating.rating === b.linearRating.rating) {
  //     if (a.linearRating.modifier && !b.linearRating.modifer) {
  //       return 1
  //     }
  //     if (!a.linearRating.modifier && b.linearRating.modifier) {
  //       return -1
  //     }
  //     if (a.linearRating.modifier && b.linearRating.modifier) {
  //       let modifierComparison = compareModifiers(
  //         a.linearRating.modifer,
  //         b.linearRating.modifer
  //       )
  //       if (modifierComparison > 1) {
  //         return 1
  //       }
  //       if (modifierComparison < 1) {
  //         return -1
  //       }
  //     }
  //     return 0
  //   }
  //   return 0
  // })
}

const sortTicksByDate = (ticks) => {
  return ticks
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
