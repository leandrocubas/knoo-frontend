import type { ILesson } from './interface/lesson.interface'
import type { IModule } from './interface/module.interface'
import type { IModuleState } from './interface/state.interface'
import type { IUploadProccess } from './interface/upload-proccess.interface'
import { uniqBy } from 'lodash'
export const mutations = {  
  SET_LOADING_ADD_LESSON(state: IModuleState, isLoading: boolean) {
    state.isLoadingAddLesson = isLoading
  },
  SET_LOADING_LESSONS(state: IModuleState, isLoading: boolean) {
    state.isLoadingLessons = isLoading
  },
  SET_LOADING(state: IModuleState, isLoading: boolean) {
    state.isLoading = isLoading
  },
  SET_MODULE_LOADING(state: IModuleState, isLoading: boolean) {
    state.isLoadingModules = isLoading
  },
  SET_MODULE_LIST(state: IModuleState, modules: Array<IModule>) {
    state.modules = modules
  },
  TOGGLE_ADD_CONTENT(state: IModuleState, opened: boolean) {
    state.addOpened = opened
  },
  ADD_MODULE_LIST(state: IModuleState, module: IModule) {
    state.modules = [module, ...state.modules]
  },
  REMOVE_MODULE(state: IModuleState, id: string) {
    state.modules = state.modules.filter((module) => module.id !== id)
  },
  REPLACE_MODULE(state: IModuleState, updated_module: IModule) {
    const oldIndex = state.modules.findIndex(
      (_module) => updated_module.id === _module.id
    )
    state.modules[oldIndex] = { ...updated_module }
  },
  TOGGLE_MODULE(
    state: IModuleState,
    { id, isActive }: { id: string; isActive: boolean }
  ) {
    const module = state.modules.find((module) => module.id === id)
    if (module) {
      module.is_active = isActive
    }
  },
  MODULE(state: IModuleState, module: IModule | null) {
    if(module){
      module.area_type = module?.members_area?.area_type ?? ''
    }

    state.module = module
  },
  ADD_LESSON(state: IModuleState, lesson: ILesson) {
    state.lessons = [lesson, ...state.lessons]
  },
  SET_LESSONS(state: IModuleState, lessons: Array<ILesson>) {
    const progress_lessons = state.lessons.filter(item => item.hasOwnProperty('is_in_progress'))

    if(progress_lessons.length){
      state.lessons = uniqBy([...progress_lessons, ...lessons], 'id');
      return
    }

    state.lessons = lessons && lessons.length ? lessons : []

  },
  UPDATE_PROGRESS(state: IModuleState, data: { percentage: number, lesson_id: number }) {
    const index = state.lessons.findIndex(el => el.id === data.lesson_id)
    state.lessons[index].is_in_progress = true  
    state.lessons[index].percentage = data.percentage
  },

  FINISH_PROGRESS(state: IModuleState, finish: { media_id: number, upload_id: string, key: string, lesson_id: number }) {
    const index = state.lessons.findIndex(el => el.id === finish.lesson_id)
    
    if(index >= 0){
      state.lessons[index].is_in_progress = false
    }
    
  },
  SET_MODULE_THUMB(state: IModuleState, module_thumb: string) {
    state.module_thumb = module_thumb
  },
  IS_PROCESSING_FILE(state: IModuleState, processing_file: boolean) {
    state.processing_file = processing_file
  },
  SET_UPLOADINGS_PROCCESS(state: IModuleState, uploadings: Array<IUploadProccess>) {
    state.uploadings_in_proccess = uploadings
  },
  SET_ACTUAL_ID(state: IModuleState, id: number){
    state.actual_id = id
  },
  STORAGE_FILE(state: IModuleState, file: File){
    state.selected_file = file
  },
  INIT_MODULE_LIST_IS_SELECT(state: IModuleState){
    state.modules = state.modules.map(el => ({ ...el, is_selected: true }))
  },
}
