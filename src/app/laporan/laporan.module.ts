import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ComponentsModule } from "../@shared/components/components.module";
import { LaporanPajakBkpComponent } from "./feature/pajak/laporan-pajak-bkp/laporan-pajak-bkp.component";
import { LaporanPajakBkpRekapComponent } from "./feature/pajak/laporan-pajak-bkp-rekap/laporan-pajak-bkp-rekap.component";
import { LaporanPajakNonBkpComponent } from "./feature/pajak/laporan-pajak-non-bkp/laporan-pajak-non-bkp.component";
import { LaporanRoutingModule } from "./laporan-routing.module";
import { LaporanKeluarMasukBarangComponent } from './feature/inventory/laporan-keluar-masuk-barang/laporan-keluar-masuk-barang.component';
import { LaporanPembelianPpnComponent } from './feature/pembelian/laporan-pembelian-ppn/laporan-pembelian-ppn.component';
import { LaporanPembelianRokokComponent } from './feature/pembelian/laporan-pembelian-rokok/laporan-pembelian-rokok.component';
import { LaporanPenjualanGrosirComponent } from './feature/penjualan/laporan-penjualan-grosir/laporan-penjualan-grosir.component';
import { LaporanPenjualanEceranComponent } from './feature/penjualan/laporan-penjualan-eceran/laporan-penjualan-eceran.component';
import { LaporanPenjualanRokokComponent } from './feature/penjualan/laporan-penjualan-rokok/laporan-penjualan-rokok.component';
import { LaporanPenjualanSembakoComponent } from './feature/penjualan/laporan-penjualan-sembako/laporan-penjualan-sembako.component';
import { LaporanOmsetBreakdownMonthlyComponent } from './feature/omset/laporan-omset-breakdown-monthly/laporan-omset-breakdown-monthly.component';
import { LaporanOmsetBreakdownDailyComponent } from './feature/omset/laporan-omset-breakdown-daily/laporan-omset-breakdown-daily.component';
import { LaporanOmsetBreakdownMonthlyHppProfitComponent } from './feature/omset/laporan-omset-breakdown-monthly-hpp-profit/laporan-omset-breakdown-monthly-hpp-profit.component';
import { LaporanOmsetBreakdownDailyHppComponent } from './feature/omset/laporan-omset-breakdown-daily-hpp/laporan-omset-breakdown-daily-hpp.component';
import { LaporanStokPerTanggalComponent } from './feature/inventory/laporan-stok-per-tanggal/laporan-stok-per-tanggal.component';

@NgModule({
    declarations: [
        LaporanPajakBkpComponent,
        LaporanPajakNonBkpComponent,
        LaporanPajakBkpRekapComponent,
        LaporanKeluarMasukBarangComponent,
        LaporanPembelianPpnComponent,
        LaporanPembelianRokokComponent,
        LaporanPenjualanGrosirComponent,
        LaporanPenjualanEceranComponent,
        LaporanPenjualanRokokComponent,
        LaporanPenjualanSembakoComponent,
        LaporanOmsetBreakdownMonthlyComponent,
        LaporanOmsetBreakdownDailyComponent,
        LaporanOmsetBreakdownMonthlyHppProfitComponent,
        LaporanOmsetBreakdownDailyHppComponent,
        LaporanStokPerTanggalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        LaporanRoutingModule
    ],
    providers: [
        MessageService
    ]
})
export class LaporanModule { }
