import { NgModule } from "@angular/core";
import { PosKasirComponent } from './feature/pos-kasir/pos-kasir.component';
import { PointOfSaleRoutingModule } from "./pos-routing.module";
import { CommonModule } from "@angular/common";
import { MessageService } from "primeng/api";
import { LayoutPosComponent } from './component/layout-pos/layout-pos.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ListBarangComponent } from './component/list-barang/list-barang.component';
import { FilterGroupComponent } from './component/list-barang/filter-group/filter-group.component';
import { ListOrderComponent } from './component/list-order/list-order.component';
import { CardBarangComponent } from './component/list-barang/card-barang/card-barang.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [
        PosKasirComponent,
        LayoutPosComponent,
        SidebarComponent,
        ListBarangComponent,
        FilterGroupComponent,
        ListOrderComponent,
        CardBarangComponent
    ],
    imports: [
        CommonModule,
        PointOfSaleRoutingModule,
        InputTextModule,
    ],
    providers: [
        MessageService
    ]
})
export class PointOfSaleModule { }