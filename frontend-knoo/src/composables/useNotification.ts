import { ref } from 'vue'

export interface INotification {
    date: string
    value: number
    title: string
}

export function useNotifications(){
    
    const isOpened = ref(false)
    const notifications = ref<Array<INotification>>([
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
        { title: 'Venda realizada no Pix', date: '21/03 11:00', value: 1000 },
    ])

    const toggle = () => isOpened.value = !isOpened.value
    
    
    
    return {
        isOpened,
        toggle,
        notifications
    }
}