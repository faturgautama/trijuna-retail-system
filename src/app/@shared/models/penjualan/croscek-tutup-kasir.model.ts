import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace CroscekTutupKasirModel {
    export interface ICroscekTutupKasir {
        id_kroscek_tutup_kasir: number
        id_tutup_kasir: number
        kasir: string
        email: string
        tanggal_tutup_kasir: string
        tanggal_kroscek_tutup_kasir: string
        pendapatan_versi_user: string
        pendapatan_versi_system: string
        selisih: string
        keterangan_kroscek: string
        keterangan_tutup_kasir: string
        created_by: string
        created_at: string
    }

    export class GetAllCroscekTutupKasir implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ICroscekTutupKasir[]
    }

    export interface IDetailCroscekTutupKasir {
        id_kroscek_tutup_kasir: number
        id_tutup_kasir: number
        kasir: string
        email: string
        tanggal_tutup_kasir: string
        tanggal_kroscek_tutup_kasir: string
        pendapatan_versi_user: string
        pendapatan_versi_system: string
        selisih: string
        keterangan_kroscek: string
        keterangan_tutup_kasir: string
        created_by: string
        created_at: string
        detail_pendapatan: Pendapatan[]
    }

    export class GetByIdCroscekTutupKasir implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IDetailCroscekTutupKasir
    }

    export interface ITutupKasirBelumCroscek {
        id_tutup_kasir: number
        id_user_kasir: number
        nama: string
        email: string
        tanggal_tutup_kasir: string
        modal_kasir: string
        pengeluaran: string
        penerimaan: string
        sisa_saldo: string
        keterangan: string
        status_tutup_kasir: string
        id_kroscek_tutup_kasir: any
    }

    export class GetTutupKasirBelumCroscek implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ITutupKasirBelumCroscek[]
    }

    export interface IDetailTutupKasirBelumCroscek {
        id_tutup_kasir: number
        id_user_kasir: number
        nama_kasir: string
        email: string
        tanggal_tutup_kasir: string
        modal_kasir: string
        pengeluaran: string
        penerimaan: string
        sisa_saldo: string
        keterangan: string
        status_tutup_kasir: string
        id_kroscek_tutup_kasir: any
        created_by: string
        created_at: string
        updated_by: string
        updated_at: string
        is_deleted: boolean
        deleted_by: any
        deleted_at: any
        pendapatan: Pendapatan[]
    }

    export interface Pendapatan {
        id_payment_method: number
        nama_payment_method: string
        id_tutup_kasir: number
        nominal: string
        nominal_sistem: string
        selisih: string
    }

    export class GetDetailTutupKasirBelumCroscek implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: IDetailTutupKasirBelumCroscek
    }

    export interface ValidasiCroscekTutupKasir {
        id_tutup_kasir: number
        tanggal_kroscek_tutup_kasir: string
        keterangan: string
    }
}