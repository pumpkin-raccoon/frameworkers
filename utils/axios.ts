import axios, { AxiosRequestHeaders, Method } from "axios"
import { API_URL } from "constants/api"

export const getAxiosRequest = async (params: {
  method: Method
  url: string
  data?: unknown
  token?: string
  headers?: AxiosRequestHeaders
}) => {
  const targetUrl = params.url.includes('http')
    ? params.url
    : `${API_URL}/${params.url}`
  const request = axios({
    method: params.method,
    url: targetUrl,
    headers: params.headers,
    data: params.data
  })
  return request
}
