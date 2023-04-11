import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridModel } from '../../models/components/grid.model';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent {

    @Input('props') props: GridModel.IGrid;

    @Output('cellClicked') cellClicked = new EventEmitter<any>();

    @Output('rowDoubleClicked') rowDoubleClicked = new EventEmitter<any>();

    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    gridApi!: GridApi;

    private gridColumnApi!: ColumnApi;

    constructor() {
        this.props = {
            column: [],
            dataSource: [],
            height: '400px',
        };
    };

    onGridReady(args: GridReadyEvent): void {
        // this.gridApi = args.api;
        // this.gridColumnApi = args.columnApi;

        // if (args.columnApi.getAllColumns()!.length < 15) {
        //     this.gridApi.sizeColumnsToFit();

        //     window.addEventListener('resize', () => {
        //         setTimeout(() => {
        //             this.gridApi.sizeColumnsToFit();
        //         });
        //     })
        // } else {
        //     const allColumnsId: string[] = [];

        //     this.gridColumnApi.getAllColumns()?.forEach((column) => {
        //         allColumnsId.push(column.getId());
        //     });

        //     this.gridColumnApi.autoSizeColumns(allColumnsId, false);
        // }
    }

    onCellClicked(args: any): void {
        this.cellClicked.emit(args);
    }

    onRowDoubleClicked(args: any): void {
        this.rowDoubleClicked.emit(args.data);
    }
}
