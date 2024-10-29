import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListSetupMemberComponent } from "./feature/setup-member/list-setup-member/list-setup-member.component";
import { InputSetupMemberComponent } from "./feature/setup-member/input-setup-member/input-setup-member.component";
import { ListSetupSupplierComponent } from "./feature/setup-supplier/list-setup-supplier/list-setup-supplier.component";
import { InputSetupSupplierComponent } from "./feature/setup-supplier/input-setup-supplier/input-setup-supplier.component";
import { SetupDivisiComponent } from "./feature/setup-divisi/setup-divisi.component";
import { SetupMerkComponent } from "./feature/setup-merk/setup-merk.component";
import { SetupGroupComponent } from "./feature/setup-group/setup-group.component";
import { SetupSatuanComponent } from "./feature/setup-satuan/setup-satuan.component";
import { SetupRakComponent } from "./feature/setup-rak/setup-rak.component";
import { SetupLokasiComponent } from "./feature/setup-lokasi/setup-lokasi.component";
import { SetupWarehouseComponent } from "./feature/setup-warehouse/setup-warehouse.component";
import { ListSetupBarangComponent } from "./feature/setup-barang/list-setup-barang/list-setup-barang.component";
import { InputSetupBarangComponent } from "./feature/setup-barang/input-setup-barang/input-setup-barang.component";
import { DetailSetupBarangComponent } from "./feature/setup-barang/detail-setup-barang/detail-setup-barang.component";
import { ListSettingHargaComponent } from "./feature/setting-harga/list-setting-harga/list-setting-harga.component";
import { InputSettingHargaComponent } from "./feature/setting-harga/input-setting-harga/input-setting-harga.component";
import { DetailSettingHargaComponent } from "./feature/setting-harga/detail-setting-harga/detail-setting-harga.component";
import { SetupUserComponent } from "./feature/management-user/setup-user/setup-user.component";
import { PrintSetupBarangComponent } from "./feature/setup-barang/print-setup-barang/print-setup-barang.component";
import { SetupGroupUserComponent } from "./feature/management-user/setup-group-user/setup-group-user.component";
import { SettingPointMemberComponent } from "./feature/setting-point-member/setting-point-member.component";

const routes: Routes = [
    {
        path: 'setup-member', children: [
            { path: 'list', component: ListSetupMemberComponent },
            { path: 'input', component: InputSetupMemberComponent },
        ]
    },
    {
        path: 'setting-point-member', component: SettingPointMemberComponent,
    },
    {
        path: 'setup-supplier', children: [
            { path: 'list', component: ListSetupSupplierComponent },
            { path: 'input', component: InputSetupSupplierComponent },
        ]
    },
    {
        path: 'setup-inventory', children: [
            {
                path: 'setup-divisi', component: SetupDivisiComponent,
            },
            {
                path: 'setup-merk', component: SetupMerkComponent,
            },
            {
                path: 'setup-group', component: SetupGroupComponent,
            },
            {
                path: 'setup-satuan', component: SetupSatuanComponent,
            },
            {
                path: 'setup-rak', component: SetupRakComponent,
            },
            {
                path: 'setup-lokasi', component: SetupLokasiComponent,
            },
            {
                path: 'setup-warehouse', component: SetupWarehouseComponent,
            },
            {
                path: 'setup-barang', children: [
                    { path: 'all', component: ListSetupBarangComponent },
                    { path: 'list', component: ListSetupBarangComponent },
                    { path: 'input', component: InputSetupBarangComponent },
                    { path: 'detail/:id', component: DetailSetupBarangComponent },
                    { path: 'print', component: PrintSetupBarangComponent },
                ],
            },
        ]
    },
    {
        path: 'setting-harga', children: [
            { path: 'list', component: ListSettingHargaComponent },
            { path: 'input', component: InputSettingHargaComponent },
            { path: 'detail/:id', component: DetailSettingHargaComponent },
        ],
    },
    {
        path: 'management-user', children: [
            {
                path: 'setup-group-user',
                component: SetupGroupUserComponent
            },
            {
                path: 'setup-user',
                component: SetupUserComponent
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetupDataRoutingModule { }