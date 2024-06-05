import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SettingDiskonBarangModel {
    export interface ISettingDiskonBarang {
        id_promo_diskon_setting_barang: number
        kode_barang: string
        barcode: string
        nama_barang: string
        image: string
        warna: string
    }

    export class GetAllSettingDiskonBarang implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingDiskonBarang[]
    }

    export interface SaveSettingDiskonBarang {
        id_promo_diskon: number
        id_barang: number
    }
}