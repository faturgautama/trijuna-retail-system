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
                id: 'mutasi-internal',
                label: 'Retur Pembelian',
                icon: ""
            },
        ]
    },
    {
        id: 'penjualan',
        icon: 'pi pi-money-bill',
        label: 'Penjualan',
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