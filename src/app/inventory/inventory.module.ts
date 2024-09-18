import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../@shared/components/components.module";
import { MessageService } from "primeng/api";
import { InventoryRoutingModule } from "./inventory-routing.module";
import { InputMutasiWarehouseComponent } from './feature/mutasi-warehouse/input-mutasi-warehouse/input-mutasi-warehouse.component';
import { HistoryMutasiWarehouseComponent } from './feature/mutasi-warehouse/history-mutasi-warehouse/history-mutasi-warehouse.component';
import { DetailMutasiWarehouseComponent } from './feature/mutasi-warehouse/detail-mutasi-warehouse/detail-mutasi-warehouse.component';
import { InputTextareaModule } from "primeng/inputtextarea";
import InputMutasiLokasiComponent from './feature/mutasi-lokasi/input-mutasi-lokasi/input-mutasi-lokasi.component';
import { HistoryMutasiLokasiComponent } from './feature/mutasi-lokasi/history-mutasi-lokasi/history-mutasi-lokasi.component';
import { DetailMutasiLokasiComponent } from './feature/mutasi-lokasi/detail-mutasi-lokasi/detail-mutasi-lokasi.component';
import { InputProduksiAssemblyComponent } from './feature/produksi-assembly/input-produksi-assembly/input-produksi-assembly.component';
import { HistoryProduksiAssemblyComponent } from './feature/produksi-assembly/history-produksi-assembly/history-produksi-assembly.component';
import { DetailProduksiAssemblyComponent } from './feature/produksi-assembly/detail-produksi-assembly/detail-produksi-assembly.component';
import { InputRepackingComponent } from './feature/repacking/input-repacking/input-repacking.component';
import { HistoryRepackingComponent } from './feature/repacking/history-repacking/history-repacking.component';
import { DetailRepackingComponent } from './feature/repacking/detail-repacking/detail-repacking.component';
import { InputMutasiMasukComponent } from './feature/mutasi-masuk/input-mutasi-masuk/input-mutasi-masuk.component';
import { HistoryMutasiMasukComponent } from './feature/mutasi-masuk/history-mutasi-masuk/history-mutasi-masuk.component';
import { DetailMutasiMasukComponent } from './feature/mutasi-masuk/detail-mutasi-masuk/detail-mutasi-masuk.component';
import { InputMutasiKeluarComponent } from './feature/mutasi-keluar/input-mutasi-keluar/input-mutasi-keluar.component';
import { HistoryMutasiKeluarComponent } from './feature/mutasi-keluar/history-mutasi-keluar/history-mutasi-keluar.component';
import { DetailMutasiKeluarComponent } from './feature/mutasi-keluar/detail-mutasi-keluar/detail-mutasi-keluar.component';
import { InputTextModule } from "primeng/inputtext";

@NgModule({
    declarations: [
        InputMutasiWarehouseComponent,
        HistoryMutasiWarehouseComponent,
        DetailMutasiWarehouseComponent,
        InputMutasiLokasiComponent,
        HistoryMutasiLokasiComponent,
        DetailMutasiLokasiComponent,
        InputProduksiAssemblyComponent,
        HistoryProduksiAssemblyComponent,
        DetailProduksiAssemblyComponent,
        InputRepackingComponent,
        HistoryRepackingComponent,
        DetailRepackingComponent,
        InputMutasiMasukComponent,
        HistoryMutasiMasukComponent,
        DetailMutasiMasukComponent,
        InputMutasiKeluarComponent,
        HistoryMutasiKeluarComponent,
        DetailMutasiKeluarComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        InventoryRoutingModule,
        InputTextModule,
        InputTextareaModule
    ],
    providers: [
        MessageService,
    ]
})
export class InventoryModule { }