import { NgModule } from "@angular/core";
import { SetupDataRoutingModule } from "./setup-data-routing.module";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../@shared/components/components.module";
import { StateModule } from "../@shared/state/state.module";

import { MessageService } from "primeng/api";

import { ListSetupMemberComponent } from './feature/setup-member/list-setup-member/list-setup-member.component';
import { InputSetupMemberComponent } from './feature/setup-member/input-setup-member/input-setup-member.component';
import { ListSetupSupplierComponent } from './feature/setup-supplier/list-setup-supplier/list-setup-supplier.component';
import { InputSetupSupplierComponent } from './feature/setup-supplier/input-setup-supplier/input-setup-supplier.component';
import { SetupDivisiComponent } from './feature/setup-divisi/setup-divisi.component';
import { SetupMerkComponent } from './feature/setup-merk/setup-merk.component';
import { SetupGroupComponent } from './feature/setup-group/setup-group.component';
import { SetupSatuanComponent } from './feature/setup-satuan/setup-satuan.component';
import { SetupRakComponent } from './feature/setup-rak/setup-rak.component';
import { SetupLokasiComponent } from './feature/setup-lokasi/setup-lokasi.component';
import { SetupWarehouseComponent } from './feature/setup-warehouse/setup-warehouse.component';
import { DetailSetupBarangComponent } from './feature/setup-barang/detail-setup-barang/detail-setup-barang.component';
import { ListSetupBarangComponent } from './feature/setup-barang/list-setup-barang/list-setup-barang.component';
import { InputSetupBarangComponent } from './feature/setup-barang/input-setup-barang/input-setup-barang.component';

@NgModule({
    declarations: [
        ListSetupMemberComponent,
        InputSetupMemberComponent,
        ListSetupSupplierComponent,
        InputSetupSupplierComponent,
        SetupDivisiComponent,
        SetupMerkComponent,
        SetupGroupComponent,
        SetupSatuanComponent,
        SetupRakComponent,
        SetupLokasiComponent,
        SetupWarehouseComponent,
        DetailSetupBarangComponent,
        ListSetupBarangComponent,
        InputSetupBarangComponent,
    ],
    imports: [
        CommonModule,
        SetupDataRoutingModule,
        ComponentsModule,
        StateModule,
    ],
    providers: [
        MessageService,
    ],
})
export class SetupDataModule { }