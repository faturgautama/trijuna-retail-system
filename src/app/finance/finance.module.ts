import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { ComponentsModule } from "../@shared/components/components.module";
import { SetupPotonganPembelianComponent } from './feature/setup-data/setup-potongan-pembelian/setup-potongan-pembelian.component';
import { SetupRekeningOwnerComponent } from './feature/setup-data/setup-rekening-owner/setup-rekening-owner.component';
import { HistoryTitipTagihanComponent } from './feature/titip-tagihan/history-titip-tagihan/history-titip-tagihan.component';
import { InputTitipTagihanComponent } from './feature/titip-tagihan/input-titip-tagihan/input-titip-tagihan.component';
import { DetailTitipTagihanComponent } from './feature/titip-tagihan/detail-titip-tagihan/detail-titip-tagihan.component';
import { InputPelunasanTtComponent } from './feature/pelunasan-hutang-supplier/input-pelunasan-tt/input-pelunasan-tt.component';
import { HistoryPelunasanTtComponent } from './feature/pelunasan-hutang-supplier/history-pelunasan-tt/history-pelunasan-tt.component';
import { DetailPelunasanTtComponent } from './feature/pelunasan-hutang-supplier/detail-pelunasan-tt/detail-pelunasan-tt.component';
import { PaymentPelunasanTtComponent } from './feature/pelunasan-hutang-supplier/payment-pelunasan-tt/payment-pelunasan-tt.component';
import { FinanceRoutingModule } from "./finance-routing.module";
import { TableModule } from "primeng/table";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import { HistoryFakturPajakPembelianComponent } from './feature/faktur-pajak-pembelian/history-faktur-pajak-pembelian/history-faktur-pajak-pembelian.component';
import { InputFakturPajakPembelianComponent } from './feature/faktur-pajak-pembelian/input-faktur-pajak-pembelian/input-faktur-pajak-pembelian.component';
import { DetailFakturPajakPembelianComponent } from './feature/faktur-pajak-pembelian/detail-faktur-pajak-pembelian/detail-faktur-pajak-pembelian.component';

@NgModule({
    declarations: [
        SetupPotonganPembelianComponent,
        SetupRekeningOwnerComponent,
        HistoryTitipTagihanComponent,
        InputTitipTagihanComponent,
        DetailTitipTagihanComponent,
        InputPelunasanTtComponent,
        HistoryPelunasanTtComponent,
        DetailPelunasanTtComponent,
        PaymentPelunasanTtComponent,
        HistoryFakturPajakPembelianComponent,
        InputFakturPajakPembelianComponent,
        DetailFakturPajakPembelianComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        FinanceRoutingModule,
        TableModule,
        RadioButtonModule,
    ],
    providers: [
        MessageService
    ]
})
export class FinanceModule { }