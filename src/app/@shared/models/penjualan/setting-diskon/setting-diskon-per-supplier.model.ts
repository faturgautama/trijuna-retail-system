import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SettingDiskonSupplierModel {
    export interface ISettingDiskonSupplier {
        id_promo_diskon_setting_supplier: number
        kode_supplier: string
        nama_supplier: string
    }

    export class GetAllSettingDiskonSupplier implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingDiskonSupplier[]
    }

    export interface SaveSettingDiskonSupplier {
        id_promo_diskon: number
        id_supplier: number
    }
}