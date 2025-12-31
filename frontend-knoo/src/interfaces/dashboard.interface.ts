export interface IDashboard {
    total_sales: number
    total_billed: number
    percentage_chargeback: number
    total_chargeback: number
    percentage_refund: number
    total_refund: number
    total_orderbump_sales: number
    total_card_sales: number
    total_pix_sales: number
    total_billet_sales: number
    graphics: IGraphics
}

export interface IGraphics {
    sales_period_graphic: {
        categories: Array<string>
        data: Array<number>
    }
}

export class Dashboard implements IDashboard {
    constructor(
        public total_sales: number = 0,
        public total_billed: number = 0,
        public percentage_chargeback: number = 0,
        public total_chargeback: number = 0,
        public percentage_refund: number = 0,
        public total_refund: number = 0,
        public total_orderbump_sales: number = 0,
        public total_card_sales: number = 0,
        public total_pix_sales: number = 0,
        public total_billet_sales: number = 0,
        public graphics: IGraphics = new Graphics(),
    ){}
}

export class Graphics implements IGraphics {
    constructor(
        public sales_period_graphic: { categories: string[], data: number[] } = { categories: [], data: [] }
    ){}
}