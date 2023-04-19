import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoryPemesananPoComponent } from "./feature/pemesanan-po/history-pemesanan-po/history-pemesanan-po.component";
import { InputPemesananPoComponent } from "./feature/pemesanan-po/input-pemesanan-po/input-pemesanan-po.component";
import { DetailPemesananPoComponent } from "./feature/pemesanan-po/detail-pemesanan-po/detail-pemesanan-po.component";
import { HistoryPenerimaanDenganPoComponent } from "./feature/penerimaan-dengan-po/history-penerimaan-dengan-po/history-penerimaan-dengan-po.component";
import { InputPenerimaanDenganPoComponent } from "./feature/penerimaan-dengan-po/input-penerimaan-dengan-po/input-penerimaan-dengan-po.component";
import { DetailPenerimaanDenganPoComponent } from "./feature/penerimaan-dengan-po/detail-penerimaan-dengan-po/detail-penerimaan-dengan-po.component";

const routes: Routes = [
    {
        path: 'pemesanan-po', children: [
            { path: 'history', component: HistoryPemesananPoComponent },
            { path: 'input', component: InputPemesananPoComponent },
            { path: 'detail/:id', component: DetailPemesananPoComponent }
        ]
    },
    {
        path: 'penerimaan-dengan-po', children: [
            { path: 'history', component: HistoryPenerimaanDenganPoComponent },
            { path: 'input', component: InputPenerimaanDenganPoComponent },
            { path: 'detail/:id', component: DetailPenerimaanDenganPoComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PembelianRoutingModule { }