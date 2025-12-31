import type { IDashboard } from '@/interfaces/dashboard.interface'


export interface IDashboardState {
    isLoading: boolean
    dashboard?: IDashboard
    initial_date: string
    finish_date: string
}