import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { MutasiKeluarService } from 'src/app/@core/service/inventory/mutasi-keluar/mutasi-keluar.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-titip-tagihan',
    templateUrl: './input-titip-tagihan.component.html',
    styleUrls: ['./input-titip-tagihan.component.scss']
})
export class InputTitipTagihanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    GridProps: GridModel.IGrid;
    GridSelectedData: any = {} as any;

    Banyak: number = 0;
    Qty: number = 0;
    HargaSatuan: number = 0;
    TotalMutasi: number = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _mutasiKeluarService: MutasiKeluarService,
    ) {
        this.DashboardProps = {
            title: 'Input Titip Tagihan',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_titip_tagihan_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_titip_tagihan',
                    label: 'Tgl. TT',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'tanggal_rencana_bayar',
                    label: 'Tgl. Bayar',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'id_supplier',
                    label: 'Supplier',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                    select_callback: (data) => {
                        console.log("data supplier =>", data);
                    },
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        };

        this.FormInputFooter = {
            id: 'form_titip_tagihan_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'total_titip_tagihan',
                    label: 'Total Titip Tagihan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_retur',
                    label: 'Total Retur',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_potongan',
                    label: 'Total Potongan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_bayar',
                    label: 'Total Bayar',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
            ],
            custom_class: 'grid-rows-4 grid-cols-1',
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'banyak', headerName: 'BANYAK', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'isi', headerName: 'ISI', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'qty', headerName: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_satuan', headerName: 'HARGA SATUAN', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 200, sortable: true, resizable: true, },
            ],
            dataSource: [],
            height: "250px",
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };
    }

    ngOnInit(): void {
        this.onGetSupplier();
    }

    onGetSupplier(): void {
        this._store.dispatch(new SetupSupplierAction.GetAll([]))
            .pipe(
                map((result: any) => {
                    if (result.setup_supplier.entities.success) {
                        return result.setup_supplier.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                const indexSupplier = this.CustomForm.props.fields.findIndex((item) => {
                    return item.id == 'id_supplier'
                });

                const data = result.map((item: any) => {
                    return {
                        name: item.nama_lokasi,
                        value: item.id_lokasi
                    }
                });

                this.CustomForm.props.fields[indexSupplier].select_props = data;
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['inventory/mutasi-keluar/history']);
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

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;

        const footer = this.CustomFormFooter.handleSubmitForm();

        const payload = this._utilityService.JoinTwoObject(header, footer);

        this._mutasiKeluarService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['inventory/mutasi-keluar/history']);
                    }, 1500);
                }
            });
    }

}
