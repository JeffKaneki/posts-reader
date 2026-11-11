import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use((response) => {
  const contentType = String(response.headers['content-type'] ?? '')
  if (!contentType.includes('application/json')) {
    throw new Error(
      `Expected JSON from ${response.config.url} but the server sent "${contentType || 'no content-type'}". ` +
      'This usually means VITE_API_URL is unset, so the request resolved against this site ' +
      'and the SPA rewrite answered with index.html.',
    )
  }
  return response
})

export default api
