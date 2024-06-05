import { HttpRequestBaseModel } from "../../shared/http-request-base.model"
import { SettingDiskonBarangModel } from "./setting-diskon-per-barang.model"
import { SettingDiskonMerkModel } from "./setting-diskon-per-merk.model"
import { SettingDiskonSupplierModel } from "./setting-diskon-per-supplier.model"

export namespace SettingDiskonGeneralModel {
    export interface ISettingDiskonGeneralHeader {
        id_promo_diskon: number
        is_nominal: boolean
        kode_promo_diskon: string
        nama_promo_diskon: string
        minimal_qty: string
        diskon: string
        kuota: number
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface ISettingDiskonGeneral {
        id_promo_diskon: number
        is_nominal: boolean
        kode_promo_diskon: string
        nama_promo_diskon: string
        minimal_qty: string
        diskon: string
        kuota: number
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
        barang: SettingDiskonBarangModel.ISettingDiskonBarang[]
        merk: SettingDiskonMerkModel.ISettingDiskonMerk[]
        supplier: SettingDiskonSupplierModel.ISettingDiskonSupplier[]
    }

    export class GetAllSettingDiskonGeneral implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingDiskonGeneralHeader[]
    }

    export class GetByIdSettingDiskonGeneral implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingDiskonGeneral
    }

    export interface SaveSettingDiskonGeneral {
        is_nominal: boolean
        kode_promo_diskon: string
        nama_promo_diskon: string
        minimal_qty: number
        diskon: number
        kuota: number
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
    }

    export interface UpdateSettingDiskonGeneral {
        is_nominal: boolean
        kode_promo_diskon: string
        nama_promo_diskon: string
        minimal_qty: number
        diskon: number
        kuota: number
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
    }
}