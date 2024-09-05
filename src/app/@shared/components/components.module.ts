import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ButtonNavigationComponent } from './button/button-navigation/button-navigation.component';
import { ButtonModule } from "primeng/button";
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { AgGridModule } from "ag-grid-angular";
import { StateModule } from "../state/state.module";
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';

import { ButtonCustomComponent } from './button/button-custom/button-custom.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { LoadingDialogComponent } from './dialog/loading-dialog/loading-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GridComponent } from './grid/grid.component';
import { OffcanvasFilterComponent } from './filter/offcanvas-filter/offcanvas-filter.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LookupComponent } from './lookup/lookup.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { PrintOutGridComponent } from './print-out-grid/print-out-grid.component';

@NgModule({
    declarations: [
        ButtonNavigationComponent,
        ButtonCustomComponent,
        SidebarComponent,
        NavbarComponent,
        DashboardComponent,
        CustomFormComponent,
        LoadingDialogComponent,
        PageNotFoundComponent,
        GridComponent,
        OffcanvasFilterComponent,
        BreadcrumbsComponent,
        LookupComponent,
        FormDialogComponent,
        CustomDropdownComponent,
        PrintOutGridComponent,
    ],
    imports: [
        CommonModule,
        StateModule.forRoot(),
        ButtonModule,
        MenubarModule,
        InputTextModule,
        AutoCompleteModule,
        InputNumberModule,
        CalendarModule,
        DropdownModule,
        MultiSelectModule,
        SidebarModule,
        ToastModule,
        DialogModule,
        ConfirmDialogModule,
        PasswordModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarModule,
        ProgressSpinnerModule,
        AgGridModule,
        ChipModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        InputTextareaModule,
        MenuModule,
        TableModule
    ],
    exports: [
        ButtonNavigationComponent,
        ButtonCustomComponent,
        SidebarComponent,
        NavbarComponent,
        DashboardComponent,
        CustomFormComponent,
        LoadingDialogComponent,
        GridComponent,
        OffcanvasFilterComponent,
        LookupComponent,
        FormDialogComponent,
        TabViewModule,
        InputNumberModule,
        PrintOutGridComponent,
    ],
    providers: []
})
export class ComponentsModule { }