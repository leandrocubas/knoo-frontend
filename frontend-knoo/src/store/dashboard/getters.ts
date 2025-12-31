import type { IDashboard } from '@/interfaces/dashboard.interface'
import type { IDashboardState } from './interface/state.interface'


export const getters = {
    isLoading: (state: IDashboardState): boolean => state.isLoading,
    dashboard: (state: IDashboardState): IDashboard | undefined => state.dashboard
};