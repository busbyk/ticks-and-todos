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
      displayName: 'Hardest Tick',
      climb: hardest(ticks)
    }
  ]
}

const mostRecent = (ticks) => {
  return ticks[0]
}

const first = (ticks) => {
  return ticks[ticks.length - 1]
}

const hardest = (ticks) => {
  convertRatingsToLinearScale(ticks)
  const ticksByRating = sortTicksByRating(ticks)
  const hardestTicks = ticksByRating[0]
  const hardestTicksByDate = sortTicksByDate(hardestTicks)
  return hardestTicksByDate[0]
}

const convertRatingsToLinearScale = (ticks) => {
  ticks.forEach((tick, idx, arr) => {
    const rating = tick.Rating;
    const linearRating = convertToLinearRating(rating)
    arr[idx].linearRating = linearRating
  })
}

const convertToLinearRating = (ydsRating) => {
  const match = ydsRating.match(reYdsRating)
  const baseRating = match[1]
  const modifier = (match.length > 2) ? match[2] : null
  
  let linearRating = 0;
  let linearModifier;

  if (baseRating <= 9) {
    linearRating = baseRating
  } else if (baseRating >9) {
    linearRating = 9 + ((baseRating - 10) * 4)

    if (modifier) {
      // what type of modifer?
      // if +/- 
      //    type === plusOrMinus
      // if c/d
      //    type === inBetweenGrade
      // else 
      // switch case for a-d
    }
  }

  return {
    linearRating,
    linearModifier
  }
}

const sortTicksByRating = (ticks) => {
  return ticks
}

const sortTicksByDate = (ticks) => {
  return ticks
}