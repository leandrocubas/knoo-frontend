export type Header = {
    title: string
}

export type Route = {
    currentParentRoute: string
}

export interface IPage {
    header: Header,
    route: Route
}