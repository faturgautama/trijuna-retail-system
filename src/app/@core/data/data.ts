import { LoginModel } from "src/app/@shared/models/authentication/authentication.model";
import { SetupLokasiModel } from "src/app/@shared/models/setup-data/setup-lokasi.model";
import { SetupMemberModel } from "src/app/@shared/models/setup-data/setup-member.model";
import { SetupRakModel } from "src/app/@shared/models/setup-data/setup-rak.model";
import { SetupSatuanModel } from "src/app/@shared/models/setup-data/setup-satuan.model";
import { SetupSupplierModel } from "src/app/@shared/models/setup-data/setup-supplier.model";
import { SetupWarehouseModel } from "src/app/@shared/models/setup-data/setup-warehouse.model";

export const loginResponse: LoginModel.ILoginResponse = {
    id_user: 1,
    nama: 'Admin',
    id_group: 1,
    id_level: 1,
    email: "admin@gmail.com",
    email_verified_at: new Date(),
    is_active: 0,
    remember_token: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    token: "TEST"
}

export const divisi = [
    {
        id_divisi: 1,
        kode_divisi: 'MAKANAN',
        divisi: 'MAKANAN',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_divisi: 2,
        kode_divisi: 'MINUMAN',
        divisi: 'MINUMAN',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_divisi: 3,
        kode_divisi: 'RUMAH TANGGA',
        divisi: 'RUMAH TANGGA',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
];

export const group = [
    {
        id_group: 1,
        kode_group: 'MAKANAN RINGAN',
        group: 'MAKANAN RINGAN',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_group: 2,
        kode_group: 'MAKANAN POKOK',
        group: 'MAKANAN POKOK',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_group: 3,
        kode_group: 'MINUMAN RINGAN',
        group: 'MAKANAN RINGAN',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_group: 4,
        kode_group: 'SABUN',
        group: 'SABUN',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_group: 5,
        kode_group: 'SAMPO',
        group: 'SAMPO',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
];

export const merk = [
    {
        id_merk: 1,
        merk: 'CLEAR',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 2,
        merk: 'AQUA',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 3,
        merk: 'NESTLE',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 4,
        merk: 'COCA COLA',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 5,
        merk: 'SANIA',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 6,
        merk: 'DETTOL',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 7,
        merk: 'BIORE',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 8,
        merk: 'DOVE',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
    {
        id_merk: 9,
        merk: 'PANTENE',
        is_active: true,
        created_by: 1,
        updated_by: null,
        created_at: new Date(),
        updated_at: null
    },
];

// export const barang: SetupBarangModel.ISetupBarang[] = [
//     {
//         id_barang: 1,
//         id_divisi: 1,
//         id_group: 1,
//         kode_barang: "BRG-0001",
//         barcode: '112201605506',
//         image: '',
//         persediaan: '20',
//         nama_barang: 'MINYAK GORENG SANIA 1L',
//         id_merk: 5,
//         ukuran: '',
//         warna: 'KUNING',
//         berat: 200,
//         id_supplier: '1',
//         harga_order: 15000,
//         harga_beli_terakhir: 15500,
//         hpp_average: 25000,
//         is_ppn: 0,
//         nama_label: 'SANIA 1L',
//         id_satuan: 1,
//         nama_satuan: 'PCS',
//         margin: 10000,
//         qty_grosir1: 12,
//         harga_grosir1: 24500,
//         qty_grosir2: 24,
//         harga_grosir2: 24300,
//         tahun_produksi: '2023',
//         stok_min: 100,
//         is_active: 0,
//         created_by: 1,
//         updated_by: 0,
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//     }
// ];

export const rak: SetupRakModel.ISetupRak[] = [
    {
        id_rak: 1,
        kode_rak: 'RAK-0001',
        nama_rak: 'RAK MAKANAN',
        is_active: 0,
        created_by: 1,
        updated_by: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id_rak: 2,
        kode_rak: 'RAK-0002',
        nama_rak: 'RAK MINUMAN',
        is_active: 0,
        created_by: 1,
        updated_by: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
]

export const satuan: SetupSatuanModel.ISetupSatuan[] = [
    {
        id_satuan: 1,
        kode_satuan: 'PCS',
        nama_satuan: 'PCS',
        is_active: 0,
        created_by: 1,
        updated_by: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id_satuan: 2,
        kode_satuan: 'BOX',
        nama_satuan: 'BOX',
        is_active: 0,
        created_by: 1,
        updated_by: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

export const supplier: SetupSupplierModel.ISupplier[] = [
    {
        id_supplier: 1,
        kode_supplier: 'SUP-0001',
        nama_supplier: 'PT. JAYA KENCANA',
        alamat: 'JALAN MANGUNHARJO RAYA 1',
        kota: 'SEMARANG',
        kecamatan: 'TEMBALANG',
        kelurahan: 'MANGUNHARJO',
        keterangan: '',
        is_pkp: 1,
        is_tanpa_po: 1,
        limit_hutang: 15000000,
        no_handphone: '085156781165',
        email: 'jayakencana@gmail.com',
        sisa_hutang: 15000000,
        is_active: 0,
        created_by: 1,
        updated_by: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

export const warehouse: SetupWarehouseModel.ISetupWarehouse[] = [
    {
        id_warehouse: 1,
        warehouse: 'GUDANG PUSAT',
        lokasi: 'JALAN MAJU JAYA 1',
        is_active: 0,
        created_by: 1,
        updated_by: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id_warehouse: 2,
        warehouse: 'GUDANG STOK',
        lokasi: 'JALAN MAJU JAYA 122',
        is_active: 0,
        created_by: 1,
        updated_by: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

export const lokasi: SetupLokasiModel.ISetupLokasi[] = [
    {
        id_lokasi: 1,
        kode_lokasi: 'LOK-0001',
        nama_lokasi: 'RETAIL MAJU JAYA MANGUNHARJO',
        alamat: 'JALAN MANGUNHARJO RAYA 1',
        telepon: '02470101012',
        npwp: '112201605506',
        server: '192.168.88.22',
        is_use: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

export const member: SetupMemberModel.IMember[] = [
    {
        id_member: 1,
        kode_member: 'MMB-0001',
        nama_member: 'LALISA MANOBAL',
        alamat: 'PERUM ABC NOMOR 1',
        kota: 'SEMARANG',
        kecamatan: 'TEMALANG',
        kelurahan: 'MANGUNHARJO',
        pekerjaan: 'SWASTA',
        jenis_kelamin: 'WANITA',
        no_handphone: '08515678922',
        email: 'lalisa@gmail.com',
        password: '123',
        jenis_identitas: 'KTP',
        nomor_identitas: '33741004887755222',
        tanggal_daftar: new Date().toISOString(),
        limit_piutang: 0,
        sisa_piutang: 0,
        jumlah_poin: 0,
        is_active: 0,
        created_by: 1,
        updated_by: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];