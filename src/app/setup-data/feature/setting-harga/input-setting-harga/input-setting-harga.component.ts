import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SettingHargaModel } from 'src/app/@shared/models/setup-data/setting-harga.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SettingHargaAction } from 'src/app/@shared/state/setup-data/setting-harga';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-setting-harga',
    templateUrl: './input-setting-harga.component.html',
    styleUrls: ['./input-setting-harga.component.scss']
})
export class InputSettingHargaComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputDetail: DialogModel.IFormDialog;
    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;

    GridProps: GridModel.IGrid;
    GridSelectedData: SettingHargaModel.ISettingHargaDetail = {} as any;

    LokasiDatasource: SetupLokasiModel.ISetupLokasi[] = [];

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Input Setting Harga',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_setting_harga_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_mulai_berlaku',
                    label: 'Tgl. Mulai Berlaku',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'id_lokasi',
                    label: 'Lokasi',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-2',
        }

        this.FormInputDetail = {
            title: 'Setting Harga',
            type: 'add',
            form_props: {
                id: 'form_setting_harga_detail',
                type: 'save',
                is_inline: true,
                fields: [
                    {
                        id: 'id_barang',
                        label: 'Id Barang',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupBarang',
                            title: 'Data Barang',
                            columns: [
                                { field: 'kode_barang', width: 275, headerName: 'KODE BARANG', sortable: true, resizable: true },
                                { field: 'nama_barang', width: 275, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                                { field: 'barcode', width: 275, headerName: 'BARCODE', sortable: true, resizable: true },
                            ],
                            filter: [
                                { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                                { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                            ],
                            label: 'Barang',
                            selectedField: 'nama_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/barang/by_param`
                        },
                        lookup_set_value_field: ['barcode', 'nama_barang'],
                        required: true,
                    },
                    {
                        id: 'barcode',
                        label: 'Barcode',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'nama_barang',
                        label: 'Nama Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'harga_jual',
                        label: 'Harga Jual',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'qty_grosir1',
                        label: 'Qty Grosir 1',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'harga_grosir1',
                        label: 'Harga Grosir 1',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'qty_grosir2',
                        label: 'Qty Grosir 2',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'harga_grosir2',
                        label: 'Harga Grosir 2',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'lokasi',
                        label: 'Lokasi',
                        status: 'insert',
                        type: 'multi_select',
                        select_props: [],
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-7'
            }
        };

        this.GridProps = {
            column: [
                { field: 'barcode', headerName: 'BARCODE', width: 170, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'harga_jual', headerName: 'HARGA JUAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty_grosir1', headerName: 'QTY GROSIR 1', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_grosir1', headerName: 'HARGA GROSIR 1', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'qty_grosir2', headerName: 'QTY GROSIR 2', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_grosir2', headerName: 'HARGA GROSIR 2', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'lokasi', headerName: 'LOKASI', width: 200, sortable: true, resizable: true }
            ],
            dataSource: [],
            height: "calc(100vh - 18rem)",
            toolbar: ['Add', 'Delete']
        };
    }

    ngOnInit(): void {
        this.getLokasi();
    }

    getLokasi(): void {
        this._store.dispatch(new SetupLokasiAction.GetAll())
            .pipe(
                map((result) => {
                    if (result.setup_lokasi.entities.success) {
                        return result.setup_lokasi.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.LokasiDatasource = result.map((item: SetupLokasiModel.ISetupLokasi) => {
                    return {
                        name: item.nama_lokasi,
                        value: item.id_lokasi,
                    }
                });

                const indexLokasiHeader = this.FormInputHeader.fields.findIndex((item) => { return item.id == 'id_lokasi' });

                const indexLokasiDetail = this.FormInputDetail.form_props.fields.findIndex((item) => { return item.id == 'lokasi' });

                this.FormInputHeader.fields[indexLokasiHeader].select_props = this.LokasiDatasource;

                this.FormInputDetail.form_props.fields[indexLokasiDetail].select_props = this.LokasiDatasource;
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['setup-data/setting-harga/list']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onToolbarClicked(args: any): void {
        switch (args.id) {
            case 'add':
                this.FormInputDetail.type = 'add';
                this.FormDialog.onOpenFormDialog();
                this
                break;
            case 'delete':
                const selectedIndex = this.GridProps.dataSource.findIndex((item) => { return item.id_barang == this.GridSelectedData.id_barang });
                this.GridProps.dataSource.splice(selectedIndex, 1);
                break;
            default:
                break;
        }
    }

    handleSubmitFormDetail(data: any): void {
        data.lokasi = data.lokasi.map((item: CustomFormModel.IFormSelectProps) => { return item.value });
        this.GridProps.dataSource = [...this.GridProps.dataSource, data];
        this.FormDialog.onCloseFormDialog();
    }

    handleSubmitForm(): void {
        const data = this.CustomForm.handleSubmitForm();
        data.detail = this.GridProps.dataSource;

        this._store.dispatch(new SettingHargaAction.Save(data))
            .subscribe((result) => {
                if (result.setting_harga.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();
                }
            });
    }
}
