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
                routerLink: '/setup-data/management-user'
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
                id: 'mutasi-lokasi',
                label: 'Mutasi Lokasi',
                icon: "",
                items: [
                    {
                        id: 'input-mutasi-lokasi',
                        label: 'Input Mutasi Lokasi',
                        icon: "",
                        routerLink: '/inventory/mutasi-lokasi/input'
                    },
                    {
                        id: 'history-mutasi-lokasi',
                        label: 'History Mutasi Lokasi',
                        icon: "",
                        routerLink: '/inventory/mutasi-lokasi/history'
                    },
                ]
            },
            {
                id: 'stok-opname',
                label: 'Stok Opname',
                icon: "",
                items: [
                    {
                        id: 'setting-stok-opname',
                        label: 'Setting Stok Opname',
                        icon: "",
                        routerLink: '/inventory/stok-opname/setting'
                    },
                    {
                        id: 'input-stok-opname',
                        label: 'Input Stok Opname',
                        icon: "",
                        routerLink: '/inventory/stok-opname/input'
                    },
                    {
                        id: 'adjustment-stok-opname',
                        label: 'Adjustment Stok Opname',
                        icon: "",
                        routerLink: '/inventory/stok-opname/adjustment'
                    },
                    {
                        id: 'finalisasi-stok-opname',
                        label: 'Adjustment Stok Opname',
                        icon: "",
                        routerLink: '/inventory/stok-opname/finalisasi'
                    },
                    {
                        id: 'history-stok-opname',
                        label: 'History Stok Opname',
                        icon: "",
                        routerLink: '/inventory/stok-opname/history'
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
            {
                id: 'pemusnahan-stok',
                label: 'Pemusnahan Stok',
                icon: "",
                items: [
                    {
                        id: 'input-pemusnahan-stok',
                        label: 'Input Pemusnahan Stok',
                        icon: "",
                        routerLink: '/inventory/pemusnahan-stok/input'
                    },
                    {
                        id: 'history-pemusnahan-stok',
                        label: 'History Pemusnahan Stok',
                        icon: "",
                        routerLink: '/inventory/pemusnahan-stok/history'
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
                id: 'point-of-sales',
                label: 'Point Of Sales',
                icon: "",
                items: [
                    {
                        id: 'point-of-sales',
                        label: 'POS Kasir',
                        icon: "",
                        routerLink: '/pos/kasir'
                    },
                ]
            },
        ]
    },
    {
        id: 'finance',
        icon: 'pi pi-credit-card',
        label: 'Finance',
    },
    {
        id: 'laporan',
        icon: 'pi pi-book',
        label: 'Laporan',
    },
]