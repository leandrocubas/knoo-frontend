export interface IMedia {
    id?: number
    original_name?: string
    s3_name?: string
    s3_url?: string
    file_type?: string
}

export class Media implements IMedia {
    constructor(
        
        public id: number = 0,
        public original_name: string = '',
        public s3_name: string = '',
        public s3_url: string = '',
        public file_type: string = '',
        
    ){}
}