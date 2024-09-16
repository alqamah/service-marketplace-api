import axios from 'axios'

const API_URL = '/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password })
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

export const logoutUser = () => {
  localStorage.removeItem('token')
}

export default axiosInstance