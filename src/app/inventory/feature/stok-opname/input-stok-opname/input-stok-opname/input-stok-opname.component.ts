import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    selector: 'app-input-stok-opname',
    templateUrl: './input-stok-opname.component.html',
    styleUrls: ['./input-stok-opname.component.scss']
})
export class InputStokOpnameComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'setting' | 'insert' = 'setting';

    DashboardProps: DashboardModel.IDashboard;

    GriDaftarSettingdProps: GridModel.IGrid;

    SelectedDataSetting: any;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    GriDaftarBarangProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    SelectedData: any;

    Keterangan = "";

    TotalQtyFisik = 0;

    constructor(
        private _router: Router,
        private _cdr: ChangeDetectorRef,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _inputStokOpnameService: InputStokOpnameService
    ) {
        this.DashboardProps = {
            title: 'Daftar Setting Stok Opname',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nomor_stok_opname',
                    title: 'No. Stok Opname',
                    type: 'string',
                    value: 'nomor_stok_opname',
                },
                {
                    id: 'jenis_stok_opname',
                    title: 'Jenis Setting',
                    type: 'string',
                    value: 'jenis_stok_opname',
                },
                {
                    id: 'tanggal_setting_stok_opname',
                    title: 'Tgl. Setting',
                    type: 'date',
                    value: 'tanggal_setting_stok_opname',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tml.created_at',
                },
            ],
        }

        this.GriDaftarSettingdProps = {
            column: [
                { field: 'nomor_stok_opname', headerName: 'NO. STOK OPNAME', flex: 170, sortable: true, resizable: true, cellClass: 'text-red-600 font-semibold' },
                {
                    field: 'tanggal_setting_stok_opname', headerName: 'TGL. SETTING STOK OPNAME', flex: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'jenis_stok_opname', headerName: 'JENIS STOK OPNAME', flex: 200, sortable: true, resizable: true },
                { field: 'keterangan', headerName: 'KETERANGAN', flex: 200, sortable: true, resizable: true },
                { field: 'status', headerName: 'STATUS', flex: 200, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormInputHeader = {
            id: 'form_pemesanan_po_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_setting_stok_opname',
                    label: 'Id Setting Stok Opname',
                    status: 'insert',
                    type: 'string',
                    required: false,
                    hidden: true,
                },
                {
                    id: 'nomor_stok_opname',
                    label: 'No. Stok Opname',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'tanggal_setting_stok_opname',
                    label: 'Tgl. Setting SO',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'jenis_stok_opname',
                    label: 'Jenis Stok Opname',
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
            height: "calc(100vh - 21rem)",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNav(args: string): void {
        if (args == 'back') {
            this._router.navigate(['inventory/setting-stok-opname/history']);
        };

        if (args == 'back_setting') {
            this.PageState = 'setting';
            this.DashboardProps = {
                title: 'Daftar Setting Stok Opname',
                button_navigation: [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                ],
            };
        };

        if (args == 'save') {
            const payload = {
                id_setting_stok_opname: this.CustomForm.CustomForms.get('id_setting_stok_opname')?.value,
                keterangan: this.Keterangan,
                detail: this.GriDaftarBarangProps.dataSource.map((item: any) => {
                    return {
                        id_barang: item.id_barang,
                        qty_fisik: item.qty_fisik
                    }
                })
            };

            this._inputStokOpnameService
                .save(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                        setTimeout(() => {
                            this._router.navigate(['inventory/setting-stok-opname/history']);
                        }, 1000);
                    }
                });
        };
    }

    handleSearchOffcanvas(args: any): void {
        if (this.PageState == 'setting') {
            this._inputStokOpnameService
                .getAllSettingStokOpname(args)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.success) {
                        this.GriDaftarSettingdProps.dataSource = result.data;
                    }
                })
        } else {

        }
    }

    handleCellClicked(args: any): void {
        if (this.PageState == 'setting') {
            this.SelectedDataSetting = args;
        } else {
            this.SelectedData = args;
        }
    }

    handleRowDoubleClicked(args: any): void {
        if (this.PageState == 'setting') {
            this.PageState = 'insert';
            this.SelectedDataSetting = args;

            setTimeout(() => {
                this.FormInputHeader.default_value = args;
                this.CustomForm.handleSetFormDefaultValue();
            }, 1000);

            this.DashboardProps = {
                title: 'Input Stok Opname',
                button_navigation: [
                    { id: 'back_setting', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                    { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
                ],
            };

            this._inputStokOpnameService
                .getBarangSettingStokOpname(args.id_setting_stok_opname)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.success) {
                        this.GriDaftarBarangProps.dataSource = result.data.map((item: any) => {
                            return {
                                ...item,
                                qty_fisik: 0
                            }
                        });
                    }
                })
        }
    }

    handleCellFinishEditing(args: any): void {
        this.TotalQtyFisik = 0;

        args.forEach((item: any) => {
            item.qty_fisik = parseFloat(item.qty_fisik);
            this.TotalQtyFisik += item.qty_fisik;
        });
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
