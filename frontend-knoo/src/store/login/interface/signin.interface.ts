export interface ILogin {
    email: string
    password: string
    token?: string
}

export interface ILoginResponse {
    data: string
    email: string
    message: string
    success: boolean
}