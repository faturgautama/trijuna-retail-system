import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { ComponentsModule } from "../@shared/components/components.module";
import { StateModule } from "../@shared/state/state.module";
import { PembelianRoutingModule } from "./pembelian-routing.module";
import { HistoryPemesananPoComponent } from './feature/pemesanan-po/history-pemesanan-po/history-pemesanan-po.component';
import { InputPemesananPoComponent } from './feature/pemesanan-po/input-pemesanan-po/input-pemesanan-po.component';
import { DetailPemesananPoComponent } from './feature/pemesanan-po/detail-pemesanan-po/detail-pemesanan-po.component';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputPenerimaanDenganPoComponent } from './feature/penerimaan-dengan-po/input-penerimaan-dengan-po/input-penerimaan-dengan-po.component';
import { HistoryPenerimaanDenganPoComponent } from './feature/penerimaan-dengan-po/history-penerimaan-dengan-po/history-penerimaan-dengan-po.component';
import { DetailPenerimaanDenganPoComponent } from './feature/penerimaan-dengan-po/detail-penerimaan-dengan-po/detail-penerimaan-dengan-po.component';
import { DetailPenerimaanTanpaPoComponent } from './feature/penerimaan-tanpa-po/detail-penerimaan-tanpa-po/detail-penerimaan-tanpa-po.component';
import { InputPenerimaanTanpaPoComponent } from './feature/penerimaan-tanpa-po/input-penerimaan-tanpa-po/input-penerimaan-tanpa-po.component';
import { HistoryPenerimaanTanpaPoComponent } from './feature/penerimaan-tanpa-po/history-penerimaan-tanpa-po/history-penerimaan-tanpa-po.component';
import { InputPenerimaanKonsinyasiComponent } from './feature/penerimaan-konsinyasi/input-penerimaan-konsinyasi/input-penerimaan-konsinyasi.component';
import { HistoryPenerimaanKonsinyasiComponent } from './feature/penerimaan-konsinyasi/history-penerimaan-konsinyasi/history-penerimaan-konsinyasi.component';
import { DetailPenerimaanKonsinyasiComponent } from './feature/penerimaan-konsinyasi/detail-penerimaan-konsinyasi/detail-penerimaan-konsinyasi.component';
import { InputReturPembelianComponent } from './feature/retur-pembelian/input-retur-pembelian/input-retur-pembelian.component';
import { HistoryReturPembelianComponent } from './feature/retur-pembelian/history-retur-pembelian/history-retur-pembelian.component';
import { DetailReturPembelianComponent } from './feature/retur-pembelian/detail-retur-pembelian/detail-retur-pembelian.component';
import { DetailReturKonsinyasiComponent } from './feature/retur-konsinyasi/detail-retur-konsinyasi/detail-retur-konsinyasi.component';
import { HistoryReturKonsinyasiComponent } from './feature/retur-konsinyasi/history-retur-konsinyasi/history-retur-konsinyasi.component';
import { InputReturKonsinyasiComponent } from './feature/retur-konsinyasi/input-retur-konsinyasi/input-retur-konsinyasi.component';
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import { PrintPemesananPoComponent } from './feature/pemesanan-po/print-pemesanan-po/print-pemesanan-po.component';
import { PrintPenerimaanDenganPoComponent } from './feature/penerimaan-dengan-po/print-penerimaan-dengan-po/print-penerimaan-dengan-po.component';

@NgModule({
    declarations: [
        HistoryPemesananPoComponent,
        InputPemesananPoComponent,
        DetailPemesananPoComponent,
        InputPenerimaanDenganPoComponent,
        HistoryPenerimaanDenganPoComponent,
        DetailPenerimaanDenganPoComponent,
        DetailPenerimaanTanpaPoComponent,
        InputPenerimaanTanpaPoComponent,
        HistoryPenerimaanTanpaPoComponent,
        InputPenerimaanKonsinyasiComponent,
        HistoryPenerimaanKonsinyasiComponent,
        DetailPenerimaanKonsinyasiComponent,
        InputReturPembelianComponent,
        HistoryReturPembelianComponent,
        DetailReturPembelianComponent,
        DetailReturKonsinyasiComponent,
        HistoryReturKonsinyasiComponent,
        InputReturKonsinyasiComponent,
        PrintPemesananPoComponent,
        PrintPenerimaanDenganPoComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        PembelianRoutingModule,
        InputTextareaModule,
        RadioButtonModule,
        FormsModule,
    ],
    providers: [
        MessageService,
    ]
})
export class PembelianModule { }