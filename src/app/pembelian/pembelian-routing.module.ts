import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoryPemesananPoComponent } from "./feature/pemesanan-po/history-pemesanan-po/history-pemesanan-po.component";
import { InputPemesananPoComponent } from "./feature/pemesanan-po/input-pemesanan-po/input-pemesanan-po.component";
import { DetailPemesananPoComponent } from "./feature/pemesanan-po/detail-pemesanan-po/detail-pemesanan-po.component";
import { HistoryPenerimaanDenganPoComponent } from "./feature/penerimaan-dengan-po/history-penerimaan-dengan-po/history-penerimaan-dengan-po.component";
import { InputPenerimaanDenganPoComponent } from "./feature/penerimaan-dengan-po/input-penerimaan-dengan-po/input-penerimaan-dengan-po.component";
import { DetailPenerimaanDenganPoComponent } from "./feature/penerimaan-dengan-po/detail-penerimaan-dengan-po/detail-penerimaan-dengan-po.component";
import { HistoryPenerimaanTanpaPoComponent } from "./feature/penerimaan-tanpa-po/history-penerimaan-tanpa-po/history-penerimaan-tanpa-po.component";
import { InputPenerimaanTanpaPoComponent } from "./feature/penerimaan-tanpa-po/input-penerimaan-tanpa-po/input-penerimaan-tanpa-po.component";
import { DetailPenerimaanTanpaPoComponent } from "./feature/penerimaan-tanpa-po/detail-penerimaan-tanpa-po/detail-penerimaan-tanpa-po.component";
import { HistoryPenerimaanKonsinyasiComponent } from "./feature/penerimaan-konsinyasi/history-penerimaan-konsinyasi/history-penerimaan-konsinyasi.component";
import { InputPenerimaanKonsinyasiComponent } from "./feature/penerimaan-konsinyasi/input-penerimaan-konsinyasi/input-penerimaan-konsinyasi.component";
import { DetailPenerimaanKonsinyasiComponent } from "./feature/penerimaan-konsinyasi/detail-penerimaan-konsinyasi/detail-penerimaan-konsinyasi.component";
import { HistoryReturPembelianComponent } from "./feature/retur-pembelian/history-retur-pembelian/history-retur-pembelian.component";
import { InputReturPembelianComponent } from "./feature/retur-pembelian/input-retur-pembelian/input-retur-pembelian.component";
import { DetailReturPembelianComponent } from "./feature/retur-pembelian/detail-retur-pembelian/detail-retur-pembelian.component";
import { HistoryReturKonsinyasiComponent } from "./feature/retur-konsinyasi/history-retur-konsinyasi/history-retur-konsinyasi.component";
import { InputReturKonsinyasiComponent } from "./feature/retur-konsinyasi/input-retur-konsinyasi/input-retur-konsinyasi.component";
import { DetailReturKonsinyasiComponent } from "./feature/retur-konsinyasi/detail-retur-konsinyasi/detail-retur-konsinyasi.component";
import { PrintPemesananPoComponent } from "./feature/pemesanan-po/print-pemesanan-po/print-pemesanan-po.component";
import { PrintPenerimaanDenganPoComponent } from "./feature/penerimaan-dengan-po/print-penerimaan-dengan-po/print-penerimaan-dengan-po.component";
import { PrintReturPembelianComponent } from "./feature/retur-pembelian/print-retur-pembelian/print-retur-pembelian.component";

const routes: Routes = [
    {
        path: 'pemesanan-po', children: [
            { path: 'history', component: HistoryPemesananPoComponent },
            { path: 'input', component: InputPemesananPoComponent },
            { path: 'detail/:id', component: DetailPemesananPoComponent },
            { path: 'print/:id', component: PrintPemesananPoComponent },
            { path: 'export-pdf/:id', component: PrintPemesananPoComponent },
        ]
    },
    {
        path: 'penerimaan-dengan-po', children: [
            { path: 'history', component: HistoryPenerimaanDenganPoComponent },
            { path: 'input', component: InputPenerimaanDenganPoComponent },
            { path: 'input-ulang/:id', component: InputPenerimaanDenganPoComponent },
            { path: 'detail/:id', component: DetailPenerimaanDenganPoComponent },
            { path: 'print/:id', component: PrintPenerimaanDenganPoComponent },
            { path: 'print-history/:id', component: PrintPenerimaanDenganPoComponent },
            { path: 'print_draft', component: PrintPenerimaanDenganPoComponent },
            { path: 'export-pdf/:id', component: PrintPenerimaanDenganPoComponent },
        ]
    },
    {
        path: 'penerimaan-tanpa-po', children: [
            { path: 'history', component: HistoryPenerimaanTanpaPoComponent },
            { path: 'input', component: InputPenerimaanTanpaPoComponent },
            { path: 'input-ulang/:id', component: InputPenerimaanTanpaPoComponent },
            { path: 'detail/:id', component: DetailPenerimaanTanpaPoComponent },
            { path: 'print/:id', component: PrintPemesananPoComponent },
            { path: 'export-pdf/:id', component: PrintPemesananPoComponent },
        ]
    },
    {
        path: 'konsinyasi', children: [
            { path: 'history', component: HistoryPenerimaanKonsinyasiComponent },
            { path: 'input', component: InputPenerimaanKonsinyasiComponent },
            { path: 'detail/:id', component: DetailPenerimaanKonsinyasiComponent }
        ]
    },
    {
        path: 'retur-pembelian', children: [
            { path: 'history', component: HistoryReturPembelianComponent },
            { path: 'input', component: InputReturPembelianComponent },
            { path: 'detail/:id', component: DetailReturPembelianComponent },
            { path: 'print/:id', component: PrintReturPembelianComponent },
        ]
    },
    {
        path: 'retur-konsinyasi', children: [
            { path: 'history', component: HistoryReturKonsinyasiComponent },
            { path: 'input', component: InputReturKonsinyasiComponent },
            { path: 'detail/:id', component: DetailReturKonsinyasiComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PembelianRoutingModule { }