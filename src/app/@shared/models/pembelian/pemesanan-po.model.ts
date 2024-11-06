import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace PemesananPoModel {
    export interface IPemesananPoHeader {
        id_pemesanan: number
        id_supplier: number
        kode_supplier: string
        nama_supplier: string
        alamat: string
        nomor_pemesanan: string
        tanggal_pemesanan: string
        tangal_expired_pemesanan: string
        tanggal_kirim: string
        id_lokasi: number
        nama_lokasi: string
        id_warehouse: number
        warehouse: string
        keterangan: string
        status_pemesanan: string
        qty: string
        sub_total1: string
        diskon_persen: string
        diskon_nominal: string
        sub_total2: string
        ppn_nominal: string
        total_transaksi: string
        created_at: string
        created_by: string
        updated_by: string
    }

    export interface IPemesananPoDetail {
        id_pemesanan_detail: number
        id_pemesanan: number
        urut: number
        id_barang: number
        barcode: string
        kode_barang: string
        nama_barang: string
        banyak: string
        banyak_terima: any
        kode_satuan: string
        nama_satuan: string
        isi: string
        qty: string
        qty_terima: any
        harga_order: string
        diskon_persen_1: string
        diskon_nominal_1: string
        diskon_persen_2: string
        diskon_nominal_2: string
        diskon_persen_3: string
        diskon_nominal_3: string
        sub_total: string
        qty_bonus: string
        nama_bonus: string
    }

    export interface IPemesananPo {
        id_pemesanan: number
        id_supplier: number
        kode_supplier: string
        nama_supplier: string
        alamat: string
        nomor_pemesanan: string
        tanggal_pemesanan: string
        tangal_expired_pemesanan: string
        tanggal_kirim: string
        id_lokasi: number
        nama_lokasi: string
        id_warehouse: number
        warehouse: string
        keterangan: string
        status_pemesanan: string
        qty: string
        sub_total1: string
        diskon_persen: string
        diskon_nominal: string
        sub_total2: string
        ppn_nominal: string
        total_transaksi: string
        created_at: string
        created_by: string
        updated_by: string
        detail_pemesanan: IPemesananPoDetail[]
    }

    export class GetAllPemesananPo implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IPemesananPo[]
    }

    export interface SavePemesananPo {
        id_supplier: number
        tanggal_pemesanan: string
        tangal_expired_pemesanan: string
        id_lokasi: number
        id_warehouse: number
        tanggal_kirim: string
        keterangan: string
        qty: number
        sub_total1: number
        diskon_persen: number
        diskon_nominal: number
        sub_total2: number
        ppn_nominal: number
        total_transaksi: number
        detail: SavePemesananPoDetail[]
    }

    export interface SavePemesananPoDetail {
        urut: number
        id_barang: number
        banyak: number
        kode_satuan: string
        isi: number
        qty: number
        harga_order: number
        diskon_persen_1: number
        diskon_nominal_1: number
        diskon_persen_2: number
        diskon_nominal_2: number
        diskon_persen_3: number
        diskon_nominal_3: number
        sub_total: number
        qty_bonus: number
        nama_bonus: string
    }

    export interface EditPemesananPo {
        id_pemesanan: number
        detail: SavePemesananPoDetail[]
    }


    export class GetByIdPemesananPo implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IPemesananPo
    }

}