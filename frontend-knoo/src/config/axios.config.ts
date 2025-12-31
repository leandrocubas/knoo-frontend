import axios from 'axios'
import { whiteList } from './white-list'
import { useStorage } from '@/composables/useStorage'
import { LoginEnum } from '@/enums/login.enum'
import { HttpStatus } from '@/enums/http-status.enum'
import { useToast } from 'vue-toast-notification'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

const { get, del } = useStorage()
const toast = useToast()

axiosInstance.interceptors.request.use((config) => {
    if (whiteList?.includes(config.url ?? '') || config.url && config.url.includes('https://flamepay-video-lessons-raw.s3.amazonaws.com')) {
        return config
    }
    
    const token = get(LoginEnum.TOKEN_KEY)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (err) => {
    return Promise.reject(err)
})

axiosInstance.interceptors.response.use((response) => {
    return response
}, (err) => {
    if(err){
        const { response } = err

        const isSignin = response.request.responseURL.includes('/login')

        if(response.data.error && !response.data.success)
            toast.error(response.data.error.message)
        

        if(response?.status === HttpStatus.UNAUTHORIZED && !isSignin){
            del(LoginEnum.TOKEN_KEY)    
            window.location.href = `${location.protocol}//${location.host}/login`
        }
    }

    return Promise.reject(err.response)
})

export default axiosInstance