import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ConfirmDialog } from "primeng/confirmdialog";
import { ComponentsModule } from "../@shared/components/components.module";
import { HumanResourceRoutingModule } from "./human-resource-routing.module";
import { SetupKaryawanComponent } from './feature/setup-karyawan/setup-karyawan.component';
import { SetupDepartemenComponent } from './feature/setup-departemen/setup-departemen.component';
import { AbsensiComponent } from './feature/absensi/absensi.component';

@NgModule({
    declarations: [
        SetupKaryawanComponent,
        SetupDepartemenComponent,
        AbsensiComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        HumanResourceRoutingModule
    ],
    providers: [
        MessageService,
        ConfirmDialog
    ]
})
export class HumanResourceModule { }