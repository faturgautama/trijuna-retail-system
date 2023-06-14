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