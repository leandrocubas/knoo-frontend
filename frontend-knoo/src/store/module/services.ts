import type { IModule } from './interface/module.interface'
import { urlConfig } from '@/config/url.config'
import axios from '@/config/axios.config'
import { AxiosError, type AxiosResponse } from 'axios'
import type { IUploadComplete } from './interface/upload-complete.interface'
import type { ILesson } from './interface/lesson.interface'
import { useWebSocket } from '@vueuse/core'
import { useStorage } from '@/composables/useStorage'
import { LoginEnum } from '@/enums/login.enum'
import { WebsocketEnum } from '@/enums/websocket.enum'

export function moduleService() {

  const { get } = useStorage()

  const onCreate = (module: any): Promise<AxiosResponse<any, any>> => {
    if(!module.media_id_banner) delete module.media_id_banner
    if(!module.media_id_thumb) delete module.media_id_thumb

    return axios
      .post(urlConfig.urlModules, module)
      .catch((err) => err)
  }

  const onGet = (id?: number): Promise<any> => {
    const url = urlConfig.urlMembers.replace(':id', id ? id.toString() : '')
    return axios.get(url).catch((err: AxiosError) => {
      return err
    })
  }

  const getMediaId = (file: FormData): Promise<AxiosResponse<any, any>> => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    return axios
      .post(urlConfig.urlUploadMedia, file, { headers })
      .catch((err) => err)
  }

  const onDelete = (id: string): Promise<AxiosResponse<any, any>> => {
    return axios
      .delete(`${urlConfig.urlModules}/${id}`)
      .catch((err) => err)
  }

  const onDeleteLesson = (id: number): Promise<AxiosResponse<any, any>> => {
    return axios
      .delete(`${urlConfig.urlLessons}/${id}`)
      .catch((err) => err)
  }

  const onEdit = (
    updated_module: IModule
  ): Promise<AxiosResponse<any, any>> => {
    return axios
      .put(
        `${urlConfig.urlModules}/${updated_module.id ?? ''})`,
        updated_module
      )
      .catch((err) => err)
  }

  const onToggleModule = (
    id: string,
    is_active: number
  ): Promise<AxiosResponse<any, any>> => {
    return axios
      .put(`${urlConfig.urlModules}/${id}`, { is_active })
      .catch((err) => err)
  }

  const onUpload = (upload: { key: string, lesson_id: number }): Promise<AxiosResponse<any, any>> => axios
      .post(urlConfig.urlUploadVideo, upload)
      .catch((err) => err)

  const onPreUpload = (pre_upload: { media_id: number, key: string, uploadId: string, partNumber: number }): Promise<AxiosResponse<any, any>> => axios
      .post(urlConfig.urlUploadPreVideo, pre_upload)
      .catch((err) => err)

  const onUploadComplete = (upload: IUploadComplete): Promise<AxiosResponse<any, any>> => axios
      .post(urlConfig.urlUploadComplete, upload)
      .catch((err) => err)

  const onEditLesson = (lesson: ILesson): Promise<AxiosResponse<any, any>> => axios
      .patch(`${urlConfig.urlLessons}/${lesson.id}`, lesson)
      .catch((err) => err)

  const onEditLessonStatus = ({ is_active, id }: Partial<ILesson>): Promise<AxiosResponse<any, any>> => axios
      .patch(`${urlConfig.urlLessons}/${id}`, { is_active })
      .catch((err) => err)

  const onGenerateMediaId = (lesson: Partial<ILesson>): Promise<AxiosResponse<any, any>> => axios
      .post(urlConfig.urlLessons, lesson)
      .catch((err) => err)

  const onGetLessons = (id_module: string): Promise<AxiosResponse<any, any>> => axios
      .get(`${urlConfig.urlModules}/${id_module}`)
      .catch((err) => err)

  const _startHeartbeat = (send: any) => {
    send(JSON.stringify({ type: 'is-token', token: get(LoginEnum.TOKEN_KEY) }))
  };

	const onConnectWSS = (onMessage: (ws: WebSocket, event: MessageEvent<any>) => void) => {
    const session_id = get(WebsocketEnum.SESSION_ID)
		const { data, send } = useWebSocket(session_id ? `${import.meta.env.VITE_WSS_URL}?sessionId=${session_id}` : import.meta.env.VITE_WSS_URL, {
			onMessage,
			onConnected: () => _startHeartbeat(send),
			onError: () => console.error('Failed to connect WebSocket'),
			autoReconnect: { retries: 2 }
		})

		return { data, send }
	}

  const onUpdateLessonOrder = (module_id: number, ordered_lessons: Array<{ id: number, order: number }>): Promise<AxiosResponse<any, any>> => axios
    .post(`${urlConfig.urlLessons}/reorder/${module_id}`, { lessons: ordered_lessons })
    .catch((err) => err)

  const onUpdateModuleOrder = (ordered_modules: Array<{ id: number, order: number }>): Promise<AxiosResponse<any, any>> => axios
    .post(`${urlConfig.urlModules}/reorder`, { modules: ordered_modules })
    .catch((err) => err)
      

  return {
    onGet,
    onCreate,
    getMediaId,
    onDelete,
    onToggleModule,
    onEdit,
    onUpload,
    onPreUpload,
    onUploadComplete,
    onEditLesson,
    onGetLessons,
    onConnectWSS,
    onGenerateMediaId,
    onDeleteLesson,
    onEditLessonStatus,
    onUpdateLessonOrder,
    onUpdateModuleOrder
  }
}
