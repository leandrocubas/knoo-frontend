import type { ActionContext } from 'vuex'
import { useToast } from 'vue-toast-notification'
import type { IModuleState } from './interface/state.interface'
import { moduleService } from './services'
import type { IModule } from './interface/module.interface'
import type { IUploadComplete } from './interface/upload-complete.interface'
import axios from '@/config/axios.config'
import type { ILesson } from './interface/lesson.interface'

const {
  onGet,
  onCreate,
  getMediaId,
  onDelete,
  onToggleModule,
  onEdit,
  onUpload,
  onPreUpload,
  onUploadComplete,
  onEditLessonStatus,
  onGetLessons,
  onGenerateMediaId,
  onDeleteLesson,
  onUpdateLessonOrder,
  onUpdateModuleOrder
} = moduleService()

const toast = useToast()

export const actions = {
  async create({ commit }: ActionContext<IModuleState, any>, module: IModule) {
    commit('SET_LOADING', true)

    const { data } = await onCreate(module)
    commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      commit('ADD_MODULE_LIST', data.data)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  toggleAddContent: (
    { commit }: ActionContext<IModuleState, any>,
    opened: boolean
  ) => commit('TOGGLE_ADD_CONTENT', opened),

  addModuleToList: (
    { commit }: ActionContext<IModuleState, any>,
    module: IModule
  ) => commit('ADD_MODULE_LIST', module),

  async get({ commit }: ActionContext<IModuleState, any>, id?: number) {
    commit('SET_MODULE_LOADING', true)

    const { data } = await onGet(id)

    commit('SET_MODULE_LOADING', false)

    if (data && data.success) {
      let { data: area_list } = data.data
      
      let module_list: IModule[] = []

      const [ first_area ] = area_list

      if(first_area){
        module_list = first_area.modules || []
        const modules = module_list.map(m => ({ ...m, area_type: first_area.area_type }))
        commit('SET_MODULE_LIST', [...modules])
        return Promise.resolve(data.data)
      }

    }

    return Promise.reject(data)
  },
  async delete({ commit }: ActionContext<IModuleState, any>, id: string) {
    commit('SET_LOADING', true)
    const { data } = await onDelete(id)

    await commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },
  async edit(
    { commit }: ActionContext<IModuleState, any>,
    updated_module: IModule
  ) {
    commit('SET_LOADING', true)
    const { data } = await onEdit(updated_module)

    commit('SET_LOADING', false)
    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },
  async get_media_id({ commit }: ActionContext<IModuleState, any>, file: File) {
    commit('SET_LOADING', true)

    const formData = new FormData()

    formData.append('file', file)

    const { data } = await getMediaId(formData)

    commit('SET_LOADING', false)

    if (data && data.success && data.success) {
      return Promise.resolve({ id: data.data.id, s3_url: data.data.s3_url })
    }

    return Promise.reject(data)
  },
  async toggle_module(
    { commit }: ActionContext<IModuleState, any>,
    { is_active, id }: { is_active: number; id: string }
  ) {
    const { data } = await onToggleModule(id, is_active)

    if (data && data.success) {
      toast.success(data.message)
      commit('TOGGLE_MODULE', { id, isActive: !!is_active })
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async upload({ }: ActionContext<IModuleState, any>, upload: { key: string, lesson: ILesson }) {

    if(!upload.lesson.id) return

    const { data } = await onUpload({ key: upload.key, lesson_id: upload.lesson.id })
    if (data && data.success) {
        return Promise.resolve({
          media_id: data.data.media.id,
          upload_id: data.data.uploadId,
          key: data.data.key
        })
    }

    return Promise.reject(data)
  },

  async generate_lesson_id({ commit }: ActionContext<IModuleState, any>, partLesson: Partial<ILesson>) {
    commit('SET_LOADING_ADD_LESSON', true)
    const { data } = await onGenerateMediaId(partLesson)

    commit('SET_LOADING_ADD_LESSON', false)

    if (data && data.success) {
        return Promise.resolve({
          lesson_id: data.data.id,
        })
    }

    return Promise.reject(data)
  },

  async generate_url({}: ActionContext<IModuleState, any>, upload: { media_id: number, upload_id: string, key: string, partNumber: number }) {
    const { data } = await onPreUpload({
      uploadId: upload.upload_id,
      key: upload.key,
      partNumber: upload.partNumber,
      media_id: upload.media_id
    })

    if(data && data.success){
      return Promise.resolve({ url: data.data.url }) 
    }

    return Promise.reject(data)
  },


  async upload_complete({}: ActionContext<IModuleState, any>, upload: IUploadComplete) {
    const { data: up } = await onUploadComplete(upload)

    if (up) { 
      return Promise.resolve(up.data)
    }

    return Promise.reject(up)
  },

  async upload_chunk({}: ActionContext<IModuleState, any>, upload: { url: string, chunk: Uint8Array, total_chunks: number }) {
    const chunk_result = await axios.put( upload.url, upload.chunk, { headers: { 'Content-Type': 'application/octet-stream' },})
    if (chunk_result && chunk_result.headers) { 
      return Promise.resolve(JSON.parse(chunk_result.headers.etag))
    }

    return Promise.reject(chunk_result)
  },

  async get_lessons({ commit }: ActionContext<IModuleState, any>, id_module: string) {
    commit('SET_LOADING_LESSONS', true)
    commit('SET_MODULE_THUMB', '')

    const { data } = await onGetLessons(id_module)
    commit('SET_LOADING_LESSONS', false)

    if (data && data.success) {
      commit('SET_LESSONS', data.data && data.data.lessons ? data.data.lessons : [])
      commit('SET_MODULE_THUMB', data.data.module_thumb)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async delete_lesson({ commit, dispatch }: ActionContext<IModuleState, any>, { id_lesson, id_module }: { id_lesson: number, id_module: number}) {
    commit('SET_LOADING', true)
    const { data } = await onDeleteLesson(id_lesson)
    commit('SET_LOADING', false)

    if (data && data.success) {
      dispatch('get_lessons', id_module)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async update_status({ commit }: ActionContext<IModuleState, any>, { is_active, id }: Partial<ILesson>) {
    commit('SET_LOADING', true)
    const { data } = await onEditLessonStatus({ id, is_active })
    commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async update_order_lesson({ commit }: ActionContext<IModuleState, any>, { module_id, ordered_lessons }: {module_id: number, ordered_lessons: Array<ILesson>}) {
    commit('SET_LOADING', true)
    const { data } = await onUpdateLessonOrder(module_id, ordered_lessons.map((lesson, order) => ({
      id: lesson.id ?? 0,
      order
    })))
    commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async update_order_module({ commit }: ActionContext<IModuleState, any>, ordered_modules: Array<IModule>) {
    commit('SET_LOADING', true)
    const { data } = await onUpdateModuleOrder(ordered_modules.map((module, order) => ({
      id: Number(module.id),
      order
    })))
    commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  }
  
}
