import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputMutasiWarehouseComponent } from "./feature/mutasi-warehouse/input-mutasi-warehouse/input-mutasi-warehouse.component";
import { HistoryMutasiWarehouseComponent } from "./feature/mutasi-warehouse/history-mutasi-warehouse/history-mutasi-warehouse.component";
import { DetailMutasiWarehouseComponent } from "./feature/mutasi-warehouse/detail-mutasi-warehouse/detail-mutasi-warehouse.component";
import { HistoryMutasiLokasiComponent } from "./feature/mutasi-lokasi/history-mutasi-lokasi/history-mutasi-lokasi.component";
import InputMutasiLokasiComponent from "./feature/mutasi-lokasi/input-mutasi-lokasi/input-mutasi-lokasi.component";
import { DetailMutasiLokasiComponent } from "./feature/mutasi-lokasi/detail-mutasi-lokasi/detail-mutasi-lokasi.component";
import { HistoryProduksiAssemblyComponent } from "./feature/produksi-assembly/history-produksi-assembly/history-produksi-assembly.component";
import { InputProduksiAssemblyComponent } from "./feature/produksi-assembly/input-produksi-assembly/input-produksi-assembly.component";
import { DetailProduksiAssemblyComponent } from "./feature/produksi-assembly/detail-produksi-assembly/detail-produksi-assembly.component";
import { HistoryRepackingComponent } from "./feature/repacking/history-repacking/history-repacking.component";
import { InputRepackingComponent } from "./feature/repacking/input-repacking/input-repacking.component";
import { DetailRepackingComponent } from "./feature/repacking/detail-repacking/detail-repacking.component";
import { HistoryMutasiMasukComponent } from "./feature/mutasi-masuk/history-mutasi-masuk/history-mutasi-masuk.component";
import { InputMutasiMasukComponent } from "./feature/mutasi-masuk/input-mutasi-masuk/input-mutasi-masuk.component";
import { DetailMutasiMasukComponent } from "./feature/mutasi-masuk/detail-mutasi-masuk/detail-mutasi-masuk.component";
import { HistoryMutasiKeluarComponent } from "./feature/mutasi-keluar/history-mutasi-keluar/history-mutasi-keluar.component";
import { InputMutasiKeluarComponent } from "./feature/mutasi-keluar/input-mutasi-keluar/input-mutasi-keluar.component";
import { DetailMutasiKeluarComponent } from "./feature/mutasi-keluar/detail-mutasi-keluar/detail-mutasi-keluar.component";
import { PrintMutasiKeluarComponent } from "./feature/mutasi-keluar/print-mutasi-keluar/print-mutasi-keluar.component";
import { HistorySettingStokOpnameComponent } from "./feature/stok-opname/setting-stok-opname/history-setting-stok-opname/history-setting-stok-opname.component";
import { InputSettingStokOpnameComponent } from "./feature/stok-opname/setting-stok-opname/input-setting-stok-opname/input-setting-stok-opname.component";
import { DetailSettingStokOpnameComponent } from "./feature/stok-opname/setting-stok-opname/detail-setting-stok-opname/detail-setting-stok-opname.component";
import { HistoryStokOpnameComponent } from "./feature/stok-opname/input-stok-opname/history-stok-opname/history-stok-opname.component";
import { InputStokOpnameComponent } from "./feature/stok-opname/input-stok-opname/input-stok-opname/input-stok-opname.component";
import { DetailStokOpnameComponent } from "./feature/stok-opname/input-stok-opname/detail-stok-opname/detail-stok-opname.component";
import { KalkulasiSettingStokOpnameComponent } from "./feature/stok-opname/setting-stok-opname/kalkulasi-setting-stok-opname/kalkulasi-setting-stok-opname.component";
import { PrintMutasiMasukComponent } from "./feature/mutasi-masuk/print-mutasi-masuk/print-mutasi-masuk.component";
import { PrintMutasiWarehouseComponent } from "./feature/mutasi-warehouse/print-mutasi-warehouse/print-mutasi-warehouse.component";
import { PrintRepackingComponent } from "./feature/repacking/print-repacking/print-repacking.component";
import { PrintSettingStokOpnameComponent } from "./feature/stok-opname/setting-stok-opname/print-setting-stok-opname/print-setting-stok-opname.component";

const routes: Routes = [
    {
        path: 'mutasi-warehouse', children: [
            {
                path: 'history', component: HistoryMutasiWarehouseComponent
            },
            {
                path: 'input-ulang/:id', component: InputMutasiWarehouseComponent
            },
            {
                path: 'input', component: InputMutasiWarehouseComponent
            },
            {
                path: 'detail/:id', component: DetailMutasiWarehouseComponent,
            },
            {
                path: 'print/:id', component: PrintMutasiWarehouseComponent,
            },
            {
                path: 'export-pdf/:id', component: PrintMutasiWarehouseComponent,
            },
        ]
    },
    {
        path: 'mutasi-lokasi', children: [
            {
                path: 'history', component: HistoryMutasiLokasiComponent
            },
            {
                path: 'input', component: InputMutasiLokasiComponent
            },
            {
                path: 'detail/:id', component: DetailMutasiLokasiComponent,
            }
        ]
    },
    {
        path: 'mutasi-masuk', children: [
            {
                path: 'history', component: HistoryMutasiMasukComponent
            },
            {
                path: 'detail/:id', component: DetailMutasiMasukComponent,
            },
            {
                path: 'print/:id', component: PrintMutasiMasukComponent,
            },
            {
                path: 'export-pdf/:id', component: PrintMutasiMasukComponent,
            },
        ]
    },
    {
        path: 'mutasi-keluar', children: [
            {
                path: 'history', component: HistoryMutasiKeluarComponent
            },
            {
                path: 'input', component: InputMutasiKeluarComponent
            },
            {
                path: 'detail/:id', component: DetailMutasiKeluarComponent,
            },
            {
                path: 'print/:id', component: PrintMutasiKeluarComponent,
            },
            {
                path: 'export-pdf/:id', component: PrintMutasiKeluarComponent,
            },
        ]
    },
    {
        path: 'assembly', children: [
            {
                path: 'history', component: HistoryProduksiAssemblyComponent
            },
            {
                path: 'input', component: InputProduksiAssemblyComponent
            },
            {
                path: 'detail/:id', component: DetailProduksiAssemblyComponent,
            }
        ]
    },
    {
        path: 'repacking', children: [
            {
                path: 'history', component: HistoryRepackingComponent
            },
            {
                path: 'input', component: InputRepackingComponent
            },
            {
                path: 'detail/:id', component: DetailRepackingComponent,
            },
            {
                path: 'print/:id', component: PrintRepackingComponent,
            },
            {
                path: 'export-pdf/:id', component: PrintRepackingComponent,
            },
        ]
    },
    {
        path: 'setting-stok-opname', children: [
            {
                path: 'history', component: HistorySettingStokOpnameComponent
            },
            {
                path: 'input', component: InputSettingStokOpnameComponent
            },
            {
                path: 'detail/:id', component: DetailSettingStokOpnameComponent,
            },
            {
                path: 'print/:id', component: PrintSettingStokOpnameComponent,
            },
            {
                path: 'kalkulasi/:id', component: KalkulasiSettingStokOpnameComponent,
            },
            {
                path: 'print-finalisasi/:id', component: KalkulasiSettingStokOpnameComponent,
            }
        ]
    },
    {
        path: 'stok-opname', children: [
            {
                path: 'history', component: HistoryStokOpnameComponent
            },
            {
                path: 'input', component: InputStokOpnameComponent
            },
            {
                path: 'detail/:id', component: DetailStokOpnameComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }