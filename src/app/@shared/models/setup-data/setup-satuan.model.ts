import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupSatuanModel {
    export interface ISetupSatuan {
        id_satuan: number
        kode_satuan: string
        nama_satuan: string
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupSatuan {
        kode_satuan: string
        nama_satuan: string
    }

    export interface UpdateSetupSatuan {
        id_satuan: number
        kode_satuan: string
        nama_satuan: string
    }

    export class GetAllSetupSatuan implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupSatuan[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupSatuan[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}