import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { map } from 'rxjs';
import { SettingStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/setting-stok-opname.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detail-setting-stok-opname',
    templateUrl: './detail-setting-stok-opname.component.html',
    styleUrls: ['./detail-setting-stok-opname.component.scss']
})
export class DetailSettingStokOpnameComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomFormHeader') CustomFormHeader!: CustomFormComponent

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    JenisStokOpname: 'barang' | 'divisi' | 'group' | 'supplier' = 'barang';

    GridBarangProps: GridModel.IGrid;
    GridBarangSelectedData: any = {} as any;

    GridDivisiProps: GridModel.IGrid;
    GridDivisiSelectedData: any = {} as any;

    GridGroupProps: GridModel.IGrid;
    GridGroupSelectedData: any = {} as any;

    GridSupplierProps: GridModel.IGrid;
    GridSupplierSelectedData: any = {} as any;

    Banyak: number = 0;
    Qty: number = 0;
    HargaSatuan: number = 0;
    TotalMutasi: number = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _confirmationService: ConfirmationService,
        private _settingStokOpnameService: SettingStokOpnameService,
    ) {
        this.DashboardProps = {
            title: 'Input Setting Stok Opname',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_mutasi_lokasi_keluar_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_setting_stok_opname',
                    label: 'Tgl. Setting',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nomor_stok_opname',
                    label: 'No. Stok Opname',
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
        };

        this.GridBarangProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_barang', headerName: 'NAMA BARANG', flex: 350, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', flex: 350, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "350px",
            toolbar: [],
            showPaging: false,
        };

        this.GridDivisiProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_divisi', headerName: 'ID DIVISI', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_divisi', headerName: 'KODE DIVISI', flex: 350, sortable: true, resizable: true },
                { field: 'divisi', headerName: 'NAMA DIVISI', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "350px",
            toolbar: [],
            showPaging: false,
        };

        this.GridGroupProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_group', headerName: 'ID GROUP', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_group', headerName: 'KODE GROUP', flex: 350, sortable: true, resizable: true },
                { field: 'group', headerName: 'NAMA GROUP', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "350px",
            toolbar: [],
            showPaging: false,
        };

        this.GridSupplierProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_supplier', headerName: 'ID SUPPLIER', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', flex: 350, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', flex: 350, sortable: true, resizable: true },
                { field: 'alamat', headerName: 'ALAMAT', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "350px",
            toolbar: [],
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_mutasi_warehouse_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'total_capture_harga_jual',
                    label: 'Total Capture Harga Jual',
                    status: 'readonly',
                    type: 'numeric',
                    required: false,
                },
                {
                    id: 'total_capture_hpp_average',
                    label: 'Total Capture HPP Average',
                    status: 'readonly',
                    type: 'numeric',
                    required: false,
                },
                {
                    id: 'total_fisik_harga_jual',
                    label: 'Total Fisik Harga Jual',
                    status: 'readonly',
                    type: 'numeric',
                    required: false,
                },
                {
                    id: 'total_fisik_hpp_average',
                    label: 'Total Fisik HPP Average',
                    status: 'readonly',
                    type: 'numeric',
                    required: false,
                },
                {
                    id: 'total_selisih_harga_jual',
                    label: 'Total Selisih Harga Jual',
                    status: 'readonly',
                    type: 'numeric',
                    required: false,
                },
                {
                    id: 'total_selisih_hpp_average',
                    label: 'Total Selisih HPP Average',
                    status: 'readonly',
                    type: 'numeric',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-7 grid-cols-1',
        };
    }

    ngOnInit(): void {
        this.getDetailSettingStokOpname();
    }

    getDetailSettingStokOpname(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._settingStokOpnameService
            .getById(id)
            .pipe(
                map((result) => {
                    if (result.success) {
                        return result.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                if (result.status_mutasi_lokasi == 'OPEN') {
                    this.DashboardProps = {
                        title: 'Detail Setting Stok Opname',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                            { id: 'unduh', caption: 'Download File', icon: 'pi pi-download text-xs' },
                            { id: 'validasi', caption: 'Validasi Offline', icon: 'pi pi-check text-xs' },
                            { id: 'validasi_online', caption: 'Validasi Online', icon: 'pi pi-check text-xs' },
                        ],
                    };
                } else {
                    this.DashboardProps = {
                        title: 'Detail Setting Stok Opname',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                            { id: 'unduh', caption: 'Download File', icon: 'pi pi-download text-xs' },
                        ],
                    };
                }

                this.CustomFormHeader.props.default_value = result;
                this.CustomFormHeader.handleSetFormDefaultValue();

                this.JenisStokOpname = result.jenis_stok_opname;

                this.GridBarangProps.dataSource = result.detail_barang;
                this.GridDivisiProps.dataSource = result.detail_divisi;
                this.GridGroupProps.dataSource = result.detail_group;
                this.GridSupplierProps.dataSource = result.detail_supplier;

                this.CustomFormFooter.props.default_value = result;
                this.CustomFormFooter.handleSetFormDefaultValue();
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['inventory/setting-stok-opname/history']);
                break;
            // case 'save':
            //     this.handleSubmitForm();
            //     break;
            default:
                break;
        }
    }
}
