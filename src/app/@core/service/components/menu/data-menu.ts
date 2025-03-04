import { MenuItem } from "primeng/api";

export const menu: MenuItem[] = [
    {
        id: 'setup-data',
        label: 'Setup Data',
        icon: 'pi pi-cog',
        items: [
            {
                id: 'setup-member',
                label: 'Setup Member',
                routerLink: '/setup-data/setup-member/list'
            },
            {
                id: 'setting-point-member',
                label: 'Setting Point Member',
                routerLink: '/setup-data/setting-point-member'
            },
            {
                id: 'setup-supplier',
                label: 'Setup Supplier',
                routerLink: '/setup-data/setup-supplier/list'
            },
            {
                id: 'setup-inventory',
                label: 'Setup Inventory',
                icon: "",
                items: [
                    {
                        id: 'setup-divisi',
                        label: 'Setup Divisi',
                        routerLink: '/setup-data/setup-inventory/setup-divisi'
                    },
                    {
                        id: 'setup-merk',
                        label: 'Setup Merk',
                        routerLink: '/setup-data/setup-inventory/setup-merk'
                    },
                    {
                        id: 'setup-group',
                        label: 'Setup Group',
                        routerLink: '/setup-data/setup-inventory/setup-group'
                    },
                    {
                        id: 'setup-satuan',
                        label: 'Setup Satuan',
                        routerLink: '/setup-data/setup-inventory/setup-satuan'
                    },
                    {
                        id: 'setup-rak',
                        label: 'Setup Rak',
                        routerLink: '/setup-data/setup-inventory/setup-rak'
                    },
                    {
                        id: 'setup-lokasi',
                        label: 'Setup Lokasi',
                        routerLink: '/setup-data/setup-inventory/setup-lokasi'
                    },
                    {
                        id: 'setup-warehouse',
                        label: 'Setup Warehouse',
                        routerLink: '/setup-data/setup-inventory/setup-warehouse'
                    },
                    {
                        id: 'setup-barang',
                        label: 'Setup Barang',
                        routerLink: '/setup-data/setup-inventory/setup-barang/list'
                    },
                    {
                        id: 'list-barang-all',
                        label: 'List Barang All',
                        routerLink: '/setup-data/setup-inventory/setup-barang/all'
                    },
                    {
                        id: 'cetal-label-barang',
                        label: 'Cetak Label Barang',
                        routerLink: '/setup-data/setup-inventory/cetak-label-barang'
                    },
                ]
            },
            {
                id: 'setting-harga',
                label: 'Setting Harga',
                routerLink: '/setup-data/setting-harga/list'
            },
            {
                id: 'management-user',
                label: 'Management User',
                items: [
                    {
                        id: 'setup-group-user',
                        label: 'Setup Group User',
                        routerLink: '/setup-data/management-user/setup-group-user'
                    },
                    {
                        id: 'setup-user',
                        label: 'Setup User',
                        routerLink: '/setup-data/management-user/setup-user'
                    },
                    {
                        id: 'setting-menu',
                        label: 'Setting Menu',
                        routerLink: '/setup-data/management-user/setting-menu'
                    },
                ]
            },
        ]
    },
    {
        id: 'pembelian',
        label: 'Pembelian',
        icon: 'pi pi-cart-plus',
        items: [
            {
                id: 'pemesanan-po',
                label: 'Pemesanan PO',
                icon: "",
                items: [
                    {
                        id: 'input-pemesanan-po',
                        label: 'Input Pemesanan PO',
                        icon: "",
                        routerLink: '/pembelian/pemesanan-po/input'
                    },
                    {
                        id: 'history-pemesanan-po',
                        label: 'History Pemesanan PO',
                        icon: "",
                        routerLink: '/pembelian/pemesanan-po/history'
                    },
                ]
            },
            {
                id: 'penerimaan-dengan-po',
                label: 'Pembelian Dengan PO',
                icon: "",
                items: [
                    {
                        id: 'input-penerimaan-dengan-po',
                        label: 'Input Pembelian Dengan PO',
                        icon: "",
                        routerLink: '/pembelian/penerimaan-dengan-po/input'

                    },
                    {
                        id: 'history-penerimaan-dengan-po',
                        label: 'History Pembelian Dengan PO',
                        icon: "",
                        routerLink: '/pembelian/penerimaan-dengan-po/history'
                    },
                ]
            },
            {
                id: 'penerimaan-tanpa-po',
                label: 'Pembelian Tanpa PO',
                icon: "",
                items: [
                    {
                        id: 'input-penerimaan-tanpa-po',
                        label: 'Input Pembelian Tanpa PO',
                        icon: "",
                        routerLink: '/pembelian/penerimaan-tanpa-po/input'
                    },
                    {
                        id: 'history-penerimaan-tanpa-po',
                        label: 'History Pembelian Tanpa PO',
                        icon: "",
                        routerLink: '/pembelian/penerimaan-tanpa-po/history'
                    },
                ]
            },
            {
                id: 'retur-pembelian',
                label: 'Retur Pembelian',
                icon: "",
                items: [
                    {
                        id: 'input-retur-pembelian',
                        label: 'Input Retur Pembelian',
                        icon: "",
                        routerLink: '/pembelian/retur-pembelian/input',
                    },
                    {
                        id: 'history-retur-pembelian',
                        label: 'History Retur Pembelian',
                        icon: "",
                        routerLink: '/pembelian/retur-pembelian/history',
                    },
                ]
            },
            {
                id: 'konsinyasi',
                label: 'Konsinyasi',
                icon: "",
                items: [
                    {
                        id: 'input-konsinyasi',
                        label: 'Input Konsinyasi',
                        icon: "",
                        routerLink: '/pembelian/konsinyasi/input'
                    },
                    {
                        id: 'history-konsinyasi',
                        label: 'History Konsinyasi',
                        icon: "",
                        routerLink: '/pembelian/konsinyasi/history'
                    },
                ]
            },
            {
                id: 'retur-konsinyasi',
                label: 'Retur Konsinyasi',
                icon: "",
                items: [
                    {
                        id: 'input-retur-konsinyasi',
                        label: 'Input Retur Konsinyasi',
                        icon: "",
                        routerLink: '/pembelian/retur-konsinyasi/input',
                    },
                    {
                        id: 'history-retur-konsinyasi',
                        label: 'History Retur Konsinyasi',
                        icon: "",
                        routerLink: '/pembelian/retur-konsinyasi/history',
                    },
                ]
            },
        ]
    },
    {
        id: 'inventory',
        label: 'Inventory',
        icon: 'pi pi-truck',
        items: [
            {
                id: 'mutasi-warehouse',
                label: 'Mutasi Warehouse',
                icon: "",
                items: [
                    {
                        id: 'input-mutasi-warehouse',
                        label: 'Input Mutasi Warehouse',
                        icon: "",
                        routerLink: '/inventory/mutasi-warehouse/input'
                    },
                    {
                        id: 'history-mutasi-warehouse',
                        label: 'History Mutasi Warehouse',
                        icon: "",
                        routerLink: '/inventory/mutasi-warehouse/history'
                    },
                ]
            },
            {
                id: 'mutasi-masuk',
                label: 'Mutasi Masuk',
                icon: "",
                routerLink: '/inventory/mutasi-masuk/history'
            },
            {
                id: 'mutasi-keluar',
                label: 'Mutasi Keluar',
                icon: "",
                items: [
                    {
                        id: 'input-mutasi-keluar',
                        label: 'Input Mutasi Keluar',
                        icon: "",
                        routerLink: '/inventory/mutasi-keluar/input'
                    },
                    {
                        id: 'history-mutasi-keluar',
                        label: 'History Mutasi Keluar',
                        icon: "",
                        routerLink: '/inventory/mutasi-keluar/history'
                    },
                ]
            },
            {
                id: 'stok-opname',
                label: 'Stok Opname',
                icon: "",
                items: [
                    {
                        id: 'history-setting-stok-opname',
                        label: 'History Setting Stok Opname',
                        icon: "",
                        routerLink: '/inventory/setting-stok-opname/history'
                    },
                    {
                        id: 'input-setting-stok-opname',
                        label: 'Input Setting Stok Opname',
                        icon: "",
                        routerLink: '/inventory/setting-stok-opname/input'
                    },
                    {
                        id: 'history-stok-opname',
                        label: 'History Stok Opname',
                        icon: "",
                        routerLink: '/inventory/stok-opname/history'
                    },
                    {
                        id: 'input-stok-opname',
                        label: 'Input Stok Opname',
                        icon: "",
                        routerLink: '/inventory/stok-opname/input'
                    },
                ]
            },
            {
                id: 'assembly',
                label: 'Assembly',
                icon: "",
                items: [
                    {
                        id: 'input-assembly',
                        label: 'Input Assembly',
                        icon: "",
                        routerLink: '/inventory/assembly/input'
                    },
                    {
                        id: 'history-assembly',
                        label: 'History Assembly',
                        icon: "",
                        routerLink: '/inventory/assembly/history'
                    },
                ]
            },
            {
                id: 'repacking',
                label: 'Repacking',
                icon: "",
                items: [
                    {
                        id: 'input-repacking',
                        label: 'Input Repacking',
                        icon: "",
                        routerLink: '/inventory/repacking/input'
                    },
                    {
                        id: 'history-repacking',
                        label: 'History Repacking',
                        icon: "",
                        routerLink: '/inventory/repacking/history'
                    },
                ]
            },
        ]
    },
    {
        id: 'penjualan',
        icon: 'pi pi-money-bill',
        label: 'Penjualan',
        items: [
            {
                id: 'penjualan',
                label: 'Transaksi Penjualan',
                icon: "",
                items: [
                    {
                        id: 'history-penjualan',
                        label: 'History Penjualan',
                        icon: "",
                        routerLink: '/penjualan/transaksi-penjualan/history'
                    },
                ]
            },
            {
                id: 'refund-penjualan',
                label: 'Refund Penjualan',
                icon: "",
                items: [
                    {
                        id: 'history-refund-penjualan',
                        label: 'History Refund Penjualan',
                        icon: "",
                        routerLink: '/penjualan/refund-penjualan/history'
                    },
                ]
            },
            {
                id: 'modal-kasir',
                label: 'Modal Kasir',
                icon: "",
                routerLink: '/penjualan/modal-kasir'
            },
            // {
            //     id: 'tutup-kasir',
            //     label: 'Tutup Kasir',
            //     icon: "",
            //     items: [
            //         {
            //             id: 'input-tutup-kasir',
            //             label: 'Input Tutup Kasir',
            //             icon: "",
            //             routerLink: '/penjualan/tutup-kasir/input'
            //         },
            //         {
            //             id: 'history-tutup-kasir',
            //             label: 'History Tutup Kasir',
            //             icon: "",
            //             routerLink: '/penjualan/tutup-kasir/history'
            //         },
            //     ]
            // },
            {
                id: 'croscek-tutup-kasir',
                label: 'Croscek Tutup Kasir',
                icon: "",
                items: [
                    {
                        id: 'input-croscek-tutup-kasir',
                        label: 'Input Croscek Tutup Kasir',
                        icon: "",
                        routerLink: '/penjualan/croscek-tutup-kasir/input'
                    },
                    {
                        id: 'history-croscek-tutup-kasir',
                        label: 'History Croscek Tutup Kasir',
                        icon: "",
                        routerLink: '/penjualan/croscek-tutup-kasir/history'
                    },
                ]
            },
            {
                id: 'setting-promo',
                label: 'Setting Promo',
                icon: "",
                items: [
                    {
                        id: 'setting-diskon',
                        label: 'Setting Diskon',
                        icon: "",
                        routerLink: '/penjualan/setting-promo/setting-diskon'
                    },
                    {
                        id: 'setting-hadiah',
                        label: 'Setting Hadiah',
                        icon: "",
                        routerLink: '/penjualan/setting-promo/setting-hadiah'
                    },
                    {
                        id: 'setting-bonus',
                        label: 'Setting Bonus',
                        icon: "",
                        routerLink: '/penjualan/setting-promo/setting-barang'
                    }
                ]
            },
        ]
    },
    {
        id: 'finance',
        icon: 'pi pi-credit-card',
        label: 'Finance',
        items: [
            {
                id: 'setup-data',
                label: 'Setup Data',
                icon: "",
                items: [
                    {
                        id: 'setup-potongan-pembelian',
                        label: 'Setup Potongan Pembelian',
                        routerLink: '/finance/setup-data/setup-potongan-pembelian'
                    },
                    {
                        id: 'setup-rekening-owner',
                        label: 'Setup Rekening Owner',
                        routerLink: '/finance/setup-data/setup-rekening-owner'
                    },
                ]
            },
            {
                id: 'titip-tagihan',
                label: 'Titip Tagihan Hutang Supplier',
                icon: "",
                items: [
                    {
                        id: 'input-titip-tagihan',
                        label: 'Input Titip Tagihan Hutang Supplier',
                        icon: "",
                        routerLink: '/finance/titip-tagihan/input'
                    },
                    {
                        id: 'history-titip-tagihan',
                        label: 'History Titip Tagihan Hutang Supplier',
                        icon: "",
                        routerLink: '/finance/titip-tagihan/history'
                    },
                ]
            },
            {
                id: 'pelunasan-hutang-supplier',
                label: 'Pelunasan TT Hutang Supplier',
                icon: "",
                items: [
                    {
                        id: 'input-pelunasan-tt',
                        label: 'Input Pelunasan TT Hutang Supplier',
                        icon: "",
                        routerLink: '/finance/pelunasan-hutang-supplier/input'
                    },
                    {
                        id: 'history-pelunasan-tt',
                        label: 'History Pelunasan TT Hutang Supplier',
                        icon: "",
                        routerLink: '/finance/pelunasan-hutang-supplier/history'
                    },
                ]
            },
            {
                id: 'faktur-pajak-pembelian',
                label: 'Faktur Pajak Pembelian',
                icon: "",
                items: [
                    {
                        id: 'input-faktur-pajak-pembelian',
                        label: 'Input Faktur Pajak Pembelian',
                        icon: "",
                        routerLink: '/finance/faktur-pajak-pembelian/input'
                    },
                    {
                        id: 'history-faktur-pajak-pembelian',
                        label: 'History Faktur Pajak Pembelian',
                        icon: "",
                        routerLink: '/finance/faktur-pajak-pembelian/history'
                    },
                ]
            },
        ]
    },
    {
        id: 'human-resource',
        icon: 'pi pi-users',
        label: 'HR',
        items: [
            {
                id: 'setup-departemen',
                label: 'Setup Departemen',
                routerLink: '/human-resource/setup-departemen'
            },
            {
                id: 'setup-karyawan',
                label: 'Setup Karyawan',
                routerLink: '/human-resource/setup-karyawan'
            },
            {
                id: 'absensi',
                label: 'Absensi',
                routerLink: '/human-resource/absensi'
            },
        ]
    },
    {
        id: 'laporan',
        icon: 'pi pi-book',
        label: 'Laporan',
        items: [
            {
                id: 'Inventory',
                label: 'Inventory',
                icon: "",
                items: [
                    {
                        id: 'keluar-masuk-barang',
                        label: 'Keluar Masuk Barang',
                        icon: "",
                        routerLink: '/laporan/inventory/keluar-masuk-barang'
                    },
                    {
                        id: 'stok-per-tanggal',
                        label: 'Stok Per Tanggal',
                        icon: "",
                        routerLink: '/laporan/inventory/stok-per-tanggal'
                    },
                ]
            },
            {
                id: 'Pembelian',
                label: 'Pembelian',
                icon: "",
                items: [
                    {
                        id: 'ppn',
                        label: 'PPn',
                        icon: "",
                        routerLink: '/laporan/pembelian/ppn'
                    },
                    {
                        id: 'rokok',
                        label: 'Rokok',
                        icon: "",
                        routerLink: '/laporan/pembelian/rokok'
                    },
                ]
            },
            {
                id: 'Penjualan',
                label: 'Penjualan',
                icon: "",
                items: [
                    {
                        id: 'sell-out-item',
                        label: 'Sell Out Item',
                        icon: "",
                        routerLink: '/penjualan/transaksi-penjualan/sell-out-item'
                    },
                    {
                        id: 'grosir',
                        label: 'Grosir',
                        icon: "",
                        routerLink: '/laporan/penjualan/grosir'
                    },
                    {
                        id: 'eceran',
                        label: 'Eceran',
                        icon: "",
                        routerLink: '/laporan/penjualan/eceran'
                    },
                    {
                        id: 'rokok',
                        label: 'Rokok',
                        icon: "",
                        routerLink: '/laporan/penjualan/rokok'
                    },
                    {
                        id: 'sembako',
                        label: 'Sembako',
                        icon: "",
                        routerLink: '/laporan/penjualan/sembako'
                    },
                ]
            },
            {
                id: 'Omset',
                label: 'Omset',
                icon: "",
                items: [
                    {
                        id: 'breakdown-monthly',
                        label: 'Breakdown Monthly',
                        icon: "",
                        routerLink: '/laporan/omset/breakdown-monthly'
                    },
                    {
                        id: 'breakdown-daily',
                        label: 'Breakdown Daily',
                        icon: "",
                        routerLink: '/laporan/omset/breakdown-daily'
                    },
                    {
                        id: 'breakdown-monthly-hpp-profit',
                        label: 'Breakdown Monthly With HPP & Profit',
                        icon: "",
                        routerLink: '/laporan/omset/breakdown-monthly-hpp-profit'
                    },
                    {
                        id: 'breakdown-daily-hpp',
                        label: 'Breakdown Daily With HPP & Profit',
                        icon: "",
                        routerLink: '/laporan/omset/breakdown-daily-hpp'
                    },
                ]
            },
            {
                id: 'Pajak',
                label: 'Pajak',
                icon: "",
                items: [
                    {
                        id: 'bkp',
                        label: 'BKP',
                        routerLink: '/laporan/pajak/bkp'
                    },
                    {
                        id: 'non-bkp',
                        label: 'Non BKP',
                        routerLink: '/laporan/pajak/non-bkp'
                    },
                    {
                        id: 'bkp-rekap',
                        label: 'BKP Rekap',
                        routerLink: '/laporan/pajak/bkp-rekap'
                    },
                ]
            },
        ]
    },
]