import type { ILesson } from './lesson.interface'
import type { IModule } from './module.interface'
import type { IUploadProccess } from './upload-proccess.interface'

export interface IModuleState {
    modules: Array<IModule>
    module: IModule | null
    lessons: Array<ILesson>
    processing_file: boolean
    selected_file: File | null
    isLoadingModules: boolean
    isLoading: boolean
    uploadings_in_proccess: Array<IUploadProccess>
    module_thumb: string
    isLoadingAddLesson: boolean
    isLoadingLessons: boolean
    actual_id: number
    addOpened: boolean
}