import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SettingHadiahSupplierModel {
    export interface ISettingHadiahSupplier {
        id_promo_diskon_setting_supplier: number
        kode_supplier: string
        nama_supplier: string
    }

    export class GetAllSettingHadiahSupplier implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingHadiahSupplier[]
    }

    export interface SaveSettingHadiahSupplier {
        id_promo_diskon: number
        id_supplier: number
    }
}