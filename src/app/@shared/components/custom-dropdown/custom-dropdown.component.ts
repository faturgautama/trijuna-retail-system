import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-custom-dropdown',
    templateUrl: './custom-dropdown.component.html',
    styleUrls: ['./custom-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CustomDropdownComponent implements ICellRendererAngularComp {

    params: any = {} as any;

    dataSource = [];

    agInit(params: any): void {
        this.params = params;
        this.dataSource = params.data[params.dataSource];
    }

    refresh(params: ICellRendererParams) {
        this.params = params;
        return true;
    }

    onChange(value: any) {
        const field: any = this.params.colDef?.field;
        const data = JSON.parse(JSON.stringify(this.params.data));
        data[field] = value;
        this.params.data = data;
    }

    doSomething() {

    }
}
