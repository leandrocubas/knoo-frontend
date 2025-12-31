import { Pixel, type IPixel } from '@/interfaces/pixel.interface'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export function usePixel() {
    const store = useStore()
    const isAdding = ref(false)
    const isLoading = ref(false)
    const pixel = ref<IPixel>(new Pixel())
    const pixels_to_add = computed(() => store.getters['pixel/list_to_add'])
    const isEditingPixel = ref(false)
    const pixelToEdit = ref<IPixel>(new Pixel())

    const onTogglePixelDialog = () => {
        isAdding.value = !isAdding.value
    }

    const addPixel = async () => {
        await store.commit('pixel/ADD_PIXEL', pixel.value)
        onTogglePixelDialog()

        pixel.value = new Pixel()
    }

    const editPixel = async (pixel: IPixel) => {
        await store.commit('pixel/EDIT_PIXEL', pixel)
    }

    const setPixelList = async (list: Array<IPixel>) => {
        await store.commit('pixel/SET_PIXEL_LIST', list)
    }

    const cleanList = () => {
        store.commit('pixel/CLEAN_LIST')
    }

    const toggleEditPixelDialog = async (pixel: IPixel | null) => {
        isEditingPixel.value = !isEditingPixel.value
    
        if(!pixel) {
            pixelToEdit.value = new Pixel()
            return
        }
    
        pixelToEdit.value = pixel
    }

    const onEdit = async () => {
        await editPixel(pixelToEdit.value)
        isEditingPixel.value = !isEditingPixel.value
    }

    return {
        isAdding,
        isLoading,
        pixel,
        pixels_to_add,
        isEditingPixel,
        pixelToEdit,
        onTogglePixelDialog,
        addPixel,
        cleanList,
        setPixelList,
        editPixel,
        toggleEditPixelDialog,
        onEdit
    }
}