
import { computed, ref } from 'vue'
import { moduleService } from '@/store/module/services'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
import { useStorage } from './composables/useStorage'
import { WebsocketEnum } from './enums/websocket.enum'
import type { ILesson } from './store/module/interface/lesson.interface'
import { LoginEnum } from './enums/login.enum'

const { onConnectWSS } = moduleService()
const { set, get } = useStorage()

const websocketInstance = ref();

export const initializeWebSocket = () => {
    const toast = useToast()
    const store  = useStore()

    if (!websocketInstance.value) {
        websocketInstance.value = onConnectWSS((_, event: MessageEvent<string>) => {
            const upload = JSON.parse(event.data)
            if(upload.type === 'session-id'){
                set(WebsocketEnum.SESSION_ID, upload.session_id)
                return
            }

            if(upload.type === 'need-token'){
                const token = get(LoginEnum.TOKEN_KEY)
                sendMessage({ type: 'is-token', token })
                return
            }
            

            if(upload.type === `uploading-file-progress`) {
                if(upload){
                    const lessons = computed<ILesson[]>(() => store.getters['area_module/lessons'])

                    const lesson_id = upload.lesson_id ?? upload.id
                    
                    const lesson = lessons.value.find(lesson => lesson.id === lesson_id)

                    if(lesson){
                        store.commit('area_module/UPDATE_PROGRESS', { percentage: upload.percentage, lesson_id: lesson_id })
                    }
                    
                    return
                }
            }

            if(upload.type === 'uploading-file-finish') {
                on_complete_upload(upload)
                toast.success(`O vídeo ${upload.key} acabou de ser finalizado com sucesso!`)
                return
            }
        });
    }
    
    const on_complete_upload = (finish: { media_id: number, upload_id: string, key: string, lesson_id: number }) => {
        store.commit('area_module/FINISH_PROGRESS', finish)
    }
};


export const sendMessage = <T>(message: T) => {
    websocketInstance.value?.send(JSON.stringify(message));
};
