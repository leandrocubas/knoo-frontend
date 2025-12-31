import type { ILogin } from './signin.interface'

export interface ISignup extends ILogin {
    name: string;
}