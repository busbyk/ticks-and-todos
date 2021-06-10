import axios from 'axios'

const openBetaClient = axios.create({
  baseURL: 'https://mp-api.openbeta.io',
})

const mpSearchApiClient = axios.create({
  baseURL: 'https://mp-search-api.herokuapp.com/',
})

export const getTicks = async (mpUID) => {
  const res = await openBetaClient.get(`/ticks/${mpUID}`)

  if (res.status === 200) {
    return res.data
  } else return []
}

export const getMpUserSearchResults = async (userQuery) => {
  const res = await mpSearchApiClient.get(`/userSearch?userQuery=${userQuery}`)

  if (res.status === 200) {
    return res.data || []
  } else {
    throw new Error("Oh jeez, something didn't go quite right")
  }
}
