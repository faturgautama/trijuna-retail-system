import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupBarangModel {
    export interface ISetupBarang {
        id_barang: number
        id_divisi: number
        id_group: number
        kode_barang: string
        barcode: string
        image: string
        persediaan: string
        nama_barang: string
        id_merk: number
        ukuran: string
        warna: string
        berat: number
        id_supplier: string
        harga_order: number
        harga_beli_terakhir: number
        hpp_average: number
        is_ppn: number
        nama_label: string
        id_satuan: number
        margin: number
        qty_grosir1: number
        harga_grosir1: number
        qty_grosir2: number
        harga_grosir2: number
        tahun_produksi: any
        stok_min: number
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupBarang {
        id_divisi: number
        id_group: number
        kode_barang: string
        barcode: string
        image: string
        persediaan: string
        nama_barang: string
        id_merk: number
        ukuran: string
        warna: string
        berat: number
        id_supplier: number
        harga_order: number
        harga_beli_terakhir: number
        hpp_average: number
        is_ppn: boolean
        nama_label: string
        id_satuan: number
        margin: number
        qty_grosir1: number
        harga_grosir1: number
        qty_grosir2: number
        harga_grosir2: number
        tahun_produksi: number
        stok_min: number
    }

    export interface UpdateSetupBarang {
        id_barang: number
        id_divisi: number
        id_group: number
        kode_barang: string
        barcode: string
        image: string
        persediaan: string
        nama_barang: string
        id_merk: number
        ukuran: string
        warna: string
        berat: number
        id_supplier: number
        harga_order: number
        harga_beli_terakhir: number
        hpp_average: number
        is_ppn: boolean
        nama_label: string
        id_satuan: number
        margin: number
        qty_grosir1: number
        harga_grosir1: number
        qty_grosir2: number
        harga_grosir2: number
        tahun_produksi: number
        stok_min: number
    }

    export class GetAllSetupBarang implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupBarang[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupBarang[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }

    export interface ISetupBarangSatuan {
        id_brang_satuan: number
        id_barang: number
        id_satuan: number
        kode_satuan: string
        nama_satuan: string
        created_by: string
        updated_by: string
        created_at: string
        updated_at: string
    }

    export interface SaveSetupBarangSatuan {
        id_barang: number
        id_satuan: number
        isi: number
    }

    export interface UpdateSetupBarangSatuan {
        id_brang_satuan: number
        id_barang: number
        id_satuan: number
        isi: number
    }

    export class GetAllSetupBarangSatuan implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupBarangSatuan[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupBarangSatuan[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }

    export interface ISetupBarangRak {
        id_barang_rak: number
        id_barang: number
        id_rak: number
        kode_rak: string
        nama_rak: string
        created_by: string
        updated_by: string
        created_at: string
        updated_at: string
    }

    export interface SaveSetupBarangRak {
        id_barang: number
        id_rak: number
    }

    export interface UpdateSetupBarangRak {
        id_barang_rak: number
        id_barang: number
        id_rak: number
    }

    export class GetAllSetupBarangRak implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupBarangRak[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupBarangRak[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }

    export interface ISetupBarangUrai {
        id_barang_urai: number
        id_barang: number
        qty_urai: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupBarangUrai {
        id_barang: number
        qty_urai: number
    }

    export interface UpdateSetupBarangUrai {
        id_barang_urai: number
        id_barang: number
        qty_urai: number
    }

    export class GetAllSetupBarangUrai implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupBarangUrai[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupBarangUrai[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }

    export interface ISetupBarangKomponen {
        id_barang_komponen: number
        id_barang: number
        qty_komponen: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupBarangKomponen {
        id_barang: number
        komponen_barang: number
        qty_komponen: number
    }

    export interface UpdateSetupBarangKomponen {
        id_barang_komponen: number
        id_barang: number
        komponen_barang: number
        qty_komponen: number
    }

    export class GetAllSetupBarangKomponen implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupBarangKomponen[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupBarangKomponen[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}