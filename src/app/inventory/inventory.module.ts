import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../@shared/components/components.module";
import { ConfirmationService, MessageService } from "primeng/api";
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
import { PrintMutasiKeluarComponent } from './feature/mutasi-keluar/print-mutasi-keluar/print-mutasi-keluar.component';
import { HistorySettingStokOpnameComponent } from './feature/stok-opname/setting-stok-opname/history-setting-stok-opname/history-setting-stok-opname.component';
import { InputSettingStokOpnameComponent } from './feature/stok-opname/setting-stok-opname/input-setting-stok-opname/input-setting-stok-opname.component';
import { DetailSettingStokOpnameComponent } from './feature/stok-opname/setting-stok-opname/detail-setting-stok-opname/detail-setting-stok-opname.component';
import { HistoryStokOpnameComponent } from './feature/stok-opname/input-stok-opname/history-stok-opname/history-stok-opname.component';
import { DetailStokOpnameComponent } from './feature/stok-opname/input-stok-opname/detail-stok-opname/detail-stok-opname.component';
import { InputStokOpnameComponent } from './feature/stok-opname/input-stok-opname/input-stok-opname/input-stok-opname.component';
import { KalkulasiSettingStokOpnameComponent } from './feature/stok-opname/setting-stok-opname/kalkulasi-setting-stok-opname/kalkulasi-setting-stok-opname.component';
import { FormsModule } from "@angular/forms";

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
        DetailMutasiKeluarComponent,
        PrintMutasiKeluarComponent,
        HistorySettingStokOpnameComponent,
        InputSettingStokOpnameComponent,
        DetailSettingStokOpnameComponent,
        HistoryStokOpnameComponent,
        DetailStokOpnameComponent,
        InputStokOpnameComponent,
        KalkulasiSettingStokOpnameComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        ComponentsModule,
        InventoryRoutingModule,
        InputTextModule,
        InputTextareaModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
    ]
})
export class InventoryModule { }