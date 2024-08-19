import { HttpRequestBaseModel } from "../shared/http-request-base.model";

export namespace MutasiLokasiModel {
    export interface IMutasiLokasi {
        id_mutasi_lokasi: number
        tanggal_mutasi_lokasi: string
        nomor_mutasi: string
        lokasi_asal: number
        nama_lokasi_asal: string
        lokasi_tujuan: number
        nama_lokasi_tujuan: string
        qty: string
        total_harga: string
        status_mutasi_lokasi: string
        is_deleted: boolean
        deleted_by: any
        deleted_at: any
        deleted_reason: any
        created_by: string
        created_at: string
        updated_by: string
        updated_at: string
    }

    export class GetAllMutasiLokasi implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IMutasiLokasi[]
    }

    export interface SaveMutasiLokasi {
        tanggal_mutasi_lokasi: string
        id_lokasi_asal: number
        warehouse_asal: number
        id_lokasi_tujuan: number
        warehouse_tujuan: number
        qty: number
        total_harga: number
        detail: SaveMutasiLokasiDetail[]
    }

    export interface SaveMutasiLokasiDetail {
        urut: number
        id_barang: number
        banyak: number
        kode_satuan: string
        isi: number
        qty: number
        harga_satuan: number
        sub_total: number
    }

    export interface ValidasiMutasiLokasi {
        id_mutasi_lokasi: number;
    }
}