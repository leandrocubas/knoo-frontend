import type { IDashboardState } from './interface/state.interface'
import { Dashboard } from '@/interfaces/dashboard.interface'

export const dashboard_state: IDashboardState = {
    isLoading: false,
    dashboard: new Dashboard()
}