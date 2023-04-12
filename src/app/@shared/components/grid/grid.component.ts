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

    @Output('toolbarClicked') toolbarClicked = new EventEmitter<GridModel.IGridToolbar>();

    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    gridApi!: GridApi;

    private gridColumnApi!: ColumnApi;

    gridToolbar: GridModel.IGridToolbar[] = [];

    constructor() {
        this.props = {
            column: [],
            dataSource: [],
            height: '400px',
            toolbar: [],
        };
    };

    onGridReady(args: GridReadyEvent): void {
        if (this.props.toolbar?.length) {
            this.props.toolbar.forEach((item) => {
                let icon = "";

                switch (item) {
                    case 'Add':
                        icon = 'pi pi-plus';
                        break;
                    case 'Edit':
                        icon = 'pi pi-file-edit';
                        break;
                    case 'Delete':
                        icon = 'pi pi-trash';
                        break;
                    case 'Detail':
                        icon = 'pi pi-info-circle';
                        break;
                    default:
                        break;
                }

                this.gridToolbar.push({
                    id: item.toLowerCase(),
                    title: item,
                    icon: icon
                });
            });
        }
    }

    onCellClicked(args: any): void {
        this.cellClicked.emit(args.data);
    }

    onRowDoubleClicked(args: any): void {
        this.rowDoubleClicked.emit(args.data);
    }

    onToolbarClicked(args: GridModel.IGridToolbar): void {
        this.toolbarClicked.emit(args);
    }
}
