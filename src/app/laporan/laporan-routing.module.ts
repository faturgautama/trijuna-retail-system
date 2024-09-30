import { RouterModule, Routes } from "@angular/router";
import { LaporanPajakBkpComponent } from "./feature/pajak/laporan-pajak-bkp/laporan-pajak-bkp.component";
import { LaporanPajakNonBkpComponent } from "./feature/pajak/laporan-pajak-non-bkp/laporan-pajak-non-bkp.component";
import { LaporanPajakBkpRekapComponent } from "./feature/pajak/laporan-pajak-bkp-rekap/laporan-pajak-bkp-rekap.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'pajak',
        children: [
            { path: 'bkp', component: LaporanPajakBkpComponent },
            { path: 'non-bkp', component: LaporanPajakNonBkpComponent },
            { path: 'bkp-rekap', component: LaporanPajakBkpRekapComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LaporanRoutingModule { }