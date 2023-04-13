import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SettingHargaModel {
    export interface ISettingHarga {
        id_setting_harga: number
        id_lokasi: number
        nama_lokasi: string
        tanggal_mulai_berlaku: string
        created_by: string
        updated_by: string
        created_at: string
        updated_at: string
        detail: ISettingHargaDetail[]
    }

    export interface ISettingHargaDetail {
        id_setting_harga_detail: number
        tanggal_mulai_berlaku: string
        id_setting_harga: number
        id_barang: number
        barcode: string
        kode_barang: string
        nama_barang: string
        harga_jual: string
        qty_grosir1: string
        harga_grosir1: string
        qty_grosir2: string
        harga_grosir2: string
        prioritas: number
        created_at: string
        updated_at: string
        lokasi: ISettingHargaDetailLokasi[]
    }

    export interface ISettingHargaDetailLokasi {
        id_setting_harga_detail_lokasi: number
        id_setting_harga_detail: number
        id_lokasi: number
        nama_lokasi: string
        created_at: string
        updated_at: string
    }

    export interface SaveSettingHarga {
        id_lokasi: number
        tanggal_mulai_berlaku: string
        detail: SaveSettingHargaDetail[]
    }

    export interface SaveSettingHargaDetail {
        id_barang: number
        harga_jual: number
        qty_grosir1: number
        harga_grosir1: number
        qty_grosir2: number
        harga_grosir2: number
        lokasi: number[]
    }

    export class GetAllSettingHarga implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingHarga[]
    }

    export class GetByIdSettingHarga implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingHarga
    }
}