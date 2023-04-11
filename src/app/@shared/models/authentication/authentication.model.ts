import { HttpRequestBaseModel } from "../shared/http-request-base.model";

export namespace LoginModel {
    export interface ILogin {
        email: string;
        password: string;
    }

    export interface ILoginResponse {
        id_user: number
        nama: string
        id_group: number
        id_level: number
        email: string
        email_verified_at: any
        is_active: number
        remember_token: any
        created_at: string
        updated_at: string
        token: string
    }

    export class Login implements HttpRequestBaseModel {
        success!: boolean;
        message!: string;
        data!: ILoginResponse
    }
}