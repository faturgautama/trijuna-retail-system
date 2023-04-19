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

@NgModule({
    declarations: [
        HistoryPemesananPoComponent,
        InputPemesananPoComponent,
        DetailPemesananPoComponent,
        InputPenerimaanDenganPoComponent,
        HistoryPenerimaanDenganPoComponent,
        DetailPenerimaanDenganPoComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        PembelianRoutingModule,
        InputTextareaModule
    ],
    providers: [
        MessageService,
    ]
})
export class PembelianModule { }