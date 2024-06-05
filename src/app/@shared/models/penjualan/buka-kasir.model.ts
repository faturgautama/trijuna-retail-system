import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace BukaKasirModel {
    export interface IBukaKasir {
        id_modal_kasir: number
        id_user_kasir: number
        tanggal_modal_kasir: string
        modal_kasir: string
        is_deleted: boolean
        deleted_by: any
        deleted_at: any
        deleted_reason: any
        created_by: number
        updated_by: number
        id_tutup_kasir: any
        created_at: string
        updated_at: string
    }

    export class GetAllBukaKasir implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IBukaKasir[]
    }

    export class GetByIdBukaKasir implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IBukaKasir
    }

    export interface SaveBukaKasir {
        id_user_kasir: number
        tanggal_modal_kasir: string
        modal_kasir: number
    }

    export interface UpdateBukaKasir {
        id_user_kasir: number
        tanggal_modal_kasir: string
        modal_kasir: number
    }
}