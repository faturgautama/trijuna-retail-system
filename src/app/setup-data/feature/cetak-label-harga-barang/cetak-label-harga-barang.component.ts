import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-cetak-label-harga-barang',
    templateUrl: './cetak-label-harga-barang.component.html',
    styleUrls: ['./cetak-label-harga-barang.component.scss']
})
export class CetakLabelHargaBarangComponent implements OnInit, OnDestroy {

    DashboardProps: DashboardModel.IDashboard;

    @ViewChild('FormInputComps') FormInputComps!: CustomFormComponent;
    FormInput: CustomFormModel.IForm;

    GridProps: GridModel.IGrid;

    PrintDatasource: any[] = [];

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _setupBarangService: SetupBarangService,
    ) {
        this.DashboardProps = {
            title: 'Cetak Label Harga',
            button_navigation: [
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
        };

        this.FormInput = {
            id: 'input_setup_barang',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'barcode',
                    label: 'Barcode',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    text_keyup_enter: (value: string) => {
                        this.getBarangByBarcode(value);
                    }
                },
                {
                    id: 'kode_barang',
                    label: 'Kode Barang',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nama_barang',
                    label: 'Nama Barang',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nama_label',
                    label: 'Nama Label',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'harga_jual',
                    label: 'Harga Jual',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'jumlah_print',
                    label: 'Jumlah Print',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-3'
        };

        this.GridProps = {
            column: [
                { field: 'id_barang', headerName: 'ID BARANG', width: 170, sortable: true, resizable: true, hide: true },
                { field: 'urut', headerName: 'NO. URUT', flex: 170, sortable: true, resizable: true },
                { field: 'kode_barang', headerName: 'KODE BARANG', flex: 170, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', flex: 150, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', flex: 300, sortable: true, resizable: true },
                { field: 'harga_jual', headerName: 'HARGA JUAL', flex: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'jumlah_print', headerName: 'JUMLAH PRINT', flex: 170, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
            ],
            dataSource: [],
            toolbar: ['Delete'],
            height: "calc(100vh - 16rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {

    }

    private getBarangByBarcode(barcode: string) {
        const filter: any = [
            {
                "column": "mb.barcode",
                "filter": "contain",
                "value": barcode,
                "value2": ""
            }
        ];

        this._setupBarangService
            .getAllBarang(filter)
            .subscribe((result) => {
                if (result.success && result.data.length) {
                    result.data[0].harga_jual = this._utilityService.FormatNumber(result.data[0].harga_jual, 'Rp. ');
                    this.FormInputComps.CustomForms.patchValue(result.data[0]);
                }
            })
    }

    handleClickButtonAdd() {
        let value = this.FormInputComps.CustomForms.value;
        value.urut = this.GridProps.dataSource.length + 1;
        this.GridProps.dataSource = [value, ...this.GridProps.dataSource].sort((a, b) => a.urut - b.urut);
        this.FormInputComps.CustomForms.reset();
        this.onAddToPrintDatasource(value);
    }

    onToolbarClicked(args: any) {
        if (args.id == 'delete') {
            const selectedIndex = this.GridProps.dataSource.findIndex((item) => { return item.urut == args.data.urut });
            let copyDatasource = JSON.parse(JSON.stringify(this.GridProps.dataSource));
            copyDatasource.splice(selectedIndex, 1);
            this.GridProps.dataSource = copyDatasource;
            this.PrintDatasource = this.PrintDatasource.filter(item => item.urut != args.data.urut);
        };
    }

    private onAddToPrintDatasource(value: any) {
        for (let i = 0; i < value.jumlah_print; i++) {
            this.PrintDatasource.push({ ...value });
        }
    }

    handleClickButtonNav(args: string): void {
        if (args == 'print') {
            localStorage.setItem('_TRS_PRINT_LABEL_', JSON.stringify(this.PrintDatasource));
            setTimeout(() => {
                const url = this._router.serializeUrl(
                    this._router.createUrlTree(['setup-data/setup-inventory/print-label-harga'])
                );

                window.open(`/#${url}`, '_blank');

            }, 1000);
        }
    }

    ngOnDestroy(): void {
        localStorage.removeItem('_TRS_PRINT_LABEL_');
    }
}
