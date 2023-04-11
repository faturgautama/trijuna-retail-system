import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupRakModel {
    export interface ISetupRak {
        id_rak: number
        kode_rak: string
        nama_rak: string
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupRak {
        nama_rak: string
    }

    export interface UpdateSetupRak {
        id_rak: string
        kode_rak: string
        nama_rak: string
    }

    export class GetAllSetupRak implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupRak[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupRak[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}