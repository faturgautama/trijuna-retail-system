import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace PembelianDenganPoModel {
    export interface IPembelianDenganPoHeader {
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

    export interface IPembelianDenganPoDetail {
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

    export interface IPembelianDenganPo {
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
        detail_pemesanan: IPembelianDenganPoDetail[]
    }

    export class GetAllPembelianDenganPo implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IPembelianDenganPo[]
    }

    export interface SavePembelianDenganPo {
        id_pemesanan: number
        no_nota: string
        tanggal_nota: string
        id_lokasi: number
        id_warehouse: number
        keterangan: string
        qty: number
        sub_total1: number
        diskon_persen: number
        diskon_nominal: number
        sub_total2: number
        ppn_nominal: number
        pembulatan: number
        total_transaksi: number
        total_biaya_barcode: number
        detail: SavePembelianDenganPoDetail[]
    }

    export interface SavePembelianDenganPoDetail {
        id_pemesanan_detail: number
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
        biaya_barcode: number
    }

    export class GetByIdPembelianDenganPo implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IPembelianDenganPo
    }

    export interface ValidasiPembelianDenganPo {
        id_penerimaan: number
        sub_total1: number
        diskon_persen: number
        diskon_nominal: number
        sub_total2: number
        ppn_nominal: number
        pembulatan: number
        total_transaksi: number
        total_biaya_barcode: number
        detail: SavePembelianDenganPoDetail[]
    }
}