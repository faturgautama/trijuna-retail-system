import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PosKasirComponent } from "./feature/pos-kasir/pos-kasir.component";

const routes: Routes = [
    {
        path: 'kasir', component: PosKasirComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointOfSaleRoutingModule { }