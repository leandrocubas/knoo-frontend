import type { IModuleState } from '@/store/module/interface/state.interface'

export const module_state: IModuleState = {
    modules: [],
    module: null,
    selected_file: null,
    isLoadingLessons: false,
    isLoadingAddLesson: false,
    isLoading: false,
    uploadings_in_proccess: [],
    lessons: [],
    processing_file: false,
    actual_id: 0,
    isLoadingModules: false,
    module_thumb: '',
    addOpened: false
}