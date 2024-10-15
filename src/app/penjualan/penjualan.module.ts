import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../@shared/components/components.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PenjualanRoutingModule } from './penjualan-routing.module';
import { InputRefundPenjualanComponent } from './feature/refund-penjualan/input-refund-penjualan/input-refund-penjualan.component';
import { HistoryRefundPenjualanComponent } from './feature/refund-penjualan/history-refund-penjualan/history-refund-penjualan.component';
import { DetailRefundPenjualanComponent } from './feature/refund-penjualan/detail-refund-penjualan/detail-refund-penjualan.component';
import { BukaKasirComponent } from './feature/buka-kasir/buka-kasir.component';
import { InputTutupKasirComponent } from './feature/tutup-kasir/input-tutup-kasir/input-tutup-kasir.component';
import { HistoryTutupKasirComponent } from './feature/tutup-kasir/history-tutup-kasir/history-tutup-kasir.component';
import { DetailTutupKasirComponent } from './feature/tutup-kasir/detail-tutup-kasir/detail-tutup-kasir.component';
import { InputCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/input-croscek-tutup-kasir/input-croscek-tutup-kasir.component';
import { HistoryCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/history-croscek-tutup-kasir/history-croscek-tutup-kasir.component';
import { DetailCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/detail-croscek-tutup-kasir/detail-croscek-tutup-kasir.component';
import { SettingVoucherComponent } from './feature/setting-voucher/setting-voucher.component';
import { HistoryPenjualanComponent } from './feature/penjualan/history-penjualan/history-penjualan.component';
import { DetailPenjualanComponent } from './feature/penjualan/detail-penjualan/detail-penjualan.component';
import { SellOutComponent } from './feature/sell-out/sell-out.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PrintCroscekTutupKasirComponent } from './feature/croscek-tutup-kasir/print-croscek-tutup-kasir/print-croscek-tutup-kasir.component';
import { SettingPromoDiskonComponent } from './feature/setting-promo/setting-promo-diskon/setting-promo-diskon.component';
import { SettingPromoHadiahComponent } from './feature/setting-promo/setting-promo-hadiah/setting-promo-hadiah.component';
import { SettingPromoBarangComponent } from './feature/setting-promo/setting-promo-barang/setting-promo-barang.component';

@NgModule({
    declarations: [
        InputRefundPenjualanComponent,
        HistoryRefundPenjualanComponent,
        DetailRefundPenjualanComponent,
        BukaKasirComponent,
        InputTutupKasirComponent,
        HistoryTutupKasirComponent,
        DetailTutupKasirComponent,
        InputCroscekTutupKasirComponent,
        HistoryCroscekTutupKasirComponent,
        DetailCroscekTutupKasirComponent,
        SettingVoucherComponent,
        HistoryPenjualanComponent,
        DetailPenjualanComponent,
        SellOutComponent,
        PrintCroscekTutupKasirComponent,
        SettingPromoDiskonComponent,
        SettingPromoHadiahComponent,
        SettingPromoBarangComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        PenjualanRoutingModule,
        DialogModule,
        CalendarModule,
        InputTextareaModule,
        ButtonModule,
    ],
    providers: [
        MessageService,
        ConfirmationService
    ]
})
export class PenjualanModule { }
