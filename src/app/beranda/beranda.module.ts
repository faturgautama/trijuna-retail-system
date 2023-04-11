import { NgModule } from "@angular/core";
import { BerandaComponent } from "./feature/beranda/beranda.component";
import { ComponentsModule } from "../@shared/components/components.module";
import { BerandaRoutingModule } from "./beranda-routing.module";
import { CommonModule } from "@angular/common";
import { MessageService } from "primeng/api";

@NgModule({
    declarations: [
        BerandaComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        BerandaRoutingModule,
    ],
    providers: [
        MessageService,
    ]
})
export class BerandaModule { }