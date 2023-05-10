import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputMutasiWarehouseComponent } from "./feature/mutasi-warehouse/input-mutasi-warehouse/input-mutasi-warehouse.component";
import { HistoryMutasiWarehouseComponent } from "./feature/mutasi-warehouse/history-mutasi-warehouse/history-mutasi-warehouse.component";
import { DetailMutasiWarehouseComponent } from "./feature/mutasi-warehouse/detail-mutasi-warehouse/detail-mutasi-warehouse.component";

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }