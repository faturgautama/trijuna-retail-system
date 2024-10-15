import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryRefundPenjualanComponent } from './feature/refund-penjualan/history-refund-penjualan/history-refund-penjualan.component';
import { DetailRefundPenjualanComponent } from './feature/refund-penjualan/detail-refund-penjualan/detail-refund-penjualan.component';
import { BukaKasirComponent } from './feature/buka-kasir/buka-kasir.component';
import { SettingVoucherComponent } from './feature/setting-voucher/setting-voucher.component';
import { InputTutupKasirComponent } from './feature/tutup-kasir/input-tutup-kasir/input-tutup-kasir.component';
import { HistoryTutupKasirComponent } from './feature/tutup-kasir/history-tutup-kasir/history-tutup-kasir.component';
import { DetailTutupKasirComponent } from './feature/tutup-kasir/detail-tutup-kasir/detail-tutup-kasir.component';
import { HistoryCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/history-croscek-tutup-kasir/history-croscek-tutup-kasir.component';
import { InputCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/input-croscek-tutup-kasir/input-croscek-tutup-kasir.component';
import { DetailCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/detail-croscek-tutup-kasir/detail-croscek-tutup-kasir.component';
import { HistoryPenjualanComponent } from './feature/penjualan/history-penjualan/history-penjualan.component';
import { DetailPenjualanComponent } from './feature/penjualan/detail-penjualan/detail-penjualan.component';
import { SellOutComponent } from './feature/sell-out/sell-out.component';
import { PrintCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/print-croscek-tutup-kasir/print-croscek-tutup-kasir.component';
import { SettingPromoDiskonComponent } from './feature/setting-promo/setting-promo-diskon/setting-promo-diskon.component';
import { SettingPromoHadiahComponent } from './feature/setting-promo/setting-promo-hadiah/setting-promo-hadiah.component';
import { SettingPromoBarangComponent } from './feature/setting-promo/setting-promo-barang/setting-promo-barang.component';

const routes: Routes = [
    {
        path: 'refund-penjualan', children: [
            { path: 'history', component: HistoryRefundPenjualanComponent },
            { path: 'detail/:id', component: DetailRefundPenjualanComponent }
        ]
    },
    {
        path: 'modal-kasir', component: BukaKasirComponent
    },
    {
        path: 'tutup-kasir', children: [
            { path: 'history', component: HistoryTutupKasirComponent },
            { path: 'input', component: InputTutupKasirComponent },
            { path: 'detail/:id', component: DetailTutupKasirComponent }
        ]
    },
    {
        path: 'croscek-tutup-kasir', children: [
            { path: 'history', component: HistoryCroscekTutupKasirComponent },
            { path: 'input', component: InputCroscekTutupKasirComponent },
            { path: 'detail/:id', component: DetailCroscekTutupKasirComponent },
            { path: 'print/:id', component: PrintCroscekTutupKasirComponent },
        ]
    },
    {
        path: 'setting-voucher', component: SettingVoucherComponent
    },
    {
        path: 'transaksi-penjualan',
        children: [
            { path: 'history', component: HistoryPenjualanComponent },
            { path: 'detail/:id', component: DetailPenjualanComponent },
            { path: 'sell-out-item', component: SellOutComponent },
        ]
    },
    {
        path: 'setting-promo',
        children: [
            { path: 'setting-diskon', component: SettingPromoDiskonComponent },
            { path: 'setting-hadiah', component: SettingPromoHadiahComponent },
            { path: 'setting-barang', component: SettingPromoBarangComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PenjualanRoutingModule { }
