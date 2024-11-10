import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { environment } from 'src/environments/environment';

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
        private _messageService: MessageService,
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
                    type: 'lookup',
                    lookup_props: {
                        id: 'lookupBarang',
                        title: 'Data Barang',
                        columns: [
                            { field: 'kode_barang', width: 150, headerName: 'KODE BARANG', sortable: true, resizable: true },
                            { field: 'nama_barang', width: 250, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                            { field: 'barcode', width: 200, headerName: 'BARCODE', sortable: true, resizable: true },
                            {
                                field: 'harga_jual', width: 250, headerName: 'HARGA JUAL', sortable: true, resizable: true,
                                cellClass: 'text-end',
                                cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e }
                            },
                        ],
                        filter: [
                            { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                            { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                            { id: 'barcode', title: 'Barcode', type: 'contain', value: 'mb.barcode' },
                        ],
                        label: 'Cari Barang',
                        selectedField: 'barcode',
                        selectedValue: 'barcode',
                        url: `${environment.endpoint}/barang/by_param`,
                        callback: (data) => {
                            this.getBarangById(data.id_barang);
                        },
                        width: '70vw',
                    },
                    lookup_set_value_field: ['kode_barang', 'barcode', 'nama_barang'],
                    required: true,
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
                    id: 'harga_jual',
                    label: 'Harga Jual',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'harga_grosir1',
                    label: 'Harga Grosir 1',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'harga_grosir2',
                    label: 'Harga Grosir 2',
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
                    hidden: true,
                },
                {
                    id: 'qty_grosir1',
                    label: 'Qty Grosir 1',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'qty_grosir2',
                    label: 'Qty Grosir 2',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    hidden: true,
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
            height: "calc(100vh - 23.5rem)",
            showPaging: false,
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

    private getBarangById(id_barang: number) {
        this._setupBarangService
            .getByIdBarang(id_barang)
            .subscribe((result) => {
                if (result.success) {
                    const harga_grosir1 = parseFloat(result.data.harga_grosir1) ? this._utilityService.FormatNumber(parseFloat(result.data.harga_grosir1), 'Rp. ') : '-',
                        harga_grosir2 = parseFloat(result.data.harga_grosir2) ? this._utilityService.FormatNumber(parseFloat(result.data.harga_grosir2), 'Rp. ') : '-',
                        harga_jual = parseFloat(result.data.harga_jual) ? this._utilityService.FormatNumber(parseFloat(result.data.harga_jual), 'Rp. ') : '-',
                        qty_grosir1 = parseFloat(result.data.qty_grosir1) ? parseFloat(result.data.qty_grosir1) : 0,
                        qty_grosir2 = parseFloat(result.data.qty_grosir2) ? parseFloat(result.data.qty_grosir2) : 0;

                    this.FormInputComps.CustomForms.get('harga_jual')?.setValue(harga_jual);
                    this.FormInputComps.CustomForms.get('qty_grosir1')?.setValue(qty_grosir1);
                    this.FormInputComps.CustomForms.get('harga_grosir1')?.setValue(harga_grosir1);
                    this.FormInputComps.CustomForms.get('qty_grosir2')?.setValue(qty_grosir2);
                    this.FormInputComps.CustomForms.get('harga_grosir2')?.setValue(harga_grosir2);
                }
            })
    }

    handleClickButtonAdd(jumlah_print: any) {
        let value = this.FormInputComps.CustomForms.value;

        if (parseInt(jumlah_print) > 0) {
            value.urut = this.GridProps.dataSource.length + 1;
            value.jumlah_print = parseInt(jumlah_print);
            this.GridProps.dataSource = [value, ...this.GridProps.dataSource].sort((a, b) => a.urut - b.urut);

            const lookupBarangInputResult = document.getElementById('lookupBarangInputResult') as HTMLInputElement;
            lookupBarangInputResult.value = "";

            const jumlah_print_el = document.getElementById('jumlah_print') as HTMLInputElement;
            jumlah_print_el.value = "";

            this.FormInputComps.CustomForms.reset();
            this.onAddToPrintDatasource(value);
        } else {
            this._messageService.clear();
            this._messageService.add({ severity: 'warn', summary: 'Oops', detail: 'Jumlah Print Tidak Boleh 0' })
        }
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
