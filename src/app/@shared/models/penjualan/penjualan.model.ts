import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace PenjualanModel {
    export interface IPenjualanHeader {
        id_penjualan: number
        id_user_kasir: number
        nama_kasir: string
        is_bayar: boolean
        tanggal_penjualan: string
        nota_penjualan: string
        id_member: any
        total_diskon_dalam: string
        total_transaksi: string
        diskon_luar_persen: string
        diskon_luar_nominal: string
        ongkos_kirim: string
        pembulatan: string
        total_transaksi2: string
        total_bayar: string
        kembali: string
        biaya_bank: string
        is_using_voucher: boolean
        id_pos_kasir: string
        id_tutup_kasir: any
        is_deleted: boolean
        deleted_at: any
        deleted_reason: any
        deleted_by: any
        created_by: string
        created_at: string
        updated_by: string
        updated_at: string
    }

    export interface IPenjualanDetailItem {
        id_penjualan: number
        id_penjualan_detail: number
        urut: number
        id_barang: number
        barcode: string
        nama_barang: string
        kode_satuan: string
        harga_jual: string
        diskon1: string
        diskon2: string
        display_diskon1: string
        display_diskon2: string
        sub_total: string
    }

    export interface IPenjualanDetailPayment {
        id_penjualan_peyment: number
        id_penjualan: number
        urut: number
        jenis_pembayar: string
        jumlah_bayar: string
        keterangan: any
        id_voucher: any
        id_payment_method: number
        nama_payment_method: string
        id_bank: any
        nama_bank: any
        id_edc: any
        nama_edc: any
        trace_number: any
        jenis_kartu: any
        card_holder: any
        tanggal_jatuh_tempo_piutang: any
        keterangan_piutang: any
        created_at: string
        updated_at: string
    }

    export interface IPenjualan {
        id_penjualan: number
        id_user_kasir: number
        nama_kasir: string
        is_bayar: boolean
        tanggal_penjualan: string
        nota_penjualan: string
        id_member: any
        total_diskon_dalam: string
        total_transaksi: string
        diskon_luar_persen: string
        diskon_luar_nominal: string
        ongkos_kirim: string
        pembulatan: string
        total_transaksi2: string
        total_bayar: string
        kembali: string
        biaya_bank: string
        is_using_voucher: boolean
        id_pos_kasir: string
        id_tutup_kasir: any
        is_deleted: boolean
        deleted_at: any
        deleted_reason: any
        deleted_by: any
        created_by: string
        created_at: string
        updated_by: string
        updated_at: string
        detail: IPenjualanDetailItem[]
        payment: IPenjualanDetailPayment[]
    }

    export class GetAllPenjualan implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IPenjualanHeader[]
    }

    export class GetByIdPenjualan implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IPenjualan
    }

    export interface ISellOutItem {
        kode_barang: string
        barcode: string
        nama_barang: string
        id_barang: number
        id_divisi: number
        divisi: string
        id_group: number
        group: string
        kode_satuan: string
        id_merk: number
        merk: any
        qty_jual: string
        harga_jual: string
    }

    export class GetAllSellOutItem implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISellOutItem[]
    }

}