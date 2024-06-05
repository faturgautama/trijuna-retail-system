import { HttpRequestBaseModel } from "../../shared/http-request-base.model"
import { SettingBonusBarangPerBarangModel } from "./setting-bonus-per-barang.model"

export namespace SettingBonusBarangGeneralModel {
    export interface ISettingBonusBarangGeneralHeader {
        id_promo_bonus: number
        kode_promo_bonus: string
        nama_promo_bonus: string
        is_kelipatan: boolean
        keterangan: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
        id_barang: number
        kuota: number
    }

    export interface ISettingBonusBarangGeneral {
        id_promo_bonus: number
        kode_promo_bonus: string
        nama_promo_bonus: string
        is_kelipatan: boolean
        keterangan: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
        is_active: boolean
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
        id_barang: number
        kuota: number
        barang: SettingBonusBarangPerBarangModel.ISettingBonusBarangPerBarang[]
    }

    export class GetAllSettingBonusBarangGeneral implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingBonusBarangGeneralHeader[]
    }

    export class GetByIdSettingBonusBarangGeneral implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingBonusBarangGeneral
    }

    export interface SaveSettingBonusBarangGeneral {
        kode_promo_bonus: string
        nama_promo_bonus: string
        is_kelipatan: boolean
        id_barang: number
        kuota: number
        keterangan: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
    }

    export interface UpdateSettingBonusBarangGeneral {
        kode_promo_bonus: string
        nama_promo_bonus: string
        is_kelipatan: boolean
        id_barang: number
        kuota: number
        keterangan: string
        tanggal_mulai: string
        tanggal_berakhir: string
        gambar: string
    }
}