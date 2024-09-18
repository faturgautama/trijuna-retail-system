import { RouterModule, Routes } from "@angular/router";
import { SetupPotonganPembelianComponent } from "./feature/setup-data/setup-potongan-pembelian/setup-potongan-pembelian.component";
import { SetupRekeningOwnerComponent } from "./feature/setup-data/setup-rekening-owner/setup-rekening-owner.component";
import { HistoryTitipTagihanComponent } from "./feature/titip-tagihan/history-titip-tagihan/history-titip-tagihan.component";
import { InputTitipTagihanComponent } from "./feature/titip-tagihan/input-titip-tagihan/input-titip-tagihan.component";
import { DetailTitipTagihanComponent } from "./feature/titip-tagihan/detail-titip-tagihan/detail-titip-tagihan.component";
import { HistoryPelunasanTtComponent } from "./feature/pelunasan-hutang-supplier/history-pelunasan-tt/history-pelunasan-tt.component";
import { InputPelunasanTtComponent } from "./feature/pelunasan-hutang-supplier/input-pelunasan-tt/input-pelunasan-tt.component";
import { DetailPelunasanTtComponent } from "./feature/pelunasan-hutang-supplier/detail-pelunasan-tt/detail-pelunasan-tt.component";
import { PaymentPelunasanTtComponent } from "./feature/pelunasan-hutang-supplier/payment-pelunasan-tt/payment-pelunasan-tt.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'setup-data', children: [
            {
                path: 'setup-potongan-pembelian', component: SetupPotonganPembelianComponent
            },
            {
                path: 'setup-rekening-owner', component: SetupRekeningOwnerComponent
            }
        ]
    },
    {
        path: 'titip-tagihan', children: [
            {
                path: 'history', component: HistoryTitipTagihanComponent
            },
            {
                path: 'input', component: InputTitipTagihanComponent
            },
            {
                path: 'detail/:id', component: DetailTitipTagihanComponent,
            }
        ]
    },
    {
        path: 'pelunasan-hutang-supplier', children: [
            {
                path: 'history', component: HistoryPelunasanTtComponent
            },
            {
                path: 'input', component: InputPelunasanTtComponent
            },
            {
                path: 'detail/:id', component: DetailPelunasanTtComponent,
            },
            {
                path: 'payment/:id', component: PaymentPelunasanTtComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinanceRoutingModule { }