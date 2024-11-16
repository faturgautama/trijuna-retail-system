import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { InputStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/input-stok-opname.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-detail-stok-opname',
    templateUrl: './detail-stok-opname.component.html',
    styleUrls: ['./detail-stok-opname.component.scss']
})
export class DetailStokOpnameComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'setting' | 'insert' = 'setting';

    DashboardProps: DashboardModel.IDashboard;

    SelectedDataSetting: any;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    GriDaftarBarangProps: GridModel.IGrid;

    SelectedData: any;

    Keterangan = "";

    TotalQtyFisik = 0;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _inputStokOpnameService: InputStokOpnameService
    ) {
        this.DashboardProps = {
            title: 'Detail Stok Opname',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'update', caption: 'Update', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_pemesanan_po_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_input_stok_opname',
                    label: 'Id Stok Opname',
                    status: 'insert',
                    type: 'string',
                    required: false,
                    hidden: true,
                },
                {
                    id: 'created_at',
                    label: 'Waktu Entry',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nama',
                    label: 'User Entry',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        }

        this.GriDaftarBarangProps = {
            column: [
                { field: 'barcode', headerName: 'BARCODE', flex: 170, sortable: true, resizable: true, cellClass: 'text-red-600 font-semibold' },
                { field: 'kode_barang', headerName: 'KODE BARANG', flex: 200, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', flex: 200, sortable: true, resizable: true },
                {
                    field: 'qty_fisik', headerName: 'QTY FISIK', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    editable: true,
                    valueGetter: params => { return params.data.qty_fisik },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.qty_fisik = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
            ],
            dataSource: [],
            height: "calc(100vh - 18rem)",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.getDetailStokOpname();
        }, 1000);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getDetailStokOpname() {
        const id = this._activatedRoute.snapshot.params['id'];

        this._inputStokOpnameService
            .getById(id)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    console.log(result.data);
                    this.CustomForm.CustomForms.patchValue(result.data);
                    this.GriDaftarBarangProps.dataSource = result.data.detail_barang;
                    this.handleCellFinishEditing(this.GriDaftarBarangProps.dataSource);
                }
            })
    }

    handleClickButtonNav(args: string): void {
        if (args == 'back') {
            this._router.navigate(['inventory/stok-opname/history']);
        };

        if (args == 'update') {
            const payload = {
                id_input_stok_opname: this.CustomForm.CustomForms.get('id_input_stok_opname')?.value,
                detail: this.GriDaftarBarangProps.dataSource.map((item: any) => {
                    return {
                        id_barang: item.id_barang,
                        qty_fisik: item.qty_fisik
                    }
                })
            };

            this._inputStokOpnameService
                .update(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diperbarui' });
                        this.getDetailStokOpname();
                    }
                });
        };
    }

    handleCellFinishEditing(args: any): void {
        this.TotalQtyFisik = 0;

        args.forEach((item: any) => {
            item.qty_fisik = parseFloat(item.qty_fisik);
            this.TotalQtyFisik += item.qty_fisik;
        });
    }
}
