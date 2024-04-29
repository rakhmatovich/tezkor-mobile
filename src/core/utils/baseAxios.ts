import axios, { AxiosRequestConfig } from "axios"
import humps from "humps"
import { auth } from "@user/utils/auth.ts"
// import { API_URL } from "@env"
import i18n from "i18next"

export const domain = "https://7f9c-84-54-82-236.ngrok-free.app"
// API_URL

const baseAxios = axios.create({
    baseURL: `${domain}/api/v1/`,
    transformResponse: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(axios.defaults.transformResponse as any),
        humps.camelizeKeys,
    ],
    transformRequest: [
        function (data, headers: AxiosRequestConfig["headers"]) {
            if (data instanceof FormData) {
                return data
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return humps.decamelizeKeys(data, headers as any)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(axios.defaults.transformRequest as any),
    ],
})

baseAxios.interceptors.request.use((config) => ({
    ...config,
    params: humps.decamelizeKeys(config.params),
}))

export default baseAxios

export async function request(options: AxiosRequestConfig, isPublic = true) {
    const lang = i18n.language
    const authorization = auth()
    const params = { lang, ...options?.params }
    options = isPublic ? { ...options, params } : { ...options, ...authorization, params }
    const { data } = await baseAxios(options)
    return data
}
