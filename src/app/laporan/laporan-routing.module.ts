import { RouterModule, Routes } from "@angular/router";
import { LaporanPajakBkpComponent } from "./feature/pajak/laporan-pajak-bkp/laporan-pajak-bkp.component";
import { LaporanPajakNonBkpComponent } from "./feature/pajak/laporan-pajak-non-bkp/laporan-pajak-non-bkp.component";
import { LaporanPajakBkpRekapComponent } from "./feature/pajak/laporan-pajak-bkp-rekap/laporan-pajak-bkp-rekap.component";
import { NgModule } from "@angular/core";
import { LaporanKeluarMasukBarangComponent } from "./feature/inventory/laporan-keluar-masuk-barang/laporan-keluar-masuk-barang.component";
import { LaporanPembelianPpnComponent } from "./feature/pembelian/laporan-pembelian-ppn/laporan-pembelian-ppn.component";
import { LaporanPembelianRokokComponent } from "./feature/pembelian/laporan-pembelian-rokok/laporan-pembelian-rokok.component";
import { LaporanPenjualanGrosirComponent } from "./feature/penjualan/laporan-penjualan-grosir/laporan-penjualan-grosir.component";
import { LaporanPenjualanEceranComponent } from "./feature/penjualan/laporan-penjualan-eceran/laporan-penjualan-eceran.component";
import { LaporanPenjualanRokokComponent } from "./feature/penjualan/laporan-penjualan-rokok/laporan-penjualan-rokok.component";
import { LaporanPenjualanSembakoComponent } from "./feature/penjualan/laporan-penjualan-sembako/laporan-penjualan-sembako.component";
import { LaporanOmsetBreakdownMonthlyComponent } from "./feature/omset/laporan-omset-breakdown-monthly/laporan-omset-breakdown-monthly.component";
import { LaporanOmsetBreakdownDailyComponent } from "./feature/omset/laporan-omset-breakdown-daily/laporan-omset-breakdown-daily.component";
import { LaporanOmsetBreakdownMonthlyHppProfitComponent } from "./feature/omset/laporan-omset-breakdown-monthly-hpp-profit/laporan-omset-breakdown-monthly-hpp-profit.component";
import { LaporanOmsetBreakdownDailyHppComponent } from "./feature/omset/laporan-omset-breakdown-daily-hpp/laporan-omset-breakdown-daily-hpp.component";
import { LaporanStokPerTanggalComponent } from "./feature/inventory/laporan-stok-per-tanggal/laporan-stok-per-tanggal.component";

const routes: Routes = [
    {
        path: 'inventory',
        children: [
            { path: 'keluar-masuk-barang', component: LaporanKeluarMasukBarangComponent },
            { path: 'stok-per-tanggal', component: LaporanStokPerTanggalComponent },
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
    {
        path: 'pembelian',
        children: [
            { path: 'ppn', component: LaporanPembelianPpnComponent },
            { path: 'rokok', component: LaporanPembelianRokokComponent },
        ]
    },
    {
        path: 'penjualan',
        children: [
            { path: 'grosir', component: LaporanPenjualanGrosirComponent },
            { path: 'eceran', component: LaporanPenjualanEceranComponent },
            { path: 'rokok', component: LaporanPenjualanRokokComponent },
            { path: 'sembako', component: LaporanPenjualanSembakoComponent },
        ]
    },
    {
        path: 'omset',
        children: [
            { path: 'breakdown-monthly', component: LaporanOmsetBreakdownMonthlyComponent },
            { path: 'breakdown-daily', component: LaporanOmsetBreakdownDailyComponent },
            { path: 'breakdown-monthly-hpp-profit', component: LaporanOmsetBreakdownMonthlyHppProfitComponent },
            { path: 'breakdown-daily-hpp', component: LaporanOmsetBreakdownDailyHppComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LaporanRoutingModule { }