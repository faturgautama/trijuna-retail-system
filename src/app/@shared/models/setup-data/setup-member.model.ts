import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupMemberModel {
    export interface IMember {
        id_member: number
        kode_member: string
        nama_member: string
        alamat: string
        kota: string
        kecamatan: string
        kelurahan: string
        pekerjaan: string
        jenis_kelamin: string
        no_handphone: string
        email: string
        password: string
        jenis_identitas: string
        nomor_identitas: string
        tanggal_daftar: string
        limit_piutang: number
        sisa_piutang: number
        jumlah_poin: number
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveMember {
        nama_member: string
        alamat: string
        kota: string
        kecamatan: string
        kelurahan: string
        pekerjaan: string
        jenis_kelamin: string
        no_handphone: string
        email: string
        jenis_identitas: string
        nomor_identitas: string
        tanggal_daftar: string
        limit_piutang: number
    }

    export interface UpdateMember {
        id_member: number
        nama_member: string
        alamat: string
        kota: string
        kecamatan: string
        kelurahan: string
        pekerjaan: string
        jenis_kelamin: string
        no_handphone: string
        email: string
        jenis_identitas: string
        nomor_identitas: string
        tanggal_daftar: string
        limit_piutang: number
    }

    export class GetAllMember implements HttpRequestBaseModel {
        success!: boolean
        message!: string;
        data!: IMember[];
    }

    export class GetByIdMember implements HttpRequestBaseModel {
        success!: boolean
        message!: string;
        data!: IMember;
    }
}