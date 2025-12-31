import { ref, computed, toValue } from 'vue'
import { useStore } from 'vuex'
import type { IArea } from '@/store/area/interface/area.interface'
import { LayoutStyle } from '@/enums/layout.enum'
import { Media, type IMedia } from '@/interfaces/media.interface'

export function useArea() {
  const store = useStore()

  const isOptionsOpened = ref(false)
  const isAddOpened = computed(() => store.getters['area/addOpened'])
  const actual_area = computed<IArea | null>(() => store.getters['area/actual_area'])
  const isDeleting = ref(false)
  const area_id = ref<string | undefined>(undefined)
  const isCapturingAreaType = ref(false)
  const isFillAreaInfo = ref(false)
  const isEditingArea = ref(false)
  const isCarousel = ref(true)
  const isRows = ref(false)
  const isSquareMode = ref(true)
  const members_area_type = ref('')
  const members_area_name = ref('')
  const members_area_slug = ref('')
  const allow_comments = ref(true)
  const auto_approve_comments = ref(false)
  const area_image_logo = ref(new File([], ''))
  const image_logo = ref('')
  const image_logo_id = ref()
  const area_image_cover = ref(new File([], ''))
  const thumbnail_logo = ref('')
  const thumbnail_logo_id = ref()
  const isLoading = computed(() => store.getters['area/isLoading'])
  const canCreate = computed(() => _onValidateFields())
  const canEdit = computed(() => _onValidateEditFields())
  const area_media = ref()

  const _area = ref()
  const area_list = computed<IArea[]>(() => store.getters['area/area_list'])

  const resetFormFields = () => {
    members_area_name.value = ''
    members_area_slug.value = ''
    members_area_type.value = ''
    allow_comments.value = true
    auto_approve_comments.value = false
    area_image_logo.value = new File([], '')
    area_image_cover.value = new File([], '')
    image_logo.value = ''
    thumbnail_logo.value = ''
    area_media.value = undefined
  }

  const initForm = async (area: IArea) => {
    let thumbnailUrl = ''
    let logoUrl = ''

    members_area_type.value = area.area_type
    
    await area.media?.forEach(el => {
      if(el.media_type.toLowerCase() === 'thumbnail'){
        thumbnailUrl =  el.s3_url as string
        thumbnail_logo_id.value = el.id
        return
      }

      if(el.media_type.toLowerCase() === 'logo'){
        logoUrl = el.s3_url as string
        image_logo_id.value = el.id
        return
      }

    })

    members_area_name.value = area.area_name
    members_area_slug.value = area.slug
    image_logo.value = logoUrl
    thumbnail_logo.value = thumbnailUrl
  }

  const toggle = () => (isOptionsOpened.value = !isOptionsOpened.value)

  const toggleLayout = (type: LayoutStyle) => {
    isCarousel.value = type === LayoutStyle.CAROUSEL
    isRows.value = type === LayoutStyle.ROWS
  }

  const _onValidateFields = (): boolean => {
    return !!(
      toValue(members_area_type) &&
      toValue(members_area_name) &&
      toValue(members_area_slug)
    )
  }

  const _onValidateEditFields = (): boolean => {
    return !!(toValue(members_area_name) && toValue(members_area_slug))
  }

  const onGet = (id?: number) => store.dispatch('area/get', id)

  const onDelete = () => {
    isDeleting.value = false

    store.dispatch('area/delete', area_id.value).then(() => {
      store.commit('area/REMOVE_AREA', area_id.value)
    })
  }

  const onEdit = async (_area: IArea): Promise<any> => {
    let media_logo: IMedia = new Media()
    let media_thumbnail: IMedia = new Media()

    const submit = (data: { media_logo?: IMedia, media_thumbnail?: IMedia }) => {
      const updated_area: Partial<IArea> = {
        area_name: members_area_name.value,
        area_type: members_area_type.value,
        slug: members_area_slug.value,
        comments_allow: typeof allow_comments.value !== 'undefined'
          ? allow_comments.value
          : undefined,
        is_comments_auto_approve: typeof auto_approve_comments.value !== 'undefined'
          ? auto_approve_comments.value
          : undefined,
        layout_type: layout_type,
        id: area_id.value,
        media_id_logo: data.media_logo?.id,
        media_id_thumb: data.media_thumbnail?.id,
      }

      if(!updated_area.media_id_logo) delete updated_area.media_id_logo
      if(!updated_area.media_id_thumb) delete updated_area.media_id_thumb

      store
        .dispatch('area/edit', updated_area)
        .then((res) => {
          isEditingArea.value = false
          if(!updated_area.media_id_thumb) res.media.push({ s3_url: thumbnail_logo.value, media_type: 'Thumbnail'  })
          if(!updated_area.media_id_logo) res.media.push({ s3_url: image_logo.value, media_type: 'Logo'  })
          store.commit('area/REPLACE_AREA', { id: area_id.value, ...res })
        })
        .catch((error) => {
          console.error('Erro ao editar área:', error)
        })
    }

    const layout_type = isCarousel.value
      ? 'carrossel'
      : isRows.value
      ? 'fileira'
      : ''

    if(area_image_logo.value.size > 0 && area_image_cover.value.size > 0){
      const [ { id: id_logo, s3_url: url_logo }, { id: id_thumbnail, s3_url: url_thumbnail } ] = await Promise.all([
        store.dispatch('area/get_media_id', area_image_logo.value),
        store.dispatch('area/get_media_id', area_image_cover.value),
      ])

      media_logo.id = id_logo
      media_thumbnail.id = id_thumbnail
      image_logo.value = url_logo
      thumbnail_logo.value = url_thumbnail

      submit({media_logo , media_thumbnail })
      return
    }

    if(!area_image_logo.value.size && !area_image_cover.value.size){
        
      media_logo.id = image_logo_id.value
      media_thumbnail.id = thumbnail_logo_id.value
      image_logo.value = image_logo.value
      thumbnail_logo.value = thumbnail_logo.value

      submit({ media_logo , media_thumbnail })
      return
    }

    if(area_image_logo.value.size > 0){
      media_logo =  (await store.dispatch('area/get_media_id', area_image_logo.value))
      submit({ media_logo })
    }
    
    if(area_image_cover.value.size > 0){
      media_thumbnail =  (await store.dispatch('area/get_media_id', area_image_cover.value))
      submit({ media_thumbnail })
    }
  }

  const onToggleConfirmDeleteDialog = (
    id: string | undefined,
    _isDeleting: boolean
  ) => {
    area_id.value = id
    isDeleting.value = _isDeleting
  }

  const onToggleAreaTypeDialog = () => {
    resetFormFields()
    isCapturingAreaType.value = !toValue(isCapturingAreaType)
  }

  const onToggleFillAreaInfoDialog = () => {
    isFillAreaInfo.value = !toValue(isFillAreaInfo)
  }

  const onToggleEditAreaInfoDialog = (id?: string) => {
    isEditingArea.value = !toValue(isEditingArea)
    if (id) {
      area_id.value = id
    }
  }

  const onToggleEdit = (area?: IArea): void => {
    if (area) {
      _area.value = area
      onToggleEditAreaInfoDialog(area.id)
      initForm(area)
      return
    }

    onToggleEditAreaInfoDialog()
    _area.value = null
  }

  const onChangeMembersAreaType = (type: string) => {
    members_area_type.value = type
    isCapturingAreaType.value = false
    isFillAreaInfo.value = true
  }

  const onOpenArea = (area: IArea): void => {
    store.commit('area/AREA', area)
  }

  const onCreate = async () => {
    let media_id_logo
    let media_id_thumb

    onToggleFillAreaInfoDialog()

    const layout_type = isCarousel.value
      ? 'carrossel'
      : isRows.value
      ? 'fileira'
      : ''

    const [ { id: id_logo }, { id: id_thumbnail } ] = await Promise.all([
      area_image_logo.value.size > 0 ? store.dispatch('area/get_media_id', area_image_logo.value): Promise.resolve({ id: null }),
      area_image_cover.value.size > 0 ? store.dispatch('area/get_media_id', area_image_cover.value) : Promise.resolve({ id: null }),
    ])

    media_id_logo = id_logo
    media_id_thumb = id_thumbnail

    const area: IArea = {
      area_name: members_area_name.value,
      area_type: members_area_type.value,
      slug: members_area_slug.value,
      comments_allow: allow_comments.value,
      is_comments_auto_approve: auto_approve_comments.value,
      layout_type,
      media_id_logo,
      media_id_thumb,
    }

    !area.media_id_logo ? delete area.media_id_logo : null
    !area.media_id_thumb ? delete area.media_id_thumb : null

    store.dispatch('area/save_area', area).then((created_area) => {
      store.commit('area/ADD_AREA', created_area)
    })
  }

  const onToggleArea = (isActive: boolean, areaId: string) => {
    store
      .dispatch('area/toggle_area', { is_active: isActive, id: areaId })
      .then((response) => {
        store.commit('area/TOGGLE_AREA', { id: areaId, isActive: isActive })
        return response
      })
      .catch((error) => {
        console.error('Erro ao alterar o estado da área:', error)
      })
  }

  return {
    _area,
    area_list,
    actual_area,
    isSquareMode,
    isAddOpened,
    isDeleting,
    isCapturingAreaType,
    isFillAreaInfo,
    isEditingArea,
    isCarousel,
    isRows,
    canCreate,
    canEdit,
    isOptionsOpened,
    isLoading,
    members_area_name,
    members_area_slug,
    allow_comments,
    auto_approve_comments,
    image_logo,
    thumbnail_logo,
    area_image_cover,
    area_image_logo,
    onToggleConfirmDeleteDialog,
    onToggleAreaTypeDialog,
    onToggleEditAreaInfoDialog,
    toggleLayout,
    onDelete,
    onCreate,
    onGet,
    onToggleEdit,
    toggle,
    onEdit,
    onOpenArea,
    onChangeMembersAreaType,
    onToggleFillAreaInfoDialog,
    onToggleArea,
  }
}
