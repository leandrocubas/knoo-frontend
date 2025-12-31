import { ref, computed, toValue } from 'vue'
import { useStore } from 'vuex'
import type {
  IModule,
} from '@/store/module/interface/module.interface'
import type { IArea } from '@/store/area/interface/area.interface'
import { useUtils } from './useUtils'
import { useToast } from 'vue-toast-notification'
import type { ILesson } from '@/store/module/interface/lesson.interface'
import * as buffer from 'buffer';
import { useRoute } from 'vue-router'
import { v4 as uuid } from 'uuid';
import type { IUser } from '@/store/user/interface/user.interface'
import Uppy from '@uppy/core'
// @ts-ignore
import AwsS3Multipart from '@uppy/aws-s3-multipart'
import type { IPart } from '@/store/module/interface/upload-complete.interface'
import axios from 'axios'
import type { SortableEvent } from 'sortablejs'

// @ts-ignore
window.Buffer = buffer.Buffer;

export function useModule() {
  const store = useStore()
  const route = useRoute()
  const { slugify, convertFileToBuffer } = useUtils()
  const can_add_module_content = computed(() => {
    const isValid = _onValidateForm()

    return isValid
  })
  

  const isOptionsOpened = ref(false)
  const isAddOpened = computed(() => store.getters['area_module/addOpened'])
  const lessons = computed<ILesson[]>(() => store.getters['area_module/lessons'].filter((lesson: ILesson) => {
    const { module:module_id } = route.params

    if(lesson.hasOwnProperty('is_in_progress')){
      return lesson.modules_id === +module_id
    }

    return lesson
  }))
  const module_thumb = computed(() => store.getters['area_module/module_thumb'])
  const isLoadingModules = computed(() => store.getters['area_module/isLoadingModules'])
  const module_selected = computed<IModule>(() => store.getters['area_module/module_selected'])
  const area = computed<IArea | null>(() => store.getters['area/actual_area'])
  const is_processing_file = computed<boolean>(() => store.getters['area_module/is_processing_file'])
  const orderedLessons = ref<ILesson[]>()
  const orderedModules = ref<IModule[]>()
  const isDeleting = ref(false)
  const isSquareMode = ref(true)
  const isFillModule = ref(false)
  const isReleaseExceptionOpened = ref(false)
  const module_name = ref('')
  const id_media = ref(0);
  const key = ref('');
  const module_image_banner = ref(new File([], ''))
  const bannerImage = ref('')
  const module_image_cover = ref(new File([], ''))
  const thumb_image = ref('')
  const content_image = ref(new File([], ''))
  const contentImage = ref('')
  const content_files = ref(new File([], ''))
  const complementary_content_files = ref(new File([], ''))
  const complementaryContentFiles = ref('')
  const isLoadingAddLesson = computed(() => store.getters['area_module/isLoadingAddLesson'])
  const isLoadingLessons = computed(() => store.getters['area_module/isLoadingLessons'])
  const isLoading = computed(() => store.getters['area_module/isLoading'])
  const module_list = computed<IModule[]>(() => store.getters['area_module/module_list'])
  const file_selected = computed<File>(() => store.getters['area_module/file_selected'])
  const content_release = ref('after_seven_days')
  const order_bump = ref(true)
  const order_bump_list = ref([])
  const content_name = ref()
  const content_description = ref('')
  const canCreate = computed(() => _onValidateFields())
  const canEdit = computed(() => _onValidateEditFields())
  const toast = useToast()
  const members_area_id = ref('')
  const module_id = ref<string | undefined>(undefined)
  const isEditingModule = ref(false)
  const is_delete_lesson = ref(false)
  const actual_id = computed<number>(() => store.getters['area_module/actual_id'])
  const user_logged = computed<IUser>(() => store.getters['user/getLoggedUser'])
  const partSize = 5 * 1024 * 1024

  const _onValidateForm = (): boolean => {
    return !!toValue(content_name) && !!toValue(file_selected)
  }

  const _module = ref()

  const _onValidateFields = (): boolean => {
    return !!toValue(module_name)
  }

  const _onValidateEditFields = (): boolean => {
    return !!toValue(module_name)
  }

  const toggleAddContent = () => {
    store.dispatch('area_module/toggleAddContent', !isAddOpened.value)
  }

  const toggleReleaseException = () => {
    isReleaseExceptionOpened.value = !isReleaseExceptionOpened.value
  }

  const initForm = (module: IModule) => {
    const mediaThumbnail =
      module.media?.find((item) => item.media_type === 'Thumbnail')?.s3_url ||
      ''

    const mediaBanner =
      module.media?.find((item) => item.media_type === 'Banner')?.s3_url || ''

    module_name.value = module.module_name
    thumb_image.value = mediaThumbnail
    bannerImage.value = mediaBanner
  }

  const toggle = () => (isOptionsOpened.value = !isOptionsOpened.value)

  const onGet = async (id?: string) => {
    if (id) {
      members_area_id.value = id
    }
    
    await store.dispatch('area_module/get', id)
    
  }

  const onDelete = () => {
    isDeleting.value = false

    store.dispatch('area_module/delete', module_id.value).then(() => {
      store.commit('area_module/REMOVE_MODULE', module_id.value)
    })
  }

  const onEdit = async (): Promise<any> => {
    let media_thumb
    let media_banner
    
    if (module_image_cover.value.size > 0) {
      media_thumb = await store.dispatch('area_module/get_media_id', module_image_cover.value)
      thumb_image.value = media_thumb.s3_url
    }

    if (module_image_banner.value.size > 0) {
      media_banner = await store.dispatch('area_module/get_media_id',module_image_banner.value)
      bannerImage.value = media_banner.s3_url
    }

    const update_module = {
      members_area_id: members_area_id.value,
      module_name: module_name.value,
      id: module_id.value,
      media_id_thumb: media_thumb?.id ?? undefined,
      media_id_banner: media_banner?.id ?? undefined,
    }

    const cleaned_module = Object.fromEntries(
      Object.entries(update_module).filter(([_, v]) => v !== undefined)
    )

    await store
      .dispatch('area_module/edit', cleaned_module)
      .then((res) => {
        isEditingModule.value = false
        let banner = null
        let thumb = null

        if (module_image_banner.value.size <= 0) banner = _module.value.media.find((el: { media_type: string }) => el.media_type.toUpperCase() === 'BANNER')
        if (module_image_cover.value.size <= 0) thumb = _module.value.media.find((el: { media_type: string }) => el.media_type.toUpperCase() === 'THUMBNAIL')

        const media = [
          module_image_cover.value.size <= 0 ? thumb : { media_type: 'Thumbnail', s3_url: thumb_image.value },
          module_image_banner.value.size <= 0 ? banner : { media_type: 'Banner', s3_url: bannerImage.value }
        ]

        const updatedModule = {
          ...res,
          id: module_id.value,
          media
        }

        store.commit('area_module/REPLACE_MODULE', updatedModule)
        orderedModules.value = [...module_list.value]
      })
  }

  const onToggleConfirmDeleteDialog = (
    id: string | undefined,
    _isDeleting: boolean
  ) => {
    module_id.value = id
    isDeleting.value = _isDeleting
  }

  const onToggleFillModuleDialog = () => {
    isFillModule.value = !toValue(isFillModule)

    module_name.value = ''
    thumb_image.value = ''
    bannerImage.value = ''
    module_image_cover.value = new File([], '')
    module_image_banner.value = new File([], '')
  }

  const onToggleEditModuleInfoDialog = (id?: string) => {
    isEditingModule.value = !toValue(isEditingModule)
    if (id) {
      module_id.value = id
    }
  }

  const onToggleEdit = (module?: IModule): void => {
    if (module) {
      _module.value = module
      onToggleEditModuleInfoDialog(module.id)
      initForm(module)
      return
    }
    onToggleEditModuleInfoDialog()
    _module.value = null
  }

  const onCreate = async () => {

    const [ { id: media_id_thumb }, { id: media_id_banner } ] = await Promise.all([
      module_image_cover.value.size ? store.dispatch('area/get_media_id', module_image_cover.value) : Promise.resolve({ id: 0 }),
      module_image_banner.value.size ? store.dispatch('area/get_media_id', module_image_banner.value) : Promise.resolve({ id: 0 }),
    ])

    const payload = {
      members_area_id: members_area_id.value,
      module_name: module_name.value,
      media_id_thumb,
      media_id_banner,
    }

    await store.dispatch('area_module/create', payload)

    onToggleFillModuleDialog()
  }

  const onOpenModule = (module: IModule) => {
    store.commit('area_module/MODULE', {...module, members_area: { area_type: area.value?.area_type }})
  }

  const getMediaID = async (file: File) => file.size ? await store.dispatch('product/get_media_id', file) : null

  const add_lesson = async () => {
    
    store.commit('area_module/SET_LOADING_ADD_LESSON', true)
    const [
      { id: banner_id, s3_url: banner_url },
      { id: attachment_id, s3_url: attachment_url },
      { id: media_id }
    ] = await Promise.all([
      content_image.value.size ? getMediaID(content_image.value) : Promise.resolve({ id: 0 }),
      complementary_content_files.value.size ? getMediaID(complementary_content_files.value) : Promise.resolve({ id: 0 }),
      content_files.value.size && module_selected?.value?.area_type.toLowerCase() === 'file' ? getMediaID(content_files.value) : Promise.resolve( { id: 0 } )
    ])

    const lesson: ILesson = {
      lesson_name: content_name.value,
      description: content_description.value,
      modules_id: Number(module_selected?.value?.id), 
      default_release_lesson: 0,
      media_id_attachment: attachment_id,
      media_id_content: media_id,
      media_id_thumb: banner_id,
    }

    delete lesson.id
    delete lesson.is_in_progress
    delete lesson.media

    if(!lesson.media_id_thumb){
      delete lesson.media_id_thumb
    }

    if(!lesson.media_id_attachment){
      delete lesson.media_id_attachment
    }

    if(!lesson.media_id_content){
      delete lesson.media_id_content
    }

    const { lesson_id } = await store.dispatch('area_module/generate_lesson_id', lesson)

    if(file_selected.value.size <= partSize) {

      const initUpload = async (): Promise<{ upload_id: number }> => {
        const { upload_id, media_id } = await store.dispatch('area_module/upload', { key: key.value, lesson: { ...lesson, id: lesson_id } })
        id_media.value = media_id
        store.commit('user/SET_LOADING', false)

        return { upload_id }
      }

      const generateUrlPreAssigned = async (upload_id: number): Promise<{ url: string }> => {
        return  await store.dispatch('area_module/generate_url', { key: key.value, media_id: id_media.value, upload_id, partNumber: 1 })
      }

      const upload = async (file: File, url: string): Promise<{ ETag: string, PartNumber: number } | null> => {
        const buffer = await convertFileToBuffer(file)

        if(!buffer) return null

        const chunk_size = (5 * 1024 * 1024)
        const start = 1 * chunk_size
        const end = Math.min(start + chunk_size, buffer.length)
        const chunk = buffer.subarray(start, end)
        const { headers } = await axios.put( url, chunk, { headers: { 'Content-Type': 'application/octet-stream' }})

        return { ETag: headers.etag, PartNumber: 1 }
      }

      const completeUpload = async ({ lesson_id, fileName, uploadId, parts } : { lesson_id: number, uploadId: number, fileName: string, parts: Array<IPart> }) => {
        const _parts: Array<IPart> = parts.map<IPart>(part => ({ ETag: part.ETag, PartNumber: part.PartNumber }))

        if(!area.value || !module_selected.value) return

        return await store.dispatch('area_module/upload_complete', {
          area_name: area.value?.area_name,
          module_name: module_selected.value.module_name,
          media_id: id_media.value,
          fileName,
          uploadId,
          key: key.value,
          parts: _parts
        }).then(() => {
            store.commit('area_module/FINISH_PROGRESS', {
              media_id: id_media.value,
              upload_id: uploadId,
              key: key.value,
              lesson_id
            })

            toast.success(`O vídeo ${fileName} acabou de ser finalizado com sucesso!`)
        })
      }

      if(area.value && module_selected?.value){
        module_name.value = module_selected.value.module_name
        const path = `id_user_${user_logged.value.id}/${slugify(area.value.area_name)}/${slugify(module_selected.value.module_name)}`
        const [ file_extension ] = file_selected.value.type.split('/').reverse()
        key.value = `${path}/${uuid()}.${file_extension}`

        const { upload_id } = await initUpload()
        const { url } = await generateUrlPreAssigned(upload_id)
        const upload_result = await upload(file_selected.value, url)

        if(upload_result) completeUpload({ lesson_id, fileName: file_selected.value.name.replace(/\s/g, "_"), uploadId: upload_id, parts: [upload_result] })
      }
      
      store.commit('area_module/SET_LOADING_ADD_LESSON', false)
      toggleAddContent()
      store.commit('area_module/ADD_LESSON', { ...lesson, id: lesson_id, is_in_progress: true, media: {
        lesson_content: '',
        lesson_thumb: banner_url,
        lesson_attachment: attachment_url
      }})
      return
    }

    onUploadFile({ ...lesson, id: lesson_id })
      .then(() => {
        store.commit('area_module/SET_LOADING_ADD_LESSON', false)
        toggleAddContent()
        store.commit('area_module/ADD_LESSON', { ...lesson, id: lesson_id, is_in_progress: true, media: {
          lesson_content: '',
          lesson_thumb: banner_url,
          lesson_attachment: attachment_url
        }})
      })
  }

  const onToggleModule = (isActive: boolean, moduleId: number) => {
    store
      .dispatch('area_module/toggle_module', {
        is_active: isActive,
        id: moduleId,
      })
      .then((response) => {
        store.commit('area_module/TOGGLE_MODULE', {
          id: moduleId,
          isActive: isActive,
        })
        return response
      })
  }

  const onUploadFile = async (lesson: ILesson): Promise<void> => {
    if(module_selected?.value?.area_type.toLowerCase() !== 'stream'){
      return
    }

    if(area.value){
      await uploadLargeFiles(lesson)
    }
  }
  
  const uploadLargeFiles = async (lesson: ILesson): Promise<void> => {
    const uppy = new Uppy({
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: false,
    })

    const area_name = ref<string>('')
    const module_name = ref<string>('')

    if(area.value && module_selected?.value){
      area_name.value = area.value.area_name
      module_name.value = module_selected.value.module_name
      const path = `id_user_${user_logged.value.id}/${slugify(area_name.value)}/${slugify(module_name.value)}`
      const [ file_extension ] = file_selected.value.type.split('/').reverse()
      key.value = `${path}/${uuid()}.${file_extension}`
    }
  
    uppy.use(AwsS3Multipart, {
      partSize,
      shouldUseMultipart: () => true,
      createMultipartUpload: async (_: File) => {
        const { upload_id, media_id } = await store.dispatch('area_module/upload', { key: key.value, lesson })
        id_media.value = media_id
        toast.success('Seu vídeo foi enviado para ser processado. Te avisaremos quando finalizar.')
        store.commit('user/SET_LOADING', false)
        return { uploadId: upload_id, key: key.value }
      },

      signPart: async(_: File, { uploadId, partNumber }: { uploadId: string, partNumber: number }) => {
        const { url } = await store.dispatch('area_module/generate_url', { key: key.value, media_id: id_media.value, upload_id: uploadId, partNumber })
        return { url }
      },
    
      completeMultipartUpload: async(file: File, { uploadId, parts }: { uploadId: string, parts: Array<IPart> }) => {
        const _parts: Array<IPart> = parts.map<IPart>(part => ({ ETag: part.ETag, PartNumber: part.PartNumber }))

        return await store.dispatch('area_module/upload_complete', {
          area_name: area_name.value,
          module_name: module_name.value,
          media_id: id_media.value,
          fileName: file.name,
          uploadId,
          key: key.value,
          parts: _parts
        }).then(() => {
            store.commit('area_module/FINISH_PROGRESS', {
              media_id: id_media.value,
              upload_id: uploadId,
              key: key.value,
              lesson_id: lesson.id
            })

            toast.success(`O vídeo ${file.name} acabou de ser finalizado com sucesso!`)
        })
      }
    })

    if (!uppy) return

    uppy.on('upload-progress', (file, progress) => {
      if(!progress || !progress.bytesTotal) return

      if (progress.bytesTotal > 0) {
        uploadProgress.value[file?.id ?? ''] = Math.round((progress.bytesUploaded / progress.bytesTotal) * 100)
      }

      const lessons = computed<ILesson[]>(() => store.getters['area_module/lessons'])
      
      const _lesson = lessons.value.find(l => l.id === lesson.id)

      if(_lesson){
          store.commit('area_module/UPDATE_PROGRESS', { percentage: uploadProgress.value[file?.id ?? ''], lesson_id: lesson.id })
      }
    })

    uppy.addFile({
      name: file_selected.value.name,
      type: file_selected.value.type,
      data: file_selected.value
    })

    const uploadProgress = ref<Record<string, number>>({})
    uppy.upload()
  }

  const get_lessons = (id_module: string) => {
    store.dispatch('area_module/get_lessons', id_module)
  }

  const delete_lesson = () => {
    store.dispatch('area_module/delete_lesson', { id_lesson: actual_id.value, id_module: module_selected.value.id })
      .then(() => is_delete_lesson.value = false)
  }

  const open_delete_lesson_dialog = (lesson_id: number) => {
    is_delete_lesson.value = true

    store.commit('area_module/SET_ACTUAL_ID', lesson_id)
  }

  const storage_file = (file: File): void  => {
    store.commit('area_module/STORAGE_FILE', file)
  }
  
  const toggle_status = (is_active: boolean, id: number) => {
    store.dispatch('area_module/update_status', { is_active, id })
      .catch(() => get_lessons(module_selected.value.id ?? ''))
  }

  const drag_end_lesson = () => {
    store.dispatch('area_module/update_order_lesson', {
      ordered_lessons: orderedLessons.value,
      module_id: Number(module_selected.value.id)
    })
  }

  const drag_end_module = () => {
    store.dispatch('area_module/update_order_module', orderedModules.value)
  }

  return {
    members_area_id,
    module_list,
    module_name,
    module_image_banner,
    module_image_cover,
    contentImage,
    content_image,
    complementary_content_files,
    complementaryContentFiles,
    content_files,
    module_selected,
    thumb_image,
    bannerImage,
    isSquareMode,
    isDeleting,
    isOptionsOpened,
    isFillModule,
    isAddOpened,
    content_release,
    order_bump,
    order_bump_list,
    content_name,
    content_description,
    isReleaseExceptionOpened,
    canCreate,
    canEdit,
    isEditingModule,
    can_add_module_content,
    isLoadingLessons,
    lessons,
    isLoadingAddLesson,
    module_thumb,
    is_processing_file,
    isLoadingModules,
    is_delete_lesson,
    isLoading,
    orderedLessons,
    orderedModules,
    add_lesson,
    toggleAddContent,
    toggle,
    onEdit,
    toggleReleaseException,
    onToggleConfirmDeleteDialog,
    onDelete,
    onToggleEdit,
    onToggleFillModuleDialog,
    onToggleEditModuleInfoDialog,
    onCreate,
    onGet,
    onOpenModule,
    onToggleModule,
    get_lessons,
    delete_lesson,
    open_delete_lesson_dialog,
    storage_file,
    toggle_status,
    drag_end_lesson,
    drag_end_module
  }
}
