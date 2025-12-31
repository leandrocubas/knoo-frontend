import type { IModule } from '@/store/module/interface/module.interface'
import type { IModuleState } from '@/store/module/interface/state.interface'
import type { ILesson } from './interface/lesson.interface'
import type { IUploadProccess } from './interface/upload-proccess.interface'
import { sortBy } from 'lodash'

export const getters = {
  isLoadingAddLesson: (state: IModuleState): boolean => state.isLoadingAddLesson,
  isLoadingLessons: (state: IModuleState): boolean => state.isLoadingLessons,
  isLoadingModules: (state: IModuleState): boolean => state.isLoadingModules,
  isLoading: (state: IModuleState): boolean => state.isLoading,
  module_list: (state: IModuleState) => state.modules,
  addOpened: (state: IModuleState): boolean => state.addOpened,
  module_selected: (state: IModuleState): IModule | null => state.module,
  lessons: (state: IModuleState): Array<ILesson> => sortBy(state.lessons, ['is_in_progress'], ['desc']),
  module_thumb: (state: IModuleState): string => state.module_thumb,
  is_processing_file: (state: IModuleState): boolean => state.processing_file,
  uploadings_in_proccess: (state: IModuleState): Array<IUploadProccess> => state.uploadings_in_proccess,
  actual_id: (state: IModuleState): number => state.actual_id,
  file_selected: (state: IModuleState): File | null => state.selected_file
}
