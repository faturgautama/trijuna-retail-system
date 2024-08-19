import { HttpRequestBaseModel } from "../shared/http-request-base.model";

export namespace MutasiWarehouseModel {
    export interface IMutasiWarehouse {
        id_mutasi_warehouse: number
        tanggal_mutasi_warehouse: string
        nomor_mutasi: string
        warehouse_asal: number
        nama_warehouse_asal: string
        warehouse_tujuan: number
        nama_warehouse_tujuan: string
        qty: string
        total_harga: string
        status_mutasi_warehouse: string
        is_deleted: boolean
        deleted_by: any
        deleted_at: any
        deleted_reason: any
        created_by: string
        created_at: string
        updated_by: string
        updated_at: string
    }

    export class GetAllMutasiWarehouse implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IMutasiWarehouse[]
    }

    export interface SaveMutasiWarehouse {
        tanggal_mutasi_warehouse: string
        warehouse_asal: number
        warehouse_tujuan: number
        qty: number
        total_harga: number
        detail: SaveMutasiWarehouseDetail[]
    }

    export interface SaveMutasiWarehouseDetail {
        urut: number
        id_barang: number
        banyak: number
        kode_satuan: string
        isi: number
        qty: number
        harga_satuan: number
        sub_total: number
    }

    export interface ValidasiMutasiWarehouse {
        id_mutasi_warehouse: number;
    }
}