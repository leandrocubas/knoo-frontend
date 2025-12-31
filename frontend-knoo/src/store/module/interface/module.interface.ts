interface IMediaS3 {
  nameS3: string
}

export interface IMedia {
  media?: IMediaS3
  s3_url?: string
  media_type?: string
}

export interface IModule {
  module_name: string
  description: string
  is_active?: boolean
  id?: string
  module_id?: number
  banner?: IMedia
  thumbnail?: IMedia
  is_selected: boolean
  media?: Array<IMedia>,
  title: string
  area_type: string
  members_area?: { area_type: string, members_area_id: string }
}
