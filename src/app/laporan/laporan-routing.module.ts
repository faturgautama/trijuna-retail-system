import { RouterModule, Routes } from "@angular/router";
import { LaporanPajakBkpComponent } from "./feature/pajak/laporan-pajak-bkp/laporan-pajak-bkp.component";
import { LaporanPajakNonBkpComponent } from "./feature/pajak/laporan-pajak-non-bkp/laporan-pajak-non-bkp.component";
import { LaporanPajakBkpRekapComponent } from "./feature/pajak/laporan-pajak-bkp-rekap/laporan-pajak-bkp-rekap.component";
import { NgModule } from "@angular/core";
import { LaporanKeluarMasukBarangComponent } from "./feature/inventory/laporan-keluar-masuk-barang/laporan-keluar-masuk-barang.component";

const routes: Routes = [
    {
        path: 'inventory',
        children: [
            { path: 'keluar-masuk-barang', component: LaporanKeluarMasukBarangComponent },
        ]
    },
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