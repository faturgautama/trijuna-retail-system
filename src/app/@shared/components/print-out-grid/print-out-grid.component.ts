import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { GridModel } from '../../models/components/grid.model';
import { PrintOutGridModel } from '../../models/components/print-out-grid.model';

@Component({
    selector: 'app-print-out-grid',
    templateUrl: './print-out-grid.component.html',
    styleUrls: ['./print-out-grid.component.scss']
})
export class PrintOutGridComponent implements OnInit {

    @Input('props') props!: PrintOutGridModel.IGrid;

    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    gridApi!: GridApi;

    gridColumnApi!: ColumnApi;

    gridToolbar: PrintOutGridModel.IGridToolbar[] = [];

    gridDatasource: any[] = [];

    SelectedRow: any;

    constructor(
        // private _documentService: DocumentService,
    ) { };

    ngOnInit(): void {
        this.onGridReady();
    }

    onGridReady(): void {
        this.gridDatasource = this.props.dataSource;

        const column = this.props.column.map((item) => {
            return {
                id: item.field,
                renderAsCheckbox: item.renderAsCheckbox ? item.renderAsCheckbox : false,
                ...item
            }
        });

        this.props.column = column as any;
    }

    handleFormatStringToNumber(data: string): number {
        return parseFloat(data);
    }
}
