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

const routes: Routes = [
    {
        path: 'mutasi-warehouse', children: [
            {
                path: 'history', component: HistoryMutasiWarehouseComponent
            },
            {
                path: 'input', component: InputMutasiWarehouseComponent
            },
            {
                path: 'detail/:id', component: DetailMutasiWarehouseComponent,
            }
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
                path: 'input', component: InputMutasiMasukComponent
            },
            {
                path: 'detail/:id', component: DetailMutasiMasukComponent,
            }
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
            }
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
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }