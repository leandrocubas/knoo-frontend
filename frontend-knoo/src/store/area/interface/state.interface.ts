import type { IArea } from './area.interface'

export interface IAreaState {
    areas: Array<IArea>
    area: IArea | null
    isLoading: boolean
    addOpened: boolean
}