import { CommonModule, NgFor, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../@shared/components/components.module";
import { MessageService } from "primeng/api";
import { InventoryRoutingModule } from "./inventory-routing.module";
import { InputMutasiWarehouseComponent } from './feature/mutasi-warehouse/input-mutasi-warehouse/input-mutasi-warehouse.component';
import { HistoryMutasiWarehouseComponent } from './feature/mutasi-warehouse/history-mutasi-warehouse/history-mutasi-warehouse.component';
import { DetailMutasiWarehouseComponent } from './feature/mutasi-warehouse/detail-mutasi-warehouse/detail-mutasi-warehouse.component';
import { InputTextareaModule } from "primeng/inputtextarea";

@NgModule({
    declarations: [
        InputMutasiWarehouseComponent,
        HistoryMutasiWarehouseComponent,
        DetailMutasiWarehouseComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        InventoryRoutingModule,
        InputTextareaModule
    ],
    providers: [
        MessageService,
    ]
})
export class InventoryModule { }