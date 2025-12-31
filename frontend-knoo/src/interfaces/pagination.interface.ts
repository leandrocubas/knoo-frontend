export interface IPagination {
    totalItems: number
    pageSize: number
    pageIndex: number
}

export class Pagination implements IPagination {
    public totalItems: number = 0
    public pageSize: number = 10
    public pageIndex: number = 0

    constructor()
    constructor(params: IPagination)
    constructor(params?: IPagination) {
        this.totalItems = params?.totalItems ?? 0
        this.pageSize = params?.pageSize ?? 10
        this.pageIndex = params?.pageIndex ?? 10
    }
}