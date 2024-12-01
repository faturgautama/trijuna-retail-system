import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SetupKaryawanComponent } from "./feature/setup-karyawan/setup-karyawan.component";
import { SetupDepartemenComponent } from "./feature/setup-departemen/setup-departemen.component";
import { AbsensiComponent } from "./feature/absensi/absensi.component";
import { PrintAbsensiComponent } from "./feature/print-absensi/print-absensi.component";

const routes: Routes = [
    {
        path: 'setup-departemen',
        component: SetupDepartemenComponent
    },
    {
        path: 'setup-karyawan',
        component: SetupKaryawanComponent
    },
    {
        path: 'absensi',
        component: AbsensiComponent
    },
    {
        path: 'absensi/export-pdf/:start/:end/:id_karyawan',
        component: PrintAbsensiComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HumanResourceRoutingModule { }