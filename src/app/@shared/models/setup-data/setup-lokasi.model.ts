import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupLokasiModel {
    export interface ISetupLokasi {
        id_lokasi: number
        kode_lokasi: string
        nama_lokasi: string
        alamat: string
        telepon: string
        npwp: string
        server: string
        is_use: boolean
        is_active: boolean
        created_at: string
        updated_at: string
    }

    export interface SaveSetupLokasi {
        kode_lokasi: string
        nama_lokasi: string
        alamat: string
        telepon: string
        npwp: string
        server: string
        is_use: boolean
    }

    export interface UpdateSetupLokasi {
        id_lokasi: string
        kode_lokasi: string
        nama_lokasi: string
        alamat: string
        telepon: string
        npwp: string
        server: string
        is_use: boolean
    }

    export class GetAllSetupLokasi implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupLokasi[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupLokasi[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}