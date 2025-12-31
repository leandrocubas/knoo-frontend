import { Media, type IMedia } from '@/interfaces/media.interface'

export interface IAreaMedia {
  media_type: string
  nameS3: string
  s3_url?: string
  members_area_id: number
  id: number
}

export interface IArea {
  area_name: string
  area_type: string
  slug: string
  title?: string
  is_active?: boolean
  id?: string
  media?: Array<IAreaMedia>
  comments_allow: boolean
  is_comments_auto_approve: boolean
  layout_type: string
  media_id_logo?: number
  media_id_thumb?: number
}
