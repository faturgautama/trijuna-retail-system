import { HttpRequestBaseModel } from "../shared/http-request-base.model";

export namespace MutasiWarehouseModel {
    export interface IMutasiWarehouse {

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