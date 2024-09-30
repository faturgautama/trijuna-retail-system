import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ComponentsModule } from "../@shared/components/components.module";
import { LaporanPajakBkpComponent } from "./feature/pajak/laporan-pajak-bkp/laporan-pajak-bkp.component";
import { LaporanPajakBkpRekapComponent } from "./feature/pajak/laporan-pajak-bkp-rekap/laporan-pajak-bkp-rekap.component";
import { LaporanPajakNonBkpComponent } from "./feature/pajak/laporan-pajak-non-bkp/laporan-pajak-non-bkp.component";
import { LaporanRoutingModule } from "./laporan-routing.module";

@NgModule({
    declarations: [
        LaporanPajakBkpComponent,
        LaporanPajakNonBkpComponent,
        LaporanPajakBkpRekapComponent,
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
