import type { IUploadProcess } from '@/store/database/interface/upload-processs.interface'
import Dexie, { type Table } from 'dexie'

class MyDatabase extends Dexie {
  uploads!: Table<IUploadProcess>

  constructor() {
      super('UploadingsInProccess')
      this.version(1).stores({
          uploads: '++id, lesson_id, total_size, total_loaded'
      })
  }
}

const db = new MyDatabase()

export default db
