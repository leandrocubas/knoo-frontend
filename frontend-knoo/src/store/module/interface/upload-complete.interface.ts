export interface IUploadComplete {
    area_name: string,
    media_id: number,
    module_name: string,
    fileName: string,
    uploadId: string,
    key: string,
    parts: Array<IPart>
}


export interface IPart {
    ETag: string
    PartNumber: number
}