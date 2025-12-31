import type { IUploadProcess } from './interface/upload-processs.interface'
import { ref } from 'vue'

import db from '@/database'

export function dbService() {
    

    const uploads = ref<IUploadProcess[]>([])

    const add = async (upload: IUploadProcess) => {
        await db.uploads.add(upload)
        await fetch()
    }

    const deletee = async (upload: IUploadProcess) => {
        await db.uploads.delete(upload.id)
        await fetch()
    }
    
    const fetch = async () => {
        uploads.value = await db.uploads.toArray()
    }


    return {
        add,
        fetch,
        delete: deletee
    }
}