import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SetupKaryawanComponent } from "./feature/setup-karyawan/setup-karyawan.component";
import { SetupDepartemenComponent } from "./feature/setup-departemen/setup-departemen.component";
import { AbsensiComponent } from "./feature/absensi/absensi.component";

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HumanResourceRoutingModule { }