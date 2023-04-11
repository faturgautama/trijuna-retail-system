import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupDivisiModel {
    export interface ISetupDivisi {
        id_divisi: number
        kode_divisi: string
        divisi: string
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupDivisi {
        divisi: string
    }

    export interface UpdateSetupDivisi {
        id_divisi: string
        kode_divisi: string
        divisi: string
    }

    export class GetAllSetupDivisi implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupDivisi[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupDivisi[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}