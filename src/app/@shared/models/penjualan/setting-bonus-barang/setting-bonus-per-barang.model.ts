import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SettingBonusBarangPerBarangModel {
    export interface ISettingBonusBarangPerBarang {
        id_promo_bonus_barang: number
        kode_barang: string
        barcode: string
        nama_barang: string
        image: any
        warna: string
    }

    export class GetAllSettingBonusBarangPerBarang implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingBonusBarangPerBarang[]
    }

    export interface SaveSettingBonusBarangPerBarang {
        id_promo_bonus: number
        id_barang: number
    }
}