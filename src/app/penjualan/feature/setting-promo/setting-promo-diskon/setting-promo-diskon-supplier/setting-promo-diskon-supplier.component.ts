import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SettingPromoDiskonSupplierService } from 'src/app/@core/service/penjualan/setting-promo/setitng-promo-diskon/setting-promo-diskon-supplier.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-setting-promo-diskon-supplier',
    templateUrl: './setting-promo-diskon-supplier.component.html',
    styleUrls: ['./setting-promo-diskon-supplier.component.scss']
})
export class SettingPromoDiskonSupplierComponent implements OnInit {

    @Input('id_promo_diskon') id_promo_diskon: any;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    SelectedData: any;

    constructor(
        private _messageService: MessageService,
        private _settingPromoDiskonSupplierService: SettingPromoDiskonSupplierService,
    ) {
        this.GridProps = {
            column: [
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', flex: 200, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', flex: 200, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: 'calc(100vh - 22rem)',
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.FormDialogProps = {
            title: 'Setting Promo Diskon Supplier',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_satuan',
                is_inline: true,
                fields: [
                    {
                        id: 'id_supplier',
                        label: 'Supplier',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupSupplier',
                            title: 'Data Supplier',
                            columns: [
                                { field: 'kode_supplier', flex: 340, headerName: 'KODE SUPPLIER', sortable: true, resizable: true },
                                { field: 'nama_supplier', flex: 340, headerName: 'NAMA SUPPLIER', sortable: true, resizable: true },
                            ],
                            filter: [
                                { id: 'kode_supplier', title: 'Kode Supplier', type: 'contain', value: 'ms.kode_supplier' },
                                { id: 'nama_supplier', title: 'Nama Supplier', type: 'contain', value: 'ms.nama_supplier' },
                            ],
                            label: 'Pilih Supplier',
                            selectedField: 'nama_supplier',
                            selectedValue: 'id_supplier',
                            url: `${environment.endpoint}/supplier/by_param`
                        },
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-1'
            }
        }
    }

    ngOnInit(): void {
    }

    getDetailPromoDiskonSupplier(): void {
        this._settingPromoDiskonSupplierService
            .getAll(this.id_promo_diskon)
            .subscribe((result) => {
                this.GridProps.dataSource = result.data;
            })

    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleToolbarClicked(args: GridModel.IGridToolbar): void {
        switch (args.id) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            case 'delete':
                this._settingPromoDiskonSupplierService
                    .delete(this.SelectedData.id_promo_diskon_setting_merk)
                    .subscribe((result) => {
                        if (result.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                            setTimeout(() => {
                                this.getDetailPromoDiskonSupplier();
                            }, 1500);
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleSubmitForm(args: any): void {
        const payload = {
            id_promo_diskon: this.id_promo_diskon,
            id_supplier: args.id_supplier,
        };

        this._settingPromoDiskonSupplierService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.FormDialog.onCloseFormDialog();
                    this.getDetailPromoDiskonSupplier();
                }
            })
    }

}
