import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupSupplierModel {
    export interface ISupplier {
        id_supplier: number
        kode_supplier: string
        nama_supplier: string
        alamat: string
        kota: string
        kecamatan: string
        kelurahan: string
        keterangan: string
        is_pkp: number
        is_tanpa_po: number
        limit_hutang: number
        no_handphone: string
        email: string
        sisa_hutang: number
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSupplier {
        nama_supplier: string
        alamat: string
        kota: string
        kecamatan: string
        kelurahan: string
        keterangan: string
        is_pkp: boolean
        is_tanpa_po: boolean
        limit_hutang: number
        no_handphone: string
        email: string
        sisa_hutang: number
    }

    export interface UpdateSupplier {
        id_supplier: number
        kode_supplier: string
        nama_supplier: string
        alamat: string
        kota: string
        kecamatan: string
        kelurahan: string
        keterangan: string
        is_pkp: boolean
        is_tanpa_po: boolean
        limit_hutang: number
        no_handphone: string
        email: string
        sisa_hutang: number
    }

    export class GetAllSupplier implements HttpRequestBaseModel {
        success!: boolean
        message!: string;
        data!: ISupplier[];
    }
}