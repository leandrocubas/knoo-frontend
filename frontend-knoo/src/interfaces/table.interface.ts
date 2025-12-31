export interface ITableHeader {
    key: string
    label: string
    mask?: string
    isMoney?: boolean
    isDate?: boolean
    format?: string
    align?: 'center' | 'right' | 'left'
}

export interface ITable<T> {
    headers: Array<ITableHeader>
    data: Array<T>
}