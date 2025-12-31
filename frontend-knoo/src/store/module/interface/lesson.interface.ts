export interface ILessonMedia {
    lesson_content: string
    lesson_thumb: string
    lesson_attachment: string
}

export interface ILesson {
    lesson_name: string
    description: string
    id?: number
    modules_id: number
    is_active?: boolean
    media_id_thumb?: number
    media_id_attachment?: number 
    media_id_content?: number
    default_release_lesson: number | 'custom'
    custom_release_date?: string
    lesson_thumb?: string
    is_in_progress?: boolean
    percentage?: number
    media?: ILessonMedia
}