export interface IPeriod {
    id: number
    label: string
    isSelected: boolean,
    value: { initial_date: string, finish_date: string }
}