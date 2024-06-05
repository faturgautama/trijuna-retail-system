import { HttpRequestBaseModel } from "../../shared/http-request-base.model"
import { SettingHadiahBarangModel } from "./setting-hadiah-per-barang.model"
import { SettingHadiahMerkModel } from "./setting-hadiah-per-merk.model"
import { SettingHadiahSupplierModel } from "./setting-hadiah-per-supplier.model"

export namespace SettingHadiahGeneralModel {
    export interface ISettingHadiahGeneralHeader {
        id_promo_hadiah: number
        kode_promo_hadiah: string
        nama_promo_hadiah: string
        nilai_promo_hadiah: string
        is_kelipatan: boolean
        keterangan: string
        jumlah: number
        hadiah: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface ISettingHadiahGeneral {
        id_promo_hadiah: number
        kode_promo_hadiah: string
        nama_promo_hadiah: string
        nilai_promo_hadiah: string
        is_kelipatan: boolean
        keterangan: string
        jumlah: number
        hadiah: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
        barang: SettingHadiahBarangModel.ISettingHadiahBarang[]
        merk: SettingHadiahMerkModel.ISettingHadiahMerk[]
        supplier: SettingHadiahSupplierModel.ISettingHadiahSupplier[]
    }

    export class GetAllSettingHadiahGeneral implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingHadiahGeneralHeader[]
    }

    export class GetByIdSettingHadiahGeneral implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingHadiahGeneral
    }

    export interface SaveSettingHadiahGeneral {
        is_kelipatan: boolean
        kode_promo_hadiah: string
        nama_promo_hadiah: string
        nilai_promo_hadiah: number
        keterangan: string
        jumlah: number
        hadiah: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
    }

    export interface UpdateSettingHadiahGeneral {
        is_kelipatan: boolean
        kode_promo_hadiah: string
        nama_promo_hadiah: string
        nilai_promo_hadiah: number
        keterangan: string
        jumlah: number
        hadiah: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
    }
}