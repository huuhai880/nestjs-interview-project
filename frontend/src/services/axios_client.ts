import { COOKIE_JWT, getRefreshToken, setCookie } from '@/utils/cookie'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
interface TokenResponse {
    newToken: string
}

interface ErrorResponse {
    message: string
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean
}

const apiUrl: string | undefined = "http://localhost:3000"

const axios_client = axios.create({
    baseURL: apiUrl,
})

axios_client.interceptors.request.use(async (config: any) => {
    const token = await getRefreshToken()

    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        } as Record<string, string>
    }

    return config

}, (error) => {
    return Promise.reject(error)
})

axios_client.interceptors.response.use((response: AxiosResponse<any, any>) => {

    return response.data
}, async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
            const response = await axios_client.post<TokenResponse>('/refreshTokenEndpoint')
            const newToken = response.data.newToken

            setCookie(COOKIE_JWT, newToken)

            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${newToken}`,
            } as Record<string, string>

            return axios_client(originalRequest)
        } catch (refreshError) {

            console.error('Error refreshing token:', refreshError)
            throw refreshError
        }
    }

    return Promise.reject(error)
})

export default axios_client
