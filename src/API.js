import axios from 'axios'

const mpSearchApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const getTicks = async (mpUID) => {
  const res = await mpSearchApiClient.get(`/userTicks?user=${mpUID}`)

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
