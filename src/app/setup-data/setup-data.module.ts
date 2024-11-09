import { NgModule } from "@angular/core";
import { SetupDataRoutingModule } from "./setup-data-routing.module";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../@shared/components/components.module";

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
import { DetailBarangSatuanComponent } from './feature/setup-barang/detail-setup-barang/detail-barang-satuan/detail-barang-satuan.component';
import { DetailBarangRakComponent } from './feature/setup-barang/detail-setup-barang/detail-barang-rak/detail-barang-rak.component';
import { DetailBarangKomponenComponent } from './feature/setup-barang/detail-setup-barang/detail-barang-komponen/detail-barang-komponen.component';
import { DetailBarangUraiComponent } from './feature/setup-barang/detail-setup-barang/detail-barang-urai/detail-barang-urai.component';
import { InputSettingHargaComponent } from './feature/setting-harga/input-setting-harga/input-setting-harga.component';
import { ListSettingHargaComponent } from './feature/setting-harga/list-setting-harga/list-setting-harga.component';
import { DetailSettingHargaComponent } from './feature/setting-harga/detail-setting-harga/detail-setting-harga.component';
import { DetailKartuStokComponent } from './feature/setup-barang/detail-setup-barang/detail-kartu-stok/detail-kartu-stok.component';
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { SetupGroupUserComponent } from './feature/management-user/setup-group-user/setup-group-user.component';
import { SetupUserComponent } from './feature/management-user/setup-user/setup-user.component';
import { PrintSetupBarangComponent } from './feature/setup-barang/print-setup-barang/print-setup-barang.component';
import { ListBarangAllComponent } from './feature/list-barang-all/list-barang-all.component';
import { SettingPointMemberComponent } from './feature/setting-point-member/setting-point-member.component';
import { InputTextModule } from "primeng/inputtext";
import { CetakLabelHargaBarangComponent } from './feature/cetak-label-harga-barang/cetak-label-harga-barang.component';

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
        DetailBarangSatuanComponent,
        DetailBarangRakComponent,
        DetailBarangKomponenComponent,
        DetailBarangUraiComponent,
        InputSettingHargaComponent,
        ListSettingHargaComponent,
        DetailSettingHargaComponent,
        DetailKartuStokComponent,
        SetupGroupUserComponent,
        SetupUserComponent,
        PrintSetupBarangComponent,
        ListBarangAllComponent,
        SettingPointMemberComponent,
        CetakLabelHargaBarangComponent,
    ],
    imports: [
        CommonModule,
        SetupDataRoutingModule,
        ComponentsModule,
        FormsModule,
        CalendarModule,
        DropdownModule,
        ButtonModule,
        InputTextModule
    ],
    providers: [
        MessageService,
    ],
})
export class SetupDataModule { }