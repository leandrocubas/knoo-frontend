import { ref, computed, toValue } from 'vue'
import { useStore } from 'vuex'
import type { IModule } from '@/store/module/interface/module.interface'
import type { IMembership, IMembershipModule } from '@/store/membership/interface/membership.interface'

export function useMembership() {
  const store = useStore()
  const isDeleting = ref(false)
  const isEditing = ref(false)
  const isAddOpened = ref(false)
  const editing_modules = ref<Array<IMembershipModule>>()
  const module_list = computed<IModule[]>(
    () => store.getters['area_module/module_list']
  )

  const isLoading = computed(() => store.getters['membership/isLoading'])
  const membership_id = ref<string | undefined>(undefined)

  const membership_list = computed<IMembership[]>(() => store.getters['membership/membership_list'])

  const membership_offer = ref()
  const membership_offer_label = ref()
  const membership_offer_list = computed(() => store.getters['membership/membership_offer_list'])

  const offer_id = ref<string>()

  const onGet = async (id?: string) => {
    if (id) {
      membership_id.value = id
    }

    await store.dispatch('membership/get', id)
  }

  const onDelete = () => {
    if (!membership_id.value) {
      return
    }

    store
      .dispatch('membership/delete', {
        membership_id: membership_id.value,
        offer_id: offer_id.value,
      })
      .then(() => {
        isDeleting.value = false
        store.commit('membership/REMOVE_MEMBERSHIP', membership_id.value)
        store.dispatch('membership/get', membership_id.value)
      })
  }

  const onGetMembershipOffer = async (id?: string) => {
    store.dispatch('membership/get_membership_offer_list', id)
  }

  const onCreate = async () => {

    const modules = module_list.value.map((module, index) => ({
      id: module.id,
      is_selected: module.is_selected,
    }))

    const payload = {
      members_area_id: membership_id.value,
      product_offering_id: membership_offer.value,
      modules,
    }
    await store.dispatch('membership/create', payload).then(() => toggleOppened())
  }

  const onToggleConfirmDeleteDialog = (
    offerId: string | undefined,
    _isDeleting: boolean
  ) => {
    isDeleting.value = _isDeleting
    offer_id.value = offerId
  }

  const toggleOppened = (id?: string | string[]) => {
    isAddOpened.value = !toValue(isAddOpened)

    store.commit('area_module/INIT_MODULE_LIST_IS_SELECT')

    if (isAddOpened.value && typeof id === 'string') onGetMembershipOffer(id)
  }

  const onEdit = async () => {
    if (!membership_id.value || !offer_id.value) {
      return
    }

    const modules = editing_modules.value?.map((module) => ({
      id: module.module_id,
      is_selected: module.is_selected,
    })) ?? []

    const update_payload = {
      members_area_id: membership_id.value,
      product_offering_id: membership_offer.value,
      modules,
    }

    await store.dispatch('membership/edit', update_payload).then((res) => {
      isEditing.value = false
      store.commit('membership/REPLACE_MODULE', {
        id: offer_id.value,
        ...res,
      })
    })
  }

  const onToggleConfirmEditDialog = (membership?: IMembership) => {
    isEditing.value = !isEditing.value

    if(membership) {
      offer_id.value = membership.product_offering_id
      editing_modules.value = membership.modules
      membership_offer.value = membership.product_offering_id
      membership_offer_label.value = membership.offer_name
    }
  }

  return {
    onGet,
    onGetMembershipOffer,
    onCreate,
    onToggleConfirmDeleteDialog,
    onDelete,
    onEdit,
    onToggleConfirmEditDialog,
    toggleOppened,
    membership_offer_label,
    isAddOpened,
    membership_offer,
    membership_offer_list,
    isLoading,
    membership_list,
    isDeleting,
    isEditing,
    editing_modules,
  }
}
