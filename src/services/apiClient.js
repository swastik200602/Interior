import axios from 'axios'

const commonConfig = {
  timeout: 15000,
}

export const apiClient = axios.create({
  ...commonConfig,
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const lookupApiClient = axios.create({
  ...commonConfig,
  baseURL: import.meta.env.VITE_LOOKUP_API_BASE_URL,
})

function getApiErrorMessage(error) {
  if (error.code === 'ECONNABORTED') return 'The server took too long to respond. Please try again.'
  if (!error.response) return 'Unable to connect to the server. Check your connection and try again.'

  const serverMessage = error.response.data?.message || error.response.data?.Message
  if (/duplicate|primary key/i.test(serverMessage ?? '')) {
    return 'A lead with these details already exists. Please use a different name, phone number, and email.'
  }

  return serverMessage || 'The request could not be completed.'
}

for (const client of [apiClient, lookupApiClient]) {
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(new Error(getApiErrorMessage(error), { cause: error })),
  )
}
