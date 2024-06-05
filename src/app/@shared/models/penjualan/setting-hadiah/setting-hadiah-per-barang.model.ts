import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SettingHadiahBarangModel {
    export interface ISettingHadiahBarang {
        id_promo_hadiah_setting_barang: number
        kode_barang: string
        barcode: string
        nama_barang: string
        image: string
        warna: string
    }

    export class GetAllSettingHadiahBarang implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingHadiahBarang[]
    }

    export interface SaveSettingHadiahBarang {
        id_promo_hadiah: number
        id_barang: number
    }
}